import {estatus} from '../models/const/dataSystem';
import {prioridades} from '../models/const/dataSystem';
import {areas} from '../models/const/dataSystem';
import {familias} from '../models/const/dataSystem';
import {procesos} from '../models/const/dataSystem';
import Producto from '../models/Producto';
import Field from '../models/System/field'

class ModelsUtils{
  GenericToModel(datas,table,clientes=[]){
        return datas.map((data) => {
            const transformedData = {};
            data.forEach((field) => {
              switch (field.type) {
                case "int":
                  if(field.name=='IdTipoFamilia')
                  {
                    transformedData[field.name] = parseInt(field.value);
                    let values=familias.filter(f=>f.id==parseInt(field.value));
                    if(values.length>0){
                      transformedData['Familia']=values[0].descripcion;
                    }else{
                      transformedData['Familia']='';
                    }
                  }
                  else if(field.name=='IdProceso'){
                    transformedData[field.name] = parseInt(field.value);
                    let values=procesos.filter(f=>f.id==parseInt(field.value));
                    if(values.length>0){
                      transformedData['Proceso']=values[0].descripcion;
                    }else{
                      transformedData['Proceso']='';
                    }
                  }
                  else if(field.name=='IdArea'){
                    transformedData[field.name] = parseInt(field.value);
                    let values=areas.filter(f=>f.id==parseInt(field.value));
                    if(values.length>0){
                      transformedData['Area']=values[0].descripcion;
                    }else{
                      transformedData['Area']='';
                    }
                  }
                  else if(field.name=='IdPrioridad'){
                    transformedData[field.name] = parseInt(field.value);
                    let values=prioridades.filter(f=>f.id==parseInt(field.value));
                    if(values.length>0){
                      transformedData['Prioridad']=values[0].descripcion;
                    }else{
                      transformedData['Prioridad']='';
                    }
                  }
                  else if(field.name=='IdEstatus'){
                    transformedData[field.name] = parseInt(field.value);
                    let values=estatus.filter(f=>f.id==parseInt(field.value));
                    if(values.length>0){
                      transformedData['Estatus']=values[0].descripcion;
                    }else{
                      transformedData['Estatus']='';
                    }
                  }
                  else if(field.name=='IdCliente'&&table!="Cliente"){
                    transformedData[field.name] = parseInt(field.value);
                    let values=clientes.filter(f=>f.id==parseInt(field.value));
                    if(values.length>0){
                      transformedData['Cliente']=values[0].descripcion;
                    }else{
                      transformedData['Cliente']='';
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