import axiosClient from "../../api/apiClient";
import { AxiosException } from "../../api/exception";
import { GETALL_FORM, GETFORM_BYID, CREATE_FORM, UPDATE_FORM, DELETE_FORM } from "../../url/url";
import IFormRepository from "../repository/FormRepository";

export default class FormRepositoryImpl implements IFormRepository {

    async getAllForm(): Promise<any[]> {
        try {
            const response = await axiosClient.get(GETALL_FORM);
            console.log(response.data); // Verifica la estructura de los datos aquí
            return response.data;
        } catch (error) {
            console.error('Error al obtener los formularios', error);
            throw error; // Maneja el error adecuadamente
        }
    }

    async getFormById(id: number): Promise<any> {
        try {
            const response = await axiosClient.get(GETFORM_BYID(id));
            return response.data; // Retorna los datos sin tipo
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async deleteForm(id: number): Promise<boolean> {
        try {
            await axiosClient.delete(DELETE_FORM(id));
            return true;
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async createForm(data: any): Promise<boolean> {
        try {
            await axiosClient.post(CREATE_FORM, data);
            return true;
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async editForm(data: any): Promise<boolean> {
        try {
            await axiosClient.put(UPDATE_FORM, data);
            return true;
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }
}
