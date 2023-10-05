// ** React Imports
import { Suspense } from "react";
import { Navigate } from "react-router-dom";

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from "@utils";

// ** Spinner Import
import Spinner from "../spinner/Loading-spinner";

const PublicRoute = ({ children, route }) => {
  if (route) {
    const user = getUserData();

    const restrictedRoute = route.meta && route.meta.restricted;

    if (user && restrictedRoute) {
      return <Navigate to={getHomeRouteForLoggedInUser(user.role)} />;
    }
  }

  return (
    <Suspense fallback={<Spinner className="content-loader" />}>
      {children}
    </Suspense>
  );
};

export default PublicRoute;
