import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, logout, db } from "./firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import VideoContainer from "./VideoContainer";
import axios from "axios";
import { Container } from "@mui/system";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import TimerIcon from '@mui/icons-material/Timer';
import Countdown from "./Timer";
import styles from "../styles/VideoPageStyle";


function VideoPage() {
  /* Stylings */
  const classes = styles()
  /* Handle firebase auth states */
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  /* Handle Video feed */
  const [tag, setTag] = useState("")
  const [embedIdList, setEmbedIdList] = useState("")
  const [videoIndex, setVideoIndex] = useState(-1)
  /* Navigate hook */
  const navigate = useNavigate();
  /* Countdown */
  const [displayTimer, setDisplayTimer] = useState(false)
  /* Feed Length */
  const [displayFeed, setDisplayFeed] = useState("00:00:00")
  const handleTags = (event) => {
    setTag(event.target.value)
  }
  const submitTags = async(event) => {
    event.preventDefault()
    /* Delete video history if current date is greater than date in cloud */
    deleteVideoIdHistory()
    /*Get video history */
    const videoIdHistory = await getVideoIdHistory()
    console.log(videoIdHistory)
    /* POST request with tags, videoIdHistory */
    const url = 'http://127.0.0.1:5000'
    const data = await axios.post(url, { tags : tag, videoIdHistory : videoIdHistory })
    setEmbedIdList(data.data["video_ids_res"])
    setDisplayFeed(data.data["time"])
    setVideoIndex(0)
    setDisplayTimer(true)
  }
  const getVideoIdHistory = async() => {
    const firebaseDoc = await getDoc(doc(db, "users", user.uid))
    const idHistory = firebaseDoc.data()["videoIdData"]
    console.log(idHistory)
    return idHistory
  }
  
  const deleteVideoIdHistory =  async() => {
    const firebaseDoc = await getDoc(doc(db, "users", user.uid))
    const historyDate = firebaseDoc.data()["hist"]
    if (new Date() > historyDate.toDate()) {
      const userDoc = doc(db, "users", user.uid)
      await updateDoc(userDoc, { videoIdData : [] })
      await updateDoc(userDoc, { hist : new Date(new Date().setDate(new Date().getDate() + 1))})
    }
   
  }

  const countdownEnded = () => {
    setDisplayTimer(false)
  }
  const handleVideoIndex = () => {
    setVideoIndex(videoIndex + 1)
  }
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    setName(user.displayName)
  }, [user, loading, navigate]);

  return (
    <div style={classes.page}>
      <AppBar position="static" sx={{bgcolor: "red"}} className={classes.myToolBar}>
          <Toolbar sx={classes.myToolBar}>
            <Button variant="text" size="medium" sx={classes.helpButton}>Help</Button>
            <Typography variant="h2" sx={classes.title}>Procrastin8</Typography>
            <Button variant="contained" onClick={logout} sx={classes.signOutButton}>Sign Out</Button>
          </Toolbar>
      </AppBar>
      <main style={classes.mainPage}>
        <Container sx={classes.descriptionTimerContainer}>
          <Box sx={classes.boxDescription}>
            <Typography sx={classes.description} paragraph> 
            Enter some tags that you think are interesting, and an under 8 minute feed composed of Youtube Shorts will be generated!
            If you're not sure what to watch, submit an empty field for the most popular shorts. You can also submit multiple tags
            for a feed that will contain shorts about different topics. Once the feed is over, get back to work!
            </Typography>
          </Box>
          <Box sx={classes.boxTimer}>
            <TimerIcon sx={classes.timer}></TimerIcon>
            {displayTimer ? <Countdown sx={classes.countdown} countdownEnded={countdownEnded}/> : <h1> Free to procrastin8!</h1>}
          </Box>
        </Container>
        <Box sx={classes.feedContainer}>
          <Typography sx={classes.feedLength}>Feed length : {displayFeed}</Typography>
        </Box>
        
        <Container sx={classes.formAndVideo}>
          <form onSubmit={submitTags} style={classes.tagForm}>
            <TextField variant="filled" sx={classes.tagForm.tags} label="Search for some tags!" type="search" onChange={ handleTags } InputLabelProps={{ style : { color : "white" }}}/>
            <Button sx={classes.tagForm.procrastin8btn} type="submit" variant="contained" color="error">PROCRASTIN8</Button>
          </form>
          <VideoContainer sx={classes.videoContainer} embedIdList={embedIdList} index={videoIndex}></VideoContainer>
          <Button sx={classes.nextButton} onClick={handleVideoIndex} variant="contained" color="success">NEXT</Button>
        </Container>
      </main>

    </div>
  );
}
export default VideoPage;