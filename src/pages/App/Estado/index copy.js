import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import api from "../../../services/api";

import CategoryModal from "../../../components/CategoryModal";
import ProductModal from '../../../components/ProductModal';
import EstadoModal from '../../../components/EstadoModal'

import {
  Container,
  CategoryCard,
  CategoryInfo,
  CategoryImage,
  CategoryDetails,
  CategoryForm
} from "./styles";

import {
  EditDeleteOptions,
  EditButton,
  DeleteButton,
  AddButton
} from "../../../styles/buttons";

function Estado() {
  const [estados, setEstados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false)
   const [editEstado, setEditEstado] = useState(null)

  useEffect(() => {
    LoadState();
  }, []);


  async function LoadState() {

    try {

      const data = await api.get("admin/state");

      console.log(data);
      setEstados(data);

      toast.success("Estado!");
    } catch (err) {
      toast.error("Erro");
    } finally {
  
    }
  }

  async function renderEstado(state) {
    
      return (
        <Container>
  
<AddButton onClick={() => setModalOpen(true)} />
      {modalOpen && (
        <ProductModal
          closeModal={() => setModalOpen(false)}
          product={editEstado}
        />
      )}
      {estados.map(estado => renderEstado(estado))}
  
      </Container>
      )
  }

  return (
  <Container>
  
  
  
   <AddButton onClick={() => setModalOpen(true)} />
      {modalOpen && (
        <EstadoModal
          closeModal={() => setModalOpen(false)}
          product={editEstado}
        />
      )}
      {/*estados.map(state => renderEstado(state))*/}
  
  </Container>
  );
}

export default Estado;
