import React, { Component } from "react";
import { connect } from "react-redux";
import playstore from "../../../assets/icons/playstore.png";
import Rating from "@material-ui/lab/Rating";
import HomeBanner from "../../../assets/images/Journey.jpg";
import disaster from "../../../assets/images/disaster.jpg";
import waste from "../../../assets/images/waste.jpg";
import water from "../../../assets/images/water.jpg";
import health from "../../../assets/images/healthy.jpg";
import smartstreet from "../../../assets/images/smartstreet.jpg";
import housesafety from "../../../assets/images/housesafety.jpg";

import {
  CircularProgress,
  Grid,
  Typography,
  Box,
  Button,
  Link,
  Card,
  CardContent,
  Divider,
  Chip,
  Grow,
  ButtonBase,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  iframe: {
    height: "400px",
    width: "1000px",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      width: "auto",
    },
  },
  loader: {
    margin: "10%",
    width: "100px !important",
    height: "100px !important",
  },
  googleplay: {
    height: "20%",
    backgroundColor: "black",
    textAlign: "center",
    color: "white",
    padding: theme.spacing(2, 0),
    fontSize: "30px",
    fontWidth: "bold",
    lineHeight: "60px",
    [theme.breakpoints.down("md")]: {
      fontSize: "15px",
      lineHeight: "20px",
    },
  },
  chip: {
    margin: theme.spacing(0.5),
    background: `linear-gradient(to bottom right, #2196f3 0%, #ffffff 100%)`,
    width: "250px",
    fontWeight: "bold",
    border: "1px dotted black",
    [theme.breakpoints.down("md")]: {
      width: "100px",
    },
  },
  card: {
    maxWidth: "320px",
    height: "300px",
    marginLeft: "20px",
    marginBottom: "50px",
    display: "inline-block",
    lineHeight: "3",
    [theme.breakpoints.down("md")]: {
      marginLeft: "0px",
    },
  },
  video: {
    margin: theme.spacing(5, 0),
    backgroundImage: `linear-gradient(to right, #ccffff 0%, #ffffff 100%);`,
  },
  header: {
    lineHeight: "50px",
    fontWeight: "normal",
  },
  banner: {},
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px !important",
      width: "90% !important", // Overrides inline-style
      height: 200,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  refImage: {
    marginTop: "20px",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
  bannerButton: {
    textTransform: "none",
    width: 200,
    fontWeight: "bold",
    borderRadius: "20px",
    margin: "20px 0px",
  },
});

