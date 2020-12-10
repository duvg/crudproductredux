const NuevoProducto = () => {
    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar nuevo producto
                        </h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre del producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    palceholder="Nombre del producto"
                                    name="nombre"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="precio">Precio del Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    palceholder="Precio del producto"
                                    name="precio"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProducto;