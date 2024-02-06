import React from "react";
import { useSelector } from "react-redux";
import { publicRoute,PrivateRoute } from "./allRoute";
import { Route, Redirect } from "react-router-dom";
import Layout from "./layout";
export default function AuthRoute() {
  const {
    user: { user },
  } = useSelector((state) => state.root);
  // console.log(user);
  return (
    <>
      {user && user?.email_verified_at ? (<>
      {
        PrivateRoute.map((rote, inx) => {
          return (
            <Route
              key={inx}
              path={rote.path}
              exact={true}
              render={(props) => {
                return <Layout {...props} {...rote} />;
              }}
            />
          );
        })
      }
        <Redirect to="/home" path="/" />
        </>
      ) : user ? (
        <>
          {publicRoute.map((rote, inx) => {
            return (
              <Route
                key={inx}
                path={rote.path}
                exact={true}
                render={(props) => {
                  return <Layout {...props} {...rote} />;
                }}
              />
            );
          })}
          <Redirect path="/otp" />
        </>
      ) : (
        <>
        {

        
        publicRoute.map((rote, inx) => {
          return (
            <Route
              key={inx}
              path={rote.path}
              exact={true}
              render={(props) => {
                return <Layout {...props} {...rote} />;
              }}
            />
          );
        })
      }
      <Redirect path="/" to={"/signin"} />
</>
      )
      }
    </>
  );
}
