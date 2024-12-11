import {tiposBebidas} from '../models/const/dataSystem';
import Producto from '../models/Producto';
import Field from '../models/System/field'

class ModelsUtils{
  GenericToModel(datas){
        return datas.map((data) => {
            const transformedData = {};
            data.forEach((field) => {
              switch (field.type) {
                case "int":
                  if(field.name=='IdTipoProducto')
                  {
                    transformedData[field.name] = parseInt(field.value);
                    let values=tiposBebidas.filter(f=>f.id==parseInt(field.value));
                    if(values.length>0){
                      transformedData['TipoProducto']=values[0].descripcion;
                    }else{
                      transformedData['TipoProducto']='';
                    }
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

  ModelToGeneric(modelos){
      let datas=[];
      console.log("Inicio de componente")
      modelos.forEach(obj=>{
        let fields=[];
        for (const key in obj) {
          console.log(key,":",obj[key])
          fields.push(new Field(key,obj[key].toString()));
        }
        console.log('Campos:',fields);
        datas.push(fields);
      });
      console.log("Datas:",datas);
      return datas;
  }

  static fromObject(objOrigen,objDestino) {
    for (const key in objDestino) {
      objDestino[key]=objOrigen[key];
    }
    return objDestino;
  }

}


export default ModelsUtils;