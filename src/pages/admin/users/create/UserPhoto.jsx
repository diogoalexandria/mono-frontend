import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Webcam from 'react-webcam';

import { CircularProgress, createMuiTheme, Fade, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';

const theme = createMuiTheme()
const useStyles = makeStyles({
    title: {
        margin: theme.spacing(5)
    },
    button: {
        margin: theme.spacing(3),
        width: '4vh',
        height: '4vh',
        padding: 0
    },
    icon: {
        width: '4vh',
        height: '4vh'
    },
    webcam: {
        position: 'static',        
        height: '50vh',
        marginBottom: '2vh'
    }

})

export default function UserPhoto() {
  const classes = useStyles()
  const [loading, setLoading] = React.useState(false);

    const videoConstraints = {
        facingMode: 'user'
    }

  const webcamRef = React.useRef(null)
  
  const getBinary = (b64img) => {
    let binaryImg = atob(b64img.split(',')[1]);
    let length = binaryImg.length
    let ab = new ArrayBuffer(length);
    let ua = new Uint8Array(ab)
    for (let i = 0; i < length; i++) {
        ua[i] = binaryImg.charCodeAt(i);
    }
    return ab
}

const handleSubmit = async e => {
    setLoading(true);
    let imgSrc = webcamRef.current.getScreenshot()
    let img = getBinary(imgSrc)
    var params = {
        CollectionId: "lambda-talks",
        Image: {
            Bytes: img
        },
        MaxFaces: 1
    }
    
    setLoading(false);
}

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Registrar Foto
      </Typography>
      <Grid container
                direction="column"
                justify="center"
                alignItems="center"
            >

                <Grid item>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat='image/jpeg'
                        className={classes.webcam}
                        videoConstraints={videoConstraints}
                    />
                </Grid>
                <Grid item>
                    <IconButton onClick={handleSubmit} className={classes.button} disabled={loading}>
                        <PhotoCamera className={classes.icon} />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Fade
                        in={loading}
                        style={{
                            transitionDelay: loading ? '400ms' : '0ms',
                        }}
                        unmountOnExit
                    >
                        <CircularProgress />
                    </Fade>
                </Grid>
                <Grid item>
                    
                    {/* <Typography hidden={loading}>{message}</Typography> */}
                </Grid>
            </Grid>
    </React.Fragment>
  );
}