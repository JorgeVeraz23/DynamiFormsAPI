import { BASE_URL } from "./baseurl";

const API_PREFIX = 'api/';
export const URL_API = `${BASE_URL}${API_PREFIX}`;




//#region Forms
const FORM_PREFIX = "Form/";
export const CREATE_FORM = `${FORM_PREFIX}CrearFormulario`;
export const UPDATE_FORM = `${FORM_PREFIX}ActualizarFormulario`;
export const DELETE_FORM = (id: number) => `${FORM_PREFIX}EliminarFormulario?id=${id}`;
export const GETFORM_BYID = (id: number) => `${FORM_PREFIX}ObtenerFormularioPorId?id=${id}`;
export const GETALL_FORM = `${FORM_PREFIX}ObtenerTodosLosFormularios`;
export const GETFORM_WITHFIELDANDGROUPS = (id: number) => `${FORM_PREFIX}MostrarFormulariosConCamposYGrupos?id=${id}`;
export const SELECTOR_FORMS = `${FORM_PREFIX}SelectorFormularios`;
//#endregion


//#region Options
const OPTION_PREFIX = "Option/";
export const GETALL_OPTION = `${OPTION_PREFIX}ObtenerTodasLasOpciones`;

//#endregion

//#region FilledForms
//#endregion

//#region FilledFormsField

//#endregion

//#region FormGroup
const FORMGROUP_PREFIX = "FormGroup/";
export const CREATE_FORMGROUP = `${FORMGROUP_PREFIX}CrearGrupoDeFormulario`;
export const UPDATE_FORMGROUP = `${FORMGROUP_PREFIX}ActualizarGrupoDeFormulario`;
export const GETALL_FORMGROUP = `${FORMGROUP_PREFIX}ObtenerTodosLosGruposFormularios`;
export const GET_FORMGROUP = (id: number) => `${FORMGROUP_PREFIX}ObtenerGruposFormularioPorId?id=${id}`;
export const DELETE_FORMGROUP = (id: number) => `${FORMGROUP_PREFIX}EliminarGrupoFormulario?id=${id}`;
export const SELECTOR_FORMGROUP = `${FORMGROUP_PREFIX}SelectorGrupoFormulario`;
//#endregion

//#region FormFields
const FORMFIELD_PREFIX = "FormField/";
export const GETALL_FORMFIELD = `${FORMFIELD_PREFIX}ObtenerTodosLosFormFields`;
export const GET_FORMFIELD = (id: number) => `${FORMFIELD_PREFIX}ObtenerFormField`;
export const SELECTOR_FORMFIELD = `${FORMFIELD_PREFIX}SelectorFormField`;
export const DELETE_FORMFIELD = (id: number) => `${FORMFIELD_PREFIX}EliminarFormField`;
// export const CREATE_FORMFIELD = `${FORMFIELD_PREFIX}CrearFormField`;
export const CREATE_FORMFIELD = `${FORMFIELD_PREFIX}CrearFormFieldConOption`;
export const UPDATE_FORMFIELD = `${FORMFIELD_PREFIX}ActualizarFormField`;

//#endregion



//#region FieldType
const FIELDTYPE_PREFIX = "FieldType/";
export const GETALL_FIELDTYPES = `${FIELDTYPE_PREFIX}ObtenerTodosLosTiposDeCampo`
export const SELECTOR_FIELDTYPES = `${FIELDTYPE_PREFIX}SelectorFieldType`
//#endregion