import {
  Container,
  Divider,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";
import Link from "@material-ui/core/Link";
import Image1 from "../../assets/images/Image1.jfif";
import Image3 from "../../assets/images/Image3.jpg";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";

const useStyles = (theme) => ({
  root: {},
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  Link: {
    display: "inline-block",
  },

  Image1: {
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.between(350, 400)]: {
      height: "250px",
    },
    [theme.breakpoints.between(0, 350)]: {
      height: "200px",
    },
    height: "330px",
    width: "500px",
    marginTop: "40px",
    display: "inline-block",
  },

  Image2: {
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.between(650, 1000)]: {
      width: "90%",
    },
    [theme.breakpoints.between(350, 400)]: {
      height: "250px",
    },
    [theme.breakpoints.between(0, 350)]: {
      height: "200px",
    },
    height: "330px",
    width: "500px",
    marginTop: "40px",
    display: "inline-block",
  },

  h2: {
    marginTop: theme.spacing(6),
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(1),
    },
  },
  h1: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  h3: {
    [theme.breakpoints.only("xs")]: {
      marginLeft: theme.spacing(0),
      marginTop: theme.spacing(6),
    },
    [theme.breakpoints.between(650, 1025)]: {
      marginLeft: theme.spacing(0),
      marginTop: theme.spacing(6),
    },
    marginTop: theme.spacing(12),
    marginLeft: theme.spacing(5),
  },
  h4: {
    marginLeft: theme.spacing(5),
    [theme.breakpoints.only("xs")]: {
      marginLeft: theme.spacing(0),
    },
    [theme.breakpoints.between(650, 1400)]: {
      marginLeft: theme.spacing(0),
    },
  },
  Button: {
    marginTop: theme.spacing(4),
    textTransform: "none",
  },
});

class AboutUs extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.root}>
        <Typography
          color="textPrimary"
          variant="h3"
          align="center"
          className={classes.h1}
        >
          About Us
        </Typography>
        <Divider />
        {/* <----------------------------------------------------------------------------------------------------> */}
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <img src={Image1} alt="Image1" className={classes.Image1}></img>
          </Grid>
          <Grid item lg={"auto"} />
          <Grid item xs={12} lg={5}>
            <Typography
              color="textPrimary"
              variant="h4"
              align="left"
              className={classes.h2}
            >
              Who are we?
            </Typography>
            <br />
            <Typography color="textPrimary" variant="subtitle1" align="justify">
              "Coming together is a beginning, staying together is progress, and
              working together is success."
            </Typography>
            <br />
            <Typography color="textPrimary" variant="subtitle2" align="justify">
              Our team started in 2020. We got the idea for Smart Society when
              heavy rains hit Pune in Septemeber, 2019 and destroyed many lives
              and societies, hence we devolped a system for the safety of
              peoples lives and societies as well. We have implemented 6 unique
              modules which are Disaster management, House Safety, Smart Street
              Lighting, Waste Management and Smart Gardening.
              <br />
              <Link href="/team" className={classes.Link}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.Button}
                >
                  Learn more
                </Button>
              </Link>
            </Typography>
          </Grid>
        </Grid>
        {/* <----------------------------------------------------------------------------------------------------------> */}
        <Grid container spacing={2}>
          <Grid item lg={"auto"} />
          <Grid item xs={12} lg={6}>
            <Typography
              color="textPrimary"
              variant="h4"
              align="left"
              className={classes.h3}
            >
              Join Us
            </Typography>
            <br />
            <Typography
              className={classes.h4}
              color="textPrimary"
              variant="subtitle1"
              align="justify"
            >
              "Now its time to walk hand in hand with the progressing world."
            </Typography>
            <br />
            <Typography
              className={classes.h4}
              color="textPrimary"
              variant="subtitle2"
              align="justify"
            >
              Sign Up to know more about our system.
              <br />
              <Link href="/signup" className={classes.Link}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.Button}
                >
                  Join Us
                </Button>
              </Link>
            </Typography>
          </Grid>

          <Grid item xs={12} lg={5}>
            <img src={Image3} alt="Image3" className={classes.Image2}></img>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(
  withStyles(useStyles, { withTheme: true })(AboutUs)
);
