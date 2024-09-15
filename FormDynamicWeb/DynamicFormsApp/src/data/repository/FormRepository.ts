import { Form } from "../Entity/Entities";

export default interface IFormRepository {
    getAllForm(): Promise<Form[]>;
    getFormById(id: number): Promise<Form>;
    createForm(data: Form): Promise<boolean>;
    editForm(data: Form): Promise<boolean>;
    deleteForm(id: number): Promise<boolean>;
}

