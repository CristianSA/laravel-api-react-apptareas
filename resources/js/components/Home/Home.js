import axios from 'axios';
import React, { Component } from 'react';
import Navba from '../Navbar/Navbar';
import Proyectos from '../Usuario/Proyectos/Proyectos';
import Perfil from '../Usuario/Perfil/Perfil';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import es from 'date-fns/locale/es';
import {format} from 'date-fns';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            usuarioData: this.props.location.state.data
        }
    }
    render(){
        return(
            <div className="home container-fluid">
                <Navba link="Logout" />
                <div className="row">
                    <div className="col-12 col-md-12">
                        <div className="card bg-dark border-light">
                            <div className="card-header border-light">
                                <h4 className="card-title text-white">
                                    Dashboard
                                </h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <Proyectos
                                        usuarioData={this.state.usuarioData}
                                    />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;