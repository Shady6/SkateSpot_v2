import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from "./routes/appRoutes"
import Navigation from './components/Navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthStateFromLocalStorage } from './state/import_indexes/authIndex';


const App: React.FC = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAuthStateFromLocalStorage())
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Switch>
          {routes.map((route, index) => {
            return <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={() => (
                <route.component
                  name={route.name}
                  {...route.props}
                />
              )}
            />
          })}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
