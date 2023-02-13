import { v4 as uuidv4 } from 'uuid';
import { LOCAL_STORE_KEY, DAYS_COUNT } from '@/utils/constants';
import { logError } from '@/utils';
interface CovidDataEntity {
  uuid: string;
  date: string;
  last_update: string;
  confirmed: number;
  confirmed_diff: number;
  deaths: number;
  deaths_diff: number;
  recovered: number;
  recovered_diff: number;
  active: number;
  active_diff: number;
  fatality_rate: number;
}

interface UserState {
  username: string;
  isLoggedIn: boolean;
}
interface User {
  username: string;
  password: string;
}

type CovidDataList = CovidDataEntity[];

interface CovidDataState {
  list: CovidDataList;
  isRefresh: boolean;
  user: UserState;
}
export const useCovidDataStore = defineStore('covidDataStore', {
  state: (): CovidDataState => ({
    list: [],
    isRefresh: true,
    user: {
      username: '',
      isLoggedIn: false,
    },
  }),
  actions: {
    async logout() {
      try {
        const { error } = await $fetch('/api/logout', {
          method: 'POST',
          body: {
            username: this.user.username,
          },
        });
        if (error) {
          logError(error);
        } else {
          this.reset();
          navigateTo('/login');
        }
      } catch (error) {
        logError(error.message);
      }
    },
    async login(user: User) {
      try {
        this.reset();
        const { error } = await $fetch('/api/login', {
          method: 'POST',
          body: {
            username: user.username,
            password: user.password,
          },
        });
        if (error) {
          logError(error);
        } else {
          this.user = { username: user.username, isLoggedIn: true };
          navigateTo('/');
        }
      } catch (error) {
        logError(error.message);
      }
    },
    reset() {
      this.$reset();
      localStorage.removeItem(LOCAL_STORE_KEY);
    },
    removeItemById(uuid: string) {
      this.list = this.list.filter(item => item.uuid !== uuid);
    },
    async fetch(isForce: boolean = false) {
      try {
        if (isForce || this.isRefresh) {
          this.isRefresh = false;
          const dates = generateDates(DAYS_COUNT);
          const results = await Promise.all(
            dates.map(date =>
              $fetch('/api/covidData', {
                query: {
                  date,
                },
              })
            )
          );
          if (results !== null) {
            this.list = results.map(({ data }) => ({
              ...data,
              uuid: uuidv4(),
            }));
          }
        }
      } catch (error) {
        logError(error.message);
      }
    },
  },
  persist: {
    key: LOCAL_STORE_KEY,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCovidDataStore, import.meta.hot));
}
