
import { KeyValueEntity } from "data/Entity/KeyValueEntity";
import { FormFieldEntity } from "data/Entity/FormFieldEntity";

export default interface IFormFieldRepository {
    getAllFormField(): Promise<FormFieldEntity[]>;
    selectorFormField(): Promise<KeyValueEntity[]>;
    getFormFieldById(id: number): Promise<FormFieldEntity>;
    createFormField(data: FormFieldEntity): Promise<boolean>;
    editFormField(data: FormFieldEntity): Promise<boolean>;
    deleteFormField(id: number): Promise<boolean>;
}

