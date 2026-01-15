import { api } from './index';
import type { ApiResponse, VersionResponse } from '@interfaces/api';

export const getVersion = async (): Promise<ApiResponse<VersionResponse>> => {
    return await api.get<VersionResponse>('/api/version');
};
