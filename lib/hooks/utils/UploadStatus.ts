export interface UploadStatus {
    httpStatusCode: number | null;
    statusCode?: `${1 | 2 | 3 | 4 | 5}${number}${number}` | `initialized` | `client-error`;
    message: string | null;
}