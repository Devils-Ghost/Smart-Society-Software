import { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

import Layout from "./hoc/Layout/Layout";
import * as actions from "./store/actions";

import Landing from "./components/General/Landing/landing";
import SignIn from "./containers/Auth/SignIn";
import SignUp from "./containers/Auth/SignUp";
import ForgotPassword from "./containers/Auth/ForgotPassword";
import Services from "./components/General/Services";
import AboutUs from "./components/General/AboutUs";
import ContactUs from "./components/General/ContactUs";
import Profile from "./components/General/Profile";
import Team from "./components/General/Team";

import Dashboard from "./components/Admin/Dashboard";
import UserDetails from "./components/Admin/UserDetails";
import Complaints from "./components/Admin/Complaints";
import ViewFeedback from "./components/Admin/ViewFeedback";
import Contact from "./components/Admin/Contact";

import UserDashboard from "./components/User/UserDashboard";
// import UserDashboard from "./components/User/test dashboard";
import MySubscriptions from "./components/User/MySubscription";
import Feedback from "./components/User/Feedback";
import Complaint from "./components/User/Complaint";
import Help from "./components/User/Help";

import Logout from "./containers/Auth/Logout";

import ScrollToTop from "./ScrollToTop";
import ScrollHandler from "./ScrollHandler";

class App extends Component {
  resizeHandler = () => {
    this.forceUpdate();
  };

  componentDidMount() {
    window.onbeforeunload = (event) => {
      const url =
        event.currentTarget.location.pathname +
        event.currentTarget.location.search;
      localStorage.setItem("url", url);
    };
    this.props.tryAutoSignIn();
    window.addEventListener("resize", this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/services" component={Services} />
        <Route path="/login" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgot_password" component={ForgotPassword} />
        <Route path="/about_us" component={AboutUs} />
        <Route path="/contact_us" component={ContactUs} />
        <Route path="/team" component={Team} />
        <Route path="/help" component={Help} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      if (this.props.isAdmin) {
        routes = (
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/edit_user" component={UserDetails} />
            <Route path="/complaints" component={Complaints} />
            <Route path="/feedback" component={ViewFeedback} />
            <Route path="/contact" component={Contact} />
            <Route path="/profile" component={Profile} />
            <Route path="/logout" component={Logout} />
            <Redirect to="/" />
          </Switch>
        );
      } else {
        if (
          (this.props.user.name === null &&
            this.props.user.accountStatus === "DEACTIVE") ||
          this.props.user.mfaStatus === "DEACTIVE"
        ) {
          routes = (
            <Switch>
              <Route path="/" exact component={UserDashboard} />
              <Redirect to="/" />
            </Switch>
          );
        } else {
          routes = (
            <Switch>
              <Route path="/" exact component={UserDashboard} />
              <Route path="/mysub" component={MySubscriptions} />
              <Route path="/feedback" component={Feedback} />
              <Route path="/complaint" component={Complaint} />
              <Route path="/help" component={Help} />
              <Route path="/profile" component={Profile} />
              <Route path="/logout" component={Logout} />
              <Redirect to="/" />
            </Switch>
          );
        }
      }
    }

    return (
      <div className="App">
        <Layout>
          <ScrollToTop />
          <ScrollHandler />
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tryAutoSignIn: () => dispatch(actions.checkAuthState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
