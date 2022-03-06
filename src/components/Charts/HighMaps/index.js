import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import { cloneDeep } from 'lodash';
import usAll from "./usAll";
import { getReportByProvince } from '../../apis';
import { useBetween } from "use-between";
import { useShareableState } from '../../../App';

// Load Highcharts modules
highchartsMap(Highcharts);




const HighMaps = ({ mapData, casesType }) => {
  const [options, setOptions] = useState({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const { report, setReport } = useBetween(useShareableState);
  const chartRef = useRef(null);

  const initOptions = {
    chart: {
      height: '500',
    },
    title: {
      text: null,
    },
    mapNavigation: {
      enabled: true,
    },
    colorAxis: {
      min: 0,
      stops: [
        [0.2, '#FFC4AA'],
        [0.4, '#FF8A66'],
        [0.6, '#FF392B'],
        [0.8, '#B71525'],
        [1, '	#7A0826'],
      ],
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'bottom',
    },
    series: [
      {

        name: 'Population',
        mapData: usAll,
        joinBy: ['hc-key', 'key'],
        cursor: 'pointer',
        point: {
          events: {
            click: function () {
              let countryDropDown = document.querySelector('#country-selector');
              let country = countryDropDown.options[countryDropDown.selectedIndex];
              let countrySlug = country.getAttribute('data-slug');
              let province = this.name;
              getReportByProvince(countrySlug, encodeURIComponent(province)).then((res) => {
                console.log('getReportByProvince', { res });
                // remove last item = current date
                if (res.data && res.data.length > 0) {
                  setReport(res.data);
                }
              });
            }
          }
        }

      },
    ],
  };

  useEffect(() => {
    if (mapData && Object.keys(mapData).length) {
      console.log('GetMapData', { mapData });
      const fakeData = mapData.features.map((feature, index) => ({
        key: feature.properties['hc-key'],
        value: index,
      }));

      if (casesType === "infected") {
        setOptions(() => ({
          ...initOptions,
          title: {
            text: mapData.title,
          },
          colorAxis: {
            min: 0,
            stops: [
              [0.2, '#FFC4AA'],
              [0.4, '#FF8A66'],
              [0.6, '#FF392B'],
              [0.8, '#B71525'],
              [1, '	#7A0826'],
            ],
          },
          series: [
            { ...initOptions.series[0], mapData: mapData, data: fakeData },
          ],
        }));
      }

      else if (casesType === "recovered") {
        setOptions(() => ({
          ...initOptions,
          title: {
            text: mapData.title,
          },
          colorAxis: {
            min: 0,
            stops: [
              [0.2, '#00C33A'],
              [0.4, '#00DA41'],
              [0.6, '#4FFF83'],
              [0.8, '#ADFFC5'],
              [1, '	#DDFFE7'],
            ],
          },
          series: [
            { ...initOptions.series[0], mapData: mapData, data: fakeData },
          ],
        }));
      }

      else if (casesType === "death") {
        setOptions(() => ({
          ...initOptions,
          title: {
            text: mapData.title,
          },
          colorAxis: {
            min: 0,
            stops: [
              [0.2, '#F5F5F5'],
              [0.4, '#C6C6C6 '],
              [0.6, '#A6A6A6'],
              [0.8, '#7F7F7F'],
              [1, '	#626262'],
            ],
          },
          series: [
            { ...initOptions.series[0], mapData: mapData, data: fakeData },
          ],
        }));
      }

      if (!mapLoaded) setMapLoaded(true);
    }
  }, [mapData, mapLoaded, casesType]);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.chart.series[0].update({
        mapData,
      });
    }
  }, [options, mapData]);

  if (!mapLoaded) return null;

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={cloneDeep(options)}
      constructorType={'mapChart'}
      ref={chartRef}
    />
  );
};

HighMaps.defaultProps = {
  mapData: {},
};

export default React.memo(HighMaps);