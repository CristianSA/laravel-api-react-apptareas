import React, { Component } from 'react';
import Navba from '../Navbar/Navbar';
import FormLogin from './FormLogin';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class Login extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            estadoLoader: false
        }
    }

    render(){
        let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        if(token){
            window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
        }else{
            console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
        }
        return(
            <div className="login">
                <Navba />
                <div className="row">
                    <FormLogin 
                        token={token}
                        estadoLoader={this.state.estadoLoader}
                        props={this.props}
                    />
                </div>
                
            </div>
        );
    }
}
export default Login;