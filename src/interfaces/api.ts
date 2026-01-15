export interface ApiResponse<T> {
    data: T | null;
    success: boolean;
    error?: string;
}

export interface VersionResponse {
    version: string;
}

export interface ConfigFilesResponse {
    files: Record<string, string>;
}
