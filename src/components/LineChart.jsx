/* eslint-disable react/prop-types */
import { ChartComponent, DateTime, Highlight, Inject, Legend, SeriesCollectionDirective, SeriesDirective, SplineAreaSeries, Tooltip } from '@syncfusion/ej2-react-charts'

const LineChart = ({ intervalType, dataSource, name, id }) => {
  const areaPrimaryXAxis = {
    valueType: 'DateTime',
    labelFormat: 'dd/MM',
    majorGridLines: { width: 0 },
    intervalType: intervalType,
    edgeLabelPlacement: 'Shift',
    labelStyle: { color: 'gray' },
    minimum: dataSource[0].x,
    maximum: dataSource[dataSource.length - 1].x,
  };
  
  const areaPrimaryYAxis = {
    labelFormat: '{value}',
    lineStyle: { width: 0 },
    // interval: interval,
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    majorGridLines: { dashArray: '5,5', color: '#ededed' },
    labelStyle: { color: 'gray' },
  };
  
  const areaCustomSeries = [
    {
      dataSource: dataSource,
      xName: 'x',
      yName: 'y',
      name: name,
      opacity: '0.2',
      type: 'SplineArea',
      width: '2',
      border: { width: 3, color: '#3ccf4e' },
      fill: '#3ccf4e',
    }
  ];

  return (
    <ChartComponent
      id={id}
      width='100%'
      height='200vh'
      style={{ textAlign: "center" }}
      primaryXAxis={areaPrimaryXAxis}
      primaryYAxis={areaPrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background='#fff'
      legendSettings={{ visible: true, enableHighlight: true, textStyle: { color: '#33373e' } }}
    >
      <Inject services={[SplineAreaSeries, DateTime, Legend, Tooltip, Highlight]} />
      <SeriesCollectionDirective>
        {areaCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
  )
}

export default LineChart
