import React, { Component } from "react";
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
import * as actions from "../../store/actions";
import { auth } from "../../shared/fire";
import { connect } from "react-redux";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = (theme) => ({
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
    fontWeight: "bold",
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

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      openSnack: false,
      severity: "",
      msg: "",
    };
  }

  onFormSubmit = (values) => {
    auth
      .sendPasswordResetEmail(values.Email)
      .then(() => {
        this.setState({
          openSnack: true,
          severity: "success",
          msg: "A password reset email has been sent! Redirecting in 6s",
          loading: true,
        });
        this.props.footerLoading(true);
        setTimeout(() => {
          this.props.footerLoading(false);
          this.props.history.push("/login");
        }, 6000);
      })
      .catch((error) => {
        this.setState({
          openSnack: true,
          severity: "error",
          msg: error.message,
        });
      });
  };

  handleSnackClose = () => {
    this.setState({ openSnack: false });
  };

  render() {
    const { classes } = this.props;
    let content = (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography color="textPrimary" variant="h5" component="h1">
            Welcome to Smart Society!
          </Typography>
          <Typography color="textSecondary" variant="subtitle1" component="h4">
            Please Enter your Email
          </Typography>
          <Formik
            enableReinitialize
            initialValues={{
              Email: "",
            }}
            validationSchema={Yup.object().shape({
              Email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              this.onFormSubmit(values);
              setSubmitting(false);
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
                </Grid>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={this.onSubmit}
                  className={classes.submit}
                >
                  Submit
                </Button>
              </form>
            )}
          </Formik>
          <Grid>
            <span>Back to</span>
            <Link to="/login" className={classes.link}>
              Sign In
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

    if (this.state.loading) {
      content = (
        <div>
          <CircularProgress className={classes.loader} />
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
        </div>
      );
    }
    return <>{content}</>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    footerLoading: (loading) => dispatch(actions.setFooterLoading(loading)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(ForgotPassword));
