import { IConfig } from '@interfaces/config';

export interface ApiResponse<T> {
    data: T | null;
    success: boolean;
    error?: string;
}

export interface VersionResponse {
    version: string;
}

export interface ConfigFileResponseItem {
    filePath: string;
    fileContents: string;
    configObject: Partial<IConfig>;
}

export interface ConfigFilesResponse {
    files: ConfigFileResponseItem[];
}
