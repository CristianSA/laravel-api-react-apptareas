import React, { Component } from 'react';

class Tareas extends Component{
    constructor(props){
        super(props);
        this.state = {
            usuarioTareas: []
        }
    }
    cargarUsuarioTareas(){
        const {id} = this.props.proyecto
        const usuario_id = this.props.usuario_id
        

    }
    render(){
        console.log(this.props)
        return(
            <>
                <div className="col-12 col-md-12 text-right">
                    <button className="btn btn-success btn-sm">
                        Nueva tarea
                    </button>
                </div>
            </>
        )
    }
}
export default Tareas