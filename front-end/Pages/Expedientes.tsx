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
import { addExpedientes, editExpedientes, loadExpedientes, removeExpediente, searchExpedientes } from '../store/actions/expedientesActions'
import { IExpedientesItem } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const Expedientes: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDataExpedientes = {
    RazonSocial: [],
    Expediente: '',
    Aprobado: '',
    AvisoE: '',
    Extension: '',
    AvisoF: '',
    Final: '',
  }
  const [Expedientesdata, setExpedientesData] = React.useState<any>(initialDataExpedientes)
  const handleExpedientesChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setExpedientesData({
      ...Expedientesdata,
      [name]: value,
    })
  }
  const expedientesData = useSelector((state: IState) => state.expedientes)
  const theme = estilosmodulescss
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForExpedientes = (event) => {
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
    dispatch(options.searchString ? searchExpedientes(options) : loadExpedientes(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogExpedientesAction, setdialogExpedientesAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
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
    if (!Expedientesdata.RazonSocial) return undefined
    const asArray = Array.isArray(Expedientesdata.RazonSocial) ? Expedientesdata.RazonSocial : [Expedientesdata.RazonSocial]
    setRazonSocialValue(asArray.map((item) => ({ label: item.RazonSocial, value: item._id })))
  }, [Expedientesdata.RazonSocial])
  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchExpedientes(options) : loadExpedientes(options))
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
                  <span className={theme.titulos}>Expedientes</span>
                </Typography>
              </div>

              <Paper>
                <div className={classes.tableResponsive}>
                  <div className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Buscar expediente"
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForExpedientes}
                    />

                    <LocalAddDialog
                      isOpen={dialogExpedientesAction !== ''}
                      onOpen={() => setdialogExpedientesAction('add')}
                      onSave={() => setdialogExpedientesAction('')}
                      onClose={() => setdialogExpedientesAction('')}
                      action={dialogExpedientesAction}
                      addOptions={{ title: 'Agregar Expediente', text: 'introducir información del expediente', button: 'Agregar' }}
                      editOptions={{ title: 'Editar el expediente', text: 'Actualizar información del expediente', button: 'Editar' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: IExpedientesItem) => {
                        if (dialogExpedientesAction === 'delete') {
                          dispatch(removeExpediente(data))
                        } else {
                          dialogExpedientesAction === 'add' ? dispatch(addExpedientes(data)) : dispatch(editExpedientes(data))
                        }
                      }}
                      color="primary"
                      data={Expedientesdata}
                      initialData={initialDataExpedientes}
                      setData={setExpedientesData}
                      allowMultipleSubmit={dialogExpedientesAction === 'add'}
                    >
                      <Autocomplete
                        chips
                        value={RazonSocialValue}
                        onType={typeInSearchRazonSocialClientes}
                        onChange={(newValue) =>
                          handleExpedientesChange('RazonSocial')(
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

                      <TextField
                        margin="dense"
                        label="Expediente"
                        type="text"
                        fullWidth
                        className={'field_Expediente'}
                        variant="standard"
                        value={Expedientesdata.Expediente || ''}
                        onChange={handleExpedientesChange('Expediente')}
                        error={expedientesData?.errField === 'Expediente'}
                        helperText={expedientesData?.errField === 'Expediente' && expedientesData.errMessage}
                      />

                      <TextField
                        className={'field_Aprobado'}
                        margin="dense"
                        label="Aprobado"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={Expedientesdata.Aprobado?.slice(0, 10) || ''}
                        onChange={handleExpedientesChange('Aprobado')}
                        error={expedientesData?.errField === 'Aprobado'}
                        helperText={expedientesData?.errField === 'Aprobado' && expedientesData.errMessage}
                      />

                      <TextField
                        className={'field_AvisoE'}
                        margin="dense"
                        label="AvisoE"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={Expedientesdata.AvisoE?.slice(0, 10) || ''}
                        onChange={handleExpedientesChange('AvisoE')}
                        error={expedientesData?.errField === 'AvisoE'}
                        helperText={expedientesData?.errField === 'AvisoE' && expedientesData.errMessage}
                      />

                      <TextField
                        className={'field_Extension'}
                        margin="dense"
                        label="Extension"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={Expedientesdata.Extension?.slice(0, 10) || ''}
                        onChange={handleExpedientesChange('Extension')}
                        error={expedientesData?.errField === 'Extension'}
                        helperText={expedientesData?.errField === 'Extension' && expedientesData.errMessage}
                      />

                      <TextField
                        className={'field_AvisoF'}
                        margin="dense"
                        label="AvisoF"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={Expedientesdata.AvisoF?.slice(0, 10) || ''}
                        onChange={handleExpedientesChange('AvisoF')}
                        error={expedientesData?.errField === 'AvisoF'}
                        helperText={expedientesData?.errField === 'AvisoF' && expedientesData.errMessage}
                      />

                      <TextField
                        className={'field_Final'}
                        margin="dense"
                        label="Final"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={Expedientesdata.Final?.slice(0, 10) || ''}
                        onChange={handleExpedientesChange('Final')}
                        error={expedientesData?.errField === 'Final'}
                        helperText={expedientesData?.errField === 'Final' && expedientesData.errMessage}
                      />
                    </LocalAddDialog>
                  </div>

                  <div>
                    <Table
                      tableHead={['RazonSocial', 'Expediente', 'Aprobado', 'AvisoE', 'Extension', 'AvisoF', 'Final', 'Actions']}
                      tableData={expedientesData.foundexpedientes.length ? expedientesData.foundexpedientes : (expedientesData.expedientes as any)}
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

                      <Field value={(fieldData: any) => fieldData.Expediente} />

                      <Field value={(fieldData: any) => moment(fieldData.Aprobado).utc().format('DD/MM/YYYY')} />

                      <Field value={(fieldData: any) => moment(fieldData.AvisoE).utc().format('DD/MM/YYYY')} />

                      <Field value={(fieldData: any) => moment(fieldData.Extension).utc().format('DD/MM/YYYY')} />

                      <Field value={(fieldData: any) => moment(fieldData.AvisoF).utc().format('DD/MM/YYYY')} />

                      <Field value={(fieldData: any) => moment(fieldData.Final).utc().format('DD/MM/YYYY')} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setExpedientesData(e.element)
                            setdialogExpedientesAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeExpediente(e.element))
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

export default Expedientes
