import React, { useEffect, useMemo, useState } from 'react';
import { sortBy } from 'lodash';
import CountrySelector from './components/CountrySelector';
import { getCountries, getReportByCountry } from './components/apis';
import Summary from './components/Summary';
import { Container, Grid, Typography } from '@material-ui/core';
import '@fontsource/roboto';
import moment from 'moment';
import HighlightCard from './components/Highlight/HighlightCard';
import { useBetween } from "use-between";

moment.locale('en-US');

export const useShareableState = () => {
  const [report, setReport] = React.useState([]);
  return {
    report,
    setReport
  };
};

const App = () => {
  const [countries, setCountries] = React.useState([]);
  const [selectedCountryId, setSelectedCountryId] = React.useState('');
  const { report, setReport } = useBetween(useShareableState);
  const [casesType, setCasesType] = useState("infected");

  useEffect(() => {
    getCountries().then((res) => {
      const { data } = res;
      const countries = sortBy(data, 'Country');
      setCountries(countries);
      setSelectedCountryId('vn');
    });
  }, []);

  const handleOnChange = React.useCallback((e) => {
    setSelectedCountryId(e.target.value);
  }, []);

  useEffect(() => {
    if (selectedCountryId) {
      const selectedCountry = countries.find(
        (country) => country.ISO2 === selectedCountryId.toUpperCase()
      );
      getReportByCountry(selectedCountry.Slug).then((res) => {
        console.log('getReportByCountry', { res });
        // remove last item = current date
        if (res.data && res.data.length > 0) {
          setReport(res.data);
        }
      });
    }
  }, [selectedCountryId, countries]);

  const summary = useMemo(() => {
    if (report && report.length) {
      const latestData = report[report.length - 1];
      return [
        {
          title: 'Infected',
          count: latestData.Confirmed,
          type: 'infected',
        },
        {
          title: 'Recovered',
          count: latestData.Recovered,
          type: 'recovered',
        },
        {
          title: 'Fatal',
          count: latestData.Deaths,
          type: 'death',
        },
      ];
    }
    return [];
  }, [report]);

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant='h2' component='h2'>
        COVID-19 Cases
      </Typography>
      <Typography>{moment().format('LLL')}</Typography>
      <CountrySelector
        className="country-dropdown"
        handleOnChange={handleOnChange}
        countries={countries}
        value={selectedCountryId}
      />
      <Grid container spacing={3}>
        {summary.map((data, index) => (
          <Grid item sm={4} xs={12} key={index}>
            <HighlightCard
              onClick={(e) => setCasesType(data.type)}
              title={data.title}
              active={casesType === data.type}
              count={data.count}
              type={data.type}
            />
          </Grid>
        ))}
      </Grid>
      <Summary countryId={selectedCountryId} report={report} casesType={casesType} />
    </Container>
  );
};

export default App;