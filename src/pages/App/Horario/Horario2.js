import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import api from '../../../services/api'
import { convertToBRL } from '../../../services/currency'

import NoImage from '../../../assets/images/no-image.jpg'
import ProductModal from '../../../components/ProductModal'
import Switch from "../../../components/Switch"

import {
  Container,
  ProductCard,
  ProductTop,
  ProductImage,
  ProductInfo,
  ProductDetails,
  ProductBottom
} from '../Products/styles'


import {
  EditDeleteOptions,
  EditButton,
  DeleteButton,
  AddButton,
  YesButton,
  NoButton
} from '../../../styles/buttons'



	
function HorarioModal (product) {
	const [newProduct, setNewProduct] = useState({
		horario: "",
		name:""
		
	  })
  const [products, setProducts] = useState([])
  const [editProduct, setEditProduct] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteToast, setDeleteToast] = useState(null)
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

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

  function handleInputChange(e) {
	//setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
	this.state ={
		horario:""
	};
	this.onChange = (e) => {
		console.log(e.target.value);
		this.setState({horario: e.target.value})
  }
}
  
  async function handleUpdateHorario(horario,id, name, category_id, base_price,) {
    try {

      await api.put(`admin/horario/1`, {
		horario,
		name,
        category_id,
        base_price
        //sizes: product_sizes.map(size => ({
        //  size_id: size
		//})
		//)
      });

      toast.success("Produto atualizado!");
	  //window.location.reload(false);
    } catch (err) {
      toast.error("Erro ao editar o produto, confira os dados preenchidos");
	  //window.location.reload(false);
    } finally {

    }
  }

  async function handleUpdateProduct() {
    const {
	  horario,
	  name,
	  id
	  
    } = newProduct;
    try {
      setLoading(true);

      await api.put(`admin/horario/1`, {
		horario,
		
		
        });

     // closeModal();
      toast.success("Produto atualizado!");
    } catch (err) {
      toast.error("Erro ao editar o produto, confira os dados preenchidos");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateProduct() {
    const {
	  horario,
	  name
    } = newProduct;

    try {
      setLoading(true);

      await api.post("admin/horario", {
		horario,
		name
        
      });

      //closeModal();
      toast.success("Produto criado!");
    } catch (err) {
      toast.error("Erro ao criar o produto, confira os dados preenchidos");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (product) {
      handleUpdateProduct();
    } else {
      handleCreateProduct();
    }
  }

  async function loadProducts () {
    try {
      const { data } = await api.get('admin/horario')

      setProducts(
        data.map(product => ({
          ...product,
          base_price_formatted: convertToBRL(Number(product.base_price))
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
      await api.delete(`admin/horario/${id}`)

      loadProducts()
      toast.success('Produto deletado!')
    } catch (err) {
      toast.error('Não foi possível deletar o produto')
    }
  }

  
 

  function renderProduct (product) {
	  
	 
		  return (
		
      <ProductCard key={product.id}>
        
			<form onSubmit={handleSubmit}>
		  <span>Preço: {product.id}</span>
				<input type="text" 
					  nome="horario"
					  value={this.state.horario}
          			onChange={handleInputChange}
					  
					  />
                {product.name}
              
			  <button type="submit">enviar</button>
			  </form>

			 {/* <YesButton onClick={() => handleUpdateHorario(product.horario, product.id)} />*/}
      </ProductCard>
    )
    
  }

  return (
    <Container>
     
      {products.map(product => renderProduct(product))}
    </Container>
  )
}

export default HorarioModal
