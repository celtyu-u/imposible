import "./DashboardPage.css";
import { BreadCrumb } from "primereact/breadcrumb";
import { ProgressBar } from "primereact/progressbar";
import { Chart } from "primereact/chart";
import { useState, useEffect, useRef } from "react";
import databaseService from "../../services/databaseService";
import ModelsUtils from "../../utils/ModelsUtils";
import FormatUtils from "../../utils/FormatUtils";
import ColumnData from "../../models/System/columnData";
import TableData from "../../components/General/TableData";

const DashboardPage = () => {
  const items = [{ label: "Finanzas" }, { label: "Dashboard" }];
  const home = { icon: "pi pi-home", url: "/main" };

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [datas, setDatas] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);

  const tableDatas = "MainDatas";
  const tableEmployees = "MainEmployees";
  const tableInvetories = "MainInventories";
  const tableProducts = "MainProducts";

  const columnsEmployees = [
    new ColumnData("Nombre", "Nombre de Empleado"),
    new ColumnData("Importe", "Importe"), // Nueva columna para la familia
  ];

  const columnsProducts = [
    new ColumnData("CodigoBarras", "Código de Barras"),
    new ColumnData("Descripcion", "Producto"), 
    new ColumnData("Cantidad", "Cantidad"), 
    new ColumnData("Importe", "Importe"), 
    new ColumnData("Utilidad", "Utilidad"), 
  ];


  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    databaseService.getAll(tableInvetories).then((result) => {
      if (result.status == 1) {

        const invetories= new ModelsUtils().GenericToModel(result.datas,tableInvetories);

        const data = {
          labels: ["Compras", "Ventas", "Entradas", "Salidas"],
          datasets: [
            {
              label: "Movimientos del sistema",
              data: [invetories[0].Compras, invetories[0].Ventas,invetories[0].Entradas, invetories[0].Salidas],
              backgroundColor: [
                "rgba(255, 159, 64, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgb(255, 159, 64)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
              ],
              borderWidth: 1,
            },
          ],
        };
        const options = {
          indexAxis: "y", // Eje X para gráfica de barras vertical
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        };
        setChartData(data);
        setChartOptions(options);
      }
    });

    databaseService.getAll(tableDatas).then(result=>{
      if(result.status==1){
        let datasLocal= new ModelsUtils().GenericToModel(result.datas,tableDatas);
        setDatas(datasLocal);
      }
    });
    databaseService.getAll(tableEmployees).then(result=>{
      if(result.status==1){
        let datasEmployees= new ModelsUtils().GenericToModel(result.datas,tableEmployees);
        setEmployees(datasEmployees);
        console.log('DataEmployess:',datasEmployees);
      }
    });

    databaseService.getAll(tableProducts).then(result=>{
      if(result.status==1){
        let datasProducts= new ModelsUtils().GenericToModel(result.datas,tableProducts);
        setProducts(datasProducts);
        console.log('DatasProduct:',datasProducts);
      }
    });

  };

  const openNewDialog=()=>{
  };

  const openEditDialog=()=>{
  };

  const openDeleteDialog=()=>{
  };


  return (
    <>
      <div>
        <BreadCrumb model={items} home={home} />
      </div>
      <div>
        <h1>Dashboard de Ventas</h1>
      </div>

      <div className="grid">
        <div className="col-3 dashboard-label">
          <div className="grid">
            <div className="col-10 dash-title">Utilidad Total</div>
            <div className="col-2">
              <i className="pi pi-dollar dash-icon"></i>
            </div>
          </div>
          <div className="grid">
            <div className="col-12 dash-data">{FormatUtils.formatCurrency(datas.length>0?datas[0].Utilidad:0)}</div>
          </div>
          <div className="grid">
            <div className="col-12 dash-subtitle">
              +{datas.length>0?datas[0].Porcentaje:0}% respecto al mes anterior
            </div>
          </div>
        </div>
        <div className="col-3 dashboard-label">
          <div className="grid">
            <div className="col-10 dash-title">Productos Vendidos</div>
            <div className="col-2">
              <i className="pi pi-cart-plus dash-icon"></i>
            </div>
          </div>
          <div className="grid">
            <div className="col-12 dash-data">{FormatUtils.formatNumber(datas.length>0?datas[0].Cantidad:0)}</div>
          </div>
          <div className="grid">
            <div className="col-12 dash-subtitle">
              +{datas.length>0?datas[0].CantidadUS:0} Unidades en esta semana
            </div>
          </div>
        </div>
        <div className="col-3 dashboard-label">
          <div className="grid">
            <div className="col-10 dash-title">Meta de ventas</div>
            <div className="col-2">
              <i className="pi pi-bullseye dash-icon"></i>
            </div>
          </div>
          <div className="grid">
            <div className="col-12 dash-data2">{datas.length>0?datas[0].Meta:0}%</div>
            <div className="col-12">
              <ProgressBar value={datas.length>0?datas[0].Meta:0}></ProgressBar>
            </div>
          </div>
          <div className="grid">
            <div className="col-12 dash-subtitle">
              +{datas.length>0?datas[0].Porcentaje:0}% respecto al mes anterior
            </div>
          </div>
        </div>
        <div className="col-3 dashboard-label">
          <div className="grid">
            <div className="col-10 dash-title">Crecimiento del mes</div>
            <div className="col-2">
              <i className="pi pi-chart-line dash-icon"></i>
            </div>
          </div>
          <div className="grid">
            <div className="col-12 dash-data">{datas.length>0?datas[0].Porcentaje:0}%</div>
          </div>
          <div className="grid">
            <div className="col-12 dash-subtitle">respecto al mes anterior</div>
          </div>
        </div>
      </div>
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <div className="card">
              <Chart type="bar" data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
        {/* <div className="col-4">
          <h1>Principales Empleados</h1>
        <TableData
          arrayObjects={employees}
          columns={columnsEmployees}
          openNewDialog={openNewDialog}
          openEditDialog={openEditDialog}
          openDeleteDialog={openDeleteDialog}
          isMobile={false}
          msgNew={"Nuevo Inventario"}
          acciones={false}
          busqueda={false}
        />
        </div> */}
      </div>
      <div className="grid">
        <div className="col-12">
        <h1>Principales Productos</h1>
        <TableData
          arrayObjects={products}
          columns={columnsProducts}
          openNewDialog={openNewDialog}
          openEditDialog={openEditDialog}
          openDeleteDialog={openDeleteDialog}
          isMobile={false}
          msgNew={"Nuevo Inventario"}
          acciones={false}
          busqueda={false}
        />

        </div>
      </div>
    </>
  );
};

export default DashboardPage;
