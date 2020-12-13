import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR
} from '../types';

import Swal from 'sweetalert2';

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

// Listar los productos desde la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch( descargarProductos() );

        try {
            const respuesta = await clienteAxios.get('/productos');
            
            dispatch( descargarProductosExito(respuesta.data) );
        } catch (error) {
            dispatch( descargaProductosError() );
            console.log(error);
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargarProductosExito = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});