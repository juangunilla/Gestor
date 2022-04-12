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
import axios from 'axios'
import estilosmodulescss from 'dist/css/estilos.module.scss'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Autocomplete from '../components/Autocomplete'
import AddDialog from '../components/Dialog/Dialog'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import {
  addFechassimulacros,
  editFechassimulacros,
  loadFechassimulacros,
  removeFechasimulacro,
  searchFechassimulacros,
} from '../store/actions/fechassimulacrosActions'
import { IFechassimulacrosItem } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const FechasSimulacros: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDataFechasSimulacros = {
    RazonSocial: [],
    Expediente: [],
    Sim: [],
    Fecha: '',
    Hora: '',
  }
  const [FechasSimulacrosdata, setFechasSimulacrosData] = React.useState<any>(initialDataFechasSimulacros)
  const handleFechasSimulacrosChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setFechasSimulacrosData({
      ...FechasSimulacrosdata,
      [name]: value,
    })
  }
  const fechassimulacrosData = useSelector((state: IState) => state.fechassimulacros)
  const theme = estilosmodulescss
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForFechasSimulacros = (event) => {
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
    dispatch(options.searchString ? searchFechassimulacros(options) : loadFechassimulacros(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogFechassimulacrosAction, setdialogFechassimulacrosAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const clientesAutocompleteData = useSelector((state: IState) => state.clientes)
  const [RazonSocialOptions, setRazonSocialOptions] = React.useState<{ label: String; value: String }[]>([])
  const typeInSearchRazonSocialClientes = (typedIn) => {
    const searchOptions = { searchString: typedIn, searchField: 'RazonSocial', page: 1, limit: 10 }
    axios.get('https://gestor_gunillajuangmailcom.backend.aptugo.app/api/clientes/search/', { params: searchOptions }).then((result) => {
      setRazonSocialOptions(
        result.data.docs.map((cliente) => {
          return { label: cliente.RazonSocial, value: cliente._id }
        })
      )
    })
  }
  const [RazonSocialValue, setRazonSocialValue] = React.useState(null)
  React.useEffect(() => {
    if (!FechasSimulacrosdata.RazonSocial) return undefined
    const asArray = Array.isArray(FechasSimulacrosdata.RazonSocial) ? FechasSimulacrosdata.RazonSocial : [FechasSimulacrosdata.RazonSocial]
    setRazonSocialValue(asArray.map((item) => ({ label: item.RazonSocial, value: item._id })))
  }, [FechasSimulacrosdata.RazonSocial])
  const expedientesAutocompleteData = useSelector((state: IState) => state.expedientes)
  const [ExpedienteOptions, setExpedienteOptions] = React.useState<{ label: String; value: String }[]>([])
  const typeInSearchExpedienteExpedientes = (typedIn) => {
    const searchOptions = { searchString: typedIn, searchField: 'Expediente', page: 1, limit: 10 }
    axios.get('https://gestor_gunillajuangmailcom.backend.aptugo.app/api/expedientes/search/', { params: searchOptions }).then((result) => {
      setExpedienteOptions(
        result.data.docs.map((expediente) => {
          return { label: expediente.Expediente, value: expediente._id }
        })
      )
    })
  }
  const [ExpedienteValue, setExpedienteValue] = React.useState(null)
  React.useEffect(() => {
    if (!FechasSimulacrosdata.Expediente) return undefined
    const asArray = Array.isArray(FechasSimulacrosdata.Expediente) ? FechasSimulacrosdata.Expediente : [FechasSimulacrosdata.Expediente]
    setExpedienteValue(asArray.map((item) => ({ label: item.Expediente, value: item._id })))
  }, [FechasSimulacrosdata.Expediente])
  const simsAutocompleteData = useSelector((state: IState) => state.sims)
  const [SimOptions, setSimOptions] = React.useState<{ label: String; value: String }[]>([])
  const typeInSearchSimSims = (typedIn) => {
    const searchOptions = { searchString: typedIn, searchField: 'Nombre', page: 1, limit: 10 }
    axios.get('https://gestor_gunillajuangmailcom.backend.aptugo.app/api/sims/search/', { params: searchOptions }).then((result) => {
      setSimOptions(
        result.data.docs.map((sim) => {
          return { label: sim.Nombre, value: sim._id }
        })
      )
    })
  }
  const [SimValue, setSimValue] = React.useState(null)
  React.useEffect(() => {
    if (!FechasSimulacrosdata.Sim) return undefined
    const asArray = Array.isArray(FechasSimulacrosdata.Sim) ? FechasSimulacrosdata.Sim : [FechasSimulacrosdata.Sim]
    setSimValue(asArray.map((item) => ({ label: item.Nombre, value: item._id })))
  }, [FechasSimulacrosdata.Sim])
  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchFechassimulacros(options) : loadFechassimulacros(options))
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
              <div className={theme.headfechas}>
                <Typography variant="h4">
                  <span className={theme.titulos}>Fechas de simulacros</span>
                </Typography>
              </div>

              <Paper>
                <div className={classes.tableResponsive}>
                  <div className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Buscar fechas de simulacros"
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForFechasSimulacros}
                    />

                    <LocalAddDialog
                      isOpen={dialogFechassimulacrosAction !== ''}
                      onOpen={() => setdialogFechassimulacrosAction('add')}
                      onSave={() => setdialogFechassimulacrosAction('')}
                      onClose={() => setdialogFechassimulacrosAction('')}
                      action={dialogFechassimulacrosAction}
                      addOptions={{ title: 'Agregar Fechas de simulacros', text: 'Ingresar información de simulacros', button: 'Agregar' }}
                      editOptions={{ title: 'Editar Fechas del simulacro', text: 'Actualizar información ', button: 'Edit' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: IFechassimulacrosItem) => {
                        if (dialogFechassimulacrosAction === 'delete') {
                          dispatch(removeFechasimulacro(data))
                        } else {
                          dialogFechassimulacrosAction === 'add' ? dispatch(addFechassimulacros(data)) : dispatch(editFechassimulacros(data))
                        }
                      }}
                      color="primary"
                      data={FechasSimulacrosdata}
                      initialData={initialDataFechasSimulacros}
                      setData={setFechasSimulacrosData}
                      allowMultipleSubmit={dialogFechassimulacrosAction === 'add'}
                    >
                      <Autocomplete
                        chips
                        value={RazonSocialValue}
                        onType={typeInSearchRazonSocialClientes}
                        onChange={(newValue) =>
                          handleFechasSimulacrosChange('RazonSocial')(
                            newValue?.length
                              ? newValue.map((item) => ({ _id: item.value !== 'new' ? item.value : null, RazonSocial: item.label }))
                              : []
                          )
                        }
                        loading={clientesAutocompleteData.loadingStatus === 'loading'}
                        options={RazonSocialOptions}
                        label="RazonSocial"
                        fullWidth
                        variant="standard"
                        margin="dense"
                      />

                      <Autocomplete
                        value={ExpedienteValue}
                        onType={typeInSearchExpedienteExpedientes}
                        onChange={(newValue) =>
                          handleFechasSimulacrosChange('Expediente')(
                            newValue?.length
                              ? newValue.map((item) => ({ _id: item.value !== 'new' ? item.value : null, Expediente: item.label }))
                              : []
                          )
                        }
                        loading={expedientesAutocompleteData.loadingStatus === 'loading'}
                        options={ExpedienteOptions}
                        label="Expediente"
                        fullWidth
                        variant="standard"
                        margin="dense"
                      />

                      <Autocomplete
                        value={SimValue}
                        onType={typeInSearchSimSims}
                        onChange={(newValue) =>
                          handleFechasSimulacrosChange('Sim')(
                            newValue?.length ? newValue.map((item) => ({ _id: item.value !== 'new' ? item.value : null, Nombre: item.label })) : []
                          )
                        }
                        loading={simsAutocompleteData.loadingStatus === 'loading'}
                        options={SimOptions}
                        label="Sim"
                        fullWidth
                        variant="standard"
                        margin="dense"
                      />

                      <TextField
                        className={'field_Fecha'}
                        margin="dense"
                        label="Fecha"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={FechasSimulacrosdata.Fecha?.slice(0, 10) || ''}
                        onChange={handleFechasSimulacrosChange('Fecha')}
                        error={fechassimulacrosData?.errField === 'Fecha'}
                        helperText={fechassimulacrosData?.errField === 'Fecha' && fechassimulacrosData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="Hora"
                        type="text"
                        fullWidth
                        className={'field_Hora'}
                        variant="standard"
                        value={FechasSimulacrosdata.Hora || ''}
                        onChange={handleFechasSimulacrosChange('Hora')}
                        error={fechassimulacrosData?.errField === 'Hora'}
                        helperText={fechassimulacrosData?.errField === 'Hora' && fechassimulacrosData.errMessage}
                      />
                    </LocalAddDialog>
                  </div>

                  <div>
                    <Table
                      tableHead={['RazonSocial', 'Expediente', 'Sim', 'Fecha', 'Hora', 'Actions']}
                      tableData={
                        fechassimulacrosData.foundfechassimulacros.length
                          ? fechassimulacrosData.foundfechassimulacros
                          : (fechassimulacrosData.fechassimulacros as any)
                      }
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
                      <Field
                        value={(fieldData: any) =>
                          fieldData.RazonSocial?.map((item) => (
                            <span key={`autocomplete_${item._id}`} className={classes.tableChip}>
                              {item.RazonSocial}
                            </span>
                          ))
                        }
                      />

                      <Field value={(fieldData: any) => (fieldData.Expediente ? fieldData.Expediente.Expediente : '')} />

                      <Field value={(fieldData: any) => (fieldData.Sim ? fieldData.Sim.Nombre : '')} />

                      <Field value={(fieldData: any) => moment(fieldData.Fecha).utc().format('MM/DD/YYYY')} />

                      <Field value={(fieldData: any) => fieldData.Hora} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setFechasSimulacrosData(e.element)
                            setdialogFechassimulacrosAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeFechasimulacro(e.element))
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

export default FechasSimulacros
