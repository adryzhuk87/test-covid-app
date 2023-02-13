import { COOKIE_STORE_KEY } from '@/utils/constants';

export default defineNuxtRouteMiddleware(to => {
  const cookie = useCookie(COOKIE_STORE_KEY);
  if (to.path === '/') {
    if (!cookie || !cookie.value) {
      return navigateTo('/login');
    }
    return;
  }
});
