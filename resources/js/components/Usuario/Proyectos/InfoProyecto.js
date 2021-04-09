import React, { Component } from 'react';
import Navba from '../../Navbar/Navbar';
import Tareas from '../Tareas/Tareas';

class InfoProyecto extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const {proyecto} = this.props.location.state;
        const {usuario_id} = this.props.location.state;
        return(
            <>
                <div className="proyecto container-fluid">
                    <Navba link="Logout"/>
                    <div className="row">
                        <div className="col-12 col-md-12">
                            <div className="card bg-dark border-light">
                                <div className="card-header border-light">
                                    <h4 className="card-title text-white">
                                        {proyecto.titulo}
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 col-md-12">
                                            <p className="text-white">
                                                {proyecto.descripcion}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 col-md-12">
                            <div className="card bg-dark border-light">
                                <div className="card-header border-light">
                                    <h4 className="card-title text-white">
                                        Tareas
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <Tareas
                                            usuario_id={usuario_id}
                                            proyecto={proyecto}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </>
        )
    }
 }
 export default InfoProyecto;