import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

export default function AirDrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const publickey: PublicKey | null = wallet.publicKey;

  async function airDrop() {
    if (!publickey) {
      alert("No public key found");
      return;
    }
    const inputElement = document.getElementById("publicKey") as HTMLInputElement;
    const amount = Number(inputElement.value);
    if (!amount) {
      alert("No amount found");
    }
    await connection.requestAirdrop(publickey, amount * 1000000000);
    alert("AIR DROPPED YOU SOME SOL");
  }

  return (
    <div>
      <div>Hello from AirDROP</div>
      <input id="publicKey" type="text" placeholder="Amount"></input>
      <button onClick={airDrop}>Send AirDrop</button>
    </div>
  );
}
