/* eslint-disable prettier/prettier */
import { Request as ExpressRequest } from 'express';
import { UserDTO } from 'src/service/dto/user.dto';

export interface Request extends ExpressRequest {
  user?: UserDTO;
}