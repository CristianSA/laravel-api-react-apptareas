import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FormRegistro from '../Registro/FormRegistro';
import Navba from '../Navbar/Navbar';
class Registro extends Component{
    constructor(props){
        super(props);
    }
    render(){
        
        return(
            <div className="registro">
                <Navba/>
                <div className="row justify-content-center">
                    <FormRegistro
                        props={this.props}
                    />
                </div>
            </div>
        );
    }
}
export default Registro;