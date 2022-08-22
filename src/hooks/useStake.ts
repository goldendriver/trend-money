import {BCS, TxnBuilderTypes} from "aptos";
import useSubmitTransaction from "./useTransaction";

const useSubmitStake = () => {
  const {
    submitTransaction,
    transactionInProcess,
    transactionResponse,
    clearTransactionResponse,
  } = useSubmitTransaction();

  async function submitStake(
    stakingAmount: number,
    operatorAddr: string,
    voterAddr: string,
  ) {
    const payload = new TxnBuilderTypes.TransactionPayloadEntryFunction(
      TxnBuilderTypes.EntryFunction.natural(
        "0x1::stake",
        "initialize_stake_owner",
        [],
        [
          BCS.bcsSerializeUint64(stakingAmount),
          BCS.bcsToBytes(TxnBuilderTypes.AccountAddress.fromHex(operatorAddr)),
          BCS.bcsToBytes(TxnBuilderTypes.AccountAddress.fromHex(voterAddr)),
        ],
      ),
    );

    await submitTransaction(payload);
  }

  return {
    submitStake,
    transactionInProcess,
    transactionResponse,
    clearTransactionResponse,
  };
};

export default useSubmitStake;
