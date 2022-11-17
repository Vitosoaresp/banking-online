import { Users } from '@prisma/client';
import jwt from 'jsonwebtoken';

export function createToken (data: Partial<Users>) {
  const token = jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn: '1d' });
  return token;
}