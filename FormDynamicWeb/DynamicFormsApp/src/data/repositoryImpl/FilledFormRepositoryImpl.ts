import axiosClient from "../../api/apiClient";
import { AxiosException } from "../../api/exception";
import { GETALL_FORM, GETFORM_BYID, CREATE_FORM, UPDATE_FORM, DELETE_FORM } from "../../url/url";
// import IFormRepository from "../repository/FormRepository";
import IFiledFormRepository from "data/repository/FilledFormRepository";
import { GETALL_FILLEDFORMFILLED } from "../../url/url";
import { KeyValueEntity } from "data/Entity/KeyValueEntity";

export default class FilledFormRepositoryImpl implements IFiledFormRepository {

    async selectorFilledForm(): Promise<KeyValueEntity[]> {
        try {
            const response = await axiosClient.get(GETALL_FILLEDFORMFILLED);
            console.log("xd", response.data);
            const result: KeyValueEntity[] = response.data.map((item: any) => ({
                key: item.key,
                value: item.value,
            }));
            console.log("xd era aca la webada",result)
            return result;
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    

}
