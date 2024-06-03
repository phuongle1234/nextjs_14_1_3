import getConfig from "next/config";
import { setStage } from "@/store/global";

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

import { deleteCookie, getCookie } from "cookies-next";


export interface IAxiosServiceResponse<T = any> {
  data: T | null;
  success: boolean;
  message?: string;
  error?: any;
}
class AxiosService {
  // call axiosInstance
  private readonly axiosInstance: AxiosInstance;
  private dispath: any = () =>{}

  constructor(baseURL?: string) {
    
  
    this.axiosInstance = axios.create({ baseURL: baseURL || process?.env?.API_URL || getConfig()?.publicRuntimeConfig?.API_URL,});
    
    this.axiosInstance.defaults.timeout = process?.env?.REQUEST_TIMEOUT || getConfig()?.publicRuntimeConfig?.REQUEST_TIMEOUT || 30000;

    // Add a request interceptor
    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        const access_token = getCookie("access_token");
        
        this.dispath( setStage( { isLoading: true } ) )
        
        if (access_token) 
          config.headers!.Authorization = `Bearer ${access_token}`;
        
        return config;
      },
      (error) => {
        if (error.response.status === 401) {
          deleteCookie("access_token");
          //window.location.href = `//${window.location.host}/login`;
        }
        return Promise.reject(error);
      }
    );
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {        
        this.dispath( setStage( { isLoading: false } ) )
        return response;
      },
      (error: AxiosError) => {
        
        this.dispath( setStage( { isLoading: false } ) )

        if (error.response?.status === 401) {
          deleteCookie("access_token");
         // window.location.href = `//${window.location.host}/login`;
        }
        return Promise.reject(error);
      }
    );
  }

  public setDispath = (dispath: any) => {
    this.dispath = dispath
  }

  async post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<IAxiosServiceResponse<T>> {
    try {
      const response: any = await this.axiosInstance.post<T>(url, data, config);
      
      return { ... response.data };

    } catch (error) {
      return this.handleError(error);
    }
  }

  async get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<IAxiosServiceResponse<T>> {
    try {
      const response: any = await this.axiosInstance.get(url, config);
      return { ... response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<IAxiosServiceResponse<T>> {
    try {
      const response: any = await this.axiosInstance.patch(url, data, config);
      return { ... response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<IAxiosServiceResponse<T>> {
    try {
      const response: any = await this.axiosInstance.put(url, data, config);
      return { ... response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<IAxiosServiceResponse<T>> {
    try {
      const response: any = await this.axiosInstance.delete(url, config);
      return { ... response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError<T>(error: any): any {
    
    if (error.response) 
    {
      let mes = error.response?.data?.mes || ""
          mes = (typeof mes == "string" ) ? mes: "error by API !"
      
      this.dispath( setStage( { msg: { message: mes, status: error.response?.data?.code || 400 } } ) )
      throw (mes)
      return { mes, success: false };
    }
      
    
    // ** this case time out
    if (error.request) 
    { 
      this.dispath( setStage( { msg: { message: "Request by timeout !", status: 400 } } ) )
      throw ( "Request by timeout !")
      return { code: 200, success: false };
    }

    throw ( "error by API !")
    return { code: 200, success: false };
   
  }
}

// const axiosService = new AxiosService();
export default AxiosService;
