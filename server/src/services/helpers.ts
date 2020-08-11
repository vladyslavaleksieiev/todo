import { Error } from 'mongoose';
import { IServerError } from '../typings';

export const parseMongoError = (error: Error): IServerError => {
  switch (error.name) {
    case 'ValidationError':
      return {
        status: 400,
        message: 'Fields validation failed',
      };
    case 'TypeError':
      return {
        status: 404,
        message: 'Not found',
      };
    default:
      return {
        status: 500,
        message: error.name,
      };
  }
};
