import { BarChart } from "@mui/x-charts";

const MyLapBarChart = (props) => {

    const { labels, dataSets, seriesLabel, colors } = props;

    console.log("labels: ", labels);
    console.log("dataSets: ", dataSets);
    console.log("seriesLabel: ", seriesLabel);
    console.log("colors: ", colors);


}

export default MyLapBarChart;