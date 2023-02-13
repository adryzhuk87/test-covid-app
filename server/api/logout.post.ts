import { COOKIE_STORE_KEY } from '@/utils/constants';
import { CovidApiResponse, UserState } from '@/types/interfaces';
export default defineEventHandler(
  async (event): Promise<CovidApiResponse<UserState, string>> => {
    const { username } = await readBody(event);

    if (username) {
      deleteCookie(event, COOKIE_STORE_KEY);
      return {
        data: { username, isLoggedIn: false },
      };
    } else {
      return {
        error: 'something wrong during logout',
      };
    }
  }
);
