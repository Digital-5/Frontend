// Type declarations for signal-protocol-react-lib when building without the actual library

declare module '../../../SignalProtocolReactLib/src/pqxdh/interfaces/CryptoInterface' {
  export interface StringKeyPair {
    publicKey: string;
    privateKey: string;
  }

  export function generateX25519Keys(): StringKeyPair;
  export function generateKyberKeyPair(): Promise<StringKeyPair>;
  export function signKey(privateKey: string, toSign: string): string;
  export function verifySignature(publicKey: string, data: string, signature: string): boolean;
}
