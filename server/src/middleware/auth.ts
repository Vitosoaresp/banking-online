import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
const jwtkey = process.env.JWT_SECRET;

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return res.status(404).json({ message: 'token não encontrado' });
  try {
    const data = jwt.verify(token, jwtkey as string);
    res.locals.user = data;
    // req.user = data;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token invalido ou expirado!' });
  }
};

export { auth };
