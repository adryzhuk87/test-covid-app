import { COVID_API_REPORTS_TOTAL } from '@/utils/constants';
import { CovidApiResponse, CovidDataEntity } from '@/types/interfaces';
export default defineEventHandler(
  async (event): Promise<CovidApiResponse<CovidDataEntity, string>> => {
    try {
      const { date } = getQuery(event);
      const { data } = (await $fetch(COVID_API_REPORTS_TOTAL, {
        query: {
          date: date,
          iso: 'UKR',
        },
      })) as CovidApiResponse<CovidDataEntity, string>;
      return {
        data,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
);
