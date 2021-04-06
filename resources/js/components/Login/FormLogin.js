import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import history from 'history/browser';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class FormLogin extends Component{
    constructor(props){
        super(props)
        this.state = {
            loginUsuarioData: {
                email: '',
                password: '',
                token: ''
            },
            mostrarMensaje:{
                mensaje: [],
                tipo: '',
                estado: false //Por defecto
            },
            usuarioLogueado: false
        }
    }
    validarUsuarioLogin(e){
        e.preventDefault();
        const {email, password, token} = this.state.loginUsuarioData;
        axios.post('http://127.0.0.1:8000/api/login',{email, password, token})
        .then((response) => {
            this.setState({
                estadoLoader: true
            })
            if(response.data.status){
                this.setState({
                    mostrarMensaje: {
                        mensaje: response.data.message,
                        tipo: response.data.class,
                        estado: true
                    }
                })
                this.setState({
                    usuarioLogueado: true
                })
                this.props.props.history.push({
                    pathname:'home',
                    state: {
                        data: response.data.usuario_data,
                        usuarioLogueado: true
                    }
                })
            }else{
                this.setState({
                    mostrarMensaje: {
                        mensaje: response.data.message,
                        tipo: response.data.class,
                        estado: true
                    }
                })
            }
        })
    }
    handleHide(){
        setTimeout(() => {
            let {mostrarMensaje} = this.state
            mostrarMensaje.estado = false
            this.setState({mostrarMensaje})
        }, 2000)
    }
    
    render(){
        return(
            <div className="col-md-8 mt-2 mx-auto">
                <div className="card bg-dark border-light">
                    <div className="card-header text-center bg-blue-especial">
                        <h3 className="text-white">Login</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.validarUsuarioLogin.bind(this)} role="form" method="POST" className="form-horizontal">
                            <input type="hidden" name="_token" value={this.props.token}/>
                            <div className="form-group">
                                <label className="text-white">Email</label>
                                <input type="email" name="email" className="form-control" value={this.state.loginUsuarioData.email}
                                    onChange={(e) => {
                                        let {loginUsuarioData} = this.state
                                        loginUsuarioData.email = e.target.value
                                        this.setState({loginUsuarioData});
                                            /* console.log(this.props);
                                            console.log('change email');
                                            let {email} = this.props.loginUsuarioData;
                                            this.props.loginUsuarioData.email = e.target.value
                                            this.setState({email}) */
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label className="text-white">Contraseña</label>
                                <input type="password" name="password" className="form-control" value={this.state.loginUsuarioData.password}
                                    onChange={(e) => {
                                        let {loginUsuarioData} = this.state
                                        loginUsuarioData.password = e.target.value
                                        this.setState({loginUsuarioData})
                                    }}
                                />
                            </div>
                            <Alert color={this.state.mostrarMensaje.tipo} isOpen={this.state.mostrarMensaje.estado} onMouseOver={this.handleHide.bind(this)}>
                                {this.state.mostrarMensaje.mensaje}
                            </Alert>
                            <button type="submit" className="btn btn-primary btn-block">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default FormLogin;