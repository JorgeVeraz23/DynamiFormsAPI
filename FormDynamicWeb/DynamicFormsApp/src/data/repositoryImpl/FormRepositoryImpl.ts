import axiosClient from "../../api/apiClient";
import { AxiosException } from "../../api/exception";
import { Form } from "../Entity/Entities";
import { GETALL_FORM, GETFORM_BYID, CREATE_FORM, UPDATE_FORM, DELETE_FORM } from "../../url/url";
import IFormRepository from "../repository/FormRepository";

export default class FormRepositoryImpl implements IFormRepository {

    async getAllForm(): Promise<Form[]> {
        try {
            const response = await axiosClient.get(GETALL_FORM);
            console.log(response.data);
            return response.data.map((item: any) => ({
                idForm: item.idForm,
                name: item.name,
                description: item.description,
                filledForms: item.filledForms.map((f: any) => ({
                    idFilledForm: f.idFilledForm,
                    fillDate: new Date(f.fillDate),
                    formId: f.formId,
                    form: f.form, // Mapea `form` si es necesario
                    filledFormFields: f.filledFormFields.map((ff: any) => ({
                        idFilledFormField: ff.idFilledFormField,
                        isChecked: ff.isChecked,
                        textValue: ff.textValue,
                        numericValue: ff.numericValue,
                        dateTimeValue: new Date(ff.dateTimeValue),
                        filledFormId: ff.filledFormId,
                        filledForm: ff.filledForm, // Mapea `filledForm` si es necesario
                        formFieldId: ff.formFieldId,
                        formField: ff.formField, // Mapea `formField` si es necesario
                        selectedOptionId: ff.selectedOptionId,
                        selectedOption: ff.selectedOption, // Mapea `selectedOption` si es necesario
                    })),
                })),
                formGroups: item.formGroups.map((g: any) => ({
                    idFormGroup: g.idFormGroup,
                    name: g.name,
                    index: g.index,
                    formId: g.formId,
                    form: g.form, // Mapea `form` si es necesario
                    formFields: g.formFields.map((ff: any) => ({
                        idFormField: ff.idFormField,
                        name: ff.name,
                        index: ff.index,
                        isOptional: ff.isOptional,
                        typeId: ff.typeId,
                        fieldType: ff.fieldType, // Mapea `fieldType` si es necesario
                        formGroupId: ff.formGroupId,
                        formGroup: ff.formGroup, // Mapea `formGroup` si es necesario
                        optionFormFields: ff.optionFormFields.map((of: any) => ({
                            optionId: of.optionId,
                            option: of.option, // Mapea `option` si es necesario
                            formFieldId: of.formFieldId,
                            formField: of.formField, // Mapea `formField` si es necesario
                        })),
                    })),
                })),
            }));
        } catch (error) {
            throw new Error(AxiosException(error));
        }
    }

    async getFormById(id: number): Promise<Form> {
        try {
            const response = await axiosClient.get(GETFORM_BYID(id));
            return {
                idForm: response.data.idForm,
                name: response.data.name,
                description: response.data.description,
                filledForms: response.data.filledForms.map((f: any) => ({
                    idFilledForm: f.idFilledForm,
                    fillDate: new Date(f.fillDate),
                    formId: f.formId,
                    form: f.form, // Mapea `form` si es necesario
                    filledFormFields: f.filledFormFields.map((ff: any) => ({
                        idFilledFormField: ff.idFilledFormField,
                        isChecked: ff.isChecked,
                        textValue: ff.textValue,
                        numericValue: ff.numericValue,
                        dateTimeValue: new Date(ff.dateTimeValue),
                        filledFormId: ff.filledFormId,
                        filledForm: ff.filledForm, // Mapea `filledForm` si es necesario
                        formFieldId: ff.formFieldId,
                        formField: ff.formField, // Mapea `formField` si es necesario
                        selectedOptionId: ff.selectedOptionId,
                        selectedOption: ff.selectedOption, // Mapea `selectedOption` si es necesario
                    })),
                })),
                formGroups: response.data.formGroups.map((g: any) => ({
                    idFormGroup: g.idFormGroup,
                    name: g.name,
                    index: g.index,
                    formId: g.formId,
                    form: g.form, // Mapea `form` si es necesario
                    formFields: g.formFields.map((ff: any) => ({
                        idFormField: ff.idFormField,
                        name: ff.name,
                        index: ff.index,
                        isOptional: ff.isOptional,
                        typeId: ff.typeId,
                        fieldType: ff.fieldType, // Mapea `fieldType` si es necesario
                        formGroupId: ff.formGroupId,
                        formGroup: ff.formGroup, // Mapea `formGroup` si es necesario
                        optionFormFields: ff.optionFormFields.map((of: any) => ({
                            optionId: of.optionId,
                            option: of.option, // Mapea `option` si es necesario
                            formFieldId: of.formFieldId,
                            formField: of.formField, // Mapea `formField` si es necesario
                        })),
                    })),
                })),
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
