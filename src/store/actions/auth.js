import * as actionTypes from "./actionTypes";
import { auth, dbref } from "../../shared/fire";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (email, token, isAdmin, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    email: email,
    token: token,
    isAuthenticated: true,
    isAdmin: isAdmin,
    user: user,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
    isAuthenticated: false,
  };
};

const logout = () => {
  localStorage.removeItem("ss_token");
  localStorage.removeItem("uid");
  localStorage.removeItem("ss_expiration");
  localStorage.removeItem("url");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const subPack = (pack) => {
  return {
    type: actionTypes.SUBS_DETS,
    subscription: pack,
  };
};

export const authLogout = () => {
  return (dispatch) => {
    dispatch(authStart());
    auth
      .signOut()
      .then((response) => {
        dispatch(logout());
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

const checkAuthTimeout = (expTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expTime);
  };
};

export const authInitiate = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    //sign in
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCred) => {
        const token = userCred.user.ya;
        const uid = userCred.user.uid;
        //get account status and role
        dbref
          .child("smartSociety")
          .child("users")
          .child(uid)
          .on("value", (snapshot) => {
            let user = snapshot.val();
            let isAdmin = false;
            if (!user || !user["accountStatus"]) {
              user = {
                accountStatus: "DEACTIVE",
              };
            } else if (
              user["userRole"] === process.env["REACT_APP_ADMIN_KEY"]
            ) {
              isAdmin = true;
            }
            dispatch(authSuccess(auth.currentUser.email, token, isAdmin, user));
          });
        localStorage.setItem("ss_token", token);
        localStorage.setItem("uid", uid);
        //check Subscription
        dbref
          .child("smartSociety")
          .child("alert")
          .child(uid)
          .child("subscriptionDetails")
          .on("value", (response) => {
            const pack = response.val();
            if (pack.subscriptionStatus === "ACTIVE") {
              const endDate = new Date(
                Date.parse(pack.endDate.replace(/-/g, " "))
              );
              endDate.setDate(endDate.getDate() + 1);
              if (endDate < new Date()) {
                const request = {
                  balance: "0",
                  endDate: "0",
                  packageName: "",
                  startDate: "0",
                  subscriptionStatus: "DEACTIVE",
                };
                dbref
                  .child("smartSociety")
                  .child("alert")
                  .child(uid)
                  .child("subscriptionDetails")
                  .update(request);
              }
              dispatch(subPack(pack));
            }
          });
        //set session expiration
        userCred.user
          .getIdTokenResult()
          .then((response) => {
            localStorage.setItem(
              "ss_expiration",
              new Date(response.expirationTime)
            );
            dispatch(
              checkAuthTimeout(
                new Date(response.expirationTime).getTime() -
                  new Date().getTime()
              )
            );
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("ss_token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("ss_expiration"));
      const uid = localStorage.getItem("uid");
      if (expirationDate > new Date()) {
        dispatch(authStart());
        dbref
          .child("smartSociety")
          .child("users")
          .child(uid)
          .on("value", (snapshot) => {
            let user = snapshot.val();
            let isAdmin = false;
            if (!user || !user["accountStatus"]) {
              user = {
                accountStatus: "DEACTIVE",
              };
            } else if (
              user["userRole"] === process.env["REACT_APP_ADMIN_KEY"]
            ) {
              isAdmin = true;
            }
            dispatch(authSuccess(user["userEmail"], token, isAdmin, user));
            //check Subscription
            dbref
              .child("smartSociety")
              .child("alert")
              .child(uid)
              .child("subscriptionDetails")
              .on("value", (response) => {
                const pack = response.val();
                if (pack.subscriptionStatus === "ACTIVE") {
                  const endDate = new Date(
                    Date.parse(pack.endDate.replace(/-/g, " "))
                  );
                  endDate.setDate(endDate.getDate() + 1);
                  if (endDate < new Date()) {
                    const request = {
                      balance: "0",
                      endDate: "0",
                      packageName: "",
                      startDate: "0",
                      subscriptionStatus: "DEACTIVE",
                    };
                    dbref
                      .child("smartSociety")
                      .child("alert")
                      .child(uid)
                      .child("subscriptionDetails")
                      .update(request);
                  }
                  dispatch(subPack(pack));
                }
              });
          });
        dispatch(
          checkAuthTimeout(
            new Date(expirationDate).getTime() - new Date().getTime()
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};

const set_user_init_data = (userCred, name, phone, user_email) => {
  //user data
  const uid = userCred.user.uid;
  const init_user_data = {
    accountStatus: "ACTIVE",
    mfaStatus: "DEACTIVE",
    name: name,
    phoneNumber: String(phone),
    societyAddress: "",
    societyCity: "",
    societyName: "",
    uid: uid,
    userEmail: user_email,
    userRole: "7895",
  };
  dbref.child("smartSociety").child("users").child(uid).update(init_user_data);
  //alert -> alert data
  const init_alert_data = {
    flood: -1,
    fire: -1,
    house: -1,
    light: -1,
    moisture: -1,
    waste: -1,
  };
  dbref
    .child("smartSociety")
    .child("alert")
    .child(uid)
    .child("alert")
    .update(init_alert_data);
  //alert -> totalCount data
  const init_totalCount_data = {
    floodTotal: 0,
    fireTotal: 0,
    houseTotal: 0,
    lightTotal: 0,
    moistureTotal: 0,
    wasteTotal: 0,
  };
  dbref
    .child("smartSociety")
    .child("alert")
    .child(uid)
    .child("totalCount")
    .update(init_totalCount_data);
  //alert -> subscriptionDetails data
  const init_subscriptionDetails_data = {
    balance: "0",
    endDate: "0",
    packageName: "",
    startDate: "0",
    subscriptionStatus: "DEACTIVE",
  };
  dbref
    .child("smartSociety")
    .child("alert")
    .child(uid)
    .child("subscriptionDetails")
    .update(init_subscriptionDetails_data);
};

export const signUpInitiate = (email, password, phone, name) => {
  return (dispatch) => {
    dispatch(authStart());
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCred) => {
        userCred.user
          .sendEmailVerification()
          .then((response) => {})
          .catch((error) => {});
        //set values in local storage for auto-sign-in
        const token = userCred.user.ya;
        const user_email = userCred.user.email;
        const uid = userCred.user.uid;
        //initial db entry
        set_user_init_data(userCred, name, phone, user_email);
        dbref
          .child("smartSociety")
          .child("users")
          .child(uid)
          .on("value", (snapshot) => {
            const user = snapshot.val();
            dispatch(authSuccess(auth.currentUser.email, token, false, user));
          });
        localStorage.setItem("ss_token", token);
        localStorage.setItem("uid", uid);
        userCred.user
          .getIdTokenResult()
          .then((response) => {
            localStorage.setItem(
              "ss_expiration",
              new Date(response.expirationTime)
            );
            dispatch(
              checkAuthTimeout(
                new Date(response.expirationTime).getTime() -
                  new Date().getTime()
              )
            );
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

export const setFooterLoading = (loading) => {
  return (dispatch) =>
    dispatch({
      type: actionTypes.FOOTER_LOADING,
      loading: loading,
    });
};
