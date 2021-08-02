import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import hasRouteAccess from './functions/hasRouteAccess';
import { useRootState } from './hooks/importIndex';
import routes from "./routes/appRoutes";
import { setAuthStateFromLocalStorage } from './state/import_indexes/authIndex';


const App: React.FC = () => {

  const authState = useRootState().auth
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAuthStateFromLocalStorage())
  }, [])

  const renderRoutes = (): ReactNode => routes.map(r =>
    <Route
      key={r.linkName} path={r.path} exact={r.exact}
      render={() => hasRouteAccess(r, authState) ?
        <r.component {...r.props} /> : <Redirect to={"/"} />
      } />
  )

  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Switch>
          {renderRoutes()}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;


