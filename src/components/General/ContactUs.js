import {
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Snackbar,
  Container,
  Typography,
  Divider,
  InputLabel,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React, { Component } from "react";
import { dbref } from "../../shared/fire";
import { withStyles } from "@material-ui/core/styles";
import { forwardRef } from "react";
import * as Yup from "yup";
import { Formik } from "formik";

import InputMask from "react-input-mask";
import Link from "@material-ui/core/Link";

const useStyles = (theme) => ({
  root: {
    width: "100%",
    //border: "1px dotted black",
  },
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(5),
  },
  form: {
    width: "100%",
    display: "inline-block",
    margin: theme.spacing(2, 0),
  },

  h1: {
    marginTop: theme.spacing(3),
    margin: theme.spacing(10, 0, 2),
  },
  h2: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  textbox: {
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "60%",
    },
  },
  buttons: {
    backgroundColor: "#4472c4",
    width: "20%",
    display: "inline",
    [theme.breakpoints.down("sm")]: {
      width: "30%",
    },
  },
  descriptionbox: {
    padding: theme.spacing(5),
    color: "grey",
  },
  Grid: {
    display: "block",
    left: "0px",
    //border: "3px solid black",
    alignContent: "center",
    boxShadow: "0px 5px 5px 2px #aaaaaa",
  },
  Divider: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  typeo: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },

  link: {
    textAlign: "center",
    color: "#2196f3",
    fontWeight: "bold",
    textDecoration: "none",
    fontSize: "17px",
  },

  snackbar: {
    top: "100px",
  },

  ourInfo: {
    padding: theme.spacing(2),
  },
  Button: {
    textDecoration: "none",
    textTransform: "none",
    width: "45%",
    paddingRight: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  dialogLabel: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    color: "black",
    fontSize: "18px",
  },
});
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class ContactUs extends Component {
  state = {
    username: "",
    number: "",
    email: "",
    description: "",
    contact: [],
    dialogOpen: false,
    snackOpen: false,
  };

  onFormSubmit = (value) => {
    //event.preventDefault();
    this.setState({
      dialogOpen: true,
      contact: value,
    });
  };

  closeDialog = (consent, values) => {
    if (consent) {
      let date = new Date();
      const initateDate = date
        .toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
        .replace(/ /g, "-");
      const contact = {
        name: values.username,
        phone: values.number,
        email: values.email,
        description: values.description,
        initiatedOn: initateDate,
        status: "PENDING",
      };
      dbref.child("smartSociety").child("contactRequests").push(contact);

      values.username = "";
      values.number = "";
      values.email = "";
      values.description = "";

      this.setState({
        dialogOpen: false,
        snackOpen: true,
      });
    } else {
      this.setState({
        dialogOpen: false,
      });
    }
  };

  handleSnackClose = () => {
    this.setState({
      snackOpen: false,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.root}>
        <Typography
          color="textPrimary"
          variant="h3"
          component="h1"
          align="center"
          className={classes.h2}
        >
          Contact Us
        </Typography>
        <Divider />

        <Grid container style={{ paddingTop: "10px" }}>
          <Grid item xs={12} md={6} className={classes.Grid} style={{}}>
            <Typography
              className={classes.typeo}
              color="textPrimary"
              variant="h5"
              component="h1"
            >
              Personal Information
            </Typography>
            <Formik
              enableReinitialize
              initialValues={{
                username: "",
                email: "",
                number: "",
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string()
                  .max(255)
                  .required("Name is Required")
                  .matches(/^[A-Za-z ]*$/, "Please Enter Valid Name"),
                email: Yup.string()
                  .email("Email must be valid")
                  .max(255)
                  .required("Email is Required"),
                number: Yup.string()
                  .min(10, "Minimum 10 Digits are Required")
                  .required("Phone Number is Required"),
                description: Yup.string()
                  .max(255)
                  .required("Description is Required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  this.onFormSubmit(values);
                  //console.log(values);
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
                <Grid>
                  <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          className={classes.textbox}
                          id="outlined-basic"
                          label="Name"
                          name="username"
                          variant="outlined"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.username && errors.username)}
                          helperText={touched.username && errors.username}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputMask
                          //mask="(999)999-9999"
                          mask="9999999999"
                          value={values.number}
                          disabled={false}
                          maskChar=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          {() => (
                            <TextField
                              className={classes.textbox}
                              id="outlined-basic"
                              label="Phone Number"
                              name="number"
                              variant="outlined"
                              value={values.number}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={Boolean(touched.number && errors.number)}
                              helperText={touched.number && errors.number}
                            />
                          )}
                        </InputMask>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          className={classes.textbox}
                          id="outlined-basic"
                          label="Email"
                          name="email"
                          variant="outlined"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          className={classes.textbox}
                          id="outlined-basic"
                          label="Description"
                          name="description"
                          variant="outlined"
                          multiline
                          rows={4}
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.description && errors.description
                          )}
                          helperText={touched.description && errors.description}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          className={classes.buttons}
                          size="medium"
                          color="primary"
                          variant="contained"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                  <Dialog
                    open={this.state.dialogOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.closeDialog(false)}
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
                      Are you sure you want to submit the following information?
                    </DialogTitle>
                    <DialogContent>
                      <InputLabel className={classes.dialogLabel}>
                        <b>Name</b>: {values.username}
                      </InputLabel>
                      <Divider />
                      <InputLabel className={classes.dialogLabel}>
                        <b>Phone Number</b>: {values.number}
                      </InputLabel>
                      <Divider />
                      <InputLabel className={classes.dialogLabel}>
                        <b>Email</b>: {values.email}
                      </InputLabel>
                      <Divider />
                      <InputLabel className={classes.dialogLabel}>
                        <b>Description</b>: {values.description}
                      </InputLabel>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => this.closeDialog(false)}
                        color="secondary"
                        variant="contained"
                        className={classes.Button}
                      >
                        Disagree
                      </Button>
                      <Button
                        onClick={() => this.closeDialog(true, values)}
                        color="primary"
                        variant="contained"
                        className={classes.Button}
                      >
                        Agree
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              )}
            </Formik>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ textAlign: "center" }}
            className={classes.ourInfo}
          >
            <Typography
              color="textPrimary"
              variant="h4"
              component="h1"
              align="center"
              className={classes.h1}
            >
              How can we help?
            </Typography>
            <Typography
              color="textSecondary"
              variant="subtitle1"
              component="h4"
              align="center"
            >
              Have questions with a our product or service? We've got you
              covered.
            </Typography>
            <Typography
              color="textPrimary"
              variant="h5"
              component="h2"
              align="center"
              className={classes.h1}
            >
              Our Services
            </Typography>
            <Typography align="center">
              We provide best in class services from society automation to its
              safety. We make use of advanced technology and skilled engineers
              to achieve our goal.
              <br />
            </Typography>
            <Link href="/services" className={classes.link}>
              Take a look at our services.
            </Link>
            {/* <Divider className={classes.Divider} /> */}

            <Typography
              color="textPrimary"
              variant="h5"
              component="h2"
              align="center"
              className={classes.h1}
            >
              Join Us
            </Typography>
            <Typography align="center">
              Now its time to walk hand in hand with the progressing world.
              <br />
            </Typography>
            <Link href="/signup" className={classes.link}>
              Sign up and become a part of the community.
            </Link>
            {/* <Divider className={classes.Divider} /> */}
            <Typography
              color="textPrimary"
              variant="h5"
              component="h2"
              align="center"
              className={classes.h1}
            >
              Get Insipred
            </Typography>
            <Typography align="center">
              Meet the minds behind Smart Society.
            </Typography>
            <Link href="/team" className={classes.link}>
              Team.
            </Link>
            <Divider className={classes.Divider} />
          </Grid>
        </Grid>

        <Snackbar
          classes={{ anchorOriginTopRight: classes.snackbar }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.snackOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackClose}
        >
          <Alert onClose={this.handleSnackClose} severity="success">
            Your request has been submitted successfully! Our Team will get in
            touch with you in 5 working days.
          </Alert>
        </Snackbar>
      </Container>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(ContactUs);
