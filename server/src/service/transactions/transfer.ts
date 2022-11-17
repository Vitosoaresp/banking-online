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
        },
      });
  
      if (out.balance < 0) {
        throw new Error('Você não tem saldo suficiente para realizar essa transação');
      }
  
      await tx.accounts.update({
        where: {
          UserId: accountInId,
        },
        data: {
          balance: {
            increment: value,
          },
        },
      });

      await tx.transactions.create({
        data: {
          value,
          creditedAccountId: accountInId,
          debitedAccountId: accountOutId,
        },
      });
    });
    return { code: 201, data: { message: 'Transferência realizada com sucesso' } };
  } catch (error: any) {
    return { code: 400, error: error.message };
  }
  
}
