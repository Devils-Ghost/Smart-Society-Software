import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import { Formik } from "formik";
import { dbref } from "../../shared/fire";
import InputMask from "react-input-mask";

import {
  Container,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  Slide,
  DialogTitle,
  DialogContent,
  InputLabel,
  Divider,
  DialogActions,
  Dialog,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = (theme) => ({
  root: {
    paddingTop: theme.spacing(5),
    backgroundColor: "#ffffff",
    minHeight: "100%",
    width: "100%",
  },
  submit: {
    width: "17%",
    textDecoration: "none",
    textTransform: "none",
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "50%",
      marginTop: theme.spacing(2),
    },
  },
  card: {
    paddingTop: theme.spacing(2),
  },
  textfield: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: theme.spacing(2),
    },
  },
  loader: {
    margin: "10%",
    width: "100px !important",
    height: "100px !important",
  },
  activeUser: {
    color: "green",
  },
  inactiveUser: {
    color: "red",
  },
  snackbar: {
    top: "100px",
  },
  dialogLabel: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    color: "black",
    fontSize: "18px",
  },
  Button: {
    textDecoration: "none",
    textTransform: "none",
    width: "45%",
    paddingRight: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
});
class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      activeSubscription: {},
      values: {},
      loading: false,
      diaogLoading: false,
      dialogOpen: false,
      statusDialogOpen: false,
      switching: "",
      openSnack: false,
      snackSeverity: "success",
      snackMsg: "",
      statusLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const params = new URLSearchParams(this.props.location.search);
    const uid = params.get("id");
    dbref
      .child("smartSociety")
      .child("users")
      .child(uid)
      .on("value", (response) => {
        const data = response.val();
        dbref
          .child("smartSociety")
          .child("alert")
          .child(uid)
          .child("subscriptionDetails")
          .on("value", (sub) => {
            const subscription = sub.val();
            this.setState({
              user: data,
              activeSubscription: subscription,
              loading: false,
            });
          });
      });
  }

  handleClick = () => {
    this.props.history.push("/");
  };

  handleSnackClose = () => {
    this.setState({ openSnack: false });
  };

  editUserHandler = (values) => {
    this.setState({
      values: values,
      dialogOpen: true,
    });
  };

  closeDialog = (consent) => {
    if (consent) {
      this.setState({ diaogLoading: true });
      const params = new URLSearchParams(this.props.location.search);
      const uid = params.get("id");
      dbref
        .child("smartSociety")
        .child("users")
        .child(uid)
        .update(this.state.values)
        .then(() => {
          this.setState({
            diaogLoading: false,
            openSnack: true,
            dialogOpen: false,
            snackSeverity: "success",
            snackMsg: "User details have been updated successfully!",
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            diaogLoading: false,
            dialogOpen: false,
            openSnack: true,
            snackSeverity: "error",
            snackMsg: "Something went wrong, check console",
          });
        });
    } else {
      this.setState({ dialogOpen: false });
    }
  };

  updateStatusHandler = (switching) => {
    this.setState({
      switching: switching,
      statusDialogOpen: true,
    });
  };

  closeStatusDialog = (consent) => {
    if (consent) {
      this.setState({
        statusLoading: true,
      });
      const params = new URLSearchParams(this.props.location.search);
      const uid = params.get("id");
      let request;
      if (this.state.switching === "STATUS") {
        const status =
          this.state.user.accountStatus === "ACTIVE" ? "DEACTIVE" : "ACTIVE";
        request = {
          accountStatus: status,
        };
      } else if (this.state.switching === "ROLE") {
        const role =
          this.state.user.userRole === process.env["REACT_APP_ADMIN_KEY"]
            ? "7895"
            : process.env["REACT_APP_ADMIN_KEY"];
        request = {
          userRole: role,
        };
      }
      console.log(request);
      dbref
        .child("smartSociety")
        .child("users")
        .child(uid)
        .update(request)
        .then(() => {
          this.setState({
            statusLoading: false,
            openSnack: true,
            statusDialogOpen: false,
            snackSeverity: "success",
            snackMsg: "Account status updated!",
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            statusLoading: false,
            statusDialogOpen: false,
            openSnack: true,
            snackSeverity: "error",
            snackMsg: "Something went wrong, check console",
          });
        });
    } else {
      this.setState({
        statusDialogOpen: false,
      });
    }
  };

  mfaActivate = () => {
    const request = {
      mfaStatus: "ACTIVE",
    };
    const uid = this.state.user.uid;
    dbref
      .child("smartSociety")
      .child("users")
      .child(uid)
      .update(request)
      .then(() => {
        this.setState({
          openSnack: true,
          snackSeverity: "success",
          snackMsg: "Account activated!",
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          openSnack: true,
          snackSeverity: "error",
          snackMsg: "Something went wrong, check console",
        });
      });
  };

  render() {
    const { classes } = this.props;
    let dialogContent = null;
    if (this.state.switching === "STATUS") {
      dialogContent = (
        <Typography gutterBottom>
          Are you sure you want to{" "}
          {this.state.user.accountStatus === "ACTIVE"
            ? "deactivate"
            : "activate"}{" "}
          this account?
        </Typography>
      );
    } else if (this.state.switching === "ROLE") {
      dialogContent = (
        <Typography gutterBottom>
          Are you sure you want to change this account to{" "}
          {this.state.user.userRole === process.env["REACT_APP_ADMIN_KEY"]
            ? "a User"
            : "an Admin"}{" "}
          account?
        </Typography>
      );
    }
    let content = (
      <Container className={classes.root}>
        <Card className={classes.card}>
          <Typography color="textPrimary" variant="h4" component="h1">
            Edit User Details
          </Typography>
          <Typography
            variant="h6"
            style={
              this.state.user.accountStatus === "ACTIVE"
                ? { color: "green" }
                : { color: "red" }
            }
          >
            {this.state.user.accountStatus}{" "}
            {this.state.user.userRole === process.env["REACT_APP_ADMIN_KEY"]
              ? "ADMIN"
              : "USER"}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            style={{ fontSize: "1.1rem" }}
          >
            <b>UID</b>: {this.state.user.uid}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            style={{ fontSize: "1.1rem" }}
          >
            <b>Subscription</b>: {this.state.activeSubscription.packageName}
          </Typography>
          <CardContent>
            <Grid container spacing={2}>
              <Formik
                enableReinitialize
                initialValues={{
                  name: this.state.user.name,
                  phoneNumber: this.state.user.phoneNumber,
                  accountStatus: this.state.user.accountStatus,
                  userEmail: this.state.user.userEmail,
                  societyName: this.state.user.societyName,
                  societyAddress: this.state.user.societyAddress,
                  societyCity: this.state.user.societyCity,
                  uid: this.state.user.uid,
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().max(255).required("Name is Required"),
                  userEmail: Yup.string()
                    .email("Invalid email format")
                    .max(255)
                    .required("Comment is Required"),
                  phoneNumber: Yup.string().min(
                    10,
                    "Minimum 10 Digits are Required"
                  ),
                  societyName: Yup.string()
                    .max(255)
                    .required("Society Name is Required"),
                  societyAddress: Yup.string()
                    .max(255)
                    .required("Society Address is Required"),
                  societyCity: Yup.string()
                    .max(255)
                    .required("Society City is Required"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    this.editUserHandler(values);
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values,
                }) => (
                  <>
                    <Grid item xs={12}>
                      <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} className={classes.form}>
                          <Grid container item xs={12} lg={6} spacing={2}>
                            <Grid item xs={12}>
                              <TextField
                                label="Name"
                                name="name"
                                variant="outlined"
                                className={classes.textfield}
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.name && errors.name)}
                                helperText={touched.name && errors.name}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <InputMask
                                //mask="(999)999-9999"
                                mask="9999999999"
                                value={values.phoneNumber}
                                disabled={false}
                                maskChar=""
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                {() => (
                                  <TextField
                                    className={classes.textfield}
                                    label="phoneNumber"
                                    variant="outlined"
                                    name="phoneNumber"
                                    value={values.phoneNumber}
                                    error={Boolean(
                                      touched.phoneNumber && errors.phoneNumber
                                    )}
                                    helperText={
                                      touched.phoneNumber && errors.phoneNumber
                                    }
                                  />
                                )}
                              </InputMask>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                className={classes.textfield}
                                label="Email"
                                variant="outlined"
                                name="userEmail"
                                value={values.userEmail}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                  touched.userEmail && errors.userEmail
                                )}
                                helperText={
                                  touched.userEmail && errors.userEmail
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid container item xs={12} lg={6} spacing={2}>
                            <Grid item xs={12}>
                              <TextField
                                className={classes.textfield}
                                label="Society Name"
                                variant="outlined"
                                name="societyName"
                                value={values.societyName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                  touched.societyName && errors.societyName
                                )}
                                helperText={
                                  touched.societyName && errors.societyName
                                }
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                className={classes.textfield}
                                label="Society Address"
                                variant="outlined"
                                name="societyAddress"
                                value={values.societyAddress}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                  touched.societyAddress &&
                                    errors.societyAddress
                                )}
                                helperText={
                                  touched.societyAddress &&
                                  errors.societyAddress
                                }
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                className={classes.textfield}
                                label="Society City"
                                variant="outlined"
                                name="societyCity"
                                value={values.societyCity}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                  touched.societyCity && errors.societyCity
                                )}
                                helperText={
                                  touched.societyCity && errors.societyCity
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            {this.state.user.mfaStatus === "DEACTIVE" ? (
                              <Button
                                variant="contained"
                                style={{ background: "green", color: "white" }}
                                className={classes.submit}
                                onClick={() => {
                                  this.mfaActivate();
                                }}
                              >
                                Activate Account
                              </Button>
                            ) : (
                              <>
                                <Button
                                  variant="contained"
                                  style={
                                    values.accountStatus === "ACTIVE"
                                      ? { background: "red", color: "white" }
                                      : { background: "green", color: "white" }
                                  }
                                  className={classes.submit}
                                  onClick={() => {
                                    this.updateStatusHandler("STATUS");
                                  }}
                                >
                                  {values.accountStatus === "ACTIVE"
                                    ? "Deactivate"
                                    : "Activate"}
                                </Button>
                                <Button
                                  variant="contained"
                                  style={
                                    this.state.user.userRole ===
                                    process.env["REACT_APP_ADMIN_KEY"]
                                      ? { background: "red", color: "white" }
                                      : { background: "green", color: "white" }
                                  }
                                  className={classes.submit}
                                  onClick={() => {
                                    this.updateStatusHandler("ROLE");
                                  }}
                                >
                                  {this.state.user.userRole ===
                                  process.env["REACT_APP_ADMIN_KEY"]
                                    ? "Degrade to User"
                                    : "Upgrade to Admin"}
                                </Button>
                              </>
                            )}
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              className={classes.submit}
                              onClick={() => {
                                this.editUserHandler(values);
                              }}
                            >
                              Submit
                            </Button>
                            <Link to="/" style={{ textDecoration: "none" }}>
                              <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                              >
                                Cancel
                              </Button>
                            </Link>
                          </Grid>
                        </Grid>
                      </form>
                    </Grid>
                    <Dialog
                      open={this.state.dialogOpen}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={() => this.closeDialog(false)}
                      aria-labelledby="alert-dialog-slide-title"
                      aria-describedby="alert-dialog-slide-description"
                    >
                      {this.state.loading ? (
                        <h1>
                          <CircularProgress className={classes.loader} />
                        </h1>
                      ) : (
                        <>
                          <DialogTitle
                            id="alert-dialog-slide-title"
                            style={{
                              background: "#2196f3",
                              color: "white",
                              textAlign: "center",
                            }}
                          >
                            User Details
                          </DialogTitle>
                          <DialogContent>
                            <InputLabel className={classes.dialogLabel}>
                              <b>Name</b>: {values.name}
                            </InputLabel>
                            <Divider />
                            <InputLabel className={classes.dialogLabel}>
                              <b>Phone</b>: {values.phoneNumber}
                            </InputLabel>
                            <Divider />
                            <InputLabel className={classes.dialogLabel}>
                              <b>Email</b>: {values.userEmail}
                            </InputLabel>
                            <Divider />
                            <InputLabel className={classes.dialogLabel}>
                              <b>Society</b>: {values.societyName}
                            </InputLabel>
                            <Divider />
                            <InputLabel className={classes.dialogLabel}>
                              <b>Address</b>: {values.societyAddress}
                            </InputLabel>
                            <Divider />
                            <InputLabel className={classes.dialogLabel}>
                              <b>City</b>: {values.societyCity}
                            </InputLabel>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={() => this.closeDialog(false)}
                              color="secondary"
                              variant="contained"
                              className={classes.Button}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => {
                                this.closeDialog(true);
                              }}
                              color="primary"
                              variant="contained"
                              className={classes.Button}
                            >
                              Confirm
                            </Button>
                          </DialogActions>
                        </>
                      )}
                    </Dialog>
                  </>
                )}
              </Formik>
            </Grid>
            <Snackbar
              classes={{ anchorOriginTopRight: classes.snackbar }}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={this.state.openSnack}
              autoHideDuration={6000}
              onClose={this.handleSnackClose}
            >
              <Alert
                onClose={this.handleSnackClose}
                severity={this.state.snackSeverity}
              >
                {this.state.snackMsg}
              </Alert>
            </Snackbar>
            <Dialog
              open={this.state.statusDialogOpen}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => this.closeStatusDialog(false)}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle
                id="alert-dialog-slide-title"
                style={{
                  background: "#2196f3",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Confirmation
              </DialogTitle>
              <DialogContent>
                {this.state.statusLoading ? (
                  <h1>
                    <CircularProgress className={classes.loader} />
                  </h1>
                ) : (
                  dialogContent
                )}
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => this.closeStatusDialog(false)}
                  color="secondary"
                  variant="contained"
                  className={classes.Button}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    this.closeStatusDialog(true);
                  }}
                  color="primary"
                  variant="contained"
                  className={classes.Button}
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </CardContent>
        </Card>
      </Container>
    );

    if (this.state.loading) {
      content = (
        <h1>
          <CircularProgress className={classes.loader} />
        </h1>
      );
    }
    return content;
  }
}

export default withStyles(useStyles, { withTheme: true })(UserDetails);
