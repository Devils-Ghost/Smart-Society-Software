import {
  Button,
  Container,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
  Snackbar,
  Typography,
  InputLabel,
  MenuItem,
  Divider,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React, { Component } from "react";
import { dbref } from "../../shared/fire";
import { forwardRef } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
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
  snackbar: {
    top: "100px",
  },
  dialogLabel: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    color: "black",
    fontSize: "18px",
  },
  textbox: {
    width: "40%",
    [theme.breakpoints.only("xs")]: {
      minWidth: "75%",
    },
    [theme.breakpoints.between("xs", 800)]: {
      minWidth: "85%",
    },
  },
});
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class Complaint extends Component {
  state = {
    dialogOpen: false,
    snackOpen: false,
  };

  closeDialog = (consent, values) => {
    if (consent) {
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
      const ref = dbref.child("smartSociety").child("complaint").push();
      const id = ref.key;
      const complaint = {
        id: id,
        complaintStatus: "ACTIVE",
        complaintType: values.type,
        date: startDate,
        time: time,
        adminName: "",
        name: values.username,
        phoneNumber: this.props.user["phoneNumber"],
        uid: this.props.user["uid"],
        complaint: values.description,
        userEmail: values.email,
      };

      ref.set(complaint);
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
    this.props.history.push("/");
  };

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.root}>
        <Typography color="textPrimary" variant="h5" component="h1">
          Complaint
        </Typography>
        <Typography color="textSecondary" variant="subtitle1" component="h4">
          Would you like to register a complaint?
        </Typography>
        <Grid container spacing={2}>
          <Formik
            enableReinitialize
            initialValues={{
              type: "",
              username: this.props.user.name,
              description: "",
              email: this.props.user.userEmail,
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required("Name is Required"),
              description: Yup.string()
                .max(255)
                .required("Description is Required"),
              type: Yup.string()
                .max(255)
                .required("Complaint Type is Required"),
              email: Yup.string()
                .email("Enter a valid email address")
                .required("Email is Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                this.setState({
                  dialogOpen: true,
                });
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
              <Grid xs={12}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2} className={classes.form}>
                    <Grid item xs={12}>
                      <TextField
                        className={classes.textbox}
                        label="Name"
                        name="username"
                        variant="outlined"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                        error={Boolean(touched.username && errors.username)}
                        helperText={touched.username && errors.username}
                      />
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
                        select
                        label="Complaint Type"
                        className={classes.formControl}
                        name="type"
                        variant="outlined"
                        value={values.type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.type && errors.type)}
                        helperText={touched.type && errors.type}
                      >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="Serial Complaint">
                          Serial Complaint
                        </MenuItem>
                        <MenuItem value="First-time Complaint">
                          First-time Complaint
                        </MenuItem>
                        <MenuItem value="Personnel Complaint">
                          Personnel Complaint
                        </MenuItem>
                        <MenuItem value="Product Specific Complaint">
                          Product Specific Complaint
                        </MenuItem>
                        <MenuItem value="Delivery-related Complaint">
                          Delivery-related Complaint
                        </MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        className={classes.textbox}
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        name="description"
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
                        className={classes.textbox}
                        type="submit"
                        variant="contained"
                        color="primary"
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
                  onClose={() => this.closeDialog(false, values)}
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
                    Are you sure you want to submit the following information?
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      <InputLabel className={classes.dialogLabel}>
                        <b>Name</b>: {values.username}
                      </InputLabel>
                      <Divider />
                      <InputLabel className={classes.dialogLabel}>
                        <b>Email</b>: {values.email}
                      </InputLabel>
                      <Divider />
                      <InputLabel className={classes.dialogLabel}>
                        <b>Complaint Type</b>: {values.type}
                      </InputLabel>
                      <Divider />
                      <InputLabel className={classes.dialogLabel}>
                        <b>Description</b>: {values.description}
                      </InputLabel>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="contained"
                      onClick={() => this.closeDialog(false)}
                      color="secondary"
                    >
                      Disagree
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => this.closeDialog(true, values)}
                      color="primary"
                    >
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            )}
          </Formik>
        </Grid>
        <Snackbar
          classes={{ anchorOriginTopRight: classes.snackbar }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.snackOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackClose}
        >
          <Alert onClose={this.handleSnackClose} severity="success">
            Your complaint has been registered successfully, Redirecting to Home
            in 6s!
          </Alert>
        </Snackbar>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(
  withStyles(useStyles, { withTheme: true })(Complaint)
);
