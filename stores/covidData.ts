import { v4 as uuidv4 } from 'uuid';
import { LOCAL_STORE_KEY, DAYS_COUNT } from '@/utils/constants';
interface CovidData {
  id: string;
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

type CovidDataList = CovidData[];

interface CovidDataState {
  list: CovidDataList;
  isRefresh: boolean;
}
export const useCovidDataStore = defineStore('covidDataStore', {
  state: (): CovidDataState => ({
    list: [],
    isRefresh: true,
  }),
  actions: {
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
