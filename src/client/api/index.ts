import type { ApiResponse } from '@interfaces/api';

export const api = {
    apiCall: async <T>(route: string, method: Request['method'], params: Record<string, string>): Promise<ApiResponse<T>> => {
        if (method === 'GET') {
            const urlParams = new URLSearchParams(params).toString();

            if (urlParams !== '') {
                route += `?${urlParams}`;
            }
        }

        try {
            const response = await fetch(route, {
                method,
            });

            if (!response.ok) {
                return {
                    data: null,
                    success: false,
                    error: `HTTP error! status: ${response.status}`,
                };
            }

            return {
                data: await response.json(),
                success: true,
            };
        } catch (error) {
            return {
                data: null,
                success: false,
                error: (error as Error)?.message,
            };
        }
    },

    get: async <T>(route: string, params: Record<string, string> = {}): Promise<ApiResponse<T>> => {
        return api.apiCall<T>(route, 'GET', params);
    },

    post: async <T>(route: string, params: Record<string, string> = {}): Promise<ApiResponse<T>> => {
        return api.apiCall<T>(route, 'POST', params);
    },
};
