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
  ProductForm,
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





 export class Horario extends React.Component{
	 

	// state ={
	//	 newHorario:'',
	//	 horario:[],
	// };



	
	 async componentDidMount(){
		 const {data: horario,name} = await api.get('admin/horario/1');

		 this.setState({horario});
	 }


		handleHorarioSave = async (e) => {
			e.preventDefault();
			const {data: horario} = await api.put('admin/horario/1',{horario: this.state.horario});
			 //this.setState({horario: [... this.horario.horario, horario], horario:"" });
			 
		 console.log(horario);
			// window.alert(this.state.horario)
			 toast.success("horario atualizado! Novo horario: "+this.state.horario);
		}

		constructor(){
			super();
			this.state ={
				horario:""
			};
			this.onChange = (evento) => {
				console.log(evento.target.value);
				this.setState({horario: evento.target.value})
			}
		}
	 		 render(){
				  return(

					  <ProductForm>
						  <div>
					 

						

					  <form onSubmit={this.handleHorarioSave}>
						Novo Horário: <input 
						name="horario" 
						value={this.state.horario}
						type="text"
						onChange={this.onChange} /><br/>
						{/*<br/>>hello world , {this.state.horario}

					  <input type="text" 
					  
					  onChange= {e => this.setState({newHorario: e.target.value})}
					  value={this.state.newHorario}
					  
				  		/>*/}

					  <button type="submit">Alterar Horário de Funcionamento</button>
					  
					  
					  </form>
					  
					  <ul>
					  {/*this.state.estados.map(estado => (
						  <li key={estado.id}>{estado.estado}/</li>
					  ))*/}
					  
					  </ul>
					  
					  
					  </div>
					  </ProductForm>
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

 export default Horario;