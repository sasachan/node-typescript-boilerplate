import { Request, Response } from 'express';

export interface IResponseHandler {
    SUCCESS(req: Request, res: Response): void;
    ERROR(req: Request, res: Response): void;
}