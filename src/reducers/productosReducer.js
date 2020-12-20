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
    EDITAR_PRODUCTO_ERROR
} from '../types';

// Estado para los productos
const initialState = {
    productos: [],
    error: null,
    loading: false,
    productoeliminar: null,
    productoeditar: null
}

export default function productosReducer(state = initialState, action) {
    switch (action.type) {
        // Agregar prouctos
        case  AGREGAR_PRODUCTO:
            return {
                ...state,
                loading: true
            }
        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                productos: [ ...state.productos, action.payload ]
            }
        case AGREGAR_PRODUCTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
        // Listar productos de la base de datos
        case COMENZAR_DESCARGA_PRODUCTOS:
            return {
                ...state,
                loading: action.payload
            }
        case DESCARGA_PRODUCTOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                productos: action.payload
            }
        case DESCARGA_PRODUCTOS_ERROR:
            return {
                ...SecurityPolicyViolationEvent,
                loading: false,
                error: action.payload
            }
        
        // Eliminar un producto
        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                productoeliminar: action.payload
            }
        case ELIMINAR_PRODUCTO_EXITO:
            return {
                ...state,
                productos: state.productos.filter( productos => productos.id !== state.productoeliminar ),
                productoeliminar: null
            }
        case ELIMINAR_PRODUCTO_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case OBTENER_PRODUCTO_EDITAR:
            return {
                ...state,
                productoeditar: action.payload
            }
        case EDITAR_PRODUCTO_EXITO:
            return {
                ...state,
                productoeditar: null,
                productos: state.productos.map(producto => 
                    producto.id === action.payload.id ? producto = action.payload : producto
                )
            }
        case EDITAR_PRODUCTO_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
} 