import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import * as actions from "../../store/actions";
import MuiAlert from "@material-ui/lab/Alert";
import InputMask from "react-input-mask";
import {
  Button,
  Container,
  TextField,
  Grid,
  Typography,
  CssBaseline,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = (theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px dotted black",
    padding: theme.spacing(5),
  },
  form: {
    width: "100%",
    margin: theme.spacing(2, 0),
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
    backgroundColor: "#4472c4",
    fontWeight: "bold",
  },
  h1: {
    marginTop: theme.spacing(1),
  },
  link: {
    margin: theme.spacing(0, 1, 0),
    color: "#4472c4",
    fontWeight: "bold",
    textDecoration: "none",
  },
  loader: {
    margin: "10%",
    width: "100px !important",
    height: "100px !important",
  },
  snackbar: {
    top: "100px",
  },
});

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      Email: "",
      Password: "",
      ConfirmPassword: "",
      PhoneNumber: "",
      ProfileName: "",
      severity: "",
      msg: "",
      openSnack: false,
    };
  }
  handleSnackClose = () => {
    this.setState({ openSnack: false });
  };

  onSubmit = (values) => {
    this.props.onSignUpInitiate(
      values.Email,
      values.Password,
      values.PhoneNumber,
      values.ProfileName
    );
    setTimeout(() => {
      if (this.props.error) {
        this.setState({
          openSnack: true,
          severity: "error",
          msg: this.props.error.message,
        });
      }
    }, 1000);
  };

  render() {
    const { classes } = this.props;

    let content = (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography
            color="textPrimary"
            variant="h5"
            component="h1"
            className={classes.h1}
          >
            Welcome to Smart Society!
          </Typography>

          <Typography color="textSecondary" variant="subtitle1" component="h4">
            Please Sign up to Continue
          </Typography>
          <Formik
            enableReinitialize
            initialValues={{
              Email: "",
              Password: "",
              ConfirmPassword: "",
              PhoneNumber: "",
              ProfileName: "",
            }}
            validationSchema={Yup.object().shape({
              Email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is Required"),
              Password: Yup.string()
                .min(7)
                .max(255)
                .required("Password is Required"),
              ConfirmPassword: Yup.string()
                .oneOf([Yup.ref("Password")], "Passwords Do Not Match")
                .required("Confirm Password Required"),
              PhoneNumber: Yup.string()
                .min(10, "Minimum 10 Digits are Required")
                .max(10, "Only 10 Digits are Allowed")
                .required("Phone Number is Required"),
              ProfileName: Yup.string()
                .max(255)
                .required("Profile Name is Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                this.onSubmit(values);
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
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Email Address"
                      name="Email"
                      value={values.Email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.Email && errors.Email)}
                      helperText={touched.Email && errors.Email}
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      helperText={touched.Password && errors.Password}
                      error={Boolean(touched.Password && errors.Password)}
                      name="Password"
                      label="Password"
                      type="password"
                      id="password"
                      value={values.Password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      helperText={
                        touched.ConfirmPassword && errors.ConfirmPassword
                      }
                      error={Boolean(
                        touched.ConfirmPassword && errors.ConfirmPassword
                      )}
                      required
                      fullWidth
                      name="ConfirmPassword"
                      label="Confirm Password"
                      type="password"
                      onBlur={handleBlur}
                      value={values.ConfirmPassword}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputMask
                      //mask="(999)999-9999"
                      mask="9999999999"
                      value={values.PhoneNumber}
                      disabled={false}
                      maskChar=""
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {() => (
                        <TextField
                          variant="outlined"
                          helperText={touched.PhoneNumber && errors.PhoneNumber}
                          error={Boolean(
                            touched.PhoneNumber && errors.PhoneNumber
                          )}
                          required
                          fullWidth
                          name="PhoneNumber"
                          label="Phone Number"
                          type="text"
                          value={values.PhoneNumber}
                          onChange={handleChange}
                        />
                      )}
                    </InputMask>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      error={Boolean(touched.ProfileName && errors.ProfileName)}
                      helperText={touched.ProfileName && errors.ProfileName}
                      required
                      fullWidth
                      name="ProfileName"
                      label="Profile Name"
                      type="text"
                      onBlur={handleBlur}
                      value={values.ProfileName}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <span>Already Have an Account?</span>
                <Link to="/login" className={classes.link}>
                  Sign In
                </Link>
              </form>
            )}
          </Formik>
        </div>
        <Snackbar
          classes={{ anchorOriginTopRight: classes.snackbar }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.openSnack}
          autoHideDuration={6000}
          onClose={this.handleSnackClose}
        >
          <Alert onClose={this.handleSnackClose} severity={this.state.severity}>
            {this.state.msg}
          </Alert>
        </Snackbar>
      </Container>
    );
    if (this.props.loading) {
      content = (
        <div>
          <CircularProgress className={classes.loader} />
        </div>
      );
    }

    return <>{content}</>;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    email: state.auth.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUpInitiate: (email, password, phone, name) =>
      dispatch(actions.signUpInitiate(email, password, phone, name)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(SignUp));
