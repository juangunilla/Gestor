import { Facebook, Google, Twitter } from '@mui/icons-material'
import Alert from '@mui/material/Alert'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import estilosmodulescss from 'dist/css/estilos.module.scss'
import React, { FunctionComponent } from 'react'
import { useGoogleLogin } from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import FileUpload from '../components/FileUpload/FileUpload'
import { mergeClasses } from '../services/utils'
import { addUsers, editUsers } from '../store/actions/usersActions'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const localStyles = makeStyles({
  mainPanel: { ['@media (min-width:960px)']: { backgroundColor: '#56baec', width: '100%', flexGrow: 1 } },
  loginHolder: { margin: '5rem auto 0', width: '30vw', textAlign: 'center' },
  loginArea: {
    position: 'relative',
    background: 'white',
    padding: '4rem 3rem 2rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    boxSizing: 'border-box',
    boxShadow: '0px 3px 20px 5px #00000030',
  },
  loginTitle: { textTransform: 'uppercase', fontSize: '1.2rem', letterSpacing: '0.1rem', color: '#3084af' },
  image: {
    width: '5rem',
    position: 'absolute',
    top: '-2.5rem',
    left: 'calc(15vw - (2.5rem + 2.5px))',
    border: '5px solid white',
    borderRadius: '5rem',
  },
})
const Register: FunctionComponent = (props: any) => {
  const classes = mergeClasses(baseClasses, localStyles())
  const initialDataUsers = {
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    ProfilePic: '',
    Role: '',
  }
  const [Usersdata, setUsersData] = React.useState<any>(initialDataUsers)
  const handleUsersChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setUsersData({
      ...Usersdata,
      [name]: value,
    })
  }
  const theme = estilosmodulescss
  const [registerError, setregisterError] = React.useState<any>(null)
  const dispatch = useDispatch()

  // Theme selection

  const usersData = useSelector((state: IState) => state.users)

  const onGoogleSuccess = (res) => {
    console.log('Login Success: Current User: ', res.profileObj)
  }

  const onGoogleFailure = (res) => {
    console.log('Login Failed: res: ', res)
    if (res.error === 'popup_closed_by_user') {
      setregisterError('You must complete the login process in order to login.')
    }
  }

  const { signIn: googleSignIn } = useGoogleLogin({
    onSuccess: onGoogleSuccess,
    onFailure: onGoogleFailure,
    clientId: '185605994716-97itv5an2ligdaq8b4r3l4r8h95rlip6.apps.googleusercontent.com',
    isSignedIn: false,
    accessType: 'offline',
  })

  const handleRegister = () => {
    const data = { ...Usersdata }

    if (data._id) {
      dispatch(editUsers(data as any))
    } else {
      dispatch(addUsers(data as any))
    }
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={aptugotheme}>
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

              <NavLink exact to="/register" key="RHZOyF7f">
                <ListItem button className={classes.itemLink}>
                  <ListItemText>Register</ListItemText>
                </ListItem>
              </NavLink>
            </Toolbar>
          </AppBar>

          <Container className={theme.loginPage} maxWidth={false}>
            <Grid container alignItems="stretch">
              <Grid item md={3}>
                <Paper elevation={5} variant="elevation" classes={{ root: theme.paperLeft }}>
                  Welcome back
                </Paper>
              </Grid>

              <Grid item md={9}>
                <div className={theme.right}>
                  Have an account?
                  <a className={theme.greenText} href="/Login">
                    Login!
                  </a>
                </div>

                <div className={theme.loginBox}>
                  <div>
                    <Typography variant="h3">Register in to Aptugo</Typography>

                    <Typography variant="body1">Enter your details below.</Typography>
                  </div>

                  <div className={theme.externalSignIn}>
                    <Button variant="outlined" onClickCapture={googleSignIn} className={theme.google} fullWidth>
                      <Google color="default" />
                    </Button>

                    <Button variant="outlined" onClickCapture={googleSignIn} className={theme.facebook} fullWidth>
                      <Facebook />
                    </Button>

                    <Button variant="outlined" onClickCapture={googleSignIn} className={theme.twitter} fullWidth>
                      <Twitter />
                    </Button>
                  </div>

                  <div className={theme.separatorLine}>or</div>

                  {registerError && (
                    <React.Fragment>
                      <Alert variant="standard" severity="error">
                        {registerError}
                      </Alert>
                    </React.Fragment>
                  )}

                  <FileUpload label="Profile Picture" value={Usersdata.ProfilePic} onChange={handleUsersChange('ProfilePic')} variant="outlined" />

                  <TextField
                    margin="normal"
                    label="First Name"
                    type="text"
                    fullWidth
                    className={'field_FirstName'}
                    variant="outlined"
                    value={Usersdata.FirstName || ''}
                    onChange={handleUsersChange('FirstName')}
                    error={usersData?.errField === 'FirstName'}
                    helperText={usersData?.errField === 'FirstName' && usersData.errMessage}
                  />

                  <TextField
                    margin="normal"
                    label="Last Name"
                    type="text"
                    fullWidth
                    className={'field_LastName'}
                    variant="outlined"
                    value={Usersdata.LastName || ''}
                    onChange={handleUsersChange('LastName')}
                    error={usersData?.errField === 'LastName'}
                    helperText={usersData?.errField === 'LastName' && usersData.errMessage}
                  />

                  <TextField
                    margin="normal"
                    label="Email"
                    type="text"
                    fullWidth
                    className={'field_Email'}
                    variant="outlined"
                    value={Usersdata.Email || ''}
                    onChange={handleUsersChange('Email')}
                    error={usersData?.errField === 'Email'}
                    helperText={usersData?.errField === 'Email' && usersData.errMessage}
                  />

                  <TextField
                    margin="normal"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={Usersdata.Password}
                    onChange={handleUsersChange('Password')}
                  />

                  <Button variant="contained" color="primary" onClickCapture={handleRegister} fullWidth>
                    Register
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default Register
