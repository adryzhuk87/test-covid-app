import { v4 as uuidv4 } from 'uuid';

export interface CovidData {
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

export type CovidDataList = CovidData[];

export interface CovidDataState {
  list: CovidDataList;
  isRefresh: boolean;
  countOfDays: number;
}
export const useCovidDataStore = defineStore('covidDataStore', {
  state: (): CovidDataState => ({
    list: [],
    isRefresh: true,
    countOfDays: 5,
  }),
  actions: {
    removeItemById(id) {
      this.list = this.list.filter(item => item.id !== id);
    },
    refreshCovidData() {
      this.isRefresh = true;
    },
    async fetchCovidData() {
      if (this.isRefresh) {
        this.isRefresh = false;
        const dates = generateDates(this.countOfDays);
        console.log('fetchCovidData');
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
            id: uuidv4(),
          }));
        }
      }
    },
  },
  persist: true,
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCovidDataStore, import.meta.hot));
}
