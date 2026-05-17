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
  Divider,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
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
  DialogContentText,
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
  root1: {},
  root: {
    backgroundColor: "#ffffff",
    minHeight: "100%",
    width: "100%",
    paddingTop: theme.spacing(5),
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
    paddingRight: theme.spacing(2),
    marginRight: theme.spacing(1),
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
      // marginLeft: theme.spacing(1.5),
      padding: theme.spacing(0),
      display: "block",
    },
    [theme.breakpoints.between(500, 800)]: {
      width: "100%",
      height: "70%",
      marginLeft: theme.spacing(2),
      padding: theme.spacing(0),
      display: "block",
    },
  },
  count: {
    marginTop: theme.spacing(3),
    fontWeight: "bold",
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
      // marginRight: theme.spacing(6),
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

class Complaints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaints: {},
      error: {},
      activeCount: 0,
      solvedCount: 0,
      loading: false,
      searchBy: "",
      filter: "",
      searchResults: {},
      remark: "",
      viewId: "",
      hideColumns: false,
      openSnack: false,
      dialogOpen: false,
      rowsPerPage: 5,
      page: 0,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.footerLoading(true);
    if (this.props.isAuthenticated) {
      let active, solved;
      dbref
        .child("smartSociety")
        .child("complaint")
        .on("value", (snapshot) => {
          active = snapshot.numChildren();
          this.setState({ activeCount: active });
        });
      dbref
        .child("smartSociety")
        .child("solvedComplaints")
        .on("value", (snapshot) => {
          solved = snapshot.numChildren();
          this.setState({ solvedCount: solved });
        });
      dbref
        .child("smartSociety")
        .child("complaint")
        .on("value", (activeResponse) => {
          const activeComplaints = activeResponse.val();
          dbref
            .child("smartSociety")
            .child("solvedComplaints")
            .on("value", (solvedResponse) => {
              const solvedComplaints = solvedResponse.val();
              const totalComplaints = {
                ...activeComplaints,
                ...solvedComplaints,
              };
              this.setState({
                complaints: totalComplaints,
                loading: false,
              });
              this.props.footerLoading(false);
            });
        });
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

  closeDialog = (consent) => {
    if (consent) {
      const activeComplaint = this.state.complaints[this.state.viewId];
      activeComplaint["complaintStatus"] = "DEACTIVE";
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
      const solvedAt = startDate + " " + time;
      let solvedComplaint = {
        ...activeComplaint,
        solvedAt: solvedAt,
        adminName: this.props.user["name"],
        remark: this.state.remark,
      };
      dbref
        .child("smartSociety")
        .child("solvedComplaints")
        .child(this.state.viewId)
        .update(solvedComplaint);
      dbref
        .child("smartSociety")
        .child("complaint")
        .child(this.state.viewId)
        .remove()
        .then(() => {
          this.setState({
            dialogOpen: false,
            openSnack: true,
            viewId: "",
          });
        });
    } else {
      this.setState({
        dialogOpen: false,
        viewId: "",
      });
    }
  };

  viewComplaintHandler = (id) => {
    this.setState({
      viewId: id,
      dialogOpen: true,
    });
  };

  getTableBodyContent = (complaints) => {
    const { classes } = this.props;
    return Object.keys(complaints).length !== 0 ? (
      Object.keys(complaints)
        .slice(
          this.state.page * this.state.rowsPerPage,
          this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
        )
        .map((id, index) => (
          <TableRow key={index}>
            <TableCell>{complaints[id].name}</TableCell>
            {this.state.hideColumns ? (
              <TableCell hidden={true} style={{ display: "none" }}></TableCell>
            ) : (
              <TableCell>
                <Box alignItems="center" display="flex">
                  <Typography
                    color="textPrimary"
                    variant="body1"
                    className={classes.TableBody}
                  >
                    {" "}
                    {complaints[id].userEmail}
                  </Typography>
                </Box>
              </TableCell>
            )}
            {this.state.hideColumns ? (
              <TableCell hidden={true} style={{ display: "none" }}></TableCell>
            ) : (
              <TableCell>{complaints[id].phoneNumber}</TableCell>
            )}
            <TableCell className={classes.TableBody}>
              {complaints[id].complaintStatus}
            </TableCell>

            <TableCell>
              <Button
                size="small"
                variant="contained"
                color="primary"
                className={classes.Button}
                startIcon={<ViewIcon />}
                onClick={() => this.viewComplaintHandler(id)}
              >
                View Complaint
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
              No Complaint Found
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
    const complaints = this.state.complaints;
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
        page: 0,
      });
    } else if (key === "complaintStatus") {
      Object.keys(complaints).forEach((id) => {
        const complaint = complaints[id];
        if (complaint[key] === filter) {
          searchResults = {
            ...searchResults,
            [id]: complaint,
          };
        }
      });
      this.setState({
        searchResults: searchResults,
        [event.target.name]: event.target.value,
        page: 0,
      });
    } else {
      Object.keys(complaints).forEach((id) => {
        const complaint = complaints[id];
        if (complaint[key].toLowerCase().includes(filter.toLowerCase())) {
          searchResults = {
            ...searchResults,
            [id]: complaint,
          };
        }
      });
      this.setState({
        searchResults: searchResults,
        [event.target.name]: event.target.value,
        page: 0,
      });
    }
  };

  handleRemarkChange = (event) => {
    this.setState({
      remark: event.target.value,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    this.setState({ page: 0 });
  };

  render() {
    const { classes } = this.props;
    let content = (
      <Container className={classes.root}>
        <Card className={classes.card}>
          <Typography color="textPrimary" component="h1" variant="h4">
            Active
          </Typography>
          <Divider className={classes.divider} />
          <Typography className={classes.count3} component="h1" variant="h2">
            {this.state.activeCount}
          </Typography>
        </Card>
        <Card className={classes.card}>
          <Typography color="textPrimary" component="h1" variant="h4">
            Solved
          </Typography>
          <Divider className={classes.divider} />
          <Typography
            color="textPrimary"
            className={classes.count2}
            component="h1"
            variant="h2"
          >
            {this.state.solvedCount}
          </Typography>
        </Card>
        <Card className={classes.card}>
          <Typography color="textPrimary" component="h1" variant="h4">
            Total
          </Typography>
          <Divider className={classes.divider} />
          <Typography
            color="textPrimary"
            className={classes.count1}
            component="h1"
            variant="h2"
          >
            {this.state.activeCount + this.state.solvedCount}
          </Typography>
        </Card>
        <Box display="flex" justifyContent="flex-end" className={classes.Box}>
          {this.state.searchBy === "complaintStatus" ? (
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Filter
              </InputLabel>
              <Select
                label="Filter"
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                fullWidth
                name="filter"
                value={this.state.filter}
                onChange={this.handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                <MenuItem value="DEACTIVE">DEACTIVE</MenuItem>
              </Select>
            </FormControl>
          ) : (
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
          )}
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
              <MenuItem value="name">User Name</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="phoneNumber">Phone Number</MenuItem>
              <MenuItem value="complaintStatus">Complaint Status</MenuItem>
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
              {this.state.hideColumns ? (
                <TableCell
                  hidden={true}
                  style={{ display: "none" }}
                ></TableCell>
              ) : (
                <TableCell className={classes.head}>Phone Number</TableCell>
              )}
              <TableCell className={classes.head}>Status</TableCell>
              <TableCell className={classes.head}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.filter === "" || this.state.searchBy === ""
              ? this.getTableBodyContent(this.state.complaints)
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
                ? Object.keys(this.state.complaints).length
                : Object.keys(this.state.searchResults).length
            }
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Box>
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
              backgroundColor: "#2196f3",
              color: "white",
              textAlign: "center",
            }}
          >
            Complaint Details
          </DialogTitle>
          {this.state.dialogOpen ? (
            <>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <InputLabel className={classes.dialogLabel}>
                    Status:{" "}
                    {this.state.complaints[this.state.viewId].complaintStatus}
                  </InputLabel>
                  <Divider />
                  <InputLabel className={classes.dialogLabel}>
                    Name: {this.state.complaints[this.state.viewId].name}
                  </InputLabel>
                  <Divider />
                  <InputLabel className={classes.dialogLabel}>
                    E-mail: {this.state.complaints[this.state.viewId].userEmail}
                  </InputLabel>
                  <Divider />
                  <InputLabel className={classes.dialogLabel}>
                    Phone number:{" "}
                    {this.state.complaints[this.state.viewId].phoneNumber}
                  </InputLabel>
                  <Divider />
                  <InputLabel className={classes.dialogLabel}>
                    Complaint:{" "}
                    {this.state.complaints[this.state.viewId].complaint}
                  </InputLabel>
                  <Divider />
                  {this.state.complaints[this.state.viewId].complaintStatus ===
                    "ACTIVE" && (
                    <InputLabel className={classes.dialogLabel}>
                      Write a remark
                    </InputLabel>
                  )}
                </DialogContentText>
                {this.state.complaints[this.state.viewId].complaintStatus ===
                  "ACTIVE" && (
                  <TextField
                    className="textbox"
                    id="outlined-basic"
                    label="Remark"
                    name="remark"
                    variant="outlined"
                    value={this.state.remark}
                    onChange={this.handleRemarkChange}
                    style={{ width: "100%", height: "50px" }}
                  />
                )}
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
                {this.state.complaints[this.state.viewId].complaintStatus ===
                  "ACTIVE" && (
                  <Button
                    onClick={() => this.closeDialog(true)}
                    color="primary"
                    variant="contained"
                    className={classes.Button}
                  >
                    Mark as Solved
                  </Button>
                )}
              </DialogActions>
            </>
          ) : null}
        </Dialog>
        <Snackbar
          classes={{ anchorOriginTopRight: classes.snackbar }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.openSnack}
          autoHideDuration={6000}
          onClose={this.handleSnackClose}
        >
          <Alert onClose={this.handleSnackClose} severity="success">
            Complaint has been marked as solved!
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
)(withStyles(useStyles, { withTheme: true })(Complaints));
