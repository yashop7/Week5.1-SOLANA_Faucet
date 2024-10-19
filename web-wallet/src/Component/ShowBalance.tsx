
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { FC, useEffect, useState } from 'react';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

export const ShowBalance: FC = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  
  const publicKey: PublicKey | null = wallet.publicKey;

  const getMeUserBalance = async () => {
    if (publicKey) {
      try {
        const balanceInLamports = await connection.getBalance(publicKey);
        const updatedBalance = balanceInLamports / LAMPORTS_PER_SOL;
        setBalance(updatedBalance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    } else {
      alert("No public key found");
    }
  };

  useEffect(() => {
    const main = () => {
        setTimeout(() => getMeUserBalance(), 5000); // Re-fetch the balance after 5 seconds
    }
    main();
  }, [wallet, connection]); // Trigger balance fetch when wallet or connection changes

  return (
    <div>
      Balance: <span>{balance !== null ? balance.toFixed(4) : 'Fetching...'}</span> SOL
    </div>
  );
};
