
export interface FormDynamicDTO {
    idForm: number;
    name: string;
    description?: string;
    formGroups: FormGroupDynamicDTO[];
  }
  
  export interface FormGroupDynamicDTO {
    idFormGroup: number;
    name: string;
    formFields: FormFieldDynamicDTO[];
  }
  
  export interface FormFieldDynamicDTO {
    idFormField: number;
    name: string;
    index: number;
    isOptional: boolean;
    fieldType: string;
    options?: OptionDynamicDTO[];
    filledValue?: string | null;
  }
  
  export interface OptionDynamicDTO {
    idOption: number;
    name: string;
  }
  