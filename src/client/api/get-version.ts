import { api, ApiResponse } from './index';

export interface VersionResponse {
    version: string;
}

export const getVersion = async (): Promise<ApiResponse<VersionResponse>> => {
    return await api.get<VersionResponse>('/api/version');
};
