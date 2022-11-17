import prisma from '../../client';

export async function getCashIn(accountId:number) {
  const historyCashIn = await prisma.transactions.findMany({
    where: {
      creditedAccountId: accountId,
    },
  });
  return { code: 200, data: historyCashIn };
}