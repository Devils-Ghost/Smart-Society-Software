import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import TablePagination from "@material-ui/core/TablePagination";
import SearchIcon from "@material-ui/icons/Search";
import MuiAlert from "@material-ui/lab/Alert";
import ViewIcon from "@material-ui/icons/Visibility";
import {
  Container,
  Button,
  Box,
  Card,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as actions from "../../store/actions";
import { dbref } from "../../shared/fire";

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
  head: {
    backgroundColor: "#f6f6f6",
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
    },
  },
  TableBody: {
    [theme.breakpoints.only("xs")]: {
      fontSize: 12,
    },
  },
  box: {
    width: "100%",
    overflow: "auto",
  },
  Button: {
    textDecoration: "none",
    textTransform: "none",
    width: "45%",
    paddingRight: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      width: "20%",
      fontSize: 9,
    },
  },
  card: {
    width: theme.spacing(40),
    height: theme.spacing(25),
    display: "inline-block",
    margin: theme.spacing(1),
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    border: "1px dotted black",
    [theme.breakpoints.only("xs")]: {
      width: "90%",
      height: "70%",
      marginLeft: theme.spacing(1.5),
      padding: theme.spacing(0),
      display: "block",
    },
    [theme.breakpoints.between(500, 800)]: {
      width: "85%",
      height: "70%",
      marginLeft: theme.spacing(1.5),
      padding: theme.spacing(0),
      display: "block",
    },
  },
  count1: {
    marginTop: theme.spacing(3),
    fontWeight: "bold",
    color: "green",
  },
  count2: {
    marginTop: theme.spacing(3),
    fontWeight: "bold",
    color: "#fdc500",
  },
  count3: {
    marginTop: theme.spacing(3),
    fontWeight: "bold",
    color: "red",
  },
  divider: {
    marginTop: theme.spacing(3),
    display: "none",
  },
  Box: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  formControl: {
    marginRight: theme.spacing(3),
    minWidth: 120,
    [theme.breakpoints.only("xs")]: {
      minWidth: "48%",
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.between(500, 800)]: {
      minWidth: "40%",
      marginRight: theme.spacing(6),
    },
  },
  loader: {
    margin: "10%",
    width: "100px !important",
    height: "100px !important",
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
  headingCard: {
    [theme.breakpoints.only("xs")]: {
      fontSize: 20,
      marginTop: theme.spacing(0.5),
    },
  },
  table: {
    margin: theme.spacing(1),
    [theme.breakpoints.only("xs")]: {
      width: "60%",
    },

    [theme.breakpoints.between(375, 426)]: {
      width: "100%",
    },
  },
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      error: {},
      loading: false,
      feedbackCount: 0,
      complaintCount: 0,
      searchBy: "",
      filter: "",
      searchResults: {},
      displayUser: {},
      hideColumns: false,
      dialogOpen: false,
      openView: false,
      openSnack: false,
      rowsPerPage: 5,
      page: 0,
      deleteDialogOpen: false,
      deleteUid: "",
      deleteLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.footerLoading(true);
    if (this.props.isAuthenticated) {
      let feedback, complaint;
      dbref
        .child("smartSociety")
        .child("feedback")
        .on("value", (snapshot) => {
          feedback = snapshot.numChildren();
        });
      dbref
        .child("smartSociety")
        .child("complaint")
        .on("value", (snapshot) => {
          complaint = snapshot.numChildren();
        });
      dbref
        .child("smartSociety")
        .child("users")
        .on(
          "value",
          (response) => {
            const users = response.val();
            this.setState({
              users: users,
              loading: false,
              feedbackCount: feedback,
              complaintCount: complaint,
            });
            this.props.footerLoading(false);
          },
          (error) => {
            const errorObj = error;
            this.setState({
              error: errorObj,
              loading: false,
              feedbackCount: feedback,
              complaintCount: complaint,
            });
            this.props.footerLoading(false);
          }
        );
    }

    if (window.innerWidth <= 623) {
      this.setState({
        hideColumns: true,
      });
    }
  }

  closeDialog = (consent) => {
    if (consent) {
      this.setState({
        dialogOpen: false,
        displayUser: {},
      });
      this.props.history.push("/edit_user?id=" + this.state.displayUser["uid"]);
    } else {
      this.setState({
        dialogOpen: false,
        displayUser: {},
      });
    }
  };

  handleSnackClose = () => {
    this.setState({ openSnack: false });
  };

  editUserHandler = (uid) => {
    const userToDisplay = this.state.users[uid];
    this.setState({
      displayUser: userToDisplay,
      dialogOpen: true,
    });
  };

  deleteUserHandler = (uid) => {
    dbref
      .child("smartSociety")
      .child("users")
      .child(uid)
      .remove()
      .then((response) => {
        //Delete successful
        this.setState({
          openSnack: true,
          severity: "error",
          msg: "Society Details Deleted Successfully!",
        });
      })
      .catch((error) => {
        // console.log(error);
      });
    dbref
      .child("smartSociety")
      .child("alert")
      .child(uid)
      .remove()
      .then((response) => {
        //delete successful
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getTableBodyContent = (users) => {
    const { classes } = this.props;
    return Object.keys(users).length !== 0 ? (
      Object.keys(users)
        .slice(
          this.state.page * this.state.rowsPerPage,
          this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
        )
        .map((uid, index) => (
          <TableRow key={index}>
            <TableCell className={classes.TableBody}>
              {users[uid].name}
            </TableCell>
            <TableCell>
              <Box alignItems="center" display="flex">
                <Typography
                  color="textPrimary"
                  variant="body1"
                  className={classes.TableBody}
                >
                  {" "}
                  {users[uid].societyName}
                </Typography>
              </Box>
            </TableCell>
            {this.state.hideColumns ? (
              <TableCell hidden={true} style={{ display: "none" }}></TableCell>
            ) : (
              <TableCell className={classes.TableBody}>
                {users[uid].societyAddress}
              </TableCell>
            )}
            {this.state.hideColumns ? (
              <TableCell hidden={true} style={{ display: "none" }}></TableCell>
            ) : (
              <TableCell className={classes.TableBody}>
                {users[uid].societyCity}
              </TableCell>
            )}

            <TableCell>
              <Grid container spacing={2}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  className={classes.Button}
                  startIcon={<ViewIcon />}
                  onClick={() => this.editUserHandler(uid)}
                >
                  View
                </Button>

                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  className={classes.Button}
                  startIcon={<DeleteIcon />}
                  onClick={() => this.deleteConfirmation(uid)}
                >
                  Delete
                </Button>
              </Grid>
            </TableCell>
          </TableRow>
        ))
    ) : (
      <TableRow>
        <TableCell>
          <Box alignItems="center" display="flex">
            <Typography color="textPrimary" variant="body1">
              {" "}
              No Society Found
            </Typography>
          </Box>
        </TableCell>
      </TableRow>
    );
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChange = (event) => {
    let key = this.state.searchBy;
    const users = this.state.users;
    let filter = this.state.filter;
    if (event.target.name === "searchBy") {
      key = event.target.value;
    }
    if (event.target.name === "filter") {
      filter = event.target.value;
    }
    let searchResults = {};
    if (filter === "" || key === "") {
      this.setState({
        searchResults: searchResults,
        [event.target.name]: event.target.value,
      });
    } else {
      Object.keys(users).forEach((uid) => {
        const user = users[uid];
        if (user[key].toLowerCase().includes(filter.toLowerCase())) {
          searchResults = {
            ...searchResults,
            [uid]: user,
          };
        }
      });
      this.setState({
        searchResults: searchResults,
        [event.target.name]: event.target.value,
      });
    }
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    this.setState({ page: 0 });
  };

  deleteConfirmation = (uid) => {
    this.setState({
      deleteUid: uid,
      deleteDialogOpen: true,
    });
  };

  closeDeleteDialog = (consent) => {
    if (consent) {
      this.setState({
        deleteLoading: true,
      });
      dbref
        .child("smartSociety")
        .child("users")
        .child(this.state.deleteUid)
        .remove()
        .then((response) => {
          //Delete successful
          this.setState({
            deleteLoading: false,
            deleteDialogOpen: false,
            openSnack: true,
            severity: "error",
            msg: "Society Details Deleted Successfully!",
          });
        })
        .catch((error) => {
          // console.log(error);
        });
      dbref
        .child("smartSociety")
        .child("alert")
        .child(this.state.deleteUid)
        .remove()
        .then((response) => {
          //delete successful
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({
        deleteDialogOpen: false,
      });
    }
  };

  render() {
    const { classes } = this.props;
    let content = (
      <Container className={classes.root}>
        <Card className={classes.card}>
          <Typography
            color="textPrimary"
            component="h1"
            variant="h4"
            className={classes.headingCard}
          >
            Total Users
          </Typography>
          <Divider className={classes.divider} />
          <Typography className={classes.count1} component="h1" variant="h2">
            {Object.keys(this.state.users).length}
          </Typography>
        </Card>
        <Card className={classes.card}>
          <Typography
            color="textPrimary"
            component="h1"
            variant="h4"
            className={classes.headingCard}
          >
            Total Feedback
          </Typography>
          <Divider className={classes.divider} />
          <Typography
            color="textPrimary"
            className={classes.count2}
            component="h1"
            variant="h2"
          >
            {this.state.feedbackCount}
          </Typography>
        </Card>
        <Card className={classes.card}>
          <Typography
            color="textPrimary"
            component="h1"
            variant="h4"
            className={classes.headingCard}
          >
            Total Complaints
          </Typography>
          <Divider className={classes.divider} />
          <Typography
            color="textPrimary"
            className={classes.count3}
            component="h1"
            variant="h2"
          >
            {this.state.complaintCount}
          </Typography>
        </Card>
        <Box display="flex" justifyContent="flex-end" className={classes.Box}>
          <FormControl className={classes.formControl}>
            <TextField
              variant="outlined"
              label="Filter"
              name="filter"
              value={this.state.filter}
              onChange={this.handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Search By
            </InputLabel>
            <Select
              label="Search By"
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              fullWidth
              name="searchBy"
              value={this.state.searchBy}
              onChange={this.handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="societyName">Sociey Name</MenuItem>
              <MenuItem value="societyAddress">Society Address</MenuItem>
              <MenuItem value="societyCity">Society City</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Table className={classes.table}>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell className={classes.head}>Name</TableCell>
              <TableCell className={classes.head}>Society Name</TableCell>
              {this.state.hideColumns ? (
                <TableCell
                  hidden={true}
                  style={{ display: "none" }}
                ></TableCell>
              ) : (
                <TableCell className={classes.head}>Society Address</TableCell>
              )}
              {this.state.hideColumns ? (
                <TableCell
                  hidden={true}
                  style={{ display: "none" }}
                ></TableCell>
              ) : (
                <TableCell className={classes.head}>Society City</TableCell>
              )}
              <TableCell className={classes.head}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.filter === ""
              ? this.getTableBodyContent(this.state.users)
              : this.getTableBodyContent(this.state.searchResults)}
          </TableBody>
        </Table>
        <Box>
          <TablePagination
            colSpan={3}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={
              this.state.filter === ""
                ? Object.keys(this.state.users).length
                : Object.keys(this.state.searchResults).length
            }
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Box>
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
            User Details
          </DialogTitle>
          <DialogContent>
            <InputLabel className={classes.dialogLabel}>
              <b>Account Status</b>: {this.state.displayUser.accountStatus}
            </InputLabel>
            <Divider />
            <InputLabel className={classes.dialogLabel}>
              <b>Role</b>:{" "}
              {this.state.displayUser.userRole ===
              process.env["REACT_APP_ADMIN_KEY"]
                ? "ADMIN"
                : "USER"}
            </InputLabel>
            <Divider />
            <InputLabel className={classes.dialogLabel}>
              <b>Name</b>: {this.state.displayUser.name}
            </InputLabel>
            <Divider />
            <InputLabel className={classes.dialogLabel}>
              <b>Phone</b>: {this.state.displayUser.phoneNumber}
            </InputLabel>
            <Divider />
            <InputLabel className={classes.dialogLabel}>
              <b>Email</b>: {this.state.displayUser.userEmail}
            </InputLabel>
            <Divider />
            <InputLabel className={classes.dialogLabel}>
              <b>Society</b>: {this.state.displayUser.societyName}
            </InputLabel>
            <Divider />
            <InputLabel className={classes.dialogLabel}>
              <b>Address</b>: {this.state.displayUser.societyAddress}
            </InputLabel>
            <Divider />
            <InputLabel className={classes.dialogLabel}>
              <b>City</b>: {this.state.displayUser.societyCity}
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
              onClick={() => this.closeDialog(true)}
              color="primary"
              variant="contained"
              className={classes.Button}
            >
              Edit
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.deleteDialogOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.closeDeleteDialog(false)}
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
            {this.state.deleteLoading ? (
              <h1>
                <CircularProgress className={classes.loader} />
              </h1>
            ) : (
              <Typography gutterBottom>
                Are you sure you want to delete this account?
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.closeDeleteDialog(false)}
              color="secondary"
              variant="contained"
              className={classes.Button}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.closeDeleteDialog(true);
              }}
              color="primary"
              variant="contained"
              className={classes.Button}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );

    if (this.state.loading) {
      content = (
        <h1>
          <CircularProgress className={classes.loader} />
        </h1>
      );
    }

    const url = localStorage.getItem("url");
    if (this.props.isAuthenticated && url !== "/" && url) {
      localStorage.removeItem("url");
      content = <Redirect to={url} />;
    }
    return content;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
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
)(withStyles(useStyles, { withTheme: true })(Dashboard));
