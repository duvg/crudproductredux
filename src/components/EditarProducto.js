import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { editarProductoAction } from '../actions/productoActions';

const EditarProducto = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    // Nuevo state de producto
    const [ producto, guardarProducto ] = useState({
        nombre: '',
        precio: ''
    });

    // Producto a editar
    const productoeditar = useSelector(state => state.productos.productoeditar);

    useEffect(() => {
        guardarProducto(productoeditar);
    }, [productoeditar]);

    if(!producto) {
        history.push('/');
        return null;
    }   

    // Leer los datos del formulario
    const onChangeFormulario = (e) => {
        guardarProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    const { nombre, precio} = producto;

    const submitEditarProducto = (e) => {
        e.preventDefault();

        dispatch(editarProductoAction(producto));

        history.push('/');
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar producto
                        </h2>
                        <form
                            onSubmit={submitEditarProducto}
                        >
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre del producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    palceholder="Nombre del producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onChangeFormulario}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="precio">Precio del Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    palceholder="Precio del producto"
                                    name="precio"
                                    value={precio}
                                    onChange={onChangeFormulario}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Guardar cambios</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditarProducto;