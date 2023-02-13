export default defineNuxtRouteMiddleware(to => {
  const cookie = useCookie('test-covid-app');

  if (to.path === '/') {
    if (!cookie || !cookie.value) {
      return navigateTo('/login');
    }
    return;
  }
});
