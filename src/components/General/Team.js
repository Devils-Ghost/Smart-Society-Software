import React, { Component } from "react";
import Teamwork from "../../assets/images/Teamwork.jpg";
import Rohit from "../../assets/images/Rohit.jpg";
import Aboli from "../../assets/images/Aboli.png";
import Aachal from "../../assets/images/Aachal.jpg";
import Dhaval from "../../assets/images/Dhaval.jpg";
import linkedin from "../../assets/logos/Linkedin.png";
import {
  Button,
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Typography,
  Link,
  Grow,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link as PageLink } from "react-router-dom";
const useStyles = (theme) => ({
  Quote: {
    marginTop: "10%",
    marginBottom: theme.spacing(2),
  },
  Button: {
    width: "40%",
    textDecoration: "none",
    fontFamily: "roboto",
    textTransform: "none",
    fontWeight: "bold",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  Link: {
    textDecoration: "none",
  },
  media: {
    height: 200,
  },
  root: {
    maxWidth: 290,
    display: "inline-block",
    marginRight: theme.spacing(2),
  },
  Team: {
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
  },
  teamImage: {
    backgroundSize: "contain",
    [theme.breakpoints.down("xs")]: {
      width: 450,
    },
  },
});
class Team extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Container>
        <Grid container spacing={2} item xs={12} lg={12} md={12}>
          <Grid item xs={12} lg={6} md={6}>
            <Typography variant="h6" className={classes.Quote}>
              "Talent wins games, but teamwork and intelligence win
              championships".
            </Typography>
            <Typography
              variant="subtitle1"
              className={`MuiTypography-alignJustify`}
            >
              Well, not the championship but we won a IoT challenge at College
              level and further got shortlisted for the IoT Challenge 2020.
              Although, we could not attend the event due to uncertain COVID-19
              lockdown scenario, but we decided to expand this project by adding
              few more modules as our "Final Year Project!"
            </Typography>
            <PageLink to="/about_us" className={classes.Link}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.Button}
                style={{
                  textTransform: "none",
                }}
              >
                Know More About Us!
              </Button>
            </PageLink>
          </Grid>
          <Grid item xs={12} lg={6} md={6} className={classes.teamImage}>
            {/* <GridListTile> */}
            <img
              src={Teamwork}
              alt="Teamwork"
              className={classes.teamImage}
            ></img>
            {/* </GridListTile> */}
          </Grid>
        </Grid>
        <Divider />
        <Grid>
          <Typography variant="h4" className={classes.Team}>
            Meet Our Team!
          </Typography>
          <Typography variant="subtitle1" className={classes.Team}>
            "We may be strong as individuals but together we are invincible."
          </Typography>
          <Grow
            in={true}
            style={{ transformOrigin: "0 0 0" }}
            {...(true ? { timeout: 1000 } : {})}
          >
            <Card elevation={4} className={classes.root}>
              <CardMedia
                className={classes.media}
                image={Rohit}
                title="Rohit Bhokarikar"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Rohit Bhokarikar
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Rohit is quite as a person, but he talks a lot with his
                  creativity and development. He is an extremely talented
                  person, who strives to give the best solutions!
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Container justifyContent="center">
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Link href="https://www.linkedin.com/in/rohit-bhokarikar/">
                        <img
                          src={linkedin}
                          alt="LinkedIn"
                          width="25"
                          height="25"
                        ></img>
                      </Link>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        component="p"
                      >
                        Connect to Rohit!
                      </Typography>
                    </Grid>
                  </Grid>
                </Container>
              </CardActions>
            </Card>
          </Grow>
          <Grow
            in={true}
            style={{ transformOrigin: "0 0 0" }}
            {...(true ? { timeout: 2000 } : {})}
          >
            <Card elevation={4} className={classes.root}>
              <CardMedia
                className={classes.media}
                image={Dhaval}
                title="Dhaval Tanna"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Dhaval Tanna
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Dhaval is humorous as a person, who brings all the good jokes
                  in the team, but that's not all he is a tech enthusiast who
                  brings optimized solutions!
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Container justifyContent="center">
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Link href="https://www.linkedin.com/in/dhaval-tanna-604762159/">
                        <img
                          src={linkedin}
                          alt="LinkedIn"
                          width="25"
                          height="25"
                        ></img>
                      </Link>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        component="p"
                      >
                        Connect to Dhaval!
                      </Typography>
                    </Grid>
                  </Grid>
                </Container>
              </CardActions>
            </Card>
          </Grow>
          <Grow
            in={true}
            style={{ transformOrigin: "0 0 0" }}
            {...(true ? { timeout: 3000 } : {})}
          >
            <Card elevation={4} className={classes.root}>
              <CardMedia
                className={classes.media}
                image={Aboli}
                title="Aboli Rode"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Aboli Rode
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Aboli is innovative as a person, she strives to bring best
                  from her work. being a techno savvy, she execute things in a
                  unique yet appropriate way!
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Container justifyContent="center">
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Link
                        href="https://www.linkedin.com/in/aboli-rode-195000133/"
                        target="_blank"
                      >
                        <img
                          src={linkedin}
                          alt="LinkedIn"
                          width="25"
                          height="25"
                        ></img>
                      </Link>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        component="p"
                      >
                        Connect to Aboli!
                      </Typography>
                    </Grid>
                  </Grid>
                </Container>
              </CardActions>
            </Card>
          </Grow>
          <Grow
            in={true}
            style={{ transformOrigin: "0 0 0" }}
            {...(true ? { timeout: 4000 } : {})}
          >
            <Card elevation={4} className={classes.root}>
              <CardMedia
                className={classes.media}
                image={Aachal}
                title="Aachal Rathod"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Aachal Rathod
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Aachal is artistic as a person, she always know what looks the
                  best! she brings the amazing ideas with the meaningful
                  designs!
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Container justifyContent="center">
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Link href="https://www.linkedin.com/in/aachal-rathod-1002991a1/">
                        <img
                          src={linkedin}
                          alt="LinkedIn"
                          width="25"
                          height="25"
                        ></img>
                      </Link>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        component="p"
                      >
                        Connect to Aachal!
                      </Typography>
                    </Grid>
                  </Grid>
                </Container>
              </CardActions>
            </Card>
          </Grow>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Team);
