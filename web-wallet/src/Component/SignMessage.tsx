import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import React, { useState } from 'react';

export function SignMessage() {
    const { publicKey, signMessage } = useWallet();
    const [message, setMessage] = useState<string>('');

    async function onClick() {
        if (!publicKey) {
            alert('Wallet not connected!');
            throw new Error('Wallet not connected!');
        }
        if (!signMessage) {
            alert('Wallet does not support message signing!');
            throw new Error('Wallet does not support message signing!');
        }

        try {
            const encodedMessage = new TextEncoder().encode(message);//This is encode the message into Array of Bytes(Unint8 Array)
            const signature = await signMessage(encodedMessage); //This thing will PopUp Phantom to sign the nessage Conformation

            // Verify the signature
            const isValid = ed25519.verify(signature, encodedMessage, publicKey.toBytes()); 
            // we are Decoding & verifying the Encoded Message Signed by the PrivateKey using the Signature and the publicKey
            if (!isValid) throw new Error('Message signature invalid!');
            
            alert(`Message signature: ${bs58.encode(signature)}`);
        } catch (error) {
            console.error('Error signing message:', error);
            // alert(`Error: ${error.message}`);
        }
    }

    return (
        <div>
            <input 
                id="message" 
                type="text" 
                placeholder="Message" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={onClick}>
                Sign Message
            </button>
        </div>
    );
}
