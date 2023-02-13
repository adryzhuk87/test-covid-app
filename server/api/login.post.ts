export default defineEventHandler(async event => {
  const body = await readBody(event);

  const options = {
    username: body.username,
    password: body.password,
  };
  if (options.username === 'admin' && options.password === 'admin') {
    setCookie(event, 'test-covid-app', options.username, {
      expires: new Date(Date.now() * 24 * 60 * 60 * 1000),
    });
    console.log(options);
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
