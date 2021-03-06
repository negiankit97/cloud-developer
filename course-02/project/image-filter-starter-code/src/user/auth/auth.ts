import { Router, Request, Response, NextFunction } from "express";
import {config} from '../../config/config';


import * as jwt from 'jsonwebtoken';

const router: Router = Router();

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send("No Authorization headers!");
  }

  const token_bearer = req.headers.authorization.split(" ");

  if (token_bearer.length != 2) {
    return res.status(401).send("Malformed token");
  }

  const token = token_bearer[1];

  return jwt.verify(token,config.jwt.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({auth:false, message: "Authenticate Failed!"});
    }
    next();
  });
}