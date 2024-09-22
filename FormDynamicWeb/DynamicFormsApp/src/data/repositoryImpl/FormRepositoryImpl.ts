import { FormEntity } from "data/Entity/FormEntity";
import axiosClient from "../../api/apiClient";
import { AxiosException } from "../../api/exception";
import { GETALL_FORM, GETFORM_BYID, CREATE_FORM, UPDATE_FORM, DELETE_FORM, SELECTOR_FORMS } from "../../url/url";
import IFormRepository from "../repository/FormRepository";
import { KeyValueEntity } from "data/Entity/KeyValueEntity";

export default class FormRepositoryImpl implements IFormRepository {

    async getAllForm(): Promise<FormEntity[]> {
        try {
            const response = await axiosClient.get(GETALL_FORM);
            const result: FormEntity[] = response.data.map((item: any) => ({
                idForm: item.idForm,
                name: item.name,
                description: item.description
            }));
            console.log("haber aca",result)
            return result;
            
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }
    
    
    async selectorForm(): Promise<KeyValueEntity[]> {
        try {
            const response = await axiosClient.get(SELECTOR_FORMS);
            const result: KeyValueEntity[] = response.data.map((item: any) => ({
                Key: item.Key,
                Value: item.Value,
            }));
            return result;
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }
    

    async getFormById(id: number): Promise<FormEntity> {
        try {
            const response = await axiosClient.get(GETFORM_BYID(id));
            const result: FormEntity = {
                idForm: response.data.idForm,
                name: response.data.name,
                description: response.data.description
            };
            return result; 
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async deleteForm(id: number): Promise<boolean> {
        try {
            const response = await axiosClient.delete(DELETE_FORM(id));
            return true;
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async createForm(data: FormEntity): Promise<boolean> {
        try {
            await axiosClient.post(CREATE_FORM, data);
            return true;
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async editForm(data: FormEntity): Promise<boolean> {
        try {
            await axiosClient.put(UPDATE_FORM, data);
            return true;
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }
}
