import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AppBar from '@mui/material/AppBar'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import estilosmodulescss from 'dist/css/estilos.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AddDialog from '../components/Dialog/Dialog'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import { addSims, editSims, loadSims, removeSim, searchSims } from '../store/actions/simsActions'
import { ISimsItem } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const SIMs: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDataSIMs = {
    Nombre: '',
  }
  const [SIMsdata, setSIMsData] = React.useState<any>(initialDataSIMs)
  const handleSIMsChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setSIMsData({
      ...SIMsdata,
      [name]: value,
    })
  }
  const simsData = useSelector((state: IState) => state.sims)
  const theme = estilosmodulescss
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForSIMs = (event) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({ ...tableloadoptions, searchString: event.target.value })
    }, 500)
  }
  const [searchFieldloadoptions, setsearchFieldloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performsearchFieldload = (options) => {
    dispatch(options.searchString ? searchSims(options) : loadSims(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogSimsAction, setdialogSimsAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchSims(options) : loadSims(options))
  }
  React.useEffect(() => {
    performtableload({
      ...tableloadoptions,
    })
  }, [tableloadoptions])

  // Theme selection

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
            <Container maxWidth="lg">
              <div className={theme.tableHeading}>
                <Typography variant="h4">SIM list</Typography>
              </div>

              <Paper>
                <div className={classes.tableResponsive}>
                  <div className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search SIM..."
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForSIMs}
                    />

                    <LocalAddDialog
                      isOpen={dialogSimsAction !== ''}
                      onOpen={() => setdialogSimsAction('add')}
                      onSave={() => setdialogSimsAction('')}
                      onClose={() => setdialogSimsAction('')}
                      action={dialogSimsAction}
                      addOptions={{ title: 'Add SIM', text: 'Enter SIM data', button: 'Add' }}
                      editOptions={{ title: 'Edit SIM', text: 'Update SIM data', button: 'Edit' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: ISimsItem) => {
                        if (dialogSimsAction === 'delete') {
                          dispatch(removeSim(data))
                        } else {
                          dialogSimsAction === 'add' ? dispatch(addSims(data)) : dispatch(editSims(data))
                        }
                      }}
                      color="primary"
                      data={SIMsdata}
                      initialData={initialDataSIMs}
                      setData={setSIMsData}
                      allowMultipleSubmit={dialogSimsAction === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="Nombre"
                        type="text"
                        fullWidth
                        className={'field_Nombre'}
                        variant="standard"
                        value={SIMsdata.Nombre || ''}
                        onChange={handleSIMsChange('Nombre')}
                        error={simsData?.errField === 'Nombre'}
                        helperText={simsData?.errField === 'Nombre' && simsData.errMessage}
                      />
                    </LocalAddDialog>
                  </div>

                  <div>
                    <Table
                      tableHead={['Nombre', 'Actions']}
                      tableData={simsData.foundsims.length ? simsData.foundsims : (simsData.sims as any)}
                      orderBy={tableloadoptions.sort.field}
                      order={tableloadoptions.sort.method}
                      onRequestSort={(event, property) => {
                        settableloadoptions({
                          ...tableloadoptions,
                          sort: {
                            field: property,
                            method: tableloadoptions.sort.field === property ? (tableloadoptions.sort.method === 'asc' ? 'desc' : 'asc') : 'ASC',
                          },
                        })
                      }}
                    >
                      <Field value={(fieldData: any) => fieldData.Nombre} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setSIMsData(e.element)
                            setdialogSimsAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeSim(e.element))
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </Table>
                  </div>
                </div>
              </Paper>
            </Container>
          </div>
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default SIMs
