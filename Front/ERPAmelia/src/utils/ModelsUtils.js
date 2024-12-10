

class ModelsUtils{

  static GenericToModel(datas){
        const tiposProducto = [
            { id: 1, descripcion: 'Alimentos y Bebidas' },
            { id: 2, descripcion: 'Productos de Limpieza' },
            { id: 3, descripcion: 'Higiene y Cuidado Personal' },
            { id: 4, descripcion: 'Carnicería y Embutidos' },
            { id: 5, descripcion: 'Verduras y Frutas' },
            { id: 6, descripcion: 'Congelados' },
            { id: 7, descripcion: 'Bebidas Alcohólicas' },
            { id: 8, descripcion: 'Otros' },
            { id: 9, descripcion: 'Artículos para Mascotas' },
            { id: 10, descripcion: 'Productos Naturales y Orgánicos' },
            { id: 11, descripcion: 'Utensilios de Cocina' },
            { id: 12, descripcion: 'Medicamentos' },
            { id: 13, descripcion: 'Productos para Bebés' },
            { id: 14, descripcion: 'Electrónicos y Accesorios' }
          ];

        return datas.map((data) => {
            const transformedData = {};
            data.forEach((field) => {
              switch (field.type) {
                case "int":
                  if(field.name=='IdTipoProducto')
                  {
                    transformedData[field.name] = parseInt(field.value);
                    transformedData['TipoProducto']=tiposProducto.filter(f=>f.id==parseInt(field.value)).shift().descripcion;
                  }
                  else
                  {
                    transformedData[field.name] = parseInt(field.value);
                  }
                  break;
                case "nvarchar":
                  transformedData[field.name] = field.value;
                  break;
                case "numeric":
                  transformedData[field.name] = parseFloat(field.value);
                  break;
                case "datetime":
                  transformedData[field.name] = new Date(field.value.substring(0, 4), field.value.substring(4, 6) - 1, field.value.substring(6, 8));
                  break;
                default:
                  transformedData[field.name] = field.value;
              }
            });
            return transformedData;
            });
    }
}


export default ModelsUtils;