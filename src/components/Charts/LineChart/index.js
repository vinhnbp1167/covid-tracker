import HighchartsReact from 'highcharts-react-official'
import Highchart from 'highcharts';
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Button, ButtonGroup } from '@material-ui/core';

const generateOptions = (data, casesType) => {
    const categories = data.map((item) => moment(item.Date).format('MM/DD/YYYY'));
    if (casesType === "infected") {
        return {
            chart: {
            height: 500,
            },
            title: {
            text: 'Total infected cases',
            },
            xAxis: {
            categories: categories,
            crosshair: true,
            },
            
            yAxis: {
            min: 0,
            title: {
                text: null,
            },
            labels: {
                align: 'right',
            },
            },
            tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
            },
            plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
            },
            series: [
            {
                name: 'Infected',
                color: '#F3585B',
                data: data.map((item) => item.Confirmed)
            },
            ],
        };
    }

    if (casesType === "recovered") {
        return {
            chart: {
            height: 500,
            },
            title: {
            text: 'Total recovered cases',
            },
            xAxis: {
            categories: categories,
            crosshair: true,
            },
            
            yAxis: {
            min: 0,
            title: {
                text: null,
            },
            labels: {
                align: 'right',
            },
            },
            tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
            },
            plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
            },
            series: [
            {
                name: 'Recovered',
                color: '#28a745',
                data: data.map((item) => item.Recovered)
            },
            ],
        };
    }

    if (casesType === "death") {
        return {
            chart: {
            height: 500,
            },
            title: {
            text: 'Total fatal cases',
            },
            xAxis: {
            categories: categories,
            crosshair: true,
            },
            
            yAxis: {
            min: 0,
            title: {
                text: null,
            },
            labels: {
                align: 'right',
            },
            },
            tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
            },
            plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
            },
            series: [
            {
                name: 'Fatal',
                color: 'gray',
                data: data.map((item) => item.Deaths)
            },
            ],
        };
    }
}

function LineChart({ data, casesType }) {
    console.log('LineChart', { data })
    const [options, setOptions] = useState({});
    const [reportType, setReportType] = useState('all');

    useEffect(() => {
        let customData = [];
        // handle reportType changes

        switch(reportType) {
            case 'all':
                customData = data;
                break;
            case '30':
                customData = data.slice(data.length - 30);
                break;
            case '7':
                customData = data.slice(data.length - 7);
                break;
            default:
                customData = data;
                break;
        }

        setOptions(generateOptions(customData, casesType));
    }, [data, reportType, casesType]);

  return (
    <div>
      <ButtonGroup size='small' style={{display: 'flex', justifyContent: 'flex-end' }}>
          <Button color={reportType === 'all' ? 'secondary' : ''} onClick={() => setReportType('all')}>All</Button>
          <Button color={reportType === '30' ? 'secondary' : ''} onClick={() => setReportType('30')}>30 days</Button>
          <Button color={reportType === '7' ? 'secondary' : ''} onClick={() => setReportType('7')}>7 days</Button>
      </ButtonGroup>
      <HighchartsReact
        highcharts={Highchart}
        options={options} />
    </div>
  )
}

export default LineChart
