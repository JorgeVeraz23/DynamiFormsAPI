// FieldTypeDTO
export type FieldType = {
    idFieldType: number;
    name: string;
};

// FilledFormDTO
export type FilledForm = {
    idFilledForm: number;
    fillDate: Date;
    formId?: number; // Opcional si no siempre se proporciona
    form?: Form; // Opcional si no siempre se proporciona
    filledFormFields: FilledFormField[];
};

// FilledFormFieldDTO
export type FilledFormField = {
    idFilledFormField: number;
    isChecked?: boolean;
    textValue: string;
    numericValue?: number;
    dateTimeValue?: Date;
    filledFormId?: number; // Opcional si no siempre se proporciona
    filledForm?: FilledForm; // Opcional si no siempre se proporciona
    formFieldId?: number; // Opcional si no siempre se proporciona
    formField?: FormField; // Opcional si no siempre se proporciona
    selectedOptionId?: number; // Opcional si no siempre se proporciona
    selectedOption?: Option; // Opcional si no siempre se proporciona
};

// FormDTO
export type Form = {
    idForm: number;
    name: string;
    description: string;
    formGroups?: FormGroup[]; // Opcional si no siempre se proporciona
    filledForms?: FilledForm[]; // Opcional si no siempre se proporciona
};

// FormFieldDTO
export type FormField = {
    idFormField: number;
    name: string;
    index: number;
    isOptional: boolean;
    typeId?: number; // Opcional si no siempre se proporciona
    fieldType?: FieldType; // Opcional si no siempre se proporciona
    formGroupId?: number; // Opcional si no siempre se proporciona
    formGroup?: FormGroup; // Opcional si no siempre se proporciona
    optionFormFields?: OptionFormField[]; // Opcional si no siempre se proporciona
};

// FormGroupDTO
export type FormGroup = {
    idFormGroup: number;
    name: string;
    index: number;
    formId: number;
    form?: Form; // Opcional si no siempre se proporciona
    formFields?: FormField[]; // Opcional si no siempre se proporciona
};

// OptionDTO
export type Option = {
    idOption: number;
    name: string;
    optionFormFields?: OptionFormField[]; // Opcional si no siempre se proporciona
};

// OptionFormFieldDTO
export type OptionFormField = {
    optionId: number;
    option?: Option; // Opcional si no siempre se proporciona
    formFieldId?: number; // Opcional si no siempre se proporciona
    formField?: FormField; // Opcional si no siempre se proporciona
};
