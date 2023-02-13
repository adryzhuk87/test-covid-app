import { COOKIE_STORE_KEY } from '@/utils/constants';
export default defineEventHandler(async event => {
  const body = await readBody(event);

  if (body.username) {
    deleteCookie(event, COOKIE_STORE_KEY);

    return {
      data: 'success',
    };
  } else {
    return {
      data: null,
      error: 'something wrong',
    };
  }
});
