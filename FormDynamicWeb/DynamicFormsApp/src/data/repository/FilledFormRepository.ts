import { KeyValueEntity } from "data/Entity/KeyValueEntity";

export default interface IFiledFormRepository {
    selectorFilledForm(): Promise<KeyValueEntity[]>;
}

