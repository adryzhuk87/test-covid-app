import { v4 as uuidv4 } from 'uuid';
import { LOCAL_STORE_KEY, DAYS_COUNT } from '@/utils/constants';
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
      const response = await $fetch('/api/logout', {
        method: 'POST',
        body: {
          username: this.user.username,
        },
      });
      if (response.error) {
        console.log(response);
      } else {
        this.reset();
        navigateTo('/login');
      }
    },
    async login(user: User) {
      const response = await $fetch('/api/login', {
        method: 'POST',
        body: {
          username: user.username,
          password: user.password,
        },
      });
      if (response.error) {
        console.log(response);
      } else {
        this.user = { username: user.username, isLoggedIn: true };
        navigateTo('/');
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
      if (isForce || this.isRefresh) {
        console.log('fetch');
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
    },
  },
  persist: {
    key: LOCAL_STORE_KEY,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCovidDataStore, import.meta.hot));
}
