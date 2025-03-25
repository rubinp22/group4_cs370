import { BarChart } from "@mui/x-charts";

const MyBarChart = (props) => {

    const { labels, dataSets, seriesLabel, colors } = props;

    return (
        <BarChart
        xAxis={[{ scaleType: "band", data: labels }]}
        series={seriesLabel.map((series, idx) => {
          return {
              data: dataSets[idx],
              label: series,
              color: colors[idx] 
          };
        })}
        width={500}
        height={300}
    />
    );
}

export default MyBarChart;