import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ErrorTypes, errorCatalog } from '../errors/catalog';

const errorHandler: ErrorRequestHandler = (err: Error | ZodError, _req, res, _next) => {
  if (err instanceof ZodError) { 
    return res.status(400).json({ error: err.issues });
  }

  const messageAsErrorType = err.message as keyof typeof ErrorTypes;

  const mappedError = errorCatalog[messageAsErrorType];
  if (mappedError) {
    const { httpStatus, message } = mappedError;
    return res.status(httpStatus).json({ error: message });
  }
  console.error(err);
  
  return res.status(500).json({ error: 'internal error' });
};

export default errorHandler;