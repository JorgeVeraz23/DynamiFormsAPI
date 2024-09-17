import { BASE_URL } from "./baseurl";

const API_PREFIX = 'api/';
export const URL_API = `${BASE_URL}${API_PREFIX}`;




//#region Forms
const FORM_PREFIX = "Form/";
export const GETALL_FORM = `${FORM_PREFIX}ObtenerTodosLosFormularios`;
export const UPDATE_FORM = `${FORM_PREFIX}ActualizarFormulario`;
export const CREATE_FORM = `${FORM_PREFIX}CrearFormulario`;
export const DELETE_FORM = (id: number) => `${FORM_PREFIX}EliminarFormulario?id=${id}`;
export const GETFORM_BYID = (id: number) => `${FORM_PREFIX}ObtenerFormularioPorId?id=${id}`;

//#endregion

//#region FieldType
const FIELDTYPE_PREFIX = "FieldType/";
export const GETALL_FIELDTYPES = `${FIELDTYPE_PREFIX}ObtenerTodosLosTiposDeCampo`
export const SELECTOR_FIELDTYPES = `${FIELDTYPE_PREFIX}KeyValueFieldType`
//#endregion