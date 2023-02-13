import { COOKIE_STORE_KEY } from '@/utils/constants';
export default defineEventHandler(async event => {
  const body = await readBody(event);

  const options = {
    username: body.username,
    password: body.password,
  };
  if (options.username === 'admin' && options.password === 'admin') {
    setCookie(event, COOKIE_STORE_KEY, options.username, {
      expires: new Date(Date.now() * 24 * 60 * 60 * 1000),
    });
    return {
      data: 'success',
    };
  } else {
    return {
      data: null,
      error: 'invalid name or password',
    };
  }
});
