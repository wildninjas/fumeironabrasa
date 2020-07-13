import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import api from "../../../services/api";

import CategoryModal from "../../../components/CategoryModal";

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

  useEffect(() => {
    LoadState();
  }, []);


  async function LoadState() {

    try {

      const data = await api.get("admin/state");

      console.log(data);
	  
      setEstados(data);

      toast.success("Estado! variavel data "+data);
    } catch (err) {
      toast.error("Erro");
    } finally {
  
    }
  }

  async function renderState(state) {
    
      return (
        <Container>
  
        <CategoryDetails>
            <strong>ggfdgfdgfdgfgfdgfd</strong>
        </CategoryDetails>
  
      </Container>
      );
  }

  return (
  <Container></Container>
  );
}

export default Estado;
