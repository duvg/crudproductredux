import React, { useState } from 'react';
import { useDispatch, useSelector}from 'react-redux';

// Redux actions
import { crearNuevoProductoAction } from '../actions/productoActions';

const NuevoProducto = ({history}) => {

    // state del componente
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    const dispatch = useDispatch();


    // Acceder al state del store
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);

    // llamada al action de productoAction
    const agregarProducto = producto => dispatch( crearNuevoProductoAction(producto) );

    // submit del form
    const submitNuevoProducto = e => {
        e.preventDefault();

        // Valdar formulario
        if(nombre.trim === '' || precio <= 0) {
            return;
        }
        // validar si no hay errores

        // crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        // Redirecciona al home
        history.push('/');

    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar nuevo producto
                        </h2>
                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre del producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    palceholder="Nombre del producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
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
                                    onChange={e => guardarPrecio(Number(e.target.value))}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>

                        { cargando ? <p>Cargando...</p> : null }
                        { error ? <p className="alert alert-danger mt-4 text-center"> Ocurrio un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProducto;