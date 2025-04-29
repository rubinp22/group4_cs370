import { useNavigate, Link } from 'react-router-dom';
import { Stack, Typography, Button, ButtonGroup, Box  } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import ToolBar from '../components/ToolBar';


// there is probably a better way to do this, but I just copied every video into "all"
// as I couldn't find of a good way to do (thats within my skill set)
const videoLibrary = {
  strength: [
      { title: 'Strength Video 1', url: 'https://www.youtube.com/watch?v=ZCcX2Egirp4' },
      { title: 'Strength Video 2', url: 'https://www.youtube.com/watch?v=9gjJb09eICo' },
      { title: 'Strength Video 3', url: 'https://www.youtube.com/watch?v=l5ij5MJpVP0' },
      { title: 'Strength Video 4', url: 'https://www.youtube.com/watch?v=eGHftDN0Eyc' },
      { title: 'Strength Video 5', url: 'https://www.youtube.com/watch?app=desktop&v=rNRtI_LOA0Y' }
  ],
  cardio: [
      { title: 'Cardio Video 1', url: 'https://www.youtube.com/watch?v=q2NZyW5EP5A' },
      { title: 'Cardio Video 2', url: 'https://www.youtube.com/watch?v=YraWLoZH-QQ' },
      { title: 'Cardio Video 3', url: 'https://www.youtube.com/watch?v=gUWFmn8f3H4' },
      { title: 'Cardio Video 4', url: 'https://www.youtube.com/watch?v=bYO8V-6IFs0' },
      { title: 'Cardio Video 5', url: 'https://www.youtube.com/watch?v=nLJ503CinLQ' }
  ],
  yoga: [
      { title: 'Yoga Video 1', url: 'https://www.youtube.com/watch?v=Kvoq4luIYVc' },
      { title: 'Yoga Video 2', url: 'https://www.youtube.com/watch?v=2WE-L8iyu0U' },
      { title: 'Yoga Video 3', url: 'https://www.youtube.com/watch?v=Y9CO4lliOow' },
      { title: 'Yoga Video 4', url: 'https://www.youtube.com/watch?v=Qy3U09CnELI' },
      { title: 'Yoga Video 5', url: 'https://www.youtub e.com/watch?v=nDJAbRkjDuA' }
  ],
  pilates: [
      { title: 'Pilates Video 1', url: 'https://www.youtube.com/watch?v=ofa5hlozkMs' },
      { title: 'Pilates Video 2', url: 'https://www.youtube.com/watch?v=UIKUTS_3K98' },
      { title: 'Pilates Video 3', url: 'https://www.youtube.com/watch?v=5H8K9HL9QaU' },
      { title: 'Pilates Video 4', url: 'https://www.youtube.com/watch?v=bVcvQW0XzOs' },
      { title: 'Pilates Video 5', url: 'https://www.youtube.com/watch?v=b8ueXAFnBf0' }
  ],
  dance: [
      { title: 'Dance Video 1', url: 'https://www.youtube.com/watch?v=uKEPTDLgSWs' },
      { title: 'Dance Video 2', url: 'https://www.youtube.com/watch?v=zeDhQq6s-Ws' },
      { title: 'Dance Video 3', url: 'https://www.youtube.com/watch?v=so0eQJVtZEM' },
      { title: 'Dance Video 4', url: 'https://www.youtube.com/watch?v=QKV-KhMjOWA' },
      { title: 'Dance Video 5', url: 'https://www.youtube.com/watch?v=jRLvEQsguMk' }
  ],
  running: [
      { title: 'Running Video 1', url: 'https://www.youtube.com/watch?v=u-e0ZO5L0s0' },
      { title: 'Running Video 2', url: 'https://www.youtube.com/watch?v=RCBOV43EDg0' },
      { title: 'Running Video 3', url: 'https://www.youtube.com/watch?v=_kGESn8ArrU' },
      { title: 'Running Video 4', url: 'https://www.youtube.com/watch?v=LqTCmMtWdGA' },
      { title: 'Running Video 5', url: 'https://www.youtube.com/watch?v=utADwnhrCQ4' }
  ],
  cycling: [
      { title: 'Cycling Video 1', url: 'https://www.youtube.com/watch?v=4ssLDk1eX9w' },
      { title: 'Cycling Video 2', url: 'https://www.youtube.com/watch?v=gUapMtJIb1s' },
      { title: 'Cycling Video 3', url: 'https://www.youtube.com/watch?v=M-viV5DZ2mo' },
      { title: 'Cycling Video 4', url: 'https://www.youtube.com/watch?v=bb9m_n4jckQ' },
      { title: 'Cycling Video 5', url: 'https://www.youtube.com/watch?v=VKBNDzCLzK8' }
  ],
  hiking: [
      { title: 'Hiking Video 1', url: 'https://www.youtube.com/watch?v=lrESF9eecxk' },
      { title: 'Hiking Video 2', url: 'https://www.youtube.com/watch?v=Ul9ryQiK8VM' },
      { title: 'Hiking Video 3', url: 'https://www.youtube.com/watch?v=ZnOzpERDmjU' },
      { title: 'Hiking Video 4', url: 'https://www.youtube.com/watch?v=PDJJaPxCbxg' },
      { title: 'Hiking Video 5', url: 'https://www.youtube.com/watch?v=YXjyrUd2mTg' }
  ],
  swimming: [
      { title: 'Swimming Video 1', url: 'https://www.youtube.com/watch?v=6_vXycbD2TM' },
      { title: 'Swimming Video 2', url: 'https://www.youtube.com/watch?v=ZdKBXAoxoDE' },
      { title: 'Swimming Video 3', url: 'https://www.youtube.com/watch?v=lFU0aZEElqc' },
      { title: 'Swimming Video 4', url: 'https://www.youtube.com/watch?v=riIyImmuB_M' },
      { title: 'Swimming Video 5', url: 'https://www.youtube.com/watch?v=WaKMgWGXE9c' }
  ],
  lifting: [
      { title: 'Lifting Video 1', url: 'https://www.youtube.com/watch?v=u7AFpzWV2I8' },
      { title: 'Lifting Video 2', url: 'https://www.youtube.com/watch?v=dEKpR6sGxDY' },
      { title: 'Lifting Video 3', url: 'https://www.youtube.com/watch?v=4Y2ZdHCOXok' },
      { title: 'Lifting Video 4', url: 'https://www.youtube.com/watch?v=Yb2TgKMA8y4' },
      { title: 'Lifting Video 5', url: 'https://www.youtube.com/watch?v=BNsKEG3hIzI' }
  ],
  none: [{title: 'Select a button at the top to see exercise videos', url:'null'}]
};

