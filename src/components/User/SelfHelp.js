import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

const FAQs = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography color="textPrimary" variant="h6" align="left">
        Dashboard:
        <Typography color="textPrimary" variant="body1" align="left">
          After you have logged into your account you will land on the
          Dashbaord. Here you can check your society details. You can also add
          new members and check the exsisting member lsit. These are the people
          who will recieve a text message when any alert is triggered. You can
          also remove the members as an when required.
        </Typography>
      </Typography>
      <br />
      <Typography color="textPrimary" variant="h6" align="left">
        My Subscription Page:
        <Typography color="textPrimary" variant="body1" align="left">
          Here you can find the Receipt of you current Subscription. You can
          update your Subscription package as well. For more details ont he
          different packages we provide please check the Subscription page.
        </Typography>
      </Typography>
      <br />
      <Typography color="textPrimary" variant="h6" align="left">
        Feedback Page:
        <Typography color="textPrimary" variant="body1" align="left">
          We really appreciate your feedback. This would help us make our
          product better and promote user satisfaction. To provide your valuable
          feedback, please visit the Feedback page.
        </Typography>
      </Typography>
      <br />
      <Typography color="textPrimary" variant="h6" align="left">
        Complaint:
        <Typography color="textPrimary" variant="body1" align="left">
          If you have any complaints regarding the system or any other issue
          then you can register your complaint by filling the form on the
          Complaints page. We will get in touch with you at our earliest.
        </Typography>
      </Typography>
      <br />
      <Typography color="textPrimary" variant="h6" align="left">
        Profile:
        <Typography color="textPrimary" variant="body1" align="left">
          You can view the details from the Profile page. You also have an
          option to edit some of these details. You can also upgrade yourself to
          the Admin. However, for this you should have the access codes. Note:
          Failed attempts trying to upgrade to admin may lead to deactivation of
          your account.
        </Typography>
        <br />
      </Typography>
      <Typography color="textPrimary" variant="h6" align="left">
        My system has stopped working, what should I do?
        <br />
        <Typography color="textPrimary" variant="body1" align="left">
          If your system stopped working, try to reboot the whole system and
          check again if your problem continues, write us at
          teamradaiot@gmail.com
        </Typography>
      </Typography>
      <br />
      <Typography color="textPrimary" variant="h6" align="left">
        I am not able to register my society details.
        <br />
        <Typography color="textPrimary" variant="body1" align="left">
          If you are not able to register your society details, please check
          whether you have an active Internet connection. If the Internet is
          working fine try to re-login into your account and check again if your
          problem continues, write us at teamradaiot@gmail.com
        </Typography>
      </Typography>
      <br />
      <Typography color="textPrimary" variant="h6" align="left">
        I am not getting notification alert on my phone, what should I do?
        <br />
        <Typography color="textPrimary" variant="body1" align="left">
          If you are unable to get a notification alert, please verify that you
          have entered appropriate details for your society e.g., Society Name.
          If the problem continues, write us at teamradaiot@gmail.com
        </Typography>
      </Typography>

      <br />
      <Typography color="textPrimary" variant="h6" align="left">
        I am not able to check my society reports.
        <br />
        <Typography color="textPrimary" variant="body1" align="left">
          If you are not able to check the society reports please re-login into
          your account and check again. If the problem continues, write us at
          teamradaiot@gmail.com
        </Typography>
      </Typography>

      <br />
    </Container>
  );
};

export default FAQs;
