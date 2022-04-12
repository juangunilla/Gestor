import AppBar from '@mui/material/AppBar'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import estilosmodulescss from 'dist/css/estilos.module.scss'
import React, { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'
import baseClasses from './layout.module.scss'

const Dashboard: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const theme = estilosmodulescss

  // Theme selection

  return (
    <React.Fragment>
      <div className={theme.pages}>
        <AppBar elevation={1} color="transparent" position="sticky" title="">
          <Toolbar className={theme.navbar}>
            <NavLink exact to="/" key="ThRLRZCp">
              <ListItem button className={classes.itemLink}>
                <ListItemText>Inicio</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink exact to="/Clientes" key="edIBpn6b">
              <ListItem button className={classes.itemLink}>
                <ListItemText>Clientes</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink exact to="/Expedientes" key="MDqhLTeF">
              <ListItem button className={classes.itemLink}>
                <ListItemText>Expedientes</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink exact to="/FechasSimulacros" key="nTE2iwtI">
              <ListItem button className={classes.itemLink}>
                <ListItemText>Fechas Simulacros</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink exact to="/Grupos" key="rnKmJTdE">
              <ListItem button className={classes.itemLink}>
                <ListItemText>Grupos</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink exact to="/SIMs" key="v44r9N9v">
              <ListItem button className={classes.itemLink}>
                <ListItemText>SIMs</ListItemText>
              </ListItem>
            </NavLink>
          </Toolbar>
        </AppBar>

        <div className={theme.mainarea}>
          <div className={theme.home}>
            <Typography variant="h1">
              <span className={theme.text}>Bienvenido a tu Gestor</span>
            </Typography>

            <picture>
              <img
                className={theme.imagen}
                src="/img/CC_Express_20220329_1322400.5272013117519887.png"
                alt="/img/CC_Express_20220329_1322400.5272013117519887.png"
              />
            </picture>

            <span className={theme.version}>
              <span>(Versión 1.0)</span>
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
