  import React, { useState, useEffect, Component } from "react";
import { toast } from "react-toastify";

import api from "../../../services/api";

import NoImage from "../../../assets/images/no-image.jpg";
import CategoryModal from "../../../components/CategoryModal";
import ProductModal from '../../../components/ProductModal';
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

import axios from 'axios';



//------------------



//-----------------


 export class EstadoAtual extends React.Component{
	 

	 state ={
		 newEstado:'',
		 estados:[],
	 };

	 async componentDidMount(){
		 const {data: estados} = await api.get('admin/state');

		 this.setState({estados});
	 }


		handleEstadoSave = async (e) => {
			e.preventDefault();
			const {data: estado} = await api.put('admin/state/',{estado: this.state.newEstado});
			 this.setState({estados: [... this.state.estados, estado], newEstado:"" });
			 console.log(estado);
			 window.alert(estado)
		}
	 		 render(){
				  return(

					  <div className="DivEstado">
					  
					  <form onSubmit={this.handleEstadoSave}>
					  <textarea 
					  
					  onChange= {e => this.setState({newEstado: e.target.value})}
					  value={this.state.newEstado}
					  
					  />

					  <button type="submit">Enviar</button>
					  
					  </form>
					  
					  <ul>
					  {/*this.state.estados.map(estado => (
						  <li key={estado.id}>{estado.estado}/</li>
					  ))*/}
					  
					  </ul>
					  
					  
					  </div>

				  )


			  }

  



			//	constructor(){
			//		super()
			//		this.state = {
			//			tempoBom: true
			//		}
			//	}
					
			//	render(){ 
					
			//		if (this.state.tempoBom){

			//			return (<Container>xxxzzz<p>O tempo esta bom</p></Container>);
						 
			//		}else{
			//			return (<Container>xxx<p>O tempo esta mau</p></Container>);
			//		}
							
				
 			//	}

				
 }

 export default EstadoAtual;