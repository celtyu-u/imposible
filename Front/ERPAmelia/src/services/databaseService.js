import apiClient from './apiClient';

export const databaseService = {
    getAll:async(table)=>{
        try {
            const response=await apiClient.get('database/getAll?table='+table);
            return response.data;
        } catch (error) {
            console.error('Error fetching all bridges:', error);
            throw error;
        }
    }
};

export default databaseService;