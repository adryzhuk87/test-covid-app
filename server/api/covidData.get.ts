import { COVID_API_REPORTS_TOTAL } from '@/utils/constants';
export default defineEventHandler(async event => {
  try {
    const { date } = getQuery(event);
    const { data } = await $fetch(COVID_API_REPORTS_TOTAL, {
      query: {
        date: date,
        iso: 'UKR',
      },
    });
    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.message,
    };
  }
});
