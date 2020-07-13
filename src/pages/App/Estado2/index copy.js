import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import api from "../../../services/api";

import NoImage from "../../../assets/images/no-image.jpg";
import CategoryModal from "../../../components/CategoryModal";
import ProductModal from '../../../components/ProductModal';
import EstadoAtual from './EstadoAtual';
import SimpleMenu from "../../../components/menu"
import {
  Container,
  CategoryCard,
  CategoryInfo,
  CategoryImage,
  CategoryDetails
} from "./styles";

import {
  EditDeleteOptions,
  EditButton,
  DeleteButton,
  AddButton,
  UndoButton
} from "../../../styles/buttons";

function Estado2() {
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchProducts, setSearchProducts] = useState(false);
  const [deleteToast, setDeleteToast] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (editCategory) {
      setModalOpen(true)
    }
  }, [editCategory]);

  useEffect(() => {
    if (!modalOpen) {
      setEditCategory(null)
    }
  }, [modalOpen]);

  useEffect(() => {
    if (searchProducts) {
      
    }
  }, [searchProducts]);



  async function loadCategories() {
    try {
      const { data } = await api.get("admin/state");
      
      setCategories(data);
    } catch (err) {
      toast.error("Erro ao buscar categorias");
    }
  }

  async function loadProducts(id) {
    if (searchProducts) {
      loadCategories();
      setSearchProducts(false);
    } else {
      try {
        const { data } = await api.get(`admin/state/${id}`);
        
        setSearchProducts(true);
        setCategories(data);
      } catch (err) {
        toast.error("Erro ao buscar produtos");
      }
    }
    
  }



 

  function renderCategory(state) {
   
	



//instruçoes trabalhadas ainda nao resolvido
		
        //<CategoryCard key={state.id}>222
         // <CategoryInfo>
          //  <CategoryImage
          //    imageUrl={state.image ? state.image.url : NoImage}
          //  />
         //   <CategoryDetails>
         //     <strong >{state.open}</strong>
			  
              
			  
			  
         //   </CategoryDetails>
              
    
        //  </CategoryInfo>
        //  <EditDeleteOptions>
       //     <AddButton onClick={() => loadProducts(state.id)} />
        //  </EditDeleteOptions>
  
       // </CategoryCard>
      //);}
    
    
  }

  return (
    <Container>
      <AddButton onClick={() => setModalOpen(true)} />
      {!!modalOpen && (
        <ProductModal closeModal={() => setModalOpen(false)} product={editCategory} />
      )}
      
      {categories.map(category => renderCategory(category))}
	  <SimpleMenu></SimpleMenu>
	  <EstadoAtual/>
    </Container>
	

  );
}

export default Estado2 ;
