export interface CovidDataEntity {
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

export type CovidDataList = CovidDataEntity[];

export interface CovidDataState {
  list: CovidDataList;
  isRefresh: boolean;
  user: UserState;
}

export interface UserState {
  username: string;
  isLoggedIn: boolean;
}

export interface User {
  username: string;
  password: string;
}
