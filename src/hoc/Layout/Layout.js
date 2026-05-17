import { useEffect, useState } from "react";
import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  Toolbar,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

import AppBarContent from "../../components/Layout_components/AppBarContent";
import DrawerContent from "../../components/Layout_components/DrawerContent";
import SignOutFooter from "../../components/Layout_components/SignOutFooter";
import SignInFooter from "../../components/Layout_components/SignInFooter";
import { connect } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    background: "#2196f3",
    [theme.breakpoints.up("sm")]: {
      zIndex: theme.zIndex.drawer + 1,
      marginLeft: drawerWidth,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    background: "#ffffff",
    minHeight: "100vh",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  children: {
    minHeight: "50vh",
  },
  snackbar: {
    top: "70px",
  },
  subs: {
    textDecoration: "underline",
    "&:hover": {
      cursor: "pointer",
      color: "blue",
    },
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Layout = (props) => {
  const testwindow = props.window;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    if (!props.isAdmin && props.subscription.subscriptionStatus === "ACTIVE") {
      const endDate = new Date(
        Date.parse(props.subscription.endDate.replace(/-/g, " "))
      );
      endDate.setDate(endDate.getDate() + 1);
      const endDateMinus1 = new Date(endDate);
      endDateMinus1.setDate(endDateMinus1.getDate() - 2);
      const currentDate = new Date();
      if (currentDate >= endDateMinus1 && currentDate <= endDate)
        setSnackOpen(true);
    }
  }, [props.subscription, props.isAdmin]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    testwindow !== undefined ? () => testwindow().document.body : undefined;

  let footer = <SignOutFooter />;

  if (props.isAuthenticated) {
    footer = <SignInFooter />;
  }

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <AppBarContent menuClicked={handleDrawerToggle} />
          </Toolbar>
        </AppBar>
        {(props.isAuthenticated || window.innerWidth <= 600) && (
          <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                <DrawerContent clicked={handleDrawerToggle} />
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                <DrawerContent />
              </Drawer>
            </Hidden>
          </nav>
        )}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div
            className={classes.children}
            style={props.isAuthenticated ? { minHeight: "70vh" } : {}}
          >
            {props.children}
          </div>
          {props.loading || props.footerLoading ? null : footer}
          <Snackbar
            classes={{ anchorOriginTopCenter: classes.snackbar }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackOpen}
          >
            <Alert
              severity="warning"
              onClose={() => {
                setSnackOpen(false);
              }}
            >
              Your Current subscription is ending soon! Click{" "}
              <span
                className={classes.subs}
                onClick={() => {
                  props.history.push("/mysub");
                  setSnackOpen(false);
                }}
              >
                here
              </span>{" "}
              to renew.
            </Alert>
          </Snackbar>
        </main>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    footerLoading: state.auth.footerLoading,
    loading: state.auth.loading,
    isAdmin: state.auth.isAdmin,
    subscription: state.auth.subscription,
  };
};

export default withRouter(connect(mapStateToProps)(Layout));
