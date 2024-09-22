import { FormGroupEntity } from "data/Entity/FormGroupEntity";
import { KeyValueEntity } from "data/Entity/KeyValueEntity";

export default interface IFormGroupRepository {
    getAllFormGroup(): Promise<FormGroupEntity[]>;
    getFormGroupById(id: number): Promise<FormGroupEntity>;
    createFormGroup(data: FormGroupEntity): Promise<boolean>;
    editFormGroup(data: FormGroupEntity): Promise<boolean>;
    deleteFormGroup(id: number): Promise<boolean>;
}

