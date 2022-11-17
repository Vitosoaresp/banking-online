import crypto from 'crypto';
import prisma from '../../client';
import { createToken } from '../../helpers/createToken';

export async function login(username: string, password: string) {
  if (!username || !password) {
    return { code: 400, message: 'usuário ou senha em branco' };
  }
  const passHash = crypto.createHash('md5').update(password).digest('hex');
  const user = await prisma.users.findUnique({
    where: {
      username,
    },
  });
  
  if (user === null) {
    return { code: 401, message: 'usuário não encontrado' };
  }
  if (user.password !== passHash) {
    return { code: 401, message: 'senha incorreta' };
  }
  const token = createToken({ username, id: user.id });
  return { code: 200, data: { username, id: user.id, token } };
}