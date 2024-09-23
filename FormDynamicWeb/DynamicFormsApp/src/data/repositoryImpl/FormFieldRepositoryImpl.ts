
import { FormFieldEntity } from "data/Entity/FormFieldEntity";
import axiosClient from "../../api/apiClient";
import { AxiosException } from "../../api/exception";

import { GETALL_FORMFIELD, GET_FORMFIELD, CREATE_FORMFIELD, UPDATE_FORMFIELD, DELETE_FORMFIELD, SELECTOR_FORMFIELD } from "../../url/url";
import IFormFieldRepository from "data/repository/FormFieldRepository";
import { KeyValueEntity } from "data/Entity/KeyValueEntity";

export default class FormFieldRepositoryImpl implements IFormFieldRepository {

    async getAllFormField(): Promise<FormFieldEntity[]> {
        try {
            const response = await axiosClient.get(GETALL_FORMFIELD);
            const result: FormFieldEntity[] = response.data.map((item: any) => ({
                idForm: item.idForm,
                name: item.name,
                description: item.description
            }));
            return result;
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }
    
    
    async selectorFormField(): Promise<KeyValueEntity[]> {
        try {
            const response = await axiosClient.get(SELECTOR_FORMFIELD);
            const result: KeyValueEntity[] = response.data.map((item: any) => ({
                Key: item.Key,
                Value: item.Value,
            }));
            return result;
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }
    

    async getFormFieldById(id: number): Promise<FormFieldEntity> {
        try {
            const response = await axiosClient.get(GET_FORMFIELD(id));
            const result: FormFieldEntity = {
                idFormField: response.data.idForm,
                name: response.data.name,
                index: response.data.index,
                isOptional: response.data.isOptional,
                fieldTypeId: response.data.fieldTypeId,
                formGroupId: response.data.formGroupId,
            };
            return result; 
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async deleteFormField(id: number): Promise<boolean> {
        try {
            const response = await axiosClient.delete(DELETE_FORMFIELD(id));
            return true;
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async createFormField(data: FormFieldEntity): Promise<boolean> {
        try {
            await axiosClient.post(CREATE_FORMFIELD, data);
            return true;
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async editFormField(data: FormFieldEntity): Promise<boolean> {
        try {
            await axiosClient.put(UPDATE_FORMFIELD, data);
            return true;
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }
}
