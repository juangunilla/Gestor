import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Autocomplete from '../components/Autocomplete'
import AddDialog from '../components/Dialog/Dialog'
import Sidebar from '../components/Sidebar/Sidebar'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import minimum from '../components/Themes/minimum.module.scss'
import {
  addFechasdesimulacros,
  editFechasdesimulacros,
  loadFechasdesimulacros,
  removeFechadesimulacro,
  searchFechasdesimulacros,
} from '../store/actions/fechasdesimulacrosActions'
import { IFechasdesimulacrosItem } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const FechasDeSimulacros: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDataFechasDeSimulacros = {
    Cliente: null,
    Expediente: null,
    Fecha: '',
    Horario: '',
  }
  const [FechasDeSimulacrosdata, setFechasDeSimulacrosData] = React.useState<any>(initialDataFechasDeSimulacros)
  const handleFechasDeSimulacrosChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setFechasDeSimulacrosData({
      ...FechasDeSimulacrosdata,
      [name]: value,
    })
  }
  const fechasdesimulacrosData = useSelector((state: IState) => state.fechasdesimulacros)
  const theme = minimum
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForFechasDeSimulacros = (event) => {
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
    dispatch(options.searchString ? searchFechasdesimulacros(options) : loadFechasdesimulacros(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogFechasdesimulacrosAction, setdialogFechasdesimulacrosAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const clientesAutocompleteData = useSelector((state: IState) => state.clientes)
  const [ClienteOptions, setClienteOptions] = React.useState<{ label: String; value: String }[]>([])
  const typeInSearchClienteClientes = (typedIn) => {
    const searchOptions = { searchString: typedIn, searchField: 'Razonsocial', page: 1, limit: 10 }
    axios.get('http://127.0.0.1:4567/api/clientes/search/', { params: searchOptions }).then((result) => {
      setClienteOptions(
        result.data.docs.map((cliente) => {
          return { label: cliente.Razonsocial, value: cliente._id }
        })
      )
    })
  }
  const [ClienteValue, setClienteValue] = React.useState(null)
  React.useEffect(() => {
    if (!FechasDeSimulacrosdata.Cliente) return undefined
    const asArray = Array.isArray(FechasDeSimulacrosdata.Cliente) ? FechasDeSimulacrosdata.Cliente : [FechasDeSimulacrosdata.Cliente]
    setClienteValue(asArray.map((item) => ({ label: item.Razonsocial, value: item._id })))
  }, [FechasDeSimulacrosdata.Cliente])
  const [ExpedienteOptions, setExpedienteOptions] = React.useState<{ label: String; value: String }[]>([])
  const typeInSearchExpedienteClientes = (typedIn) => {
    const searchOptions = { searchString: typedIn, searchField: 'Expediente', page: 1, limit: 10 }
    axios.get('http://127.0.0.1:4567/api/clientes/search/', { params: searchOptions }).then((result) => {
      setExpedienteOptions(
        result.data.docs.map((cliente) => {
          return { label: cliente.Expediente, value: cliente._id }
        })
      )
    })
  }
  const [ExpedienteValue, setExpedienteValue] = React.useState(null)
  React.useEffect(() => {
    if (!FechasDeSimulacrosdata.Expediente) return undefined
    const asArray = Array.isArray(FechasDeSimulacrosdata.Expediente) ? FechasDeSimulacrosdata.Expediente : [FechasDeSimulacrosdata.Expediente]
    setExpedienteValue(asArray.map((item) => ({ label: item.Expediente, value: item._id })))
  }, [FechasDeSimulacrosdata.Expediente])
  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchFechasdesimulacros(options) : loadFechasdesimulacros(options))
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
          <Sidebar color="Greens" open={true}>
            <NavLink exact to="/" key="ThRLRZCp">
              <ListItem button className={classes.itemLink}>
                <ListItemText>Home</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink exact to="/Clientes" key="LNiilTK7">
              <ListItem button className={classes.itemLink}>
                <ListItemText>Clientes</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink exact to="/Expedientes" key="6gTzhTG6">
              <ListItem button className={classes.itemLink}>
                <ListItemText>Expedientes</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink exact to="/FechasDeSimulacros" key="7k7wSgRg">
              <ListItem button className={classes.itemLink}>
                <ListItemText>FechasDeSimulacros</ListItemText>
              </ListItem>
            </NavLink>
          </Sidebar>
          <div className={theme.mainarea}>
            <Container maxWidth="lg">
              <div className={theme.tableHeading}>
                <Typography variant="h4">FechaDeSimulacro list</Typography>
              </div>

              <Paper>
                <div className={classes.tableResponsive}>
                  <div className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search FechaDeSimulacro..."
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForFechasDeSimulacros}
                    />

                    <LocalAddDialog
                      isOpen={dialogFechasdesimulacrosAction !== ''}
                      onOpen={() => setdialogFechasdesimulacrosAction('add')}
                      onSave={() => setdialogFechasdesimulacrosAction('')}
                      onClose={() => setdialogFechasdesimulacrosAction('')}
                      action={dialogFechasdesimulacrosAction}
                      addOptions={{ title: 'Add FechaDeSimulacro', text: 'Enter FechaDeSimulacro data', button: 'Add' }}
                      editOptions={{ title: 'Edit FechaDeSimulacro', text: 'Update FechaDeSimulacro data', button: 'Edit' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: IFechasdesimulacrosItem) => {
                        if (dialogFechasdesimulacrosAction === 'delete') {
                          dispatch(removeFechadesimulacro(data))
                        } else {
                          dialogFechasdesimulacrosAction === 'add' ? dispatch(addFechasdesimulacros(data)) : dispatch(editFechasdesimulacros(data))
                        }
                      }}
                      color="primary"
                      data={FechasDeSimulacrosdata}
                      initialData={initialDataFechasDeSimulacros}
                      setData={setFechasDeSimulacrosData}
                      allowMultipleSubmit={dialogFechasdesimulacrosAction === 'add'}
                    >
                      <Autocomplete
                        value={ClienteValue}
                        onType={typeInSearchClienteClientes}
                        onChange={(newValue) =>
                          handleFechasDeSimulacrosChange('Cliente')(
                            newValue?.length
                              ? newValue.map((item) => ({ _id: item.value !== 'new' ? item.value : null, Razonsocial: item.label }))
                              : []
                          )
                        }
                        loading={clientesAutocompleteData.loadingStatus === 'loading'}
                        options={ClienteOptions}
                        label="Cliente"
                        fullWidth
                        variant="standard"
                        margin="dense"
                      />

                      <Autocomplete
                        value={ExpedienteValue}
                        onType={typeInSearchExpedienteClientes}
                        onChange={(newValue) =>
                          handleFechasDeSimulacrosChange('Expediente')(
                            newValue?.length
                              ? newValue.map((item) => ({ _id: item.value !== 'new' ? item.value : null, Expediente: item.label }))
                              : []
                          )
                        }
                        loading={clientesAutocompleteData.loadingStatus === 'loading'}
                        options={ExpedienteOptions}
                        label="Expediente"
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
                        value={FechasDeSimulacrosdata.Fecha?.slice(0, 10) || ''}
                        onChange={handleFechasDeSimulacrosChange('Fecha')}
                        error={fechasdesimulacrosData?.errField === 'Fecha'}
                        helperText={fechasdesimulacrosData?.errField === 'Fecha' && fechasdesimulacrosData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="Horario"
                        type="text"
                        fullWidth
                        className={'field_Horario'}
                        variant="standard"
                        value={FechasDeSimulacrosdata.Horario || ''}
                        onChange={handleFechasDeSimulacrosChange('Horario')}
                        error={fechasdesimulacrosData?.errField === 'Horario'}
                        helperText={fechasdesimulacrosData?.errField === 'Horario' && fechasdesimulacrosData.errMessage}
                      />
                    </LocalAddDialog>
                  </div>

                  <div>
                    <Table
                      tableHead={['Cliente', 'Expediente', 'Fecha', 'Horario', 'Actions']}
                      tableData={
                        fechasdesimulacrosData.foundfechasdesimulacros.length
                          ? fechasdesimulacrosData.foundfechasdesimulacros
                          : (fechasdesimulacrosData.fechasdesimulacros as any)
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
                      <Field value={(fieldData: any) => (fieldData.Cliente ? fieldData.Cliente.Razonsocial : '')} />

                      <Field value={(fieldData: any) => (fieldData.Expediente ? fieldData.Expediente.Expediente : '')} />

                      <Field value={(fieldData: any) => moment(fieldData.Fecha).utc().format('DD/MM/YYYY')} />

                      <Field value={(fieldData: any) => fieldData.Horario} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setFechasDeSimulacrosData(e.element)
                            setdialogFechasdesimulacrosAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeFechadesimulacro(e.element))
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

export default FechasDeSimulacros
