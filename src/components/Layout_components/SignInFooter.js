import { Link } from "react-router-dom";
import { Typography, Container, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  },
}));

const Footer = (props) => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Box>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default Footer;
