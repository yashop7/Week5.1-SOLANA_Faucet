import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { FC, useState } from 'react';

export const SendTokens: FC = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [to, setTo] = useState<string>('');
    const [amount, setAmount] = useState<string>('');

    const sendTokens = async () => {
        if (!wallet.publicKey) {
            alert('Wallet not connected');
            return;
        }

        try {
            const toPubkey = new PublicKey(to);
            const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey,
                    lamports,
                })
            );

            await wallet.sendTransaction(transaction, connection);
            alert(`Sent ${amount} SOL to ${to}`);
        } catch (error) {
            console.error('Transaction failed', error);
        }
    };

    return (
        <div>
            <input
                id="to"
                type="text"
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
            />
            <input
                id="amount"
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={sendTokens}>Send</button>
        </div>
    );
};
