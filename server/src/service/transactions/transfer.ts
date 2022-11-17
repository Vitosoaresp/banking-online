import prisma from '../../client';

export async function transfer(accountOutId: number, accountInId: number, value: number) {
  try {
    if (accountOutId === accountInId) {
      throw new Error('Você não pode transferir para a sua mesma conta');
    }
    await prisma.$transaction(async (tx) => {
      const out = await tx.accounts.update({
        where: {
          UserId: accountOutId,
        },
        data: {
          balance: {
            decrement: value,
          },
          Transactions: {
            create: {
              value,
              creditedAccountId: accountInId,
            },
          }
        },
      });
  
      if (out.balance < 0) {
        throw new Error('Você não tem saldo suficiente para realizar essa transação');
      }
  
      const inc = await tx.accounts.update({
        where: {
          UserId: accountInId,
        },
        data: {
          balance: {
            increment: value,
          },
        },
      });
  
      return { code: 201, data: { out, inc } };
    });
  } catch (error: any) {
    return { code: 400, data: { error: error.message } };
  }
  
}
