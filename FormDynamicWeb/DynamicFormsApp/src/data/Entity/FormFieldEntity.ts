// export type FormFieldEntity = {
//     idFormField: number,
//     name: string,
//     index: number,
//     isOptional: boolean,
//     fieldTypeId: number,
//     formGroupId: number,
// }


export type FormFieldEntity = {
    idFormField: number;
    name: string;
    index: number;
    isOptional: boolean;
    fieldTypeId: number;
    formGroupId: number;
    dropdownOptions?: { idOption: number, name: string }[];
  }
  