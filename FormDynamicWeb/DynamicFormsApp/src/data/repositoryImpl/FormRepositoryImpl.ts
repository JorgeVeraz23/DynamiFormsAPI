import axiosClient from "../../api/apiClient";
import { AxiosException } from "../../api/exception";
import { Form } from "../Entity/Entities";
import { GETALL_FORM, GETFORM_BYID, CREATE_FORM, UPDATE_FORM, DELETE_FORM } from "../../url/url";
import IFormRepository from "../repository/FormRepository";



export default class FormRepositoryImpl implements IFormRepository {
    

    async getAllForm(): Promise<Form[]> {
        try {
            const response = await axiosClient.get(GETALL_FORM);
            console.log("xdd",response);
            return response.data.map((item: any) => ({
                idForm: item.idForm,
                name: item.name,
                description: item.description,
                filledForms: item.filledForms,
                formGroups: item.formGroups,
            }));
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async getFormById(id: number): Promise<Form> {
        try {
            const response = await axiosClient.get(GETFORM_BYID(id));
            console.log("Response from getFormById:", response);
            return {
                idForm: response.data.idForm,
                name: response.data.name,
                description: response.data.description,
                filledForms: response.data.filledForms,
                formGroups: response.data.formGroups,
            };
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
    
    async createForm(data: Form): Promise<boolean> {
        try {
            await axiosClient.post(CREATE_FORM, data);
            return true;
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async editForm(data: Form): Promise<boolean> {
        try {
            await axiosClient.put(UPDATE_FORM, data);
            return true;
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    
}
