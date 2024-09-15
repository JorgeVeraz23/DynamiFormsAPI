import axios, {AxiosInstance} from 'axios';
// import { URL_API } from '../urls/urls';
import { URL_API } from '../url/url';

const axiosClient: AxiosInstance = axios.create({
    baseURL: URL_API
})

export default axiosClient;