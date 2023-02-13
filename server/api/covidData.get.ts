export default defineEventHandler(async event => {
  try {
    const { date } = getQuery(event);
    const { data } = await $fetch('https://covid-api.com/api/reports/total', {
      query: {
        date: date,
        iso: 'UKR',
      },
    });
    console.log('api');
    return {
      data,
      error: null,
    };
  } catch (error) {
    console.log('Err');
    return {
      data: null,
      error: error.message,
    };
  }
});
