import React, { Suspense } from "react";

// ** Router Import
import Router from "./router/Router";

// ** Redux import
import { useSelector } from "react-redux";

const App = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <Suspense fallback={null}>
      <Router user={auth?.user} />
    </Suspense>
  );
};

export default App;
