import React from 'react'
import { Route, Switch } from 'react-router-dom'

const SIMs = React.lazy(() => import('./Pages/SIMs'))
const Grupos = React.lazy(() => import('./Pages/Grupos'))
const FechasSimulacros = React.lazy(() => import('./Pages/FechasSimulacros'))
const Expedientes = React.lazy(() => import('./Pages/Expedientes'))
const Clientes = React.lazy(() => import('./Pages/Clientes'))
const Dashboard = React.lazy(() => import('./Pages/dashboard'))

const App: React.FunctionComponent = (props: any) => {
  const routes = [
    {
      path: '/SIMs',
      name: 'SIMs',
      component: SIMs,
    },
    {
      path: '/Grupos',
      name: 'Grupos',
      component: Grupos,
    },
    {
      path: '/FechasSimulacros',
      name: 'Fechas Simulacros',
      component: FechasSimulacros,
    },
    {
      path: '/Expedientes',
      name: 'Expedientes',
      component: Expedientes,
    },
    {
      path: '/Clientes',
      name: 'Clientes',
      component: Clientes,
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
  ]

  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        return <Route exact path={prop.path} component={prop.component} key={key} />
      })}
    </Switch>
  )

  return (
    <React.Fragment>
      <React.Suspense fallback={<span>Loading</span>}>
        <React.Fragment>{switchRoutes}</React.Fragment>
      </React.Suspense>
    </React.Fragment>
  )
}

export default App
