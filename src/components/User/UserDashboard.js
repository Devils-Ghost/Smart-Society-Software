import MuiAlert from "@material-ui/lab/Alert";
import { Component, forwardRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { auth, dbref } from "../../shared/fire";
import * as actions from "../../store/actions";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import InputMask from "react-input-mask";
import {
  Card,
  CardHeader,
  Grid,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  DialogTitle,
  Snackbar,
  Box,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  ListSubheader,
  CircularProgress,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import summaryImage from "../../assets/images/summary.png";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: 450,
  },
  Button1: {
    textDecoration: "none",
    textTransform: "none",
    paddingRight: theme.spacing(2),
    paddingLeftt: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.only("sm")]: {
      width: "30%",
    },
  },
  Button: {
    textDecoration: "none",
    textTransform: "none",
    width: "45%",
    paddingRight: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  addCard: {
    boxShadow: "none",
  },
  img: {
    width: "80%",
    height: "70%",
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  gridTileBar: {
    background: "#ffffff",
    borderBottom: "1px solid #ccc",
  },
  titlewrap: {
    color: "black",
  },
  card1: {
    fontWeight: "bold",
    color: "black",
    paddingTop: theme.spacing(2),
  },
  form: {
    margin: theme.spacing(1, 0),
  },
  loader: {
    margin: "10%",
    width: "100px !important",
    height: "100px !important",
  },
  snackbar: {
    top: "100px",
  },
  noMem: {
    background: "#2196f3",
    borderRadius: "10px",
  },
});

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      addMember: "",
      societyDetailsDialogOpen: false,
      emailDialogOpen: false,
      snackOpen: false,
      snackMessage: "",
      snackSeverity: "success",
      statusDialogOpen: false,
    };
  }

  componentDidMount() {
    if (
      this.props.user["accountStatus"] === "DEACTIVE" ||
      this.props.user["mfaStatus"] === "DEACTIVE"
    ) {
      if (this.props.user["mfaStatus"] === "DEACTIVE") {
        dbref
          .child("smartSociety")
          .child("users")
          .child(auth.currentUser.uid)
          .child("mfaStatus")
          .on("value", (status) => {
            if (status.val() !== "DEACTIVE") {
              window.location.reload();
            }
          });
      }
      if (this.props.user["accountStatus"] === "DEACTIVE") {
        dbref
          .child("smartSociety")
          .child("users")
          .child(auth.currentUser.uid)
          .child("accountStatus")
          .on("value", (status) => {
            if (status.val() !== "DEACTIVE") {
              window.location.reload();
            }
          });
      }
      this.setState({
        statusDialogOpen: true,
      });
    } else if (!auth.currentUser.emailVerified) {
      this.setState({ emailDialogOpen: true });
    } else if (
      this.props.user["societyAddress"] === "" ||
      this.props.user["societyName"] === "" ||
      this.props.user["societyCity"] === ""
    ) {
      this.setState({ societyDetailsDialogOpen: true });
    } else {
      const uid = this.props.user["uid"];
      this.setState({
        loading: true,
      });
      this.props.footerLoading(true);
      dbref
        .child("smartSociety")
        .child("users")
        .child(uid)
        .child("member")
        .on(
          "value",
          (snapshot) => {
            const list = snapshot.val();
            this.setState({
              members: list,
              loading: false,
            });
            this.props.footerLoading(false);
          },
          (error) => {
            const errorObj = error;
            this.setState({
              error: errorObj,
              loading: false,
            });
            this.props.footerLoading(false);
          }
        );
    }
  }

  closeSocietyDetailsDialog = (consent) => {
    if (consent) {
      const uid = this.props.user["uid"];
      const user = {
        ...this.props.user,
        societyAddress: this.state.societyAddress,
        societyCity: this.state.societyCity,
        societyName: this.state.societyName,
      };
      dbref
        .child("smartSociety")
        .child("users")
        .child(uid)
        .update(user)
        .then(() => {
          this.setState({
            snackOpen: true,
            societyDetailsDialogOpen: false,
            snackSeverity: "success",
            snackMessage: "Your details have been stored successfully!",
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            snackOpen: true,
            snackSeverity: "error",
            snackMessage: "Something went wrong, check console",
          });
        });
    } else {
      this.setState({
        societyDetailsDialogOpen: false,
        emailDialogOpen: false,
      });
      this.props.logout();
    }
  };

  closeStatusDialog = () => {
    this.setState({
      statusDialogOpen: false,
      emailDialogOpen: false,
    });
    this.props.logout();
  };

  handleSnackClose = () => {
    this.setState({ snackOpen: false });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  closeEmailDialog = () => {
    window.location.reload();
  };

  resendEmail = (event) => {
    auth.currentUser
      .sendEmailVerification()
      .then((repsonse) => {
        this.setState({
          snackOpen: true,
          snackSeverity: "success",
          snackMessage: "Email sent! Reloading in 6 seconds",
        });
        setTimeout(() => this.closeEmailDialog(), 6000);
      })
      .catch((error) => {
        this.setState({
          snackOpen: true,
          snackSeverity: "error",
          snackMessage: error.message,
        });
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  updateMemberDb = () => {
    const uid = this.props.user["uid"];
    dbref
      .child("smartSociety")
      .child("users")
      .child(uid)
      .child("member")
      .set(this.state.members);
  };

  addMember = (event) => {
    event.preventDefault();
    if (this.state.addMember.length === 10) {
      this.setState((prevState) => {
        if (prevState.members) {
          if (prevState.members.indexOf(prevState.addMember) === -1) {
            prevState.members.push(prevState.addMember);
            return {
              members: prevState.members,
              addMember: "",
              snackOpen: true,
              snackSeverity: "success",
              snackMessage: "Member added successfully!",
            };
          } else {
            return {
              snackOpen: true,
              snackSeverity: "error",
              snackMessage: "Member already exists!",
            };
          }
        } else {
          const members = [prevState.addMember];
          return {
            members: members,
            addMember: "",
            snackOpen: true,
            snackSeverity: "success",
            snackMessage: "Member added successfully!",
          };
        }
      }, this.updateMemberDb);
    }
  };

  deleteMember = (number) => {
    this.setState((prevState) => {
      return {
        members: prevState.members.filter((element) => element !== number),
        snackOpen: true,
        snackSeverity: "success",
        snackMessage: "Member deleted successfully!",
      };
    }, this.updateMemberDb);
  };

  render() {
    const { classes } = this.props;

    let content;

    const url = localStorage.getItem("url");
    if (
      this.props.user["accountStatus"] === "DEACTIVE" ||
      this.props.user["mfaStatus"] === "DEACTIVE"
    ) {
      content = (
        <Dialog
          // onClose={this.closeEmailDialog}
          aria-labelledby="customized-dialog-title"
          open={this.state.statusDialogOpen}
          onClose={this.closeStatusDialog}
        >
          <DialogTitle
            id="customized-dialog-title"
            style={{
              background: "#2196f3",
              color: "white",
              textAlign: "center",
            }}
          >
            Account Deactivate!
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Oops! Seems like your account is not active.&#128542;
            </Typography>
            <Typography gutterBottom>
              Please contact the administrator for further assistance
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.closeStatusDialog}
              color="secondary"
              variant="contained"
            >
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      );
    } else if (this.props.isAuthenticated && url !== "/" && url) {
      localStorage.removeItem("url");
      content = <Redirect to={url} />;
    } else if (!auth.currentUser.emailVerified) {
      content = (
        <>
          <Dialog
            // onClose={this.closeEmailDialog}
            aria-labelledby="customized-dialog-title"
            open={this.state.emailDialogOpen}
          >
            <DialogTitle
              id="customized-dialog-title"
              style={{
                background: "#2196f3",
                color: "white",
                textAlign: "center",
              }}
            >
              Email Verification!
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                A verification email has been sent to your email id.
              </Typography>
              <Typography gutterBottom>
                Please verify your email and hit refresh.
              </Typography>
              <Button
                onClick={this.resendEmail}
                style={{ background: "#aacbe6" }}
                variant="contained"
              >
                Resend Email
              </Button>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.closeSocietyDetailsDialog(false)}
                color="secondary"
                variant="contained"
                className={classes.Button}
              >
                Logout
              </Button>
              <Button
                onClick={this.closeEmailDialog}
                color="primary"
                variant="contained"
                className={classes.Button}
              >
                Refresh
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            classes={{ anchorOriginTopRight: classes.snackbar }}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={this.state.snackOpen}
            autoHideDuration={6000}
            onClose={this.handleSnackClose}
          >
            <Alert
              onClose={this.handleSnackClose}
              severity={this.state.snackSeverity}
            >
              {this.state.snackMessage}
            </Alert>
          </Snackbar>
        </>
      );
    } else if (
      auth.currentUser.emailVerified &&
      (this.props.user["societyAddress"] === "" ||
        this.props.user["societyName"] === "" ||
        this.props.user["societyCity"] === "")
    ) {
      content = (
        <>
          <Dialog
            open={this.state.societyDetailsDialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => this.closeSocietyDetailsDialog(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle
              id="alert-dialog-slide-title"
              style={{
                background: "#2196f3",
                color: "white",
              }}
            >
              You have to fill your society details first.
            </DialogTitle>
            <DialogContent>
              <Box component="span" m={5}>
                <form autoComplete="on">
                  <TextField
                    className="textbox"
                    id="outlined-basic"
                    label="Society Name"
                    variant="outlined"
                    name="societyName"
                    value={this.state.description}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <br />
                  <br />
                  <TextField
                    className="textbox"
                    id="outlined-basic"
                    label="Society Address"
                    variant="outlined"
                    name="societyAddress"
                    value={this.state.description}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <br />
                  <br />
                  <TextField
                    className="textbox"
                    id="outlined-basic"
                    label="Society City"
                    variant="outlined"
                    name="societyCity"
                    value={this.state.description}
                    onChange={this.handleChange}
                    fullWidth
                  />
                </form>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.closeSocietyDetailsDialog(false)}
                color="secondary"
                variant="contained"
                className={classes.Button}
              >
                Cancel
              </Button>
              <Button
                onClick={() => this.closeSocietyDetailsDialog(true)}
                color="primary"
                variant="contained"
                className={classes.Button}
                disabled={
                  !(
                    this.state.societyName &&
                    this.state.societyCity &&
                    this.state.societyAddress
                  )
                }
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            classes={{ anchorOriginTopRight: classes.snackbar }}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={this.state.snackOpen}
            autoHideDuration={6000}
            onClose={this.handleSnackClose}
          >
            <Alert
              onClose={this.handleSnackClose}
              severity={this.state.snackSeverity}
            >
              {this.state.snackMessage}
            </Alert>
          </Snackbar>
        </>
      );
    } else if (this.state.loading) {
      content = (
        <h1>
          <CircularProgress className={classes.loader} />
        </h1>
      );
    } else {
      let subhead = (
        <div>
          <Typography color="textSecondary" variant="h6" component="h3">
            {this.props.user.societyAddress}, {this.props.user.societyCity}
          </Typography>
        </div>
      );

      let head = (
        <div>
          <Typography color="textPrimary" variant="h2" component="h1">
            {this.props.user.societyName}
          </Typography>
        </div>
      );

      content = (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  className={classes.card1}
                  subheader={subhead}
                  title={head}
                />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.root}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Card className={classes.addCard}>
                      <h2>Add Member</h2>
                      <p>Please add new society member!</p>
                      <br />
                      <form onSubmit={this.addMember}>
                        <Grid container spacing={0} className={classes.form}>
                          <Grid item xs={12} sm={8}>
                            <InputMask
                              //mask="(999)999-9999"
                              mask="9999999999"
                              value={this.state.addMember}
                              disabled={false}
                              maskChar=""
                              onChange={this.handleChange}
                            >
                              {() => (
                                <TextField
                                  variant="outlined"
                                  label="Phone Number"
                                  placeholder="Add Member's Phone Number"
                                  name="addMember"
                                  type="text"
                                  className={classes.input}
                                  value={this.state.addMember}
                                  error={
                                    this.state.addMember.length !== 10 &&
                                    this.state.addMember.length > 0
                                  }
                                  helperText={
                                    this.state.addMember.length !== 10 &&
                                    this.state.addMember.length > 0
                                      ? "Must be a Valid Number"
                                      : ""
                                  }
                                />
                              )}
                            </InputMask>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.Button1}
                              startIcon={<AddIcon />}
                              onClick={this.addMember}
                              disabled={this.state.addMember.length !== 10}
                            >
                              Add
                            </Button>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <div>
                            <img
                              src={summaryImage}
                              alt="Smart Society"
                              className={classes.img}
                            />
                          </div>
                        </Grid>
                      </form>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <GridList
                      cellHeight={50}
                      className={classes.gridList}
                      style={
                        (this.state.members &&
                          this.state.members.length <= 7) ||
                        !this.state.members
                          ? { height: "auto" }
                          : {}
                      }
                    >
                      <GridListTile
                        key="Subheader"
                        cols={2}
                        style={{ height: "auto" }}
                      >
                        <ListSubheader component="div">
                          Member List
                        </ListSubheader>
                      </GridListTile>
                      {this.state.members && this.state.members.length !== 0 ? (
                        this.state.members.map((number, index) => (
                          <GridListTile key={index} cols={2}>
                            <GridListTileBar
                              classes={{
                                titleWrap: classes.titlewrap,
                              }}
                              className={classes.gridTileBar}
                              title={number}
                              actionIcon={
                                <IconButton
                                  className={classes.icon}
                                  onClick={() => this.deleteMember(number)}
                                >
                                  <ClearIcon color="secondary" />
                                </IconButton>
                              }
                            />
                          </GridListTile>
                        ))
                      ) : (
                        <GridListTile cols={2}>
                          <GridListTileBar
                            title="You have no members added"
                            classes={{
                              titleWrap: classes.titlewrap,
                            }}
                            className={classes.noMem}
                          />
                        </GridListTile>
                      )}
                    </GridList>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
          <Snackbar
            classes={{ anchorOriginTopRight: classes.snackbar }}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={this.state.snackOpen}
            autoHideDuration={6000}
            onClose={this.handleSnackClose}
          >
            <Alert
              onClose={this.handleSnackClose}
              severity={this.state.snackSeverity}
            >
              {this.state.snackMessage}
            </Alert>
          </Snackbar>
        </>
      );
    }

    return content;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.authLogout()),
    footerLoading: (loading) => dispatch(actions.setFooterLoading(loading)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(UserDashboard));
