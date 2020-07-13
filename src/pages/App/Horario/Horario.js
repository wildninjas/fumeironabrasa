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





 export class Horario extends React.Component{
	 

	 state ={
		 newHorario:'',
		 horario:[],
	 };

	 async componentDidMount(){
		 const {data: horario} = await api.get('admin/horario');

		 this.setState({horario});
	 }


		handleHorarioSave = async (e) => {
			e.preventDefault();
			const {data: horario} = await api.put('admin/horario',{horario: this.state.newHorario});
			 this.setState({horario: [... this.horario.horario, horario], newHorario:"" });
			 console.log(horario);
			 window.alert(horario)
		}
	 		 render(){
				  return(

					  <div className="DivHorario">
					  
					  <form onSubmit={this.handleHorarioSave}>
					  <input type="text" 
					  
					  onChange= {e => this.setState({newHorario: e.target.value})}
					  value={this.state.newHorario}
					  
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

 export default Horario;