import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    paddingTop: theme.spacing(2),
    alignItems: "left",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  Accordion: {
    background: "#eeeeee",
  },
  details: {
    textAlign: "left",
  },
  link: {
    textAlign: "alignContent",
    color: "#2196f3",
    //fontWeight: "",
    textDecoration: "none",
    fontSize: "15px",
  },
}));

const FAQs = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Accordion className={classes.Accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            What is Smart Society?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography align="left">
            Smart Society is a team which provides an automated system along
            with IoT-Based Intelligent Modeling of Smart Society Environment.
            Please check our Home page for more infomation.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className={classes.Accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Where can I see my Society details?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography align="left">
            To check your scoiety details please check out the Dashboard.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className={classes.Accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Can I add more modules to my system?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography align="left">
            Yes, you can add more modules to your system. You need to upgrade to
            a package that has the modules you wish to have.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className={classes.Accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            How many types of packages are there?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography align="left">
            We offer 3 types of packages: Silver, Gold, Platinum.
            <br /> Check the subscription page for more details.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className={classes.Accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Can I give feedback?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography align="left">
            We would love to hear your thoughts or any changes for the
            betterment of our products. Yes, you can give feedback. Please go to
            the Feedback page.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className={classes.Accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            How can I register a complaint?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography align="left">
            We are sorry for the inconvenience caused. To register a complaint
            please visit our complaint page, then fill out the details.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className={classes.Accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Where can I check the details about my society and can I make
            changes?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography align="left">
            You can check the details of your society on Profile Page. You can
            edit the details like Name, Society Details, but you cannot change
            your Phone Number and Email Id.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default FAQs;
