import { ActivityCalendar } from 'react-activity-calendar'
import { amber, blue, grey } from '@mui/material/colors';
import { Tooltip as MuiTooltip } from '@mui/material'

const MyActivityCalendar = (props) => {
    const {data} = props;
    
    const theme = {
        light: ['#f0f0f0', blue[300], blue[500], blue[700], blue[900]],
        dark: ['#383838', amber[100], amber[300], amber[700], amber[900]],
      }

    return (
        <ActivityCalendar
            data={data} 
            theme={theme}
            showWeekdayLabels={true}
            fontSize={16}
            renderBlock={(block, activity) => (
                <MuiTooltip title={`${activity.count} activities on ${activity.date}`}>
                  {block}
                </MuiTooltip>
            )}
        />
    )
}

export default MyActivityCalendar;