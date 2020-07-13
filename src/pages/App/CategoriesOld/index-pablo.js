import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import api from "../../../services/api";

import NoImage from "../../../assets/images/no-image.jpg";
import CategoryModal from "../../../components/CategoryModal";
import ProductModal from '../../../components/ProductModal';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

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

function Categories() {
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
      const { data } = await api.get("admin/categories");
      
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
        const { data } = await api.get(`admin/products/${id}`);
        
        setSearchProducts(true);
        setCategories(data);
      } catch (err) {
        toast.error("Erro ao buscar produtos");
      }
    }
    
  }

  function deleteToastNotification(id) {
    if (!toast.isActive(deleteToast)) {
      const toastToDelete = toast.info(
        "Clique aqui para confirmar a operação",
        {
          onClick: () => deleteCategory(id),
          autoClose: 5000
        }
      );

      setDeleteToast(toastToDelete);
    }
  }

  async function deleteCategory(id) {
    try {
      await api.delete(`admin/products/${id}`);

      loadCategories();
      toast.success("Produto deletado!");
    } catch (err) {
      toast.error("Não foi possível deletar o produto");
    }
  }

  function renderCategory(category) {
    if (searchProducts) {
      return (
        <CategoryCard key={category.id}>
          <CategoryInfo>
            <CategoryImage
              imageUrl={category.image ? category.image.url : NoImage}
            />
            <CategoryDetails>
			
              <strong >{category.name}</strong>
			  
              {/*<p>
                <span>Tempo de preparo: </span>
                {category.cook_time} mins
              </p>*/}
            </CategoryDetails>
              
    
          </CategoryInfo>
          <EditDeleteOptions>
		  <EditButton onClick={() => setEditCategory(category)} />
            <DeleteButton
              onClick={() => deleteToastNotification(category.id)}
            />
            <UndoButton onClick={() => loadProducts()} />
          </EditDeleteOptions>
  
        </CategoryCard>
      );
    
    } else {
      return (
		
        <CategoryCard key={category.id}>
          <CategoryInfo>
            <CategoryImage
              imageUrl={category.image ? category.image.url : NoImage}
            />
            <CategoryDetails>
              <strong >{category.name}</strong>
              {/*<p>
                <span>Tempo de preparo: </span>
                {category.cook_time} mins
              </p>*/}
            </CategoryDetails>
              
    
          </CategoryInfo>
          <EditDeleteOptions>
            <PlayCircleFilledIcon style={{ color: '#f15454', cursor: 'pointer' }} fontSize="large" onClick={() => loadProducts(category.id)} /><br />
			<EditButton onClick={() => setEditCategory(category)} /><br/>
          <DeleteButton onClick={() => deleteToastNotification(category.id)} /><br/>
          </EditDeleteOptions>
  
        </CategoryCard>
      );
    }
    
  }

  return (
    <Container>
      <AddButton onClick={() => setModalOpen(true)} />
      {!!modalOpen && ( 
        <CategoryModal closeModal={() => setModalOpen(false)} category={editCategory} />
      )}
      
      {categories.map(category => renderCategory(category))}
    </Container>
  );
}

export default Categories ;
