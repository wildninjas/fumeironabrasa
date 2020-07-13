import React, { useState, useEffect, useCallback, Component } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import api from "../../services/api";
import { Container, ProductForm } from "./styles";

function EstadoModal({ estado, closeModal }) {
  const [newEstado, setNewEstado] = useState({
    open: 0
  });
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const clickOutside = useCallback(
    function clickOutsideEventListener(e) {
      if (e.target.id === "outsideCategoryModal") {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    loadImages();
    loadCategories();
    document.addEventListener("click", clickOutside);

    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [clickOutside]);

  useEffect(() => {
    if (estado) {
      setNewEstado({
        ...estado,
       // product_sizes: product.sizes.map(size => size.size_id)
      });
    }
  }, [estado]);

  useEffect(() => {
    loadSizes();
  }, [newEstado.category_id]);

  async function loadImages() {
    try {
      const { data } = await api.get("admin/images");

      setImages(data);
    } catch (err) {
      toast.error("Erro ao buscar as imagens");
    }
  }

  async function loadCategories() {
    try {
      const { data } = await api.get("admin/categories");

      setCategories(data);
    } catch (err) {
      toast.error("Erro ao buscar as categorias");
    }
  }

  async function loadSizes() {
    if (!newEstado.category_id) {
      setSizes([]);
      return;
    }

    try {
      const { data } = await api.get("admin/sizes", {
        params: { category: newEstado.category_id }
      });

      setSizes(data);
    } catch (err) {
      //toast.error("Erro ao buscar os tamanhos");
    }
  }

  function handleInputChange(e) {
    setNewEstado({ ...newEstado, [e.target.name]: e.target.value });
  }

  function handleProductSizesChange(e) {
    const options = Object.values(e.target.options);
    const selectedOptions = options.filter(option => option.selected);

    setNewEstado({
      ...newEstado,
      product_sizes: selectedOptions.map(option => option.value)
    });
  }

  async function handleUpdateProduct() {
    const {
      open
    } = newEstado;
    try {
      setLoading(true);

      await api.put(`admin/state/${open}`, {
        open
        //sizes: product_sizes.map(size => ({
        //  size_id: size
		//})
		//)
      });

      closeModal();
      toast.success("Produto atualizado!");
    } catch (err) {
      toast.error("Erro ao editar o produto, confira os dados preenchidos");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateProduct() {
    const {
      open
    } = newEstado;

    try {
      setLoading(true);

      await api.post("admin/state", {
        open
      });

      closeModal();
      toast.success("Produto criado!");
    } catch (err) {
      toast.error("Erro ao criar o produto, confira os dados preenchidos");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (estado) {
      handleUpdateProduct();
    } else {
      handleCreateProduct();
    }
  }

  return (
    <Container id="outsideProductModal">
      <ProductForm onSubmit={handleSubmit}>
        <h2>Estado {estado ? "Editar" : "Criar"} produto</h2>
        <div>
          <label>Esgotado</label>
          <select
            value={newEstado.esgotado}
            name="esgotado"
            onChange={handleInputChange}
          >
              <option value='1'>
                  Sim
              </option>
                <option value='0'>
                  Não
                </option>
          </select>
        </div>
       {/* <div>
          <label>Tamanhos</label>
          <select
            multiple
            value={newProduct.product_sizes}
            name="product_sizes"
            onChange={e => {
              handleProductSizesChange(e);
            }}
          >
            {sizes.length &&
              sizes.map(size => (
                <option key={3} value={3}>
                  ok
                </option>
              ))}
          </select>
			  </div>*/}
        <button type="submit">{loading ? "Carregando..." : "Salvar"}</button>
        <button type="button" className="close" onClick={() => closeModal()}>
          Fechar
        </button>
      </ProductForm>
    </Container>
  );
}

ProductForm.propTypes = {
  name: PropTypes.string,
  base_price: PropTypes.string,
  image_id: PropTypes.number,
  category_id: PropTypes.number,
  product_sizes: PropTypes.arrayOf(PropTypes.number),
  esgotado: PropTypes.number
};

export default EstadoModal;



