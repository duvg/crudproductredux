import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    ELIMINAR_PRODUCTO_EXITO,
    ELIMINAR_PRODUCTO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    EDITAR_PRODUCTO_EXITO,
    EDITAR_PRODUCTO_ERROR,
    INICIAR_EDICION_PRODUCTO
} from '../types';

import Swal from 'sweetalert2';

import clienteAxios from '../config/axios';

/***** Crear nuevos productos *****/
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch ( agregarProducto() );

        try {
            // Insertar datos en la api
            await clienteAxios.post('/productos', producto);

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

/*****  Listar los productos desde la base de datos *****/
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

/***** Selecciona y elmina el producto *****/
export function eliminarProductoAction(id) {
    return async (dispatch) => {
        dispatch( obtenerProductoEliminar(id) );
        
        try {
            await clienteAxios.delete(`/productos/${id}`);

            dispatch( eliminarProductoExito() );

            // Si se elimina mostrar la alerta
            Swal.fire(
                'Eliminado!',
                'El Producto ha sido eliminado correctamente',
                'success'
            )
            
        } catch (error) {
            console.log(error);
            dispatch( eliminarProductoError() );
        }
    }
}

const obtenerProductoEliminar = (id) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito =() => ({
    type: ELIMINAR_PRODUCTO_EXITO
});

const eliminarProductoError = () => ({
    type: ELIMINAR_PRODUCTO_ERROR,
    payload: true
});

/***** Obtener productoa editar ******/
export function obtenerProductoEditarAction(producto) {
    return async (dispatch) => {
        dispatch( obtenerProductoEditar(producto) );
    }
}

const obtenerProductoEditar = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});


/***** Editar un producto  *****/
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch( editarProducto(producto) );

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);

            dispatch( editarProductoExito(producto) );
            
        } catch (error) {
            console.log(error);
            dispatch( editarProductoError() );
        }
    }
}

const editarProducto = () => ({
    type: INICIAR_EDICION_PRODUCTO,
});

const editarProductoError = () => ({
    type: EDITAR_PRODUCTO_ERROR,
    payload: true
});

const editarProductoExito = (producto) => ({
    type: EDITAR_PRODUCTO_EXITO,
    payload: producto
});