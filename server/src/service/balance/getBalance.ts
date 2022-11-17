import prisma from '../../client';

export async function getBalance(id: number) {
  const balance = await prisma.accounts.findUnique({
    where: {
      UserId: id,
    },
    select: {
      balance: true,
    }
  });
  return { code: 200, data: balance};
}