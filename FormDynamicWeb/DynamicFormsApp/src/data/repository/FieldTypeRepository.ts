import { KeyValueEntity } from "data/Entity/KeyValueEntity";

export default interface IFielTypeRepository {
    selectorFielType(): Promise<KeyValueEntity[]>;
}

