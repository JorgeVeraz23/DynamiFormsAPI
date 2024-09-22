import { FormEntity } from "data/Entity/FormEntity";
import { KeyValueEntity } from "data/Entity/KeyValueEntity";


export default interface IFormRepository {
    getAllForm(): Promise<FormEntity[]>;
    selectorForm(): Promise<KeyValueEntity[]>;
    getFormById(id: number): Promise<FormEntity>;
    createForm(data: FormEntity): Promise<boolean>;
    editForm(data: FormEntity): Promise<boolean>;
    deleteForm(id: number): Promise<boolean>;
}

