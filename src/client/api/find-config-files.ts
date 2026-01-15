import { api } from './index';
import type { ApiResponse, ConfigFilesResponse } from '@interfaces/api';

export const findConfigFiles = async (): Promise<ApiResponse<ConfigFilesResponse>> => {
    return await api.get<ConfigFilesResponse>('/api/config-files');
};
