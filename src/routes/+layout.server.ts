export const load = async ({ locals, depends }) => {
  depends('auth:load')
  return {
    user: locals.user,
    session: locals.session
  }
}
