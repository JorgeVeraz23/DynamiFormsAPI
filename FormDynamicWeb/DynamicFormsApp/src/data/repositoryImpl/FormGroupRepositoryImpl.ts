import { FormEntity } from "data/Entity/FormEntity";
import axiosClient from "../../api/apiClient";
import { AxiosException } from "../../api/exception";

import { GETALL_FORMGROUP, GET_FORMGROUP, CREATE_FORMGROUP,UPDATE_FORMGROUP, DELETE_FORMGROUP, SELECTOR_FORMGROUP } from "../../url/url";
import IFormGroupRepository from "data/repository/FormGroupRepository";
import { FormGroupEntity } from "data/Entity/FormGroupEntity";
import { KeyValueEntity } from "data/Entity/KeyValueEntity";

export default class FormGroupRepositoryImpl implements IFormGroupRepository {

    async getAllFormGroup(): Promise<FormGroupEntity[]> {
        try {
            const response = await axiosClient.get(GETALL_FORMGROUP);
            const result: FormGroupEntity[] = response.data.map((item: any) => ({
                idForm: item.idForm,
                name: item.name,
                description: item.description
            }));
            return result;
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async selectorFormGroup(): Promise<KeyValueEntity[]> {
        try {
            const response = await axiosClient.get(SELECTOR_FORMGROUP);
            console.log("xdd group form",response.data)
            const result: KeyValueEntity[] = response.data.map((item: any) => ({
                Key: item.Key,
                Value: item.Value,
            }));
            return result;
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }
    

    async getFormGroupById(id: number): Promise<FormGroupEntity> {
        try {
            const response = await axiosClient.get(GET_FORMGROUP(id));
            const result: FormGroupEntity = {
                idFormGroup: response.data.idFormGroup,
                name: response.data.name,
                formId: response.data.formId
            };
            return result; 
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async deleteFormGroup(id: number): Promise<boolean> {
        try {
            const response = await axiosClient.delete(DELETE_FORMGROUP(id));
            return true;
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async createFormGroup(data: FormGroupEntity): Promise<boolean> {
        try {
            var response = await axiosClient.post(CREATE_FORMGROUP, data);
            return response.data;
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async editFormGroup(data: FormGroupEntity): Promise<boolean> {
        try {
            await axiosClient.put(UPDATE_FORMGROUP, data);
            return true;
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }
}
