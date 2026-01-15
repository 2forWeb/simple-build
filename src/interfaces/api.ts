export interface ApiResponse<T> {
    data: T | null;
    success: boolean;
    error?: string;
}

export interface VersionResponse {
    version: string;
}
