import { ReactNode } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import FlashMsgs from "./components/shared/FlashMsgs";
import hasRouteAccess from "./functions/hasRouteAccess";
import { useAuthFromLocalStorage } from "./hooks/useAuthFromLocalStorage";
import routes from "./routes/appRoutes";
import { useRootState } from "./state/store";

const App: React.FC = () => {
  const state = useRootState();
  useAuthFromLocalStorage();

  const renderRoutes = (): ReactNode =>
    routes.map((r) => (
      <Route
        key={r.linkName}
        path={r.path}
        exact={r.exact}
        render={() =>
          hasRouteAccess(r, state.auth) ? (
            <r.component {...r.props} />
          ) : (
            <Redirect to={"/"} />
          )
        }
      />
    ));

  return (
    <div>
      <FlashMsgs />
      <BrowserRouter>
        <Navigation />
        <Switch>{renderRoutes()}</Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
