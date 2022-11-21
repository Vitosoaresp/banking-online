import crypto from 'crypto';
import prisma from '../../client';

export async function createUsers(username: string, password: string) {
  if (!username || !password) {
    return { code: 400, message: 'Usuário ou senha em branco' };
  }
  if (username.length < 3) {
    return { code: 400, message: 'Usuário deve conter ao menos 3 caracteres' };
  }
  if (password.length < 8) {
    return { code: 400, message: 'A senha deve conter ao menos 8 caracteres' };
  }
  const existingUser = await prisma.users.findUnique({
    where: {
      username,
    },
  });
  if (existingUser) {
    return { code: 400, message: 'Usuário já existe' };
  }
  const passHash = crypto.createHash('md5').update(password).digest('hex');
  await prisma.users.create({
    data: {
      username,
      password: passHash,
      Account: {
        create: {
          balance: 10000,
        },
      }
    },
  });
  return { code: 201, message: 'Usuário criado com sucesso' };
}