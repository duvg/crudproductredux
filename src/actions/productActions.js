import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR
} from '../types';

import Swal from 'sweetalert2';

import clienteAxsion from '../config/axios';
import clienteAxios from '../config/axios';

// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch ( agregarProducto() );

        try {
            // Insertar datos en la api
            await clienteAxios.post('/productsos', producto);

            dispatch( agregarProductoExito(producto) );

            // Alerta al usuario
            Swal.fire(
                'Operación exitosa',
                'El producto se agregó correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            dispatch( agregarProductoError(true) );

            // Alertar al usuario
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            });
        }
    };
}


const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO
});

// Si el producto se guarda en la abse de datos
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

// Si hubo un error al guardar el producto
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});