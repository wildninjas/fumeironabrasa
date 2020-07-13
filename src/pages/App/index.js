import React, { useState } from 'react'
import SideBar from '../../components/SideBar'
import Header from '../../components/Header'
import SimpleMenu, {changePage} from '../../components/menu'
import Orders from './Orders'
import Categories from './Categories'
import Sizes from './Sizes'
import CategoriesOld from './CategoriesOld'
import Products from './Products'
import Images from './Images'
import ProductModal from '../../components/ProductModal'
import ProductModalDia from '../../components/ProductModaldoDia'
import ProductModalPromo from '../../components/ProductModalPromo'
import Pratosdodia from './Pratosdodia'
import Promododia from './Promododia'
import Suspensos from './Suspensos'
import Estado2 from './Estado2'



//import { Container, Main } from './styles'

import logo from '../../assets/images/logo2x.png'

import { logout } from '../../services/auth'

import { Container, LogoContainer, LogoutContainer,Main,HeaderMain,SubMenu } from './styles'

function App ({ history }) {
  const [activePage, setActivePage] = useState('Orders')

  function changePage (page) {
    setActivePage(page)
  }

  function refreshPage() {
    window.location.reload(false);
  }



  return (
    <Container>
      
	  {/*<HeaderMain history={history}>
	  <LogoContainer>
        <img src={logo} alt='logo' />
        <h1></h1>
      </LogoContainer>
      <LogoutContainer>
        <div>
          <h3>Admin</h3>
          <SimpleMenu page={activePage} changePage={changePage}></SimpleMenu>
        </div>
      </LogoutContainer>
	  
	  
	  </HeaderMain>
	  <SubMenu>
		  
		  <div><button id="button1" onClick={() => changePage('Pratosdodia')}>ADICIONAR PRATO DO DIA</button></div>
		  <div><button id="button1" onClick={() => changePage('Promododia')}>ADICIONAR PROMOÇÃO DO DIA</button></div>
		  <div><button id="button1" onClick={refreshPage}>ATUALIZAR LISTA DE PEDIDOS</button></div>
	  </SubMenu>*/}
      <Main>
         <SideBar page={activePage} changePage={changePage} />
		
        {activePage === 'Orders' ? (
          <Orders />
        ) : activePage === 'Categories' ? (
          <Categories />
		) : activePage === 'Pratosdodia' ? (
			<Pratosdodia/>
		) : activePage === 'Promododia' ? (
			<Promododia />
        ) : activePage === 'Sizes' ? (
          <Sizes />
        ) : activePage === 'CategoriesOld' ? (
          <CategoriesOld />
		) : activePage === 'Suspensos' ? (
			<Suspensos />
        ) : activePage === 'Images' ? (
          <Images />
        ) : activePage === 'Estado2' ? (
          <Estado2 />
        ) : null}
      </Main>
    </Container>
  )
}

export default App
