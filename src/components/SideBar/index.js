import React from 'react'
import PropTypes from 'prop-types'
import { toast } from "react-toastify";
import { logout } from '../../services/auth'
import Container from './styles'
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PanToolIcon from '@material-ui/icons/PanTool';


function handleLogout () {
	logout();
	
	toast.error("Logout Realizado, realize login para continuar.");
	window.location.reload(false);
  }


function SideBar ({ page, changePage }) {
  return (
    <Container page={page}>
      <li 
        className={page === 'Orders' ? 'active' : ''}
        onClick={() => changePage('Orders')} 
      >
       <RoomServiceIcon style={{ fontSize: 40 }} /><br/> Pedidos
      </li>
      <li
        className={page === 'CategoriesOld' ? 'active' : ''}
        onClick={() => changePage('CategoriesOld')} 
      >
        <MenuBookIcon style={{ fontSize: 40 }} /><br/> Editar Categorias
      </li>
     
      <li
        className={page === 'Categories' ? 'active' : ''}
        onClick={() => changePage('Categories')}
      >
       <RestaurantIcon style={{ fontSize: 40 }} /><br/> Produtos
      </li>
	  <li
        className={page === 'Suspensos' ? 'active' : ''}
        onClick={() => changePage('Suspensos')}
      >
       <PauseCircleFilledIcon style={{ fontSize: 40 }} /><br/> Ativar/Suspender Produtos
      </li>
      <li
        className={page === 'Images' ? 'active' : ''}
        onClick={() => changePage('Images')}
      >
       <PhotoCameraIcon style={{ fontSize: 40 }} /><br/> Imagens
      </li>

      <li
        className={page === 'Estado2' ? 'active' : ''}
        onClick={() => changePage('Estado2')}
      >
       <PanToolIcon style={{ fontSize: 40 }} /><br/> Status da Loja <br/>Ativar/Desativar
      </li>
	  
	  <li
        
        onClick={handleLogout}
      >
       <ExitToAppIcon style={{ fontSize: 40 }} /><br/> Sair
      </li>

    </Container>
  )
}

SideBar.propTypes = {
  page: PropTypes.string,
  changePage: PropTypes.func.isRequired
}

SideBar.defaultProps = {
  page: 'Orders'
}

export default SideBar
