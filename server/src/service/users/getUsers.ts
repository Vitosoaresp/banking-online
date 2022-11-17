import prisma from '../../client';

export async function getUsers() {
  const users = await prisma.users.findMany({
    select: {
      id: true,
      username: true,
    }
  });
  return { code: 200, data: users };
}