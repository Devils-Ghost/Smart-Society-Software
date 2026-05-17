import React, { Component } from "react";
import { connect } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Container,
  Card,
  CardHeader,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  InputLabel,
  CircularProgress,
  CardContent,
  TextField,
  Button,
  Typography,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/core/styles";
import { dbref } from "../../shared/fire";
import * as actions from "../../store/actions";

const useStyles = (theme) => ({
  root: {
    backgroundColor: "#ffffff",
    padding: theme.spacing(0, 15),
    [theme.breakpoints.between('xs',800)]:
    {
      padding: theme.spacing(1),
    }
  },
  head:{
    [theme.breakpoints.only('xs')]:
    {
      fontSize: 35,
    }
  },
  input: {
    backgroundColor: "#ffffff",
    minHeight: "100%",
    width: "100%",
    textAlign: "left",
    color: "#000000",
  },
  Button: {
    textDecoration: "none",
    textTransform: "none",
    width: "14%",
    fontSize: "14px",
    paddingRight: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    [theme.breakpoints.between('xs',800)]:
    {
      width: "80%",
    },
    [theme.breakpoints.between(801,1421)]:
    {
      width: "25%",
    }

  },
  label: {
    color: "#000000",
    fontSize: "18px",
  },
  textfield: {
    // width:"90%",
    marginTop: theme.spacing(3),
  },
  heading: {
    fontWeight: "bold",
    fontSize: "18px",
    display: "inline",
    color: "black",
  },
  dialog: {
    textAlign: "center",
  },
  dialogDim: {
    minHeight: "40%",
    minWidth: "30%",
  },
  dialogSize: {
    textAlign: "center",
    padding: theme.spacing(5, 5),
  },
  card: {
    marginTop: theme.spacing(3),
  },
  loader: {
    margin: "20%",
    width: "100px !important",
    height: "100px !important",
  },
  snackbar: {
    top: "100px",
  },
});

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      adminCode: "",
      adminCodeError: "",
      openEdit: false,
      openUpgrade: false,
      snackOpen: false,
      snackMessage: "",
      snackSeverity: "success",
    };
  }

  handleSnackClose = () => {
    this.setState({ snackOpen: false });
  };
  openEdit = () => {
    this.setState({ openEdit: true });
  };
  openUpgrade = () => {
    this.setState({ openUpgrade: true });
  };
  handleClose = (values, consent) => {
    if (consent) {
      this.setState({ loading: true });
      const uid = this.props.user.uid;
      const user = {
        name: values.name,
        societyAddress: values.societyAddress,
        societyCity: values.societyCity,
        societyName: values.societyName,
      };
      dbref
        .child("smartSociety")
        .child("users")
        .child(uid)
        .update(user)
        .then(() => {
          this.setState({
            loading: false,
            snackOpen: true,
            openEdit: false,
            snackSeverity: "success",
            snackMessage: "Your details have been updated successfully!",
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            loading: false,
            openEdit: false,
            snackOpen: true,
            snackSeverity: "error",
            snackMessage: "Something went wrong, check console",
          });
        });
    } else {
      this.setState({
        openEdit: false,
      });
    }
  };
  handleUpgradeClose = (consent, adminCode) => {
    if (consent) {
      if (adminCode === process.env["REACT_APP_ADMIN_KEY"]) {
        const uid = this.props.user.uid;
        const user = {
          userRole: adminCode,
        };
        dbref
          .child("smartSociety")
          .child("users")
          .child(uid)
          .update(user)
          .then(() => {
            this.setState({
              adminCode: "",
              adminCodeError: "",
              error: false,
              snackOpen: true,
              openUpgrade: false,
              snackSeverity: "success",
              snackMessage: "Account has been updated!",
            });
          })
          .catch((error) => {
            console.log(error);
            this.setState({
              openUpgrade: false,
              snackOpen: true,
              snackSeverity: "error",
              snackMessage: "Something went wrong, check console",
            });
          });
      } else {
        this.setState({
          adminCode: "",
          adminCodeError: "",
          error: false,
          openUpgrade: false,
          snackOpen: true,
          snackSeverity: "error",
          snackMessage: "The code is invalid! Please enter a valid code.",
        });
      }
    } else {
      this.setState({
        error: false,
        adminCodeError: "",
        openUpgrade: false,
        adminCode: "",
      });
    }
  };
  handleChange = (event) => {
    if (event.target.value.length > 0) {
      this.setState({
        error: false,
        adminCodeError: "",
        adminCode: event.target.value,
      });
    } else {
      this.setState({
        error: true,
        adminCodeError: "Admin code is required",
        adminCode: event.target.value,
      });
    }
  };
  render() {
    const { classes } = this.props;
    let head = (
      <div>
        <Typography color="textPrimary" variant="h3" component="h1" className={classes.head}>
          User Profile
        </Typography>
      </div>
    );
    let spinner = (
      <h1>
        <CircularProgress className={classes.loader} />
      </h1>
    );
    let content = (
      <Container>
        <Card>
          <CardHeader className={classes.card} title={head}></CardHeader>
          <CardContent>
            <Grid container spacing={2} className={classes.root}>
              <Grid item lg={6} md={6} xs={12}>
                <ul className={`MuiList-root MuiList-padding`}>
                  <li className={`MuiListItem-root`}>
                    <InputLabel className={classes.label}>
                      <Typography component="h3" className={classes.heading}>
                        Name:
                      </Typography>{" "}
                      {this.props.user.name}
                    </InputLabel>
                  </li>
                </ul>
                <ul className={`MuiList-root MuiList-padding`}>
                  <li className={`MuiListItem-root`}>
                    <InputLabel className={classes.label}>
                      <Typography component="h3" className={classes.heading}>
                        Phone Number:
                      </Typography>{" "}
                      {this.props.user.phoneNumber}
                    </InputLabel>
                  </li>
                </ul>
                <ul className={`MuiList-root MuiList-padding`}>
                  <li className={`MuiListItem-root`}>
                    <InputLabel className={classes.label}> 
                      <Typography component="h3" className={classes.heading}>
                        Email:
                      </Typography>{" "}
                      {this.props.user.userEmail}
                    </InputLabel>
                  </li>
                </ul>
                <ul className={`MuiList-root MuiList-padding`}>
                  <li className={`MuiListItem-root`}>
                    <InputLabel className={classes.label}>
                      <Typography component="h3" className={classes.heading}>
                        User Role:
                      </Typography>{" "}
                      {this.props.user.userRole ===
                      process.env["REACT_APP_ADMIN_KEY"]
                        ? "ADMIN"
                        : "USER"}
                    </InputLabel>
                  </li>
                </ul>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <ul className={`MuiList-root MuiList-padding`}>
                  <li className={`MuiListItem-root `}>
                    <InputLabel className={classes.label}>
                      <Typography component="h3" className={classes.heading}>
                        Society Name:
                      </Typography>{" "}
                      {this.props.user.societyName}
                    </InputLabel>
                  </li>
                </ul>
                <ul className={`MuiList-root MuiList-padding`}>
                  <li className={`MuiListItem-root `}>
                    <InputLabel className={classes.label}>
                      <Typography component="h3" className={classes.heading}>
                        Society Address:
                      </Typography>{" "}
                      {this.props.user.societyAddress}
                    </InputLabel>
                  </li>
                </ul>
                <ul className={`MuiList-root MuiList-padding`}>
                  <li className={`MuiListItem-root `}>
                    <InputLabel className={classes.label}>
                      <Typography component="h3" className={classes.heading}>
                        Society City:
                      </Typography>{" "}
                      {this.props.user.societyCity}
                    </InputLabel>
                  </li>
                </ul>
                <ul className={`MuiList-root MuiList-padding`}>
                  <li className={`MuiListItem-root `}>
                    {this.props.user.accountStatus === "ACTIVE" ? (
                      <InputLabel
                        className={classes.label}
                        style={{ color: "green" }}
                      >
                        <Typography component="h3" className={classes.heading}>
                          Account Status:
                        </Typography>{" "}
                        <b>{this.props.user.accountStatus}</b>
                      </InputLabel>
                    ) : (
                      <InputLabel
                        className={classes.label}
                        style={{ color: "red" }}
                      >
                        <Typography component="h3" className={classes.heading}>
                          Account Status:
                        </Typography>{" "}
                        <b>{this.props.user.accountStatus}</b>
                      </InputLabel>
                    )}
                  </li>
                </ul>
              </Grid>
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <Button
                size="small"
               // style={{ width: "10%" }}
                variant="contained"
                color="primary"
                className={classes.Button}
                startIcon={<EditIcon />}
                onClick={this.openEdit}
              >
                Edit
              </Button>
              {this.props.user.userRole ===
              process.env["REACT_APP_ADMIN_KEY"] ? null : (
                <Button
                  size="small"
                  //style={{ width: "15%" }}
                  variant="contained"
                  color="secondary"
                  className={classes.Button}
                  onClick={this.openUpgrade}
                >
                  Upgrade To Admin
                </Button>
              )}
              <Dialog
                classes={{
                  paperScrollPaper: classes.dialogDim,
                }}
                open={this.state.openEdit}
                onClose={() => {
                  this.handleClose(false);
                }}
                className={classes.dialog}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                {this.state.loading ? (
                  spinner
                ) : (
                  <>
                    <DialogTitle
                      id="alert-dialog-slide-description"
                      style={{
                        background: "#2196f3",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Edit Profile
                    </DialogTitle>
                    <Formik
                      enableReinitialize
                      initialValues={{
                        name: this.props.user.name,
                        phone: this.props.user.phoneNumber,
                        societyCity: this.props.user.societyCity,
                        societyAddress: this.props.user.societyAddress,
                        societyName: this.props.user.societyName,
                        email: this.props.user.userEmail,
                      }}
                      validationSchema={Yup.object().shape({
                        name: Yup.string()
                          .max(255)
                          .required("Name is Required"),
                        phone: Yup.string()
                          .min(10, "Minimum 10 Digits are Required")
                          .max(10, "Only 10 Digits are Allowed")
                          .required("Phone Number is Required"),
                        email: Yup.string()
                          .email()
                          .max(255)
                          .required("Email is Required"),
                        societyCity: Yup.string()
                          .max(255)
                          .required("Society City is Required"),
                        societyAddress: Yup.string()
                          .max(255)
                          .required("Society Address is Required"),
                        societyName: Yup.string()
                          .max(255)
                          .required("Society Name is Required"),
                      })}
                      onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                          this.handleClose(values, true);
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
                        <DialogContent>
                          <form onSubmit={handleSubmit}>
                            <Grid container justify="center">
                              <Grid item xs={6}>
                                <TextField
                                  label="Name"
                                  name="name"
                                  variant="outlined"
                                  className={classes.textfield}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.name}
                                  error={Boolean(touched.name && errors.name)}
                                  helperText={touched.name && errors.name}
                                />
                                <TextField
                                  label="Email"
                                  name="email"
                                  variant="outlined"
                                  disabled
                                  className={classes.textfield}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.email}
                                  error={Boolean(touched.email && errors.email)}
                                  helperText={touched.email && errors.email}
                                />
                                <TextField
                                  label="Phone Number"
                                  name="phone"
                                  variant="outlined"
                                  disabled
                                  type="text"
                                  className={classes.textfield}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.phone}
                                  error={Boolean(touched.phone && errors.phone)}
                                  helperText={touched.phone && errors.phone}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  label="Society Name"
                                  name="societyName"
                                  variant="outlined"
                                  className={classes.textfield}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.societyName}
                                  error={Boolean(
                                    touched.societyName && errors.societyName
                                  )}
                                  helperText={
                                    touched.societyName && errors.societyName
                                  }
                                />
                                <TextField
                                  label="Society Address"
                                  name="societyAddress"
                                  variant="outlined"
                                  className={classes.textfield}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.societyAddress}
                                  error={Boolean(
                                    touched.societyAddress &&
                                      errors.societyAddress
                                  )}
                                  helperText={
                                    touched.societyAddress &&
                                    errors.societyAddress
                                  }
                                />
                                <TextField
                                  label="Society City"
                                  name="societyCity"
                                  variant="outlined"
                                  className={classes.textfield}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.societyCity}
                                  error={Boolean(
                                    touched.societyCity && errors.societyCity
                                  )}
                                  helperText={
                                    touched.societyCity && errors.societyCity
                                  }
                                />
                              </Grid>
                            </Grid>
                            <DialogActions>
                              <Grid container justify="center">
                                <Grid
                                  item
                                  lg={12}
                                  md={12}
                                  xs={12}
                                  className={`MuiGrid-align-content-xs-center`}
                                >
                                  <Button
                                    size="small"
                                    style={{ width: "15%" }}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    className={classes.Button}
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    size="small"
                                    style={{ width: "15%" }}
                                    variant="contained"
                                    color="secondary"
                                    className={classes.Button}
                                    onClick={() => {
                                      this.handleClose(false);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                </Grid>
                              </Grid>
                            </DialogActions>
                          </form>
                        </DialogContent>
                      )}
                    </Formik>
                  </>
                )}
              </Dialog>
              <Dialog
                open={this.state.openUpgrade}
                onClose={() => {
                  this.handleUpgradeClose(false);
                }}
                className={classes.dialogSize}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle
                  id="alert-dialog-slide-description"
                  style={{
                    background: "#2196f3",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Upgrade To Admin Profile
                </DialogTitle>
                <DialogContent>
                  <TextField
                    variant="outlined"
                    label="Enter Admin Code"
                    name="adminCode"
                    value={this.state.adminCode}
                    onChange={this.handleChange}
                    error={this.state.error}
                    helperText={this.state.adminCodeError}
                    onBlur={() => {
                      if (this.state.adminCode.length === 0) {
                        this.setState({
                          error: true,
                          adminCodeError: "Admin code is required",
                        });
                      } else {
                        this.setState({
                          error: false,
                          adminCodeError: "",
                        });
                      }
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Grid container justify="center">
                    <Grid
                      item
                      lg={12}
                      md={12}
                      xs={12}
                      className={`MuiGrid-align-content-xs-center`}
                    >
                      <Button
                        size="small"
                        style={{ width: "15%" }}
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.Button}
                        onClick={() =>
                          this.handleUpgradeClose(true, this.state.adminCode)
                        }
                        disabled={this.state.adminCode.length === 0}
                      >
                        Save
                      </Button>
                      <Button
                        size="small"
                        style={{ width: "15%" }}
                        variant="contained"
                        color="secondary"
                        className={classes.Button}
                        onClick={() => this.handleUpgradeClose(false)}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </DialogActions>
              </Dialog>
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={this.state.snackOpen}
                autoHideDuration={6000}
                onClose={this.handleSnackClose}
                classes={{ anchorOriginTopRight: classes.snackbar }}
              >
                <Alert
                  onClose={this.handleSnackClose}
                  severity={this.state.snackSeverity}
                >
                  {this.state.snackMessage}
                </Alert>
              </Snackbar>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    );
    return content;
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tryAutoSignIn: () => dispatch(actions.checkAuthState()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(profile));
