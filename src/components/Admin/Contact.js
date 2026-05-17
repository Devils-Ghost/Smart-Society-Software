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
  root: {
    backgroundColor: "#ffffff",
    minHeight: "100%",
    width: "100%",
    paddingTop: theme.spacing(5),
  },
  head: {
    backgroundColor: "#f6f6f6",
    fontWeight: "bold",
    [theme.breakpoints.down('xs')]:
    {
      fontSize:12,

    }
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
    [theme.breakpoints.down('xs')]:
    {
      width:"20%",
      fontSize:9,


    }
  },
  card: {
    width: theme.spacing(40),
    height: theme.spacing(25),
    display: "inline-block",
    margin: theme.spacing(1),
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    border: "1px dotted black",
    [theme.breakpoints.only('xs')]:
    {
      width: "90%",
      height: "70%",
      //marginLeft: theme.spacing(1.5),
      padding: theme.spacing(0),
       display: "block",

    },
    [theme.breakpoints.between(500,800)]:
    {
      width: "100%",
      height: "70%",
      //marginLeft: theme.spacing(1.5),
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
    [theme.breakpoints.only('xs')]:
    {
      minWidth: "50%",
    marginRight: theme.spacing(1),

    },
    [theme.breakpoints.between(500,800)]:
    {
      minWidth: "40%",
     // marginRight: theme.spacing(6),

    }
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
    
  TableBody:{
    [theme.breakpoints.only('xs')]:
    {
      fontSize:12,
    }
  },
});

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: {},
      error: {},
      totalRequests: 0,
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
    let count = 0;
    if (this.props.isAuthenticated) {
      dbref
        .child("smartSociety")
        .child("contactRequests")
        .on("value", (response) => {
          let requests = response.val();
          if (requests !== null) {
            this.setState({ requests: requests });
            Object.keys(requests).map((id, index) => {
              if (requests[id].status === "COMPLETED") {
                parseInt(count++);
              }
              return count;
            });
            this.setState({ solvedCount: count });
          }
        });
      dbref
        .child("smartSociety")
        .child("contactRequests")
        .on("value", (snapshot) => {
          let total = snapshot.numChildren();
          this.setState({ totalRequests: total, loading: false });
        });

      this.props.footerLoading(false);
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
      let date = new Date();
      const completedDate = date
        .toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
        .replace(/ /g, "-");
      let data = {
        name: this.state.requests[this.state.viewId].name,
        email: this.state.requests[this.state.viewId].email,
        phone: this.state.requests[this.state.viewId].phone,
        initiatedOn: this.state.requests[this.state.viewId].initiatedOn,
        description: this.state.requests[this.state.viewId].description,
        status: "COMPLETED",
        completedAt: completedDate,
        adminName: this.props.user["name"],
        remark: this.state.remark,
      };
      dbref
        .child("smartSociety")
        .child("contactRequests")
        .child(this.state.viewId)
        .update(data)
        .then(() => {
          this.componentDidMount();
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

  viewContactRequestHandler = (id) => {
    this.setState({
      viewId: id,
      dialogOpen: true,
    });
  };

  getTableBodyContent = (requests) => {
    const { classes } = this.props;
    return Object.keys(requests).length !== 0 ? (
      Object.keys(requests)
        .slice(
          this.state.page * this.state.rowsPerPage,
          this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
        )
        .map((id, index) => (
          <TableRow key={index}>
            <TableCell className={classes.TableBody}>{requests[id].name}</TableCell>
            {this.state.hideColumns ? (
              <TableCell hidden={true} style={{ display: "none" }}></TableCell>
            ) : (
              <TableCell>
                <Box alignItems="center" display="flex">
                  <Typography color="textPrimary" variant="body1"  className={classes.TableBody}>
                    {" "}
                    {requests[id].email}
                  </Typography>
                </Box>
              </TableCell>
            )}

            {this.state.hideColumns ? (
              <TableCell hidden={true} style={{ display: "none" }}></TableCell>
            ) : (
              <TableCell>{requests[id].phone}</TableCell>
            )}
            {this.state.hideColumns ? (
              <TableCell hidden={true} style={{ display: "none" }}></TableCell>
            ) : (
            <TableCell  className={classes.TableBody}>{requests[id].description}</TableCell>
            )}
            <TableCell  className={classes.TableBody}>{requests[id].status}</TableCell>

            <TableCell>
              <Button
                size="small"
                variant="contained"
                color="primary"
                className={classes.Button}
                startIcon={<ViewIcon />}
                onClick={() => this.viewContactRequestHandler(id)}
              >
                View Request
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
              No Contact Requests Found
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
    const requests = this.state.requests;
    let filter = this.state.filter;
    if (event.target.name === "searchBy") {
      key = event.target.value;
    }
    if (event.target.name === "filter") {
      filter = event.target.value;
    }
    let searchResults = {};
    if (filter === "" || key === "") {
      console.log();
      this.setState({
        searchResults: searchResults,
        [event.target.name]: event.target.value,
        page: 0,
      });
    } else if (key === "status") {
      Object.keys(requests).forEach((id) => {
        const request = requests[id];
        if (request[key] === filter) {
          searchResults = {
            ...searchResults,
            [id]: request,
          };
        }
      });
      this.setState({
        searchResults: searchResults,
        [event.target.name]: event.target.value,
        page: 0,
      });
    } else {
      Object.keys(requests).forEach((id) => {
        const request = requests[id];
        if (request[key].toLowerCase().includes(filter.toLowerCase())) {
          searchResults = {
            ...searchResults,
            [id]: request,
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
            Pending
          </Typography>
          <Divider className={classes.divider} />
          <Typography className={classes.count3} component="h1" variant="h2">
            {this.state.totalRequests - this.state.solvedCount}
          </Typography>
        </Card>
        <Card className={classes.card}>
          <Typography color="textPrimary" component="h1" variant="h4">
            Completed
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
            {this.state.totalRequests}
          </Typography>
        </Card>
        <Box display="flex" justifyContent="flex-end" className={classes.Box}>
          {this.state.searchBy === "status" ? (
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
                <MenuItem value="PENDING">PENDING</MenuItem>
                <MenuItem value="COMPLETED">COMPLETED</MenuItem>
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
              <MenuItem value="phone">Phone Number</MenuItem>
              <MenuItem value="description">Description</MenuItem>
              <MenuItem value="status"> Status</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Table  className={classes.table}>
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
               {this.state.hideColumns ? (
                <TableCell
                  hidden={true}
                  style={{ display: "none" }}
                ></TableCell>
              ) : (
              <TableCell className={classes.head}>Description</TableCell>)
                }     

              <TableCell className={classes.head}>Status</TableCell>
              <TableCell className={classes.head}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.filter === "" || this.state.searchBy === ""
              ? this.getTableBodyContent(this.state.requests)
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
                ? Object.keys(this.state.requests).length
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
            style={{ backgroundColor: "#2196f3", color: "white" }}
          >
            Contact Request Details
          </DialogTitle>
          {this.state.dialogOpen ? (
            <>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <InputLabel className={classes.dialogLabel}>
                    Status: {this.state.requests[this.state.viewId].status}
                  </InputLabel>
                  <Divider />
                  <InputLabel className={classes.dialogLabel}>
                    Name: {this.state.requests[this.state.viewId].name}
                  </InputLabel>
                  <Divider />
                  <InputLabel className={classes.dialogLabel}>
                    E-mail: {this.state.requests[this.state.viewId].email}
                  </InputLabel>
                  <Divider />
                  <InputLabel className={classes.dialogLabel}>
                    Phone number: {this.state.requests[this.state.viewId].phone}
                  </InputLabel>
                  <Divider />
                  <InputLabel className={classes.dialogLabel}>
                    Description:{" "}
                    {this.state.requests[this.state.viewId].description}
                  </InputLabel>
                  <Divider />
                  <InputLabel className={classes.dialogLabel}>
                    Date: {this.state.requests[this.state.viewId].initiatedOn}
                  </InputLabel>
                  <Divider />
                  {this.state.requests[this.state.viewId].status ===
                    "PENDING" && (
                    <InputLabel className={classes.dialogLabel}>
                      Write a remark
                    </InputLabel>
                  )}
                  {this.state.requests[this.state.viewId].status ===
                    "COMPLETED" && (
                    <InputLabel className={classes.dialogLabel}>
                      Remark:{""}
                      {this.state.requests[this.state.viewId].remark}
                    </InputLabel>
                  )}
                  <Divider />

                  {this.state.requests[this.state.viewId].status ===
                    "COMPLETED" && (
                    <InputLabel className={classes.dialogLabel}>
                      Admin Name:{" "}
                      {this.state.requests[this.state.viewId].adminName}
                    </InputLabel>
                  )}
                  <Divider />

                  {this.state.requests[this.state.viewId].status ===
                    "COMPLETED" && (
                    <InputLabel className={classes.dialogLabel}>
                      Completed At:{" "}
                      {this.state.requests[this.state.viewId].completedAt}
                    </InputLabel>
                  )}
                  <Divider />
                </DialogContentText>
                {this.state.requests[this.state.viewId].status ===
                  "PENDING" && (
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
                {this.state.requests[this.state.viewId].status ===
                  "PENDING" && (
                  <Button
                    onClick={() => this.closeDialog(true)}
                    color="primary"
                    variant="contained"
                    className={classes.Button}
                    style={{ fontSize: "12px" }}
                  >
                    Mark as Completed
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
            Contact has been done successfully!
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
)(withStyles(useStyles, { withTheme: true })(Contact));
