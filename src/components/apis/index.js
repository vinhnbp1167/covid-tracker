import axios from 'axios';
import moment from 'moment';

axios.interceptors.response.use(response => {
  return response;
}, error => {
  return error;
});

export const getCountries = () =>
  axios.get('https://api.covid19api.com/countries');

export const getReportByCountry = (slug) =>
  axios.get(
    `https://api.covid19api.com/dayone/country/${slug}?from=2021-01-01T00:00:00&to=${moment()
      .utc(0)
      .format()}`
  ).catch((err) => console.log(err));

export const getReportByProvince = ( slug, province ) =>
axios.get(
  `https://api.covid19api.com/dayone/country/${slug}?province=${province}&from=2021-01-01T00:00:00&to=${moment()
    .utc(0)
    .format()}`
);

export const getMapDataByCountryId = (countryId) =>
  import(
    `@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`
  );