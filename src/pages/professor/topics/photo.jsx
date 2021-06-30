import Grid from '@material-ui/core/Grid';
import React, { useContext } from 'react';
import Webcam from 'react-webcam';
import Typography from '@material-ui/core/Typography';
import { CircularProgress, createMuiTheme, Fade, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import axios from 'axios';
import api from '../../../utils/api';
import AuthContext from '../../../components/store/auth/context';
import { useHistory } from 'react-router-dom';
import { useAppContext } from '../../../components/store/app/context';

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

export default function ProfessorTopicsDetailsPhoto({ setCheckout }) {
    const classes = useStyles()
    const [loading, setLoading] = React.useState(false);
    const history = useHistory();
    const { id } = useAppContext();
    const { token } = useContext(AuthContext);
    

    const videoConstraints = {
        facingMode: 'user'
    }

    const webcamRef = React.useRef(null)

    // const getBinary = (b64img) => {
    //     let binaryImg = atob(b64img.split(',')[1]);
    //     let length = binaryImg.length
    //     let ab = new ArrayBuffer(length);
    //     let ua = new Uint8Array(ab)
    //     for (let i = 0; i < length; i++) {
    //         ua[i] = binaryImg.charCodeAt(i);
    //     }
    //     return ab
    // }

    const handleNavigate = (path) => {
        history.push(path)
    }

    const handleSubmit = async e => {
        setLoading(true);
        // setCheckout(false)
        let imgSrc = webcamRef.current.getScreenshot()
        // let img = getBinary(imgSrc)
        const rekognition_response = await axios.post(
            "https://i2grjcygzc.execute-api.us-east-1.amazonaws.com/mono/recognize",
            {
                "b64img": imgSrc
            }
        )

        console.log('Rekognition Response:')
        console.log(rekognition_response)

        const ids = rekognition_response.data.faces.map((item) => {
            return {"topic_id":id, "student_id": item.Face.ExternalImageId}
            
        })

        console.log(`Ids: ${ids}`)

        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }

        const payload = { "attendances": ids }
       

        await api.post(`/api/v1/attendances`, payload, config)
        

        handleNavigate("/professor/topics/details/attendances")

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