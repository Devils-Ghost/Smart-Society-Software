import { useState } from "react";
import { Tab, Tabs } from "@material-ui/core";
import SelfHelp from "./SelfHelp";
import FAQs from "./FAQs";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  indicator: {
    background: "#2196f3",
  },
  tabBar: {
    borderBottom: "1px solid #ccc",
  },
  tabButton: {
    [theme.breakpoints.down("sm")]: {
      width: "50%",
    },
  },
}));

const Help = (props) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Tabs
        centered
        value={selectedTab}
        onChange={handleChange}
        className={classes.tabBar}
        classes={{
          indicator: classes.indicator,
        }}
      >
        <Tab
          classes={{
            root: classes.tabButton,
          }}
          label="FAQs"
        />
        {props.isAuthenticated && (
          <Tab
            label="Self Help"
            classes={{
              root: classes.tabButton,
            }}
          />
        )}
      </Tabs>
      {selectedTab === 0 && <FAQs />}
      {props.isAuthenticated && selectedTab === 1 && <SelfHelp />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Help);
