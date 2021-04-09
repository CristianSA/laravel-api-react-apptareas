import React, { Component, useState } from 'react';
import Proyecto from './Proyecto';
import axios from 'axios';
import DatePicker , {registerLocale, setDefaultLocale} from 'react-datepicker';
import es from 'date-fns/locale/es';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import {format} from 'date-fns';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';

registerLocale('es', es)

class Proyectos extends Component{
    constructor(props){
        super(props);
        this.state = {
            usuarioProyectos: [],
            nuevoProyectoData: {
                titulo: '',
                descripcion: '',
                sprints: '',
                estado: false,
                fecha_inicio: format(new Date(), 'yyyy-MM-dd'),
                fecha_fin: '',
                token: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            nuevoProyectoModal: false,
            fecha_inicio: new Date(),
            fecha_fin: new Date()
        }
    }
    manejarCambioFechaInicio(fecha){
        this.setState({
            fecha_inicio: fecha
        })
        let {nuevoProyectoData} = this.state
        nuevoProyectoData.fecha_inicio = format(fecha, 'yyyy-MM-dd')
        this.setState({nuevoProyectoData})
    }
    manejarCambioFechaFin(fecha){
        this.setState({
            fecha_fin: fecha
        })
        let {nuevoProyectoData} = this.state
        nuevoProyectoData.fecha_fin = format(fecha, 'yyyy-MM-dd')
        this.setState({nuevoProyectoData})
    }
    cargarUsuarioProyectos(){
        const {id} = this.props.usuarioData;
        axios.get('http://127.0.0.1:8000/api/proyectos/'+id)
        .then((response) => {
            this.setState({
                usuarioProyectos: response.data
            })
        })
    }
    estadoModalNuevoProyecto(){
        this.setState({
            nuevoProyectoModal: !this.state.nuevoProyectoModal
        })
    }
    nuevoProyecto(e){
        e.preventDefault();
        console.log(this.props);
        const {id} = this.props.usuarioData;
        axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const {titulo, descripcion, sprints, estado,fecha_inicio, fecha_fin, token} = this.state.nuevoProyectoData;
        axios.post('http://127.0.0.1:8000/api/proyecto/nuevo/'+id, {titulo, descripcion, sprints, estado, fecha_inicio, fecha_fin})
        .then((response) => {
            let {usuarioProyectos} = this.state;
            this.cargarUsuarioProyectos();
            this.setState({usuarioProyectos, nuevoProyectoModal: false, nuevoProyectoData:{
                titulo: "",
                descripcion: "",
                sprints: "",
                estado: false,//Por defecto
                fecha_inicio: format(new Date(), 'yyyy-MM-dd'), //Por defecto
                fecha_fin: "",
                token: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }})
            
        })
    }
    componentDidMount(){
        this.cargarUsuarioProyectos();
    }

    render(){
        const usuario_proyecto = this.state.usuarioProyectos.map((proyecto, idx) => {
            return(
                <Proyecto
                    proyecto={proyecto}
                    key={proyecto.id}
                    usuario_data={this.props.usuarioData}
                />
            )
        });
        return(
            <>
                <div className="col-12 col-md-12 text-right">
                    <button className="btn btn-success btn-sm" type="button" onClick={this.estadoModalNuevoProyecto.bind(this)}>
                        Nuevo proyecto
                    </button>
                </div>
                <Modal isOpen={this.state.nuevoProyectoModal} toggle={this.estadoModalNuevoProyecto.bind(this)}>
                    <ModalHeader toggle={this.estadoModalNuevoProyecto.bind(this)}>
                        Nuevo proyecto
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="titulo">
                                Título
                            </Label>
                            <Input id="titulo"
                                value={this.state.nuevoProyectoData.titulo} name="titulo"
                                onChange={(e) => {
                                    let {nuevoProyectoData} = this.state
                                        nuevoProyectoData.titulo = e.target.value
                                        this.setState({nuevoProyectoData})
                                    }}
                                >
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="descripcion">
                                Descripcion
                            </Label>
                            <Input id="descripcion" type="textarea" name="descripcion"
                                value={this.state.nuevoProyectoData.descripcion}
                                onChange={(e) => {
                                    let {nuevoProyectoData} = this.state
                                    nuevoProyectoData.descripcion = e.target.value
                                    this.setState({nuevoProyectoData})
                                }}
                            >
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="sprints">
                                Nº Sprints
                            </Label>
                            <Input id="sprints" type="textarea" name="sprints"
                                value={this.state.nuevoProyectoData.sprints}
                                name="sprints"
                                type="number"
                                onChange={(e) => {
                                    let {nuevoProyectoData} = this.state
                                    nuevoProyectoData.sprints = e.target.value
                                    this.setState({nuevoProyectoData})
                                }}
                            >
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="estado">
                                Estado
                            </Label>
                            <BootstrapSwitchButton
                                checked={false}
                                onlabel='Publicar'
                                onstyle='success'
                                offlabel='No publicar'
                                offstyle='danger'
                                style='w-100'
                                value={false}
                                onChange={(e) => {
                                    let {nuevoProyectoData} = this.state
                                    nuevoProyectoData.estado = e ? true : false
                                    this.setState({
                                        nuevoProyectoData
                                    })
                                }}
                                name='estado'
                            />

                        </FormGroup>
                        <FormGroup>
                            <Label for="fecha_inicio">
                                Fecha inicio
                            </Label>
                            <br/>
                            <DatePicker
                                selected={this.state.fecha_inicio}
                                onChange={this.manejarCambioFechaInicio.bind(this)}
                                className="form-control"
                                locale="es"
                                name="fecha_inicio"
                                dateFormat="dd/MM/yyyy"
                                id="fecha_inicio"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="fecha_fin">
                                Fecha fin
                            </Label>
                            <br/>
                            <DatePicker
                                selected={this.state.fecha_fin}
                                onChange={this.manejarCambioFechaFin.bind(this)}
                                className="form-control"
                                locale="es"
                                name="fecha_fin"
                                dateFormat="dd/MM/yyyy"
                                id="fecha_fin"
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-success btn-block" onClick={this.nuevoProyecto.bind(this)}>
                            Crear proyecto
                        </button>
                        <button className="btn btn-danger btn-block" onClick={this.estadoModalNuevoProyecto.bind(this)}>
                            Cancelar
                        </button>
                    </ModalFooter>
                </Modal>
                <div className="col-12 col-md-12">
                    <h4 className="text-white">
                        Mis proyectos
                    </h4>
                </div>
                {usuario_proyecto}

            </>
        )
        
    }
}
export default Proyectos;