import { Grid, Typography, Container, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logos/Logo.png";
import { withRouter } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "rgba(0, 0, 0, 0.54)",
        }}
      >
        Smart Society
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },

  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },

  links: {
    textDecoration: "none",
    color: "rgba(0, 0, 0, 0.54)",
  },

  listItem: {
    padding: theme.spacing(1),
  },

  logo: {
    height: 90,
    width: 90,
    borderRadius: "50%",
    cursor: "pointer",
    marginBottom: "10px",
    [theme.breakpoints.up("md")]: {
      marginRight: "20px",
    },
  },

  footerAddress: {
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
}));

const footers = [
  {
    title: "Company",
    id: 1,
    description: [
      { item: "Team", link: "/team" },
      { item: "Contact us", link: "/contact_us" },
    ],
  },
  {
    title: "Show Stoppers",
    id: 2,
    description: [
      { item: "Fire outbreak", link: "/#fire" },
      { item: "Waste Management", link: "/#waste" },
      { item: "Flood Outbreak", link: "/#flood" },
    ],
  },
  {
    title: "Additional Features",
    id: 3,
    description: [
      { item: "Gardening", link: "/services" },
      { item: "Burglary Detection", link: "/services" },
      { item: "Lawn Lightening", link: "/services" },
    ],
  },
  {
    title: "Legal",
    id: 4,
    description: [
      {
        item: "Privacy policy",
        link: {
          pathname:
            "https://drive.google.com/file/d/16b4Z9KVgkNeLlG02iv6nLPGWIYsX8j-r/view",
        },
      },
      { item: "Help", link: "/help" },
    ],
  },
];

const Footer = (props) => {
  const classes = useStyles();

  return (
    <>
      <Container component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {/* <Grid item xs={false} sm={1} md={false}/> */}
          <Grid item xs={12} md={2}>
            <img
              src={Logo}
              className={classes.logo}
              onClick={() => {
                props.history.push("/");
                if (props.clicked) props.clicked();
              }}
              alt="Smart Society"
            />
            <Typography variant="h6" className={classes.footerAddress}>
              Smart Society
            </Typography>
            <Typography variant="body2" className={classes.footerAddress}>
              Matrix IT Park
            </Typography>
            <Typography variant="body2" className={classes.footerAddress}>
              Near Vishwakarma Institute of Information Technology,
            </Typography>
            <Typography variant="body2" className={classes.footerAddress}>
              Pune-411046
            </Typography>
            <Typography variant="body2" className={classes.footerAddress}>
              Maharashtra, India
            </Typography>
            <Typography variant="body2" className={classes.footerAddress}>
              Tel: +91 90115 45411
            </Typography>
          </Grid>
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} md={2} key={footer.id}>
              <Typography variant="h5" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((desc) => (
                  <li key={desc.item} className={classes.listItem}>
                    <NavLink
                      className={classes.links}
                      target={desc.item === "Privacy policy" ? "_blank" : ""}
                      to={desc.link}
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      {desc.item}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
          {/* <Grid item xs={false} sm={1} md={false} /> */}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default withRouter(Footer);
