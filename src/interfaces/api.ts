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
}

export interface ConfigFilesResponse {
    files: ConfigFileResponseItem[];
}