class Landing extends Component {
  render() {
    const images = [
      {
        url: health,
        title: "Healthy Environment",
        width: "30%",
      },
      {
        url: housesafety,
        title: "House Safety",
        width: "30%",
      },
      {
        url: smartstreet,
        title: "Smart Street Lighting",
        width: "30%",
      },
    ];
    const { classes } = this.props;
    let content = (
      <>
        <Grid container item xs={12} lg={12} style={{ paddingTop: "20px" }}>
          <Grow
            in={true}
            style={{ transformOrigin: "10 10 0" }}
            {...(true ? { timeout: 1000 } : {})}
          >
            <Grid container item xs={12} lg={12}>
              <Grid item xs={12} lg={6} className={classes.heading}>
                <Typography variant="h2" style={{ margin: "20px 0px" }}>
                  <b>Welcome to Smart Society</b>
                </Typography>
                <Typography variant="h6" className={classes.header}>
                  "An Automated Society with optimized solutions to bring the
                  safety and ease at just one click!" We believe in providing
                  the great services.our mission is to satisfy our customers
                  with the quality products, which will stand out to be the best
                  in the market!
                </Typography>
                <br />
                <Button
                  href="/login"
                  variant="contained"
                  color="primary"
                  className={classes.bannerButton}
                >
                  Get Started
                </Button>
              </Grid>
              <Grid item xs={12} lg={6}>
                <img src={HomeBanner} alt="home" className={classes.refImage} />
              </Grid>
            </Grid>
          </Grow>
          <Grid item xs={12} lg={12} className={classes.video}>
            <Typography variant="h4" className={classes.video}>
              <b>Have a look on our journey so far...!</b>
            </Typography>
            <iframe
              className={classes.iframe}
              src="https://www.youtube.com/embed/XFRKeFaI02s"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
            />
            <Divider className={classes.video} />
          </Grid>
          <Divider />
          {window.innerWidth > 1366 ? (
            <Grid container item xs={12} lg={12}>
              <Grow
                in={true}
                style={{ transformOrigin: "10 0 0" }}
                {...(true ? { timeout: 1000 } : {})}
              >
                <Grid item xs={12} lg={12}>
                  <Typography variant="h2" style={{ margin: "20px 0px" }}>
                    <b>Our Services</b>
                  </Typography>
                </Grid>
              </Grow>
              <Grid item xs={7} id="#fire">
                <img src={disaster} alt="test" height="280px" width="600px" />
              </Grid>
              <Grid item xs={5} style={{ margin: "30px 0px" }}>
                <Grid item xs={7}>
                  <Typography
                    variant="h5"
                    style={{ marginBottom: "20px", fontWeight: "bold" }}
                  >
                    Fire Outbreak
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    className={`MuiTypography-alignJustify`}
                  >
                    Many a times people can't act quickly at the time of
                    disasters because people don't have the necessary resources
                    or the appropriate information to tackle the problem. With
                    Smart Society we provide the best solutions with the
                    appropriate contacts who will help society residents while
                    such incidents occurs.
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                item
                lg={12}
                xs={12}
                style={{ margin: "20px, 0px" }}
              >
                <Grid item lg={2}></Grid>
                <Grid item xs={5} lg={3} id="#waste">
                  <Typography
                    variant="h6"
                    style={{
                      marginTop: "30px",
                      marginBottom: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Waste Management
                  </Typography>
                  <Typography
                    variant="body2"
                    className={`MuiTypography-alignJustify`}
                  >
                    Many a times people residing in the big societies cannot
                    manage the waste because of hectic life schedule, but with
                    smart society waste management, people get time to time
                    updates once the garbage tank gets full. the smart society
                    will send the notification and sms to the registered member
                    so that they can inform garbage collectors.
                  </Typography>
                </Grid>
                <Grid item xs={7} lg={7}>
                  <img src={waste} alt="test" height="280px" width="600px" />
                </Grid>
              </Grid>
              <Grid item xs={7}>
                <img src={water} alt="water" height="280px" width="600px" />
              </Grid>
              <Grid item xs={5} style={{ margin: "30px 0px" }}>
                <Grid item xs={7}>
                  <Typography
                    variant="h5"
                    id="#flood"
                    style={{ marginBottom: "20px", fontWeight: "bold" }}
                  >
                    Flood Outbreak
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    className={`MuiTypography-alignJustify`}
                  >
                    Many a times people can't act quickly at the time of
                    disasters because people don't have the necessary resources
                    or the appropriate information to tackle the problem. With
                    Smart Society we provide the best solutions with the
                    appropriate contacts who will help society residents while
                    such incidents occurs.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid container item xs={12} lg={12}>
              <Grid item xs={12} lg={12}>
                <Typography variant="h2" style={{ margin: "30px 0px" }}>
                  <b>Our Services</b>
                </Typography>
              </Grid>
              <Grid item xs={12} id="#fire">
                <Typography
                  variant="h6"
                  id="fire"
                  style={{ marginBottom: "20px", fontWeight: "bold" }}
                >
                  Fire Outbreak
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  Many a times people can't act quickly at the time of disasters
                  because people don't have the necessary resources or the
                  appropriate information to tackle the problem. With Smart
                  Society we provide the best solutions with the appropriate
                  contacts who will help society residents while such incidents
                  occurs.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <img src={disaster} alt="test" className={classes.refImage} />
              </Grid>
              <Grid item xs={12} id="#waste">
                <Typography
                  variant="h6"
                  style={{ marginBottom: "20px", fontWeight: "bold" }}
                >
                  Waste Management
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  Many a times people residing in the big societies cannot
                  manage the waste because of hectic life schedule, but with
                  smart society waste management, people get time to time
                  updates once the garbage tank gets full. the smart society
                  will send the notification and sms to the registered member so
                  that they can inform garbage collectors.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <img src={waste} alt="waste" className={classes.refImage} />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  id="#flood"
                  style={{ marginBottom: "20px", fontWeight: "bold" }}
                >
                  Flood Outbreak
                </Typography>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  className={`MuiTypography-alignJustify`}
                >
                  Many a times people can't act quickly at the time of disasters
                  because people don't have the necessary resources or the
                  appropriate information to tackle the problem. With Smart
                  Society we provide the best solutions with the appropriate
                  contacts who will help society residents while such incidents
                  occurs.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <img src={water} alt="water" className={classes.refImage} />
              </Grid>
            </Grid>
          )}
          <Grid container item xs={12} lg={12}>
            <Grid item xs={12} lg={12}>
              <Typography variant="h4" style={{ margin: "40px 0px" }}>
                <b>Some Other Services</b>
              </Typography>
            </Grid>

            <Grid item xs={12}>
              {images.map((image) => (
                <ButtonBase
                  focusRipple
                  key={image.title}
                  className={classes.image}
                  focusVisibleClassName={classes.focusVisible}
                  onClick={() => this.props.history.push("/services")}
                  style={{
                    width: 400,
                    marginTop: "20px",
                    marginBottom: "40px",
                    marginLeft: "20px",
                  }}
                >
                  <span
                    className={classes.imageSrc}
                    style={{
                      backgroundImage: `url(${image.url})`,
                    }}
                  />
                  <span className={classes.imageBackdrop} />
                  <span className={classes.imageButton}>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="inherit"
                      className={classes.imageTitle}
                    >
                      {image.title}
                      <span className={classes.imageMarked} />
                    </Typography>
                  </span>
                </ButtonBase>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12} lg={12} justify="center">
          <Grid>
            <Typography
              variant="h3"
              style={{ marginTop: "50px", marginBottom: "30px" }}
            >
              <b>What Our Customers Say?</b>
            </Typography>
            <Typography
              variant="h5"
              color="textPrimary"
              style={{ marginBottom: "50px" }}
            >
              “Feedback is the breakfast of champions.” - Ken Blanchard
            </Typography>
            <Card className={classes.card}>
              <Rating readOnly size="large" value={4} />
              <CardContent style={{ lineHeight: "3" }}>
                {
                  "I must say, I have used this product in our society for a month and I could literally see the changes and ease of management that comes with this system!"
                }
                <Divider />
                <Chip className={classes.chip} label="- The Heritage Apartments" />
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <Rating readOnly size="large" value={5} />
              <CardContent>
                {
                  "This product is very user friendly, we were able to manage the emergency situtions because of instant alerts and notification it provides, Very good product!"
                }
                <Divider />
                <Chip className={classes.chip} label="- Sky Park Society" />
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <Rating readOnly size="large" value={3} />
              <CardContent>
                {
                  "Your services are very nice, got an instant feedback and assistant for the problem I faced, quick services!  recommended to every society!"
                }
                <Divider />
                <Chip className={classes.chip} label="- Goodwill Society" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="center"
          className={classes.googleplay}
        >
          <Grid item xs={12}>
            Get Our Android Application Now!
          </Grid>
          <Grid item xs={12}>
            <Link href="https://play.google.com/store/apps/details?id=com.rbworks.iotproject">
              <Box justifyItems="center">
                <img src={playstore} alt="googleplay" width="150"></img>
              </Box>
            </Link>
          </Grid>
        </Grid>
      </>
    );

    if (this.props.loading) {
      content = (
        <h1>
          <CircularProgress className={classes.loader} />
        </h1>
      );
    }

    return content;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps)(
  withStyles(useStyles, { withTheme: true })(Landing)
);
