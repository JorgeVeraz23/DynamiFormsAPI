import axiosClient from "../../api/apiClient";
import { AxiosException } from "../../api/exception";
import { GETALL_FORM, GETFORM_BYID, CREATE_FORM, UPDATE_FORM, DELETE_FORM } from "../../url/url";
// import IFormRepository from "../repository/FormRepository";
import FileTypeRepository from "../repository/FieldTypeRepository"
import { SELECTOR_FIELDTYPES } from "../../url/url";

export default class FieldTypeRepositoryImpl implements FileTypeRepository {

    async selectorFielType(): Promise<any[]> {
        try {
            const response = await axiosClient.get(SELECTOR_FIELDTYPES);
            console.log("console selector selector field type",response.data); // Verifica la estructura de los datos aquí
            return response.data;
        } catch (error) {
            console.error('Error al obtener los formularios', error);
            throw error; // Maneja el error adecuadamente
        }
    }

    

}
