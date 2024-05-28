import getConfig from "next/config";

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
  constructor(baseURL?: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL || getConfig().publicRuntimeConfig.API_URL,
      // withCredentials: true, // IMPORTANT: enable sending cookies and authorization headers CORS
    });
    
    this.axiosInstance.defaults.timeout = getConfig().publicRuntimeConfig.REQUEST_TIMEOUT || 30000;

    // Add a request interceptor
    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        const access_token = getCookie("access_token");
        if (access_token) {
          config.headers!.Authorization = `Bearer ${access_token}`;
        }
        return config;
      },
      (error) => {
        if (error.response.status === 401) {
          deleteCookie("access_token");
          window.location.href = `//${window.location.host}/login`;
        }
        return Promise.reject(error);
      }
    );
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          deleteCookie("access_token");
          window.location.href = `//${window.location.host}/login`;
        }
        return Promise.reject(error);
      }
    );
  }

  async post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<IAxiosServiceResponse<T>> {
    try {
      const response: any = await this.axiosInstance.post<T>(url, data, config);
      return {
        data: response.data?.data,
        success: response.data.success,
        message: response.data?.message,
        error: response.data?.error,
      };
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
      return {
        data: response.data?.data,
        success: response.data.success,
        message: response.data?.message,
        error: response.data?.error,
      };
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
      return {
        data: response.data?.data,
        success: response.data.success,
        message: response.data?.message,
        error: response.data?.error,
      };
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
      return {
        data: response.data?.data,
        success: response.data.success,
        message: response.data?.message,
        error: response.data?.error,
      };
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
      return {
        data: response.data?.data,
        success: response.data.success,
        message: response.data?.message,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError<T>(error: any): IAxiosServiceResponse<T> {
    
    if (error.response) {
      const message = "erorr page !";
      return { data: null, success: false, message };
    } 
    
    // ** this case time out
    if (error.request) 
      return {
        data: null,
        success: false,
        message: "erorr message !",
      };
    
    return { data: null, success: false, message: "erorr message !", };
   
  }
}

const axiosService = new AxiosService();
export default axiosService;
