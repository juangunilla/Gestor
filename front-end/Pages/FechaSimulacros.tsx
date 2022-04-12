
import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

  import minimum from '../components/Themes/minimum.module.scss'
  import { mergeClasses } from '../services/utils'
  import Typography from '@mui/material/Typography'
  import { useDispatch } from 'react-redux'
  import { load, search } from '../store/actions/Actions'
  import { IState } from '../store/reducers/index'
  import { useSelector } from 'react-redux'
  import TextField from '@mui/material/TextField'
  import { IItem } from '../store/models'
  import { add } from '../store/actions/Actions'
  import { edit } from '../store/actions/Actions'
  import { remove } from '../store/actions/Actions'
  import AddDialog from '../components/Dialog/Dialog'
  import { add, load, remove, edit } from '../store/actions/Actions'
  import Table from '../components/Table/Table'
  import EditIcon from '@mui/icons-material/Edit'
  import DeleteIcon from '@mui/icons-material/Delete'
  import IconButton from '@mui/material/IconButton'
  import MoreIcon from '@mui/icons-material/More'
  import Paper from '@mui/material/Paper'
  import Container from '@mui/material/Container'
  import { NavLink } from 'react-router-dom'
  import ListItem from '@mui/material/ListItem'
  import ListItemText from '@mui/material/ListItemText'
  import Sidebar from '../components/Sidebar/Sidebar'
  import green from '@mui/material/colors/green'
  import { createTheme, ThemeProvider } from '@mui/material/styles'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})
  


const FechaSimulacros: FunctionComponent = (props: any) => {
      const classes = baseClasses
        const Data = useSelector((state: IState) => state.)
      const theme = minimum
      const dispatch = useDispatch()
      let searchTimeout = null
const searchFor = (event) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({ ...tableloadoptions, searchString: event.target.value })
    },500)
}
      const [searchFieldloadoptions, setsearchFieldloadoptions] = React.useState<any>({ 
  page: 1,
  populate: true,
  limit: 25,
  sort: { field: null, method: 'DESC' },
    totalItems: 0
})
const performsearchFieldload = (options) => {
      dispatch(options.searchString ? search(options) : load(options))
  }
      React.useEffect(() => {
  performsearchFieldload({
    ...searchFieldloadoptions
                  })
},[searchFieldloadoptions])
      const [dialogAction, setdialogAction] = React.useState<'add' | 'edit' | 'delete' | "">('')
      const LocalAddDialog = AddDialog
      const [tableloadoptions, settableloadoptions] = React.useState<any>({ 
  page: 1,
  populate: true,
  limit: 25,
  sort: { field: null, method: 'DESC' },
    totalItems: 0
})
const performtableload = (options) => {
      dispatch(options.searchString ? search(options) : load(options))
  }
      React.useEffect(() => {
  performtableload({
    ...tableloadoptions
                  })
},[tableloadoptions])
  
  

// Theme selection
    



  return (<React.Fragment>




<ThemeProvider theme={aptugotheme}>
  <div className={ theme.pages } >



<Sidebar
    color='Greens'
        open={ true }
>




<NavLink
  exact
  to="/"
      key='ThRLRZCp'
>
  <ListItem button className={classes.itemLink}>
    <ListItemText>
      Home      
    </ListItemText>
  </ListItem>
</NavLink>
  						                



<NavLink
  exact
  to="/Clientes"
      key='LNiilTK7'
>
  <ListItem button className={classes.itemLink}>
    <ListItemText>
      Clientes      
    </ListItemText>
  </ListItem>
</NavLink>      	                



<NavLink
  exact
  to="/Expedientes"
      key='6gTzhTG6'
>
  <ListItem button className={classes.itemLink}>
    <ListItemText>
      Expedientes      
    </ListItemText>
  </ListItem>
</NavLink>      	                



<NavLink
  exact
  to="/FechaSimulacros"
      key='wz7dZ9ir'
>
  <ListItem button className={classes.itemLink}>
    <ListItemText>
      FechaSimulacros      
    </ListItemText>
  </ListItem>
</NavLink>      
</Sidebar>
<div
      className={ theme.mainarea }      >


<Container
                  maxWidth="lg"
      >
  
<div
      className={ theme.tableHeading }      >


<Typography
  variant="h4"
    >

Fechasimu list

</Typography>

</div>


<Paper
>

<div
      className={ classes.tableResponsive }      >

<div
      className={ theme.tabletoolbar }      >





  
    















<TextField
    variant="outlined"
        placeholder="Search ..."        margin="normal"        className={ theme.extensibleInput }        type="text"
    fullWidth
        onChange={ searchFor }/>

  







<LocalAddDialog
      isOpen={ dialogAction !== ''}
  onOpen={() => setdialogAction('add')}
      onSave={() => setdialogAction('')}
    onClose={() => setdialogAction('')}
  action={ dialogAction }
  addOptions={ { title: 'Add Fechasimu', text: 'Enter Fechasimu data', button: 'Add' } }
  editOptions={ { title: 'Edit Fechasimu', text: 'Update Fechasimu data', button: 'Edit' } }
  removeOptions={ { title: '', text: '', button: '' } }
  saveDataHandler={ (data: IItem ) => {
          if (dialogAction === 'delete') {
        dispatch(remove(data))
      } else {
        dialogAction === 'add' ? dispatch(add(data)) : dispatch(edit(data))
      }      
      } }
  color='primary'
  data={ data}
  initialData={initialData}
  setData={setData}
  allowMultipleSubmit={ dialogAction === 'add'}
>

</LocalAddDialog>

</div>

<div
            >

              
    










                      


<Table    
    tableHead={
              ["Actions"]
          }
    tableData={ (Data.found.length ? Data.found : Data. as any) }
          orderBy={ tableloadoptions.sort.field }
      order={ tableloadoptions.sort.method }
      onRequestSort={(event, property) => {
        settableloadoptions({
          ...tableloadoptions,
          sort: {
            field: property,
            method: tableloadoptions.sort.field === property ? (tableloadoptions.sort.method === 'asc' ? 'desc' : 'asc') : 'ASC',
          }
        })
      }}
    ><div className={classes.actionsArea}>
            <IconButton
      aria-label="edit"
      color="primary"
      onClickCapture={(e: any) => { 
                  setData(e.element)
          setdialogAction('edit')
              }}
    >
      <EditIcon fontSize="small" />
    </IconButton>
            <IconButton aria-label="delete" color="primary" onClickCapture={(e: any) => {
              dispatch(remove (e.element))
          }}>
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


</React.Fragment>)}


export default FechaSimulacros


