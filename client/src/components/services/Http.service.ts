import axios, {AxiosResponse} from "axios";
import LocalstorageService from "./Localstorage.service";

export interface HttpServiceInterface {
    get<T>(url: string, options?: any): Promise<AxiosResponse<T>>

    post<T>(url: string, data?: unknown, options?: any): Promise<AxiosResponse<T>>

    put<T>(url: string, data?: unknown, options?: any): Promise<AxiosResponse<T>>

    patch<T>(url: string, data?: unknown, options?: any): Promise<AxiosResponse<T>>

    delete<T = void>(url: string, data?: unknown, options?: any): Promise<AxiosResponse<T>>
}


class HttpService implements HttpServiceInterface {
    baseApiUrl = `http://localhost:3001`;


    async baseFetch<T>(url: string, options?: any): Promise<any> {
        const token = LocalstorageService.getItem('token');

        try {
            const response = await axios(`${this.baseApiUrl}${url}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    ...options?.headers,
                },
            });

            if (response.statusText !== 'OK') {
                console.log(response.statusText)
            }

            return response;
        } catch (e:any) {
            const status = e?.response?.status || 500;
            if (status === 401 || status === 403) {
                alert('You are not authorized. Please login');
            } else {
                alert(e.response?.data?.error || 'Looks like server is down');
            }
            return null

        }

    }

    async get<T>(url: string, options?: any): Promise<AxiosResponse<T>> {
        return this.baseFetch<T>(url, {
            method: 'GET',
            ...options,
        })
    }

    async post<T>(url: string, data?: unknown, options?: any): Promise<AxiosResponse<T>> {
        return this.baseFetch(url, {
            method: 'POST',
            data,
            ...options,
        })
    }

    async put<T>(url: string, data?: unknown, options?: any): Promise<AxiosResponse<T>> {
        return this.baseFetch(url, {
            method: 'PUT',
            data,
            ...options,
        })
    }

    async patch<T>(url: string, data?: unknown, options?: any): Promise<AxiosResponse<T>> {
        return this.baseFetch(url, {
            method: 'PATCH',
            data,
            ...options,
        })
    }

    async delete<T = void>(url: string, data?: unknown, options?: any): Promise<AxiosResponse<T>> {
        return this.baseFetch(url, {
            method: 'DELETE',
            data,
            ...options,
        })
    }
}

export default new HttpService()
