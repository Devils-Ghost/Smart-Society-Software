import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import * as Yup from "yup";
import { Formik } from "formik";
import MuiAlert from "@material-ui/lab/Alert";
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
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = (theme) => ({
  root: {},
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px dotted black",
    padding: theme.spacing(5),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#4472c4",
    fontWeight:"bold",
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

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      Email: "",
      Password: "",
      openSnack: false,
      severity: "",
      msgs: "",
    };
  }

  onFormSubmit = (values) => {
    this.props.onAuthInitiate(values.Email, values.Password);
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
  handleSnackClose = () => {
    this.setState({ openSnack: false });
  };

  render() {
    const { classes } = this.props;
    let content = (
      <Container component="main" maxWidth="xs" className={classes.root}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography color="textPrimary" variant="h5" component="h1">
            Welcome to Smart Society!
          </Typography>
          <Typography color="textSecondary" variant="subtitle1" component="h4">
            Please Sign In to Continue
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
              Password: Yup.string().max(255).required("Password is Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                this.onFormSubmit(values);
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
                      name="Password"
                      label="Password"
                      type="password"
                      value={values.Password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.Password && errors.Password)}
                      helperText={touched.Password && errors.Password}
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Link to="/forgot_password" className={classes.link}>
                    Forgot Password?
                  </Link>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={this.onSubmit}
                  className={classes.submit}
                >
                  Sign In
                </Button>
              </form>
            )}
          </Formik>
          <Grid>
            <span>Don't have an account?</span>
            <Link to="/signup" className={classes.link}>
              Create one
            </Link>
          </Grid>
          <Grid>
            <Snackbar
              classes={{ anchorOriginTopRight: classes.snackbar }}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={this.state.openSnack}
              autoHideDuration={6000}
              onClose={this.handleSnackClose}
            >
              <Alert
                onClose={this.handleSnackClose}
                severity={this.state.severity}
              >
                {this.state.msg}
              </Alert>
            </Snackbar>
          </Grid>
        </div>
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
    onAuthInitiate: (email, password) =>
      dispatch(actions.authInitiate(email, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(Auth));
