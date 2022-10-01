import { ZodError } from "zod";
import { TransUtils } from "./utils/transUtils";
import { STransaction, TTransaction } from "./utils/transZod";

export async function postTransaction(data: TTransaction) {
  try {
    STransaction.parse(data);

    const Transaction = new TransUtils(data);

    const postedTransaction = await Transaction.postTransaction();

    return postedTransaction;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function getTransaction(id: string) {
  try {
    const Transaction = new TransUtils();

    const transactions = await Transaction.getTransaction(id);

    return transactions.length > 0
      ? { data: transactions }
      : { data: "No Data" };
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function updateTransaction(data: TTransaction, id: number) {
  try {
    STransaction.parse(data);

    const Transaction = new TransUtils(data);

    const postedTransaction = await Transaction.updateTransaction(id);

    return postedTransaction;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function deleteTransaction(id: number) {
  try {
    const Transaction = new TransUtils();

    const checkID = await Transaction.findTransaction(id);

    if (!checkID) {
      throw new Error("Transaction does not exists");
    }

    const deleteTransaction = await Transaction.deleteTransaction(id);

    return deleteTransaction;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function findTransaction(id: number) {
  try {
    const Transaction = new TransUtils();

    const checkID = await Transaction.findTransaction(id);

    if (!checkID) {
      throw new Error("Transaction does not exists");
    }

    return checkID;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}
