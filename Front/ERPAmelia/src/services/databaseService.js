import apiClient from './apiClient';

export const databaseService = {
    getAll:async(table)=>{
        try {
            const response=await apiClient.get('database/getAll?table='+table);
            return response.data;
        } catch (error) {
            console.error('Error Get All:',table,error);
            throw error;
        }
    },
    insert:async(table,datas)=>{
        try {
            const response=await apiClient.post('database/insert?table='+table,datas);
            return response.data;
        } catch (error) {
            console.error('Error Insert:',table,error);
            throw error;
        }
    },
    update:async(table,datas)=>{
        try {
            const response=await apiClient.put('database/update?table='+table,datas);
            return response.data;
        } catch (error) {
            console.error('Error update:',table,error);
            throw error;
        }
    },
    delete:async(tables,id)=>{
        try {
            const response=await apiClient.delete(`database/delete?table=${tables}&id=${id}`);
            return response.data;
        } catch (error) {
            console.error('Error delete:',table,error);
            throw error;
        }
    }
};

export default databaseService;