import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import api from "../../../services/api";

import NoImage from "../../../assets/images/no-image.jpg";
import CategoryModal from "../../../components/CategoryModal";
import ProductModal from '../../../components/ProductModal';
import EstadoAtual from './EstadoAtual';
import SimpleMenu from "../../../components/menu"




import { convertToBRL } from '../../../services/currency'



import Switch from "../../../components/Switch"

import {
  
  
  ProductTop,
  ProductImage,
  ProductInfo,
  ProductDetails,
  ProductBottom
} from '../Products/styles'

import {
  Container,
  CategoryCard,
  CategoryInfo,
  CategoryImage,
  ProductCard,
  CategoryDetails
} from "./styles";

import {
  EditDeleteOptions,
  EditButton,
  DeleteButton,
  AddButton,
  YesButton,
  NoButton
} from '../../../styles/buttons'

function Estado2() {
 const [products, setProducts] = useState([])
  const [editProduct, setEditProduct] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteToast, setDeleteToast] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    if (editProduct) {
      setModalOpen(true)
    }
  }, [editProduct])

  useEffect(() => {
    if (!modalOpen) {
      setEditProduct(null)
      loadProducts()
    }
  }, [modalOpen])

  async function handleUpdateProduct(estado,id,open) {
    try {

      await api.put(`admin/state/${id}`, {
        open,
		estado 
        
        //sizes: product_sizes.map(size => ({
        //  size_id: size
		//})
		//)
      });

      toast.success("ESTADO DA LOJA ALTERADO!");
	  window.location.reload(false);
    } catch (err) {
		const toastToUp = toast.info(
        "Erro: "+err+" Aqui o Open => "+open+" Aqui o Estado => "+estado,
        {
          
          autoClose: 10000
        }
      )
      
	  //window.location.reload(false);
    } finally {

    }
  }

  async function loadProducts () {
    try {
      const { data } = await api.get('admin/state')

      setProducts(
        data.map(product => ({
          ...product,
          
        }))
      )
    } catch (err) {
      toast.error('Erro ao buscar produtos')
    }
  }

  function deleteToastNotification (id) {
    if (!toast.isActive(deleteToast)) {
      const toastToDelete = toast.info(
        'Clique aqui para confirmar a operação',
        {
          onClick: () => deleteProduct(id),
          autoClose: 5000
        }
      )

      setDeleteToast(toastToDelete)
    }
  }

  async function deleteProduct (id) {
    try {
      await api.delete(`admin/state/${id}`)

      loadProducts()
      toast.success('Produto deletado!')
    } catch (err) {
      toast.error('Não foi possível deletar o produto')
    }
  }

  function renderEsgotado(product){
	  if (product==0){
		  return (
			  <font color="red">Esgotado</font>
		  );
	  }else{
		  return (
			  <font color="green">Não Esgotado</font>
		  );
	  }


  }




  function renderProduct (product) {
	  if (product.estado == 0){

						return (
						<ProductCard>
							<h1><font color="green">LOJA ATIVADA</font></h1><br/><br/>
							<b>Última alteração:{product.updated_at}</b><br/><br/><br/>
						{/*<NoButton onClick={product.estado=1} />*/}
            			DESEJA DESATIVAR A LOJA? <br/><br/><NoButton onClick={() => handleUpdateProduct("1",product.id,product.open)}/>
						</ProductCard>


						//<ProductCard><p>Ativado</p>
						//<b>ID:{product.id}</b>
						//<b>open:{product.open}</b>
						//<b>Estado:{product.estado}</b>
						//{/*<NoButton onClick={product.estado=1} />*/}
            		//	hand 0: <NoButton onClick={() => handleUpdateProduct(1,product.id,product.open)}/>
					//	</ProductCard> 		
						
										
						
						);
						 
					}else{
						return (
						<ProductCard>
							<h1><font color="red">LOJA DESATIVADA</font></h1>
							<b>Última alteração:{product.updated_at}</b><br/><br/>
						{/*<NoButton onClick={product.estado=1} />*/}
            			DESEJA ATIVAR A LOJA?<br/><br/> <YesButton onClick={() => handleUpdateProduct("0",product.id,product.open)}/>
						{/*<p>Desativado</p>
						<b>ID:{product.id}</b>
						<b>open:{product.open}</b>
						<b>Estado:{product.estado}</b>
						hand 1:  
						<YesButton onClick={() => handleUpdateProduct("0",product.id,product.open)} />
            			{/*<YesButton onClick={product.estado=0}/>*/}
						
						</ProductCard>
						
						
						);
					}
							
				
 				

    return (
      <ProductCard key={product.id}>
        <ProductTop>
          <ProductInfo>
            <ProductImage
              imageUrl={product.image ? product.image.url : NoImage}
            />
            <ProductDetails>
              <strong>{product.name}</strong>
              <p>
                <span>Categoria: </span>
                {product.open} 
              </p>
              <p>
                <span>Preço: </span>
                {product.base_price_formatted}
              </p>
            </ProductDetails>
          </ProductInfo>
          <EditDeleteOptions>
            <ProductDetails>
              <strong>Produto Esgotado?</strong>
            </ProductDetails>
            <YesButton onClick={() => handleUpdateProduct(1, product.id, product.name, product.category_id, product.base_price)} />
            <NoButton
                onClick={() => handleUpdateProduct(0, product.id, product.name, product.category_id, product.base_price)}
            /><p><br/>{renderEsgotado()}</p>
          </EditDeleteOptions>
        </ProductTop>
      </ProductCard>
    )
  }

  return (
    <Container>
      
      {products.map(product => renderProduct(product))}
	  
    </Container>
  )
}
  


  


export default Estado2 ;
