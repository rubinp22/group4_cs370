import { BarChart } from "@mui/x-charts";
import { Box } from "@mui/system";

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
            width={400}
            height={250}
        />
    );
}

export default MyBarChart;