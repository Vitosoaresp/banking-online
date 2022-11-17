import prisma from '../../client';

export async function getCashOut(accountId:number) {
  const historyCashOut = await prisma.transactions.findMany({
    where: {
      debitedAccountId: accountId,
    }
  });
  return { code: 200, data: historyCashOut };
}