// Function to convert a YouTube URL into an embeddable URL
const convertToEmbedUrl = (url) => {
  const videoId = url.split("v=")[1]?.split("&")[0]; // Extracts video ID from URL
  return `https://www.youtube.com/embed/${videoId}`;
};

let videoName = "strength";
const options = ["strength", "cardio", "yoga", "pilates", "dance"];
function changeVideo (buttonNum){
  videoName = options[buttonNum];
  alert(videoName);
}


function TrainingVideoLibrary () {
    const navigate = useNavigate();
    const [videoType, setVideoType] = useState("none");

    //'strength', 'cardio', 'yoga', 'pilates', 'dance'
    // testing out Typography idk if its a good call yet makes the style pretty different
    return (
      <>
      <ToolBar /> {/* add new elements */}
      <Stack direction="column" gap={3} marginBottom={3}>
      <Typography marginTop="10%" variant="h2">Training Video Library</Typography>

      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={() => setVideoType("running")}>running</Button>
        <Button onClick={() => setVideoType("cycling")}>cycling</Button>
        <Button onClick={() => setVideoType("hiking")}>hiking</Button>
        <Button onClick={() => setVideoType("swimming")}>swimming</Button>
        <Button onClick={() => setVideoType("lifting")}>lifting</Button>
        <Button onClick={() => setVideoType("strength")}>strength</Button>
        <Button onClick={() => setVideoType("cardio")}>cardio</Button>
        <Button onClick={() => setVideoType("yoga")}>yoga</Button>
        <Button onClick={() => setVideoType("pilates")}>pilates</Button>
        <Button onClick={() => setVideoType("dance")}>dance</Button>
      </ButtonGroup>

      {/* Mapping videos alonging with embedding them */}
      <Stack direction="column" gap={2}>
        {videoLibrary[videoType].map((video) => (
          <div key={video.id} style={{ textAlign: "center" }}>
            <Typography variant = "h6">{video.title}</Typography>
            {/* Added a ternary here to conditionally control whether an embedded video is rendered. If the user
            hasn't selected a video type, then it makes sense to not show them a video. Otherwise, we render
            an embedded video with a null url, causing errors. */}
            {videoType === "none" ? (
              <>
                {/* Minor spacing */}
                <Box margin="20%" />
              </>
            ) : (
              <iframe 
                width="640" 
                height="480" 
                src={convertToEmbedUrl(video.url)} 
                title={video.title} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            )
          }
            
          </div>
        ))}
      </Stack>
        <MuiLink to="../HomePage" component={RouterLink} className="button-link">Back to Home</MuiLink>
      </Stack>
      </>
    );
}


export default TrainingVideoLibrary;
