import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import Rating from "@material-ui/lab/Rating";
import { dbref } from "../../shared/fire";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Container,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
  Grid,
  MenuItem,
} from "@material-ui/core";
import * as actions from "../../store/actions";
function Alert(props) {
  return <MuiAlert elevation={8} variant="filled" {...props} />;
}
const useStyles = (theme) => ({
  root: {
    paddingTop: theme.spacing(5),
    backgroundColor: "#ffffff",
    minHeight: "100%",
    width: "100%",
  },
  form: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    minWidth: "40%",
    [theme.breakpoints.only("xs")]: {
      minWidth: "75%",
    },
    [theme.breakpoints.between("xs", 800)]: {
      minWidth: "85%",
    },
  },
  rating: {
    border: "1px solid lightgrey",
    width: "40%",
    padding: theme.spacing(0.5),
    borderRadius: theme.spacing(0.5),
    "&:hover": {
      border: "1px solid blue",
    },
    [theme.breakpoints.only("xs")]: {
      width: "75%",
    },
    [theme.breakpoints.between("xs", 800)]: {
      minWidth: "85%",
    },
  },
  ratingBox: {
    width: "10%",
    color: "red",
    fontSize: "13px",
  },
  loader: {
    margin: "10%",
    width: "100px !important",
    height: "100px !important",
  },
  snackbar: {
    top: "100px",
  },
  textbox: {
    width: "40%",
    [theme.breakpoints.only("xs")]: {
      width: "75%",
    },
    [theme.breakpoints.between("xs", 800)]: {
      minWidth: "85%",
    },
  },
});
class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      Name: "",
      feedback: "",
      FeedbackType: "",
      severity: "",
      msg: "",
      openSnack: false,
      loading: false,
    };
  }

  handleSnackClose = () => {
    this.setState({ openSnack: false });
    this.props.history.push("/");
  };

  onFormSubmit = (values) => {
    this.setState({ loading: true });
    const date = new Date();
    const time = date.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const startDate = date
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");
    const ref = dbref.child("smartSociety").child("feedback").push();
    const id = ref.key;
    const request = {
      ...values,
      date: startDate,
      time: time,
      id: id,
    };
    ref.set(request).then((response) => {
      // console.log(response)
      this.setState({
        loading: false,
        openSnack: true,
        severity: "success",
        msg: "Thank You For Giving Feedback, Redirecting to Home in 6s!",
      });
    });
  };

  render() {
    const { classes } = this.props;
    // console.log(this.props.user)
    let content = (
      <Container className={classes.root}>
        <Typography color="textPrimary" variant="h5" component="h1">
          Please Provide Your Valuable Feedback!
        </Typography>
        <Typography color="textSecondary" variant="subtitle1" component="h4">
          Help us Understand You Better!
        </Typography>
        <Grid container spacing={2}>
          <Formik
            enableReinitialize
            initialValues={{
              rating: 0,
              feedbackType: "",
              name: this.props.user.name,
              phoneNumber: this.props.user.phoneNumber,
              uid: this.props.user.uid,
              feedback: "",
              userEmail: this.props.user.userEmail,
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().max(255).required("Name is Required"),
              feedback: Yup.string().max(255).required("Comment is Required"),
              feedbackType: Yup.string()
                .max(255)
                .required("Feedback Type is Required"),
              rating: Yup.number()
                .min(1, "Rating is Required")
                .max(5)
                .required("Rating is Required"),
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
              <Grid item xs={12}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2} className={classes.form}>
                    <Grid item xs={12}>
                      <TextField
                        className={classes.textbox}
                        label="Name"
                        variant="outlined"
                        name="Name"
                        value={values.name}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Feedback Type"
                        name="feedbackType"
                        variant="outlined"
                        className={classes.formControl}
                        value={values.feedbackType}
                        select
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(
                          touched.feedbackType && errors.feedbackType
                        )}
                        helperText={touched.feedbackType && errors.feedbackType}
                      >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="Product and Brand Health Feedback">
                          Product and Brand Health Feedback
                        </MenuItem>
                        <MenuItem value="Customer Satisfaction Feedback">
                          Customer Satisfaction Feedback
                        </MenuItem>
                        <MenuItem value="Brand Loyalty Feedback">
                          Brand Loyalty Feedback
                        </MenuItem>
                        <MenuItem value="Sales Feedback">
                          Sales Feedback
                        </MenuItem>
                        <MenuItem value="Customer Preference Feedback">
                          Customer Preference Feedback
                        </MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        className={classes.textbox}
                        label="Feedback"
                        variant="outlined"
                        name="feedback"
                        value={values.feedback}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.feedback && errors.feedback)}
                        helperText={touched.feedback && errors.feedback}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        component="fieldset"
                        display="inline-flex"
                        justifyContent="center"
                        className={classes.rating}
                      >
                        <Typography component="legend">Ratings</Typography>
                        <Rating
                          size="large"
                          name="rating"
                          value={parseInt(values.rating)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Box>{" "}
                      <br />
                      <Box
                        display="inline-flex"
                        justifyContent="left"
                        className={classes.ratingBox}
                      >
                        {Boolean(touched.rating && errors.rating)
                          ? touched.rating && errors.rating
                          : ""}
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        className={classes.textbox}
                        type="submit"
                        variant="contained"
                        color="primary"
                        // className={classes.submit}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
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
          <Alert onClose={this.handleSnackClose} severity={this.state.severity}>
            {this.state.msg}
          </Alert>
        </Snackbar>
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
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    footerLoading: (loading) => dispatch(actions.setFooterLoading(loading)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(Feedback));
