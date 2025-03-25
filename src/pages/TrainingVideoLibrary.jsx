import { useNavigate, Link } from 'react-router-dom';
import { Stack, Typography, Button, ButtonGroup  } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';

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
      { title: 'Yoga Video 5', url: 'https://www.youtube.com/watch?v=nDJAbRkjDuA' }
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
  all: [
      { title: 'Strength Video 1', url: 'https://www.youtube.com/watch?v=ZCcX2Egirp4' },
      { title: 'Strength Video 2', url: 'https://www.youtube.com/watch?v=9gjJb09eICo' },
      { title: 'Strength Video 3', url: 'https://www.youtube.com/watch?v=l5ij5MJpVP0' },
      { title: 'Strength Video 4', url: 'https://www.youtube.com/watch?v=eGHftDN0Eyc' },
      { title: 'Strength Video 5', url: 'https://www.youtube.com/watch?app=desktop&v=rNRtI_LOA0Y' },
      { title: 'Cardio Video 1', url: 'https://www.youtube.com/watch?v=q2NZyW5EP5A' },
      { title: 'Cardio Video 2', url: 'https://www.youtube.com/watch?v=YraWLoZH-QQ' },
      { title: 'Cardio Video 3', url: 'https://www.youtube.com/watch?v=gUWFmn8f3H4' },
      { title: 'Cardio Video 4', url: 'https://www.youtube.com/watch?v=bYO8V-6IFs0' },
      { title: 'Cardio Video 5', url: 'https://www.youtube.com/watch?v=nLJ503CinLQ' },
      { title: 'Yoga Video 1', url: 'https://www.youtube.com/watch?v=Kvoq4luIYVc' },
      { title: 'Yoga Video 2', url: 'https://www.youtube.com/watch?v=2WE-L8iyu0U' },
      { title: 'Yoga Video 3', url: 'https://www.youtube.com/watch?v=Y9CO4lliOow' },
      { title: 'Yoga Video 4', url: 'https://www.youtube.com/watch?v=Qy3U09CnELI' },
      { title: 'Yoga Video 5', url: 'https://www.youtube.com/watch?v=nDJAbRkjDuA' },
      { title: 'Pilates Video 1', url: 'https://www.youtube.com/watch?v=ofa5hlozkMs' },
      { title: 'Pilates Video 2', url: 'https://www.youtube.com/watch?v=UIKUTS_3K98' },
      { title: 'Pilates Video 3', url: 'https://www.youtube.com/watch?v=5H8K9HL9QaU' },
      { title: 'Pilates Video 4', url: 'https://www.youtube.com/watch?v=bVcvQW0XzOs' },
      { title: 'Pilates Video 5', url: 'https://www.youtube.com/watch?v=b8ueXAFnBf0' },
      { title: 'Dance Video 1', url: 'https://www.youtube.com/watch?v=uKEPTDLgSWs' },
      { title: 'Dance Video 2', url: 'https://www.youtube.com/watch?v=zeDhQq6s-Ws' },
      { title: 'Dance Video 3', url: 'https://www.youtube.com/watch?v=so0eQJVtZEM' },
      { title: 'Dance Video 4', url: 'https://www.youtube.com/watch?v=QKV-KhMjOWA' },
      { title: 'Dance Video 5', url: 'https://www.youtube.com/watch?v=jRLvEQsguMk' }
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
      <Stack direction="column" gap={3} marginBottom={3}>
      <Typography variant="h2">Training Video Library</Typography>

      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={() => setVideoType("strength")}>strength</Button>
        <Button onClick={() => setVideoType("cardio")}>cardio</Button>
        <Button onClick={() => setVideoType("yoga")}>yoga</Button>
        <Button onClick={() => setVideoType("pilates")}>pilates</Button>
        <Button onClick={() => setVideoType("dance")}>dance</Button>
        <Button onClick={() => setVideoType("all")}>All Videos</Button>
      </ButtonGroup>

      {/* Mapping videos alonging with embedding them */}
      <Stack direction="column" gap={2}>
        {videoLibrary[videoType].map((video) => (
          <div key={video.id} style={{ textAlign: "center" }}>
            <Typography variant = "h6">{video.title}</Typography>
            <iframe 
              width="640" 
              height="480" 
              src={convertToEmbedUrl(video.url)} 
              title={video.title} 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </Stack>

        <MuiLink to="../" component={RouterLink} className="button-link">Back to Home</MuiLink>
      </Stack>
    );
}


export default TrainingVideoLibrary;