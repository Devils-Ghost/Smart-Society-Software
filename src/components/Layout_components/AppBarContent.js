import { Typography, Button, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Logo from "../../assets/logos/Logo.png";

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: "right",
    cursor: "pointer",
  },
  Button: {
    width: "auto",
    height: "60px",
    "&:hover": {
      background: "#0266b8",
      borderBottom: "4px solid white",
      color: "#FFF",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.6rem",
    },
  },
  title: {
    flex: 1,
    cursor: "pointer",
  },
  menuButton: {
    width: "auto",
    "&:hover": {
      background: "#0266b8",
      color: "#FFF",
    },
  },
  logo: {
    height: 57,
    width: 57,
    borderRadius: "50%",
    cursor: "pointer",
  },
}));

const AppBarContent = (props) => {
  const classes = useStyles();
  let icon = (
    <img
      src={Logo}
      className={classes.logo}
      onClick={() => props.history.push("/")}
      alt="Smart Society"
    />
  );
  let navitems = [
    {
      text: "Home",
      onClick: () => props.history.push("/"),
    },
    {
      text: "Services",
      onClick: () => props.history.push("/services"),
    },
    {
      text: "Login",
      onClick: () => props.history.push("/login"),
    },
    {
      text: "About Us",
      onClick: () => props.history.push("/about_us"),
    },
    {
      text: "Contact Us",
      onClick: () => props.history.push("/contact_us"),
    },
  ];

  if (window.innerWidth <= 600) {
    icon = (
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={props.menuClicked}
      >
        <MenuIcon />
      </IconButton>
    );
    navitems = [
      {
        text: "Login",
        onClick: () => props.history.push("/login"),
      },
    ];
  }

  if (props.isAuthenticated) {
    navitems = [
      {
        text: "Logout",
        onClick: () => props.history.push("/logout"),
      },
    ];
  }

  return (
    <>
      {icon}
      <Typography
        variant="h6"
        className={classes.title}
        onClick={() => props.history.push("/")}
      >
        Smart Society
      </Typography>
      {navitems.map((item, index) => {
        const { text, onClick } = item;
        return (
          <Button
            key={index}
            color="inherit"
            className={classes.Button}
            onClick={onClick}
          >
            {text}
          </Button>
        );
      })}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default withRouter(connect(mapStateToProps)(AppBarContent));
