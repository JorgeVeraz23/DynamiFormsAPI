import { FormEntity } from "data/Entity/FormEntity";


export default interface IFormRepository {
    getAllForm(): Promise<FormEntity[]>;
    getFormById(id: number): Promise<FormEntity>;
    createForm(data: FormEntity): Promise<boolean>;
    editForm(data: FormEntity): Promise<boolean>;
    deleteForm(id: number): Promise<boolean>;
}

