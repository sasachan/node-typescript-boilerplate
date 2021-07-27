import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError, IStandardErrorResponse, IStandardSuccessResponse } from '../abstractions/ApiResponses';
import { IResponseHandler } from '../abstractions/ResponseHandler.type';
import { Environments } from '../environments/environment.constant';
import logger from './logger';

class ResponseHandler implements IResponseHandler {

    public RENDER(req: Request, res: Response): void {
        res.render(res.locals.tpl);
    }

    public SENDFILE(req: Request, res: Response): void {
        // Path should be Absolute
        res.sendFile(res.locals.mediaPath);
    }

    public OK(res: Response): void {
        res.redirect(res.locals.redirect);
    }

    public SUCCESS(req: Request, res: Response): void {
        const statusCode = res.locals.statusCode || StatusCodes.OK;
        const respData: IStandardSuccessResponse = {
            success: true,
            data: res.locals.data,
            fromTime: res.locals.fromTime,
            toTime: res.locals.toTime,
            pagination: res.locals.pagination,
            message: res.locals.message || 'Success',
            timestamp: res.locals.timestamp || Date.now(),
        };

        if (res.locals.jsonp) {
            res.status(statusCode).jsonp(respData);
        } else {
            res.status(statusCode).send(respData);
        }
    }

    public ERROR(req: Request, res: Response): void {
        const showErrors = process.env.NODE_ENV !== Environments.PRODUCTION;

        const err: IError = res.locals.data || res.locals.details;

        const errData: IStandardErrorResponse = {
            success: false,
            error: err,
            functionName: <string>err.data.apiName,
            message: err.message || 'Error',
        };

        const errorCode: number = res.locals.statusCode || StatusCodes.BAD_REQUEST;

        logger.error(errData);

        if (!showErrors) {
            delete errData.error.data;
        }

        res.status(errorCode).send(errData);
    }
}

export default ResponseHandler;
