/* eslint-disable react/prop-types */
import { AccumulationChartComponent, AccumulationDataLabel, AccumulationLegend, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationTooltip, Inject, PieSeries } from '@syncfusion/ej2-react-charts'

const PieChart = ({ data }) => {
  // const pieChartColor = ['#fabc05', '#34a853'];

  data.sort((a, b) => b.qty - a.qty);

  // data.forEach((item, index) => {
  //   item.color = pieChartColor[index];
  // });

  return (
    <AccumulationChartComponent
      id='chart-pie'
      legendSettings={{ visible: true, textStyle: { color: '#33373e' } }}
      height='250vh'
      width='100%'
      background='#fff'
      tooltip={{ enable: true }}
    >
      <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          name="Category"
          dataSource={data}
          // pointColorMapping='color'
          xName="table_name"
          yName="qty"
          // innerRadius="40%"
          startAngle={0}
          endAngle={360}
          // radius="70%"
          explode
          explodeOffset="10%"
          explodeIndex={0}
          dataLabel={{
            visible: true,
            name: 'text',
            position: 'Inside',
            font: {
              fontWeight: '600',
              color: '#fff',
            },
          }}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  )
}

export default PieChart