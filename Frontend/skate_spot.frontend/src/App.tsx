import React, { ReactNode } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navigation from './components/navigation/Navigation'
import { RedirectNotPrivileged } from './components/navigation/RedirectNotPrivileged'
import FlashMsgs from './components/shared/FlashMsgs'
import hasRouteAccess from './functions/route/hasRouteAccess'
import { useAuthFromLocalStorage } from './hooks/useAuthFromLocalStorage'
import { routes } from './routes/appRoutes'
import { useRootState } from './state/store'

const App: React.FC = () => {
  const state = useRootState()

  useAuthFromLocalStorage()

  const renderRoutes = (): ReactNode =>
    routes.map(r => (
      <Route
        key={r.linkName}
        path={r.path}
        exact={true}
        render={() =>
          hasRouteAccess(r, state.auth) ? (
            <r.component />
          ) : (
            <RedirectNotPrivileged />
          )
        }
      />
    ))

  return (
    <>
      <FlashMsgs />
      <BrowserRouter>
        <Navigation />
        <Switch>{renderRoutes()}</Switch>
      </BrowserRouter>
    </>
  )
}

export default App
