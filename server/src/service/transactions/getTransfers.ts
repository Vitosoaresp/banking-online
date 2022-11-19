import prisma from '../../client';

export async function getTransfers(accountId:number) {
  const transfers = await prisma.transactions.findMany({
    where: {
      OR: [
        {
          debitedAccountId: accountId,
        },
        {
          creditedAccountId: accountId,
        },
      ]
    },
  });
  return { code: 200, data: transfers };
}