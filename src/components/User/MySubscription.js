import React, { Component } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CssBaseline,
  Grid,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  CircularProgress,
  Slide,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";

import { dbref } from "../../shared/fire";

const useStyles = (theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  mainContent: {
    padding: theme.spacing(1, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.info.main
        : theme.palette.info.main,
  },
  cardSubscription: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  loader: {
    margin: "20%",
    width: "100px !important",
    height: "100px !important",
  },
  snackbar: {
    top: "100px",
  },
  Button: {
    textDecoration: "none",
    textTransform: "none",
    fontSize: "14px",
    paddingRight: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  receipt: {
    maxWidth: "425px",
    margin: "auto",
  },
  receiptRoot: {
    padding: "0px",
  },
  receiptTitle: {
    padding: theme.spacing(1),
  },
  receiptHeaders: {
    padding: theme.spacing(1),
    background: "#96c896",
  },
  receiptText: {
    padding: theme.spacing(1),
  },
  receiptButton: {
    textDecoration: "none",
    textTransform: "none",
    fontSize: "14px",
    width: "60%",
    margin: "auto",
    paddingRight: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
});

const cardsData = [
  {
    title: "Gold",
    price: "5000",
    description: ["Street Lightning ✔", "Waste Management ✔", "Gardening ✔"],
    buttonText: "Buy Now",
    buttonVariant: "outlined",
  },
  {
    title: "Platinum",
    price: "10000",
    description: [
      "Burgler Alarm ✔",
      "Water Level ✔",
      "Fire Alarm ✔",
      "Street Lightning ✔",
      "Waste Management ✔",
      "Gardening ✔",
      "24/7 Customer Support ✔",
    ],
    buttonText: "Buy Now",
    buttonVariant: "outlined",
  },
  {
    title: "Silver",
    price: "4000",
    description: ["Street Lightning ✔", "Waste Management ✔"],
    buttonText: "Buy Now",
    buttonVariant: "outlined",
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

class Subscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePackage: {},
      purchasing: "",
      loading: false,
      dialogLoading: false,
      openPurchase: false,
      cancelDialogLoading: false,
      openCancel: false,
      snackOpen: false,
      snackMessage: "",
      snackSeverity: "success",
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const uid = this.props.user.uid;
    dbref
      .child("smartSociety")
      .child("alert")
      .child(uid)
      .child("subscriptionDetails")
      .on("value", (response) => {
        const pack = response.val();
        this.setState({ activePackage: pack });
      });
    this.setState({ loading: false });
  }

  purchaseHandler = (pack) => {
    this.setState({
      purchasing: pack,
      openPurchase: true,
    });
  };

  handlePurchaseClose = (consent) => {
    if (consent) {
      this.setState({ dialogLoading: true });
      const uid = this.props.user.uid;
      let pack = cardsData.filter(
        (card) => card.title === this.state.purchasing
      );
      let date = new Date();
      const startDate = date
        .toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
        .replace(/ /g, "-");
      date = new Date(new Date().setDate(new Date().getDate() + 30));
      const endDate = date
        .toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
        .replace(/ /g, "-");
      const request = {
        balance: pack[0].price + "/-Rs",
        endDate: endDate,
        packageName: pack[0].title,
        startDate: startDate,
        subscriptionStatus: "ACTIVE",
      };
      dbref
        .child("smartSociety")
        .child("alert")
        .child(uid)
        .child("subscriptionDetails")
        .update(request)
        .then(() => {
          this.setState({
            dialogLoading: false,
            openPurchase: false,
            snackOpen: true,
            snackMessage: "Package purchased successfully!",
            snackSeverity: "success",
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            dialogLoading: false,
            openPurchase: false,
            openSnack: true,
            snackSeverity: "error",
            snackMsg: "Something went wrong, check console",
          });
        });
    } else {
      this.setState({
        openPurchase: false,
      });
    }
  };

  cancelHandler = () => {
    this.setState({
      openCancel: true,
    });
  };

  handleCancelClose = (consent) => {
    if (consent) {
      this.setState({ cancelDialogLoading: true });
      const uid = this.props.user.uid;
      const request = {
        balance: "0",
        endDate: "0",
        packageName: "",
        startDate: "0",
        subscriptionStatus: "DEACTIVE",
      };
      dbref
        .child("smartSociety")
        .child("alert")
        .child(uid)
        .child("subscriptionDetails")
        .update(request)
        .then(() => {
          this.setState({
            cancelDialogLoading: false,
            openCancel: false,
            snackOpen: true,
            snackMessage: "Package purchased successfully!",
            snackSeverity: "success",
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            cancelDialogLoading: false,
            openCancel: false,
            openSnack: true,
            snackSeverity: "error",
            snackMsg: "Something went wrong, check console",
          });
        });
    } else {
      this.setState({
        openCancel: false,
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
    let dialogContent = (
      <Typography gutterBottom>
        Are you sure you want to to purchase the {this.state.purchasing}{" "}
        package?
      </Typography>
    );

    let receipt = null;

    if (this.state.activePackage.subscriptionStatus === "ACTIVE") {
      receipt = (
        <Card className={classes.receipt}>
          <CardContent className={classes.receiptRoot}>
            <Typography
              variant="h5"
              align="center"
              className={classes.receiptTitle}
              gutterBottom
            >
              Receipt
            </Typography>
            <Grid container>
              <Grid item xs={6} className={classes.receiptHeaders}>
                <Typography variant="h6" align="center">
                  Item
                </Typography>
              </Grid>
              <Grid item xs={6} className={classes.receiptHeaders}>
                <Typography variant="h6" align="center">
                  Description
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  className={classes.receiptText}
                  variant="body1"
                  align="center"
                >
                  Package Name
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  className={classes.receiptText}
                  variant="body1"
                  align="center"
                >
                  {this.state.activePackage.packageName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  className={classes.receiptText}
                  variant="body1"
                  align="center"
                >
                  Start Date
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  className={classes.receiptText}
                  variant="body1"
                  align="center"
                >
                  {this.state.activePackage.startDate}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  className={classes.receiptText}
                  variant="body1"
                  align="center"
                >
                  End Date
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  className={classes.receiptText}
                  variant="body1"
                  align="center"
                >
                  {this.state.activePackage.endDate}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  className={classes.receiptText}
                  variant="body1"
                  align="center"
                >
                  Subscription Status
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  className={classes.receiptText}
                  variant="body1"
                  align="center"
                >
                  {this.state.activePackage.subscriptionStatus}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              color="secondary"
              variant="contained"
              className={classes.receiptButton}
              onClick={this.cancelHandler}
            >
              Cancel Subscription
            </Button>
          </CardActions>
        </Card>
      );
    }

    let content = (
      <>
        <CssBaseline />
        <Container
          maxWidth="sm"
          component="main"
          className={classes.mainContent}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Subscription
          </Typography>
          {this.state.activePackage.subscriptionStatus === "DEACTIVE" ? (
            <div
              style={{
                padding: "10px",
                backgroundColor: "#2196f3",
                color: "white",
                borderRadius: "10px",
              }}
            >
              <Typography variant="h6">
                You have not subscribed to any any package!
              </Typography>
            </div>
          ) : (
            receipt
          )}
        </Container>
        <Container
          maxWidth="sm"
          component="main"
          className={classes.mainContent}
        >
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Package Options
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p"
          >
            Have pricing-related questions? Visit our help page for FAQ.
          </Typography>
        </Container>
        <Container maxWidth="md" component="main">
          <Grid container spacing={7} alignItems="flex-end">
            {cardsData.map((cardsData) => (
              <Grid
                item
                key={cardsData.title}
                xs={12}
                sm={cardsData.title === "Gold" ? 12 : 12}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={cardsData.title}
                    subheader={cardsData.subheader}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardSubscription}>
                      <Typography component="h4" variant="h5">
                        Rs.{cardsData.price}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        /Month
                      </Typography>
                    </div>
                    <ul>
                      {cardsData.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                          color="textSecondary"
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant={cardsData.buttonVariant}
                      color="primary"
                      onClick={() => {
                        this.purchaseHandler(cardsData.title);
                      }}
                      disabled={
                        this.state.activePackage.packageName === cardsData.title
                      }
                    >
                      {cardsData.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Dialog
          open={this.state.openPurchase}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.handlePurchaseClose(false)}
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
            Purchase Confirmation
          </DialogTitle>
          <DialogContent>
            {this.state.dialogLoading ? (
              <h1>
                <CircularProgress className={classes.loader} />
              </h1>
            ) : (
              dialogContent
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handlePurchaseClose(false)}
              color="secondary"
              variant="contained"
              className={classes.Button}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.handlePurchaseClose(true);
              }}
              color="primary"
              variant="contained"
              className={classes.Button}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openCancel}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.handleCancelClose(false)}
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
            Cancellation Confirmation
          </DialogTitle>
          <DialogContent>
            {this.state.cancelDialogLoading ? (
              <h1>
                <CircularProgress className={classes.loader} />
              </h1>
            ) : (
              <Typography gutterBottom>
                Are you sure you want to cancel your{" "}
                {this.state.activePackage.packageName} subscription?
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleCancelClose(false)}
              color="secondary"
              variant="contained"
              className={classes.Button}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.handleCancelClose(true);
              }}
              color="primary"
              variant="contained"
              className={classes.Button}
            >
              Confirm
            </Button>
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
      </>
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

export default connect(mapStateToProps)(
  withStyles(useStyles, { withTheme: true })(Subscription)
);
