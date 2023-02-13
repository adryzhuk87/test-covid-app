import { COOKIE_STORE_KEY } from '@/utils/constants';
import { CovidApiResponse, UserState } from '@/types/interfaces';
export default defineEventHandler(
  async (event): Promise<CovidApiResponse<UserState>> => {
    const { username, password } = await readBody(event);

    if (username === 'admin' && password === 'admin') {
      setCookie(event, COOKIE_STORE_KEY, username, {
        expires: new Date(Date.now() * 24 * 60 * 60 * 1000),
      });
      return {
        data: { username, isLoggedIn: true },
      };
    } else {
      return {
        error: 'something wrong during login',
      };
    }
  }
);
