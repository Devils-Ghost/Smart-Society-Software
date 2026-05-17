import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '7px 10px',
    
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function CustomizedTimeline() {
  const classes = useStyles();

  return (
      <>
      <h1 className="pageheading">Services</h1>
        <br></br>
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary">
           </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
            House Safety
            </Typography>
            <Typography>Because You deserve to be safe</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
     
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary">
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
            Smart Street Lighting
            </Typography>
            <Typography>Because Smart people don’t waste electricity</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary" >
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
            Waste Management
            </Typography>
            <Typography>Because It's Better to keep yourself clean and bright</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
       
        <TimelineSeparator>
          <TimelineDot color="secondary">
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
            Smart Gardening
            </Typography>
            <Typography>Because Flowers are restful to look at</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary">
           </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
            Disaster Management
            </Typography>
            <Typography>Because Safety is not optional</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      </Timeline>
     
    </>
  );
}