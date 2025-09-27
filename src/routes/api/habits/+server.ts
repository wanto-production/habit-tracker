import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { habits, checkIns } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
  const session = event.locals;
  
  if (!session?.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    const [userHabits, allCheckIns] = await Promise.all([
      db.select()
        .from(habits)
        .where(eq(habits.userId, session.user.id)),
      db.select()
        .from(checkIns)
        .innerJoin(habits, eq(checkIns.habitId, habits.id))
        .where(eq(habits.userId, session.user.id)),
    ]);

    // Calculate stats
    const habitsCount = userHabits.length;
    const completedToday = allCheckIns.filter(ci => ci.check_ins.date === today).length;
    const totalCheckIns = allCheckIns.length;

    // Calculate current streak (for each habit, this would be more complex in a real app)
    const currentStreak = userHabits.length > 0
      ? Math.max(...userHabits.map(h => calculateStreak(h.id, allCheckIns)))
      : 0;

    // Enrich habits with stats
    const habitsWithStats = await Promise.all(
      userHabits.map(async (habit) => {
        // Get check-ins for this specific habit
        const habitCheckIns = allCheckIns
          .filter(ci => ci.check_ins.habitId === habit.id)
          .map(ci => ci.check_ins);

        // Calculate streak for this habit
        const streak = calculateStreak(habit.id, allCheckIns);

        // Check if habit is already checked in for today
        const isCheckedInToday = habitCheckIns.some(checkIn => checkIn.date === today);

        // Calculate completion rate (check-ins in last 30 days vs. days since creation)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const checkInsInPeriod = habitCheckIns.filter(
          ci => new Date(ci.date) >= thirtyDaysAgo
        ).length;

        // Calculate potential days in the period
        const habitCreated = habit.createdAt || new Date();
        const startDate = habitCreated > thirtyDaysAgo ? habitCreated : thirtyDaysAgo;
        const daysSinceStart = Math.ceil(
          (new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        const completionRate = daysSinceStart > 0 ? checkInsInPeriod / daysSinceStart : 0;

        return {
          ...habit,
          streak,
          completionRate: Math.min(1, completionRate), // Cap at 1 (100%)
          isCheckedInToday
        };
      })
    );

    return json({
      habits: habitsWithStats,
      stats: {
        habitsCount,
        completedToday,
        totalCheckIns,
        currentStreak
      }
    });
  } catch (error) {
    console.error('Error fetching habits:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};

// Helper function to calculate streak for a habit
function calculateStreak(habitId: string, allCheckIns: any[]): number {
  // This is a simplified calculation - in a real app you might want to calculate
  // the actual consecutive days streak
  const habitCheckIns = allCheckIns
    .filter(ci => ci.check_ins.habitId === habitId)
    .map(ci => ci.check_ins);

  // For now, just return the count as a simple "streak" indicator
  // A proper implementation would calculate actual consecutive days
  return habitCheckIns.length;
}