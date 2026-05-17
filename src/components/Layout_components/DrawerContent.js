import { makeStyles } from "@material-ui/core/styles";
import {
  Toolbar,
  List,
  Divider,
  ListItemText,
  ListItem,
  ListItemIcon,
} from "@material-ui/core";

import Logo from "../../assets/logos/Logo.png";

import ApartmentIcon from "@material-ui/icons/Apartment";
import SettingsIcon from "@material-ui/icons/Settings";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";

import DashboardIcon from "@material-ui/icons/Dashboard";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import FeedbackIcon from "@material-ui/icons/Feedback";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import WarningIcon from "@material-ui/icons/Warning";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import HelpIcon from "@material-ui/icons/Help";

import { withRouter } from "react-router";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  drawerContainer: {
    overflow: "auto",
  },
  logo: {
    height: 57,
    width: 57,
    borderRadius: "50%",
    cursor: "pointer",
    marginLeft: "30%",
    color: "black",
    background: "#2196f3",
  },
  Toolbar: {
    alignItems: "center",
  },
}));

const DrawerContent = (props) => {
  const classes = useStyles();

  let navitems = [
    {
      text: "Home",
      icon: <ApartmentIcon />,
      onClick: () => {
        props.history.push("/");
        props.clicked();
      },
    },
    {
      text: "Services",
      icon: <SettingsIcon />,
      onClick: () => {
        props.history.push("/services");
        props.clicked();
      },
    },
    {
      text: "Login",
      icon: <VpnKeyIcon />,
      onClick: () => {
        props.history.push("/login");
        props.clicked();
      },
    },
    {
      text: "About Us",
      icon: <PeopleOutlineIcon />,
      onClick: () => {
        props.history.push("/about_us");
        props.clicked();
      },
    },
    {
      text: "Contact Us",
      icon: <ContactSupportIcon />,
      onClick: () => {
        props.history.push("/contact_us");
        props.clicked();
      },
    },
  ];

  if (props.isAuthenticated) {
    if (props.isAdmin) {
      navitems = [
        {
          text: "Dashboard",
          icon: <DashboardIcon />,
          onClick: () => {
            props.history.push("/");
            if (props.clicked) props.clicked();
          },
        },
        {
          text: "Complaints",
          icon: <WarningIcon />,
          onClick: () => {
            props.history.push("/complaints");
            if (props.clicked) props.clicked();
          },
        },
        {
          text: "Feedback",
          icon: <FeedbackIcon />,
          onClick: () => {
            props.history.push("/feedback");
            if (props.clicked) props.clicked();
          },
        },
        {
          text: "Contact",
          icon: <ContactMailIcon />,
          onClick: () => {
            props.history.push("/contact");
            if (props.clicked) props.clicked();
          },
        },
        {
          text: "Profile",
          icon: <AccountCircleIcon />,
          onClick: () => {
            props.history.push("/profile");
            if (props.clicked) props.clicked();
          },
        },
        {
          text: "Logout",
          icon: <ExitToAppIcon />,
          onClick: () => {
            props.history.push("/logout");
            if (props.clicked) props.clicked();
          },
        },
      ];
    } else {
      navitems = [
        {
          text: "Dashboard",
          icon: <DashboardIcon />,
          onClick: () => {
            props.history.push("/");
            if (props.clicked) props.clicked();
          },
        },
        {
          text: "My Subscription",
          icon: <MonetizationOnIcon />,
          onClick: () => {
            props.history.push("/mysub");
            if (props.clicked) props.clicked();
          },
        },
        {
          text: "Feedback",
          icon: <FeedbackIcon />,
          onClick: () => {
            props.history.push("/feedback");
            if (props.clicked) props.clicked();
          },
        },
        {
          text: "Complaint",
          icon: <WarningIcon />,
          onClick: () => {
            props.history.push("/complaint");
            if (props.clicked) props.clicked();
          },
        },
        {
          text: "Help",
          icon: <HelpIcon />,
          onClick: () => {
            props.history.push("/help");
            if (props.clicked) props.clicked();
          },
        },
        {
          text: "Profile",
          icon: <AccountCircleIcon />,
          onClick: () => {
            props.history.push("/profile");
            if (props.clicked) props.clicked();
          },
        },
        {
          text: "Logout",
          icon: <ExitToAppIcon />,
          onClick: () => {
            props.history.push("/logout");
            if (props.clicked) props.clicked();
          },
        },
      ];
    }
  }

  return (
    <>
      <Toolbar style={{ height: "65px" }}>
        <img
          src={Logo}
          className={classes.logo}
          onClick={() => {
            props.history.push("/");
            if (props.clicked) props.clicked();
          }}
          alt="Smart Society"
        />
      </Toolbar>
      <div className={classes.drawerContainer}>
        <Divider />
        <List>
          {navitems.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={index} onClick={onClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin,
  };
};

export default withRouter(connect(mapStateToProps)(DrawerContent));
