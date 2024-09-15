// FieldTypeDTO
export type FieldType = {
    idFieldType: number;
    name: string;
};

// FilledFormDTO
export type FilledForm = {
    idFilledForm: number;
    fillDate: Date;
    formId?: number;
    form: Form;
    filledFormFields: FilledFormField[];
};

// FilledFormFieldDTO
export type FilledFormField = {
    idFilledFormField: number;
    isChecked?: boolean;
    textValue: string;
    numericValue?: number;
    dateTimeValue?: Date;
    filledFormId?: number;
    filledForm: FilledForm;
    formFieldId?: number;
    formField: FormField;
    selectedOptionId?: number;
    selectedOption: Option;
};

// FormDTO
export type Form = {
    idForm: number;
    name: string;
    description: string;
    formGroups?: FormGroup[];
    filledForms?: FilledForm[];
};

// FormFieldDTO
export type FormField = {
    idFormField: number;
    name: string;
    index: number;
    isOptional: boolean;
    typeId?: number;
    fieldType: FieldType;
    formGroupId?: number;
    formGroup: FormGroup;
    optionFormFields: OptionFormField[];
};

// FormGroupDTO
export type FormGroup = {
    idFormGroup: number;
    name: string;
    index: number;
    formId: number;
    form: Form;
    formFields: FormField[];
};

// OptionDTO
export type Option = {
    idOption: number;
    name: string;
    optionFormFields: OptionFormField[];
};

// OptionFormFieldDTO
export type OptionFormField = {
    optionId: number;
    option: Option;
    formFieldId?: number;
    formField: FormField;
};
