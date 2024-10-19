import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export default function AirDrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const publickey: PublicKey | null = wallet.publicKey;

  async function airDrop() {
    if (!publickey) {
      alert("No public key found");
      return;
    }

    const inputElement = document.getElementById("publicKey") as HTMLInputElement; // Amount input field
    const amount = Number(inputElement.value);
    if (!amount) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      console.log("Requesting Airdrop...");
      const signature = await connection.requestAirdrop(publickey, amount * LAMPORTS_PER_SOL);
      console.log("Airdrop requested, signature: ", signature);

      // Confirm the transaction with higher commitment level
      const confirmation = await connection.confirmTransaction(signature, 'finalized');
      console.log("Transaction confirmed:", confirmation);

      alert("Airdropped successfully");
    } catch (error) {
      console.error("Airdrop failed", error);
      // alert("Airdrop failed: " + error.message);
    }
  }

  return (
    <div>
      <div>Hello from AirDROP</div>
      <input id="publicKey" type="text" placeholder="Amount (SOL)" />
      <button onClick={airDrop}>Send AirDrop</button>
      {publickey && <div>Your Public Key: {publickey.toBase58()}</div>}
    </div>
  );
}