import React, { Component } from "react";
import { connect } from "react-redux";
import ViewIcon from "@material-ui/icons/Visibility";
import TablePagination from "@material-ui/core/TablePagination";
import SearchIcon from "@material-ui/icons/Search";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Container,
  Button,
  Box,
  Card,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as actions from "../../store/actions";
import { dbref } from "../../shared/fire";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = (theme) => ({
  root: {
    paddingTop: theme.spacing(5),
    backgroundColor: "White",
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
  box: {
    width: "100%",
    overflow: "auto",
  },
  Button: {
    textDecoration: "none",
    textTransform: "none",
    width: "100%",
    // padding: theme.spacing(2),
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
      //marginLeft: theme.spacing(1.5),
      padding: theme.spacing(0),
      display: "block",
    },
    [theme.breakpoints.between(500, 800)]: {
      width: "100%",
      height: "70%",
      //marginLeft: theme.spacing(1.5),
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
  TableBody: {
    [theme.breakpoints.only("xs")]: {
      fontSize: 12,
    },
  },
});
class ViewFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: {},
      error: {},
      avgRating: 0,
      loading: false,
      searchBy: "",
      filter: "",
      searchResults: {},
      openView: false,
      hideColumns: false,
      id: "",
      openSnack: false,
      rowsPerPage: 5,
      page: 0,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.footerLoading(true);
    let avgRating = [];
    if (this.props.isAuthenticated) {
      dbref
        .child("smartSociety")
        .child("feedback")
        .on(
          "value",
          (response) => {
            const feedback = response.val();
            if (feedback !== null) {
              this.setState({
                feedback: feedback,
                loading: false,
              });
              this.props.footerLoading(false);
              Object.keys(feedback).map((id, index) => {
                if (feedback[id].rating !== undefined)
                  avgRating.push(parseInt(feedback[id].rating));
                return 0;
              });
              const average = (arr) =>
                arr.reduce((p, c) => p + c, 0) / arr.length;
              this.setState({ avgRating: average(avgRating) });
            } else {
              this.setState({ loading: false });
            }
          },
          (error) => {
            const errorObj = error;
            console.log(errorObj);
            this.setState({
              error: errorObj,
              loading: false,
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

  handleSnackClose = () => {
    this.setState({ openSnack: false });
  };
  openDialog = (uid) => {
    this.setState({ openView: true, id: uid });
  };
  handleClose = () => {
    this.setState({ openView: false, id: "" });
  };

  getTableBodyContent = (feedback) => {
    const { classes } = this.props;
    return Object.keys(feedback).length !== 0 ? (
      Object.keys(feedback)
        .slice(
          this.state.page * this.state.rowsPerPage,
          this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
        )
        .map((uid, index) => (
          <TableRow key={index}>
            <TableCell>{feedback[uid].name}</TableCell>
            {this.state.hideColumns ? (
              <TableCell hidden={true} style={{ display: "none" }}></TableCell>
            ) : (
              <TableCell className={classes.TableBody}>
                {feedback[uid].userEmail}
              </TableCell>
            )}
            <TableCell>
              <Box alignItems="center" display="flex">
                <Typography
                  color="textPrimary"
                  variant="body1"
                  className={classes.TableBody}
                >
                  {" "}
                  {feedback[uid].feedbackType}
                </Typography>
              </Box>
            </TableCell>
            {this.state.hideColumns ? (
              <TableCell hidden={true} style={{ display: "none" }}></TableCell>
            ) : (
              <TableCell className={classes.TableBody}>
                {feedback[uid].feedback}
              </TableCell>
            )}
            <TableCell>
              <Button
                size="small"
                variant="contained"
                color="primary"
                className={classes.Button}
                startIcon={<ViewIcon />}
                onClick={() => this.openDialog(uid)}
              >
                View Feedback
              </Button>
            </TableCell>
          </TableRow>
        ))
    ) : (
      <TableRow>
        <TableCell>
          <Box alignItems="center" display="flex">
            <Typography color="textPrimary" variant="body1">
              {" "}
              No Feedback Found
            </Typography>
          </Box>
        </TableCell>
      </TableRow>
    );
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    this.setState({ page: 0 });
  };

  handleChange = (event) => {
    let key = this.state.searchBy;
    const feedbacks = this.state.feedback;
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
      Object.keys(feedbacks).forEach((id) => {
        const feedback = feedbacks[id];
        console.log();
        if (feedback[key].toLowerCase().includes(filter.toLowerCase())) {
          searchResults = {
            ...searchResults,
            [id]: feedback,
          };
        }
      });
      this.setState({
        searchResults: searchResults,
        [event.target.name]: event.target.value,
      });
    }
  };

  render() {
    const { classes } = this.props;
    let content = (
      <Container className={classes.root}>
        <Card className={classes.card}>
          <Typography color="textPrimary" component="h1" variant="h4">
            Total Feedback
          </Typography>
          <Divider className={classes.divider} />
          <Typography
            color="textPrimary"
            className={classes.count1}
            component="h1"
            variant="h2"
          >
            {Object.keys(this.state.feedback).length}
          </Typography>
        </Card>
        <Card className={classes.card}>
          <Typography color="textPrimary" component="h1" variant="h4">
            Average Rating
          </Typography>
          <Divider className={classes.divider} />
          <Typography
            color="textPrimary"
            className={classes.count2}
            component="h1"
            variant="h2"
          >
            {this.state.avgRating}
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
              uncomment
              when
              search
              function
              is
              ready
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="feedbackType">Feedback Type</MenuItem>
              <MenuItem value="feedback">User Comment</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Table>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell className={classes.head}>Name</TableCell>
              {this.state.hideColumns ? (
                <TableCell
                  hidden={true}
                  style={{ display: "none" }}
                ></TableCell>
              ) : (
                <TableCell className={classes.head}>Email</TableCell>
              )}
              <TableCell className={classes.head}>Feedback Type</TableCell>
              {this.state.hideColumns ? (
                <TableCell
                  hidden={true}
                  style={{ display: "none" }}
                ></TableCell>
              ) : (
                <TableCell className={classes.head}>Feedback</TableCell>
              )}
              <TableCell className={classes.head}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.filter === ""
              ? this.getTableBodyContent(this.state.feedback)
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
                ? Object.keys(this.state.feedback).length
                : Object.keys(this.state.searchResults).length
            }
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Box>
        <Dialog
          open={this.state.openView}
          onClose={this.handleClose}
          TransitionComponent={Transition}
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
            Feedback Details
          </DialogTitle>
          <DialogContent>
            {this.state.openView ? (
              <>
                <InputLabel className={classes.dialogLabel}>
                  Name : {this.state.feedback[this.state.id].name}
                </InputLabel>
                <Divider />
                <InputLabel className={classes.dialogLabel}>
                  Email : {this.state.feedback[this.state.id].userEmail}
                </InputLabel>
                <Divider />
                <InputLabel className={classes.dialogLabel}>
                  Feedback Type :{" "}
                  {this.state.feedback[this.state.id].feedbackType}
                </InputLabel>
                <Divider />
                <InputLabel className={classes.dialogLabel}>
                  Comment : {this.state.feedback[this.state.id].feedback}
                </InputLabel>
                <Divider />
                <InputLabel className={classes.dialogLabel}>
                  Phone : {this.state.feedback[this.state.id].phoneNumber}
                </InputLabel>
                <Divider />
                <InputLabel className={classes.dialogLabel}>
                  Date : {this.state.feedback[this.state.id].date}
                </InputLabel>
              </>
            ) : (
              " "
            )}
          </DialogContent>
          <DialogActions>
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={this.handleClose}
              style={{ width: "20%" }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
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
)(withStyles(useStyles, { withTheme: true })(ViewFeedback));
