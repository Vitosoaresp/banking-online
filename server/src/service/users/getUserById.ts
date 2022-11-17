import prisma from '../../client';

export async function getUserById(id: number) {
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
  });
  return { code: 200, data: user };
}