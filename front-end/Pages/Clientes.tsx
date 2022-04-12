import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import AppBar from '@mui/material/AppBar'
import Checkbox from '@mui/material/Checkbox'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
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
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Autocomplete from '../components/Autocomplete'
import AddDialog from '../components/Dialog/Dialog'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import { addClientes, editClientes, loadClientes, removeCliente, searchClientes } from '../store/actions/clientesActions'
import { IClientesItem } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

export { RadioButtonUncheckedIcon }

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const Clientes: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDataClientes = {
    RazonSocial: '',
    Domicilio: '',
    Grupo: null,
    Abono: false,
    Cedula: false,
  }
  const [Clientesdata, setClientesData] = React.useState<any>(initialDataClientes)
  const handleClientesChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setClientesData({
      ...Clientesdata,
      [name]: value,
    })
  }
  const clientesData = useSelector((state: IState) => state.clientes)
  const theme = estilosmodulescss
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForClientes = (event) => {
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
    dispatch(options.searchString ? searchClientes(options) : loadClientes(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogClientesAction, setdialogClientesAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const gruposAutocompleteData = useSelector((state: IState) => state.grupos)
  const [GrupoOptions, setGrupoOptions] = React.useState<{ label: String; value: String }[]>([])
  const typeInSearchGrupoGrupos = (typedIn) => {
    const searchOptions = { searchString: typedIn, searchField: 'Nombre', page: 1, limit: 10 }
    axios.get('https://gestor_gunillajuangmailcom.backend.aptugo.app/api/grupos/search/', { params: searchOptions }).then((result) => {
      setGrupoOptions(
        result.data.docs.map((grupo) => {
          return { label: grupo.Nombre, value: grupo._id }
        })
      )
    })
  }
  const [GrupoValue, setGrupoValue] = React.useState(null)
  React.useEffect(() => {
    if (!Clientesdata.Grupo) return undefined
    const asArray = Array.isArray(Clientesdata.Grupo) ? Clientesdata.Grupo : [Clientesdata.Grupo]
    setGrupoValue(asArray.map((item) => ({ label: item.Nombre, value: item._id })))
  }, [Clientesdata.Grupo])
  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchClientes(options) : loadClientes(options))
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
              <div className={theme.head}>
                <Typography variant="h4">
                  <span className={theme.titulos}>Clientes</span>
                </Typography>
              </div>

              <Paper>
                <div className={classes.tableResponsive}>
                  <div className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Buscar cliente"
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForClientes}
                    />

                    <LocalAddDialog
                      isOpen={dialogClientesAction !== ''}
                      onOpen={() => setdialogClientesAction('add')}
                      onSave={() => setdialogClientesAction('')}
                      onClose={() => setdialogClientesAction('')}
                      action={dialogClientesAction}
                      addOptions={{ title: 'Agregar Clientes', text: 'Ingresar información del cliente', button: 'Agregar' }}
                      editOptions={{ title: 'Editar el Cliente', text: 'Actualizar información del cliente', button: 'Editar' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: IClientesItem) => {
                        if (dialogClientesAction === 'delete') {
                          dispatch(removeCliente(data))
                        } else {
                          dialogClientesAction === 'add' ? dispatch(addClientes(data)) : dispatch(editClientes(data))
                        }
                      }}
                      color="primary"
                      data={Clientesdata}
                      initialData={initialDataClientes}
                      setData={setClientesData}
                      allowMultipleSubmit={dialogClientesAction === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="RazonSocial"
                        type="text"
                        fullWidth
                        className={'field_RazonSocial'}
                        variant="standard"
                        value={Clientesdata.RazonSocial || ''}
                        onChange={handleClientesChange('RazonSocial')}
                        error={clientesData?.errField === 'RazonSocial'}
                        helperText={clientesData?.errField === 'RazonSocial' && clientesData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="Domicilio"
                        type="text"
                        fullWidth
                        className={'field_Domicilio'}
                        variant="standard"
                        value={Clientesdata.Domicilio || ''}
                        onChange={handleClientesChange('Domicilio')}
                        error={clientesData?.errField === 'Domicilio'}
                        helperText={clientesData?.errField === 'Domicilio' && clientesData.errMessage}
                      />

                      <Autocomplete
                        value={GrupoValue}
                        onType={typeInSearchGrupoGrupos}
                        onChange={(newValue) =>
                          handleClientesChange('Grupo')(
                            newValue?.length ? newValue.map((item) => ({ _id: item.value !== 'new' ? item.value : null, Nombre: item.label })) : []
                          )
                        }
                        loading={gruposAutocompleteData.loadingStatus === 'loading'}
                        options={GrupoOptions}
                        label="Grupo"
                        fullWidth
                        variant="standard"
                        margin="dense"
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={Clientesdata.Abono}
                            color="primary"
                            onChange={(e) => handleClientesChange('Abono')(e.currentTarget.checked)}
                          />
                        }
                        label="Abono"
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={Clientesdata.Cedula}
                            color="primary"
                            onChange={(e) => handleClientesChange('Cedula')(e.currentTarget.checked)}
                          />
                        }
                        label="Cedula"
                      />
                    </LocalAddDialog>
                  </div>

                  <div>
                    <Table
                      tableHead={['RazonSocial', 'Domicilio', 'Grupo', 'Abono', 'Cedula', 'Actions']}
                      tableData={clientesData.foundclientes.length ? clientesData.foundclientes : (clientesData.clientes as any)}
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
                      <Field value={(fieldData: any) => fieldData.RazonSocial} />

                      <Field value={(fieldData: any) => fieldData.Domicilio} />

                      <Field value={(fieldData: any) => (fieldData.Grupo ? fieldData.Grupo.Nombre : '')} />

                      <Field value={(fieldData: any) => (fieldData.Abono ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />)} />

                      <Field value={(fieldData: any) => (fieldData.Cedula ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />)} />

                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setClientesData(e.element)
                            setdialogClientesAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeCliente(e.element))
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

export default Clientes
