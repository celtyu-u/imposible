import "./DataMainPage.css";

const DataMainPage = () => {
  return (
    <>
      <div>
        <h1>Información Relevante</h1>
      </div>
      <div className="grid">
        <div className="col-4">
          <div className="target-data">
            <div className="title-data">
              <div className="grid">
                <div className="col-10">Venta del día</div>
                <div className="col-2">
                  <i className="pi pi-dollar icon-data"></i>
                </div>
              </div>
            </div>
            <div className="data-data">$1,559.60</div>
            <div className="note-data">Información de hace 5 minutos</div>
          </div>
        </div>
        <div className="col-4">
          <div className="target-data">
            <div className="title-data">
              <div className="grid">
                <div className="col-10">Empleado del día</div>
                <div className="col-2">
                  <i className="pi pi-user icon-data"></i>
                </div>
              </div>
            </div>
            <div className="data-data">Alfredo Romero</div>
            <div className="note-data">Lleva la mayor venta del día</div>
          </div>
        </div>
        <div className="col-4">
          <div className="target-data">
            <div className="title-data">
              <div className="grid">
                <div className="col-10">Utilidad del día</div>
                <div className="col-2">
                  <i className="pi pi-dollar icon-data"></i>
                </div>
              </div>
            </div>
            <div className="data-data">$ 155.96</div>
            <div className="note-data">Tenemos el 10% de utilidad</div>
          </div>
        </div>
      </div>
      <div className="grid mt-5">
        <div className="col-4">
          <div className="target-data">
            <div className="title-data">
              <div className="grid">
                <div className="col-10">Producto Mas Vendido</div>
                <div className="col-2">
                  <i className="pi pi-cart-plus icon-data"></i>
                </div>
              </div>
            </div>
            <div className="data-data">Don Julio Rep.</div>
            <div className="note-data">Los tequilas representan el 30% de la venta</div>
          </div>
        </div>
        <div className="col-4">
          <div className="target-data">
            <div className="title-data">
              <div className="grid">
                <div className="col-10">Empleados nuevos</div>
                <div className="col-2">
                  <i className="pi pi-users icon-data"></i>
                </div>
              </div>
            </div>
            <div className="data-data">3</div>
            <div className="note-data">Agregados en el 9 Diciembre</div>
          </div>
        </div>
        <div className="col-4">
          <div className="target-data">
            <div className="title-data">
              <div className="grid">
                <div className="col-10">Quejas de Clientes</div>
                <div className="col-2">
                  <i className="pi pi-pen-to-square icon-data"></i>
                </div>
              </div>
            </div>
            <div className="data-data">0</div>
            <div className="note-data">La atención a clientes es optima</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataMainPage;
