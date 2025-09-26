import { onMount, onDestroy } from 'svelte';
import { isMobile, isTablet, isDesktop, BREAKPOINTS } from '$lib/utils/responsive';

type Breakpoint = keyof typeof BREAKPOINTS;

export function useBreakpoint(breakpoint: Breakpoint) {
  let matches = $state(false);
  
  onMount(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${BREAKPOINTS[breakpoint]}px)`);
    matches = mediaQuery.matches;
    
    const handleChange = (e: MediaQueryListEvent) => {
      matches = e.matches;
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    onDestroy(() => {
      mediaQuery.removeEventListener('change', handleChange);
    });
  });
  
  return matches;
}

// Return a reactive store for mobile detection
export function createIsMobileStore() {
  let isCurrentMobile = $state(false);
  
  onMount(() => {
    isCurrentMobile = isMobile();
    
    const handleResize = () => {
      isCurrentMobile = isMobile();
    };
    
    window.addEventListener('resize', handleResize);
    
    onDestroy(() => {
      window.removeEventListener('resize', handleResize);
    });
  });
  
  return $state.snapshot(() => isCurrentMobile);
}