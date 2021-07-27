import { Request } from 'express';

export interface IStandardResponse {
    success: boolean;
    message?: string;
}


export interface IPagination {
    total?: number;
    limit?: number;
    page?: number;
    pages?: number;
}

export interface IError extends Error {
    message: string;
    data?: Record<string, unknown>;
}


export interface IStandardErrorResponse extends IStandardResponse {
    error: IError;
    functionName?: string;
    request?: Request;
}

export interface IInfo {
    userId: boolean;
    functionName: string;
    request: Request;
}

export interface IStandardSuccessResponse extends IStandardResponse {
    data: Record<string, unknown>;
    info?: IInfo;
    pagination?: IPagination;
    fromTime?: string;
    toTime?: string;
    timestamp?: number;
}
