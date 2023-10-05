// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import { Info } from "react-feather";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/home";

const Home = lazy(() => import("../../views/pages/Home/index"));
const Login = lazy(() => import("../../views/pages/Login/index"));
const Register = lazy(() => import("../../views/pages/Register/index"));
const Folder = lazy(() => import("../../views/pages/Folder/index"));
const ForgotPassword = lazy(() =>
  import("../../views/pages/ForgotPassword/index")
);
const StudySet = lazy(() => import("../../views/pages/StudySet/index"));
const FlashCard = lazy(() => import("../../views/pages/FlashCard/index"));
const Error = lazy(() => import("../../views/pages/Error/index"));
const Classroom = lazy(() => import("../../views/pages/Classroom/index"));

// ** Merge Routes
const useCustomRoutes = (user) => {
  const authorizedPage = (pageComponent) => {
    if (user) return pageComponent;
    return <Navigate to={"/login"} />;
  };

  const unAuthorizedPage = (pageComponent) => {
    if (!user) return pageComponent;
    return <Navigate to={"/home"} />;
  };

  return [
    {
      path: "/",
      index: true,
      element: <Navigate replace to={DefaultRoute} />,
    },
    {
      path: "/folder",
      element: <Folder />,
    },
    {
      path: "/folder/:inforFolder",
      element: <Info />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/login",
      element: unAuthorizedPage(<Login />),
      meta: {
        layout: "blank",
      },
    },
    {
      path: "/register",
      element: unAuthorizedPage(<Register />),
      meta: {
        layout: "blank",
      },
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
      meta: {
        layout: "blank",
      },
    },
    {
      path: "/study-set",
      element: <StudySet />,
    },
    {
      path: "/flash-card/:studySetId",
      element: <FlashCard />,
    },
    {
      path: "/classroom",
      element: <Classroom />,
    },
    {
      path: "*",
      element: <Error />,
      meta: {
        layout: "blank",
      },
    },
  ];
};

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout, user) => {
  const LayoutRoutes = [];

  const Routes = useCustomRoutes(user);

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout, user) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout, user);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, getRoutes };
