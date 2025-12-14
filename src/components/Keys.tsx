
import {generateX25519Keys, generateKyberKeyPair, signKey, verifySignature} from 'signal-protocol-react-lib';

// 1. Generiere Schlüsselpaare


const ourIdentityKeyPair = await generateX25519Keys(); //save privatekey name:IdentityPrivate


const ourEphemeralKeyPair = await generateX25519Keys(); //save private key name: EphemeralPrivate (overwrite periodically)

//EphemeralPublicKey signieren
const EphemeralPublicSignature = await signKey(ourIdentityKeyPair.privateKey, ourEphemeralKeyPair.publicKey);

//Generate LastResortPQKEM KeyPair and signature
const PQKEMKeyPair = await generateKyberKeyPair(); //save privatekey name: PQKEMLastResortPrivate (overwrite periodically)
const PQKEMSignature = await signKey(ourIdentityKeyPair.privateKey, PQKEMKeyPair.publicKey);

const oneTimeX25519KeyPair = await generateX25519Keys(); //save privatekey with uuid (oneTimeX25519Private:oneTimePQKEMPrivate)
const oneTimePQKEMKeyPair = await generateKyberKeyPair(); //save privatekey with uuid (generator library)                  "

const oneTimePQKEMSignature = await signKey(ourIdentityKeyPair.privateKey, oneTimePQKEMKeyPair.publicKey);

/*
    Alle Public Keys und Signaturen können nun an den Server gesendet werden
*/



// 2. Empfange öffentliche Schlüssel der Gegenseite
const theirIdentityPublicKey = "";
const theirEphemeralPublicKey = new Uint8Array(32);
const theirEphemeralSignature = "";
const theirOneTimeX25519PublicKey = "";
const theirOneTimePQKEMPublicKey = new Uint8Array(32);
const theirOneTimePQKEMSignature = "";

//Überprüfe Signaturen
const isEphemeralValid = await verifySignature(
    theirIdentityPublicKey,
    theirEphemeralPublicKey,
    theirEphemeralSignature,

);
const isOneTimePQKEMValid = await verifySignature(
    theirIdentityPublicKey,
    theirOneTimePQKEMPublicKey,
    theirOneTimePQKEMSignature
);

//Konvertiere Strings zu Uint8Arrays falls nötig
//ourIdentityKeyPair bleibt in StringKeyPair Format



// 3. Initialisiere den Root Key (z.B. aus einem X3DH Handshake)
const rootKey = new Uint8Array(32); // 32 zufällige Bytes

const headerKey = new Uint8Array(32); // 32 zufällige Bytes

const nextHeaderKey = new Uint8Array(32); // 32 zufällige Bytes


// // 4. Initialisiere den Double Ratchet State
// const drState = await DR_Init_HE({
//     rootKey,
//     ourIdentityKeyPair,
//     theirIdentityPublicKey,
//     ourEphemeralKeyPair,
//     theirEphemeralPublicKey,
//     headerKey,
//     nextHeaderKey,
//     isInitiator: true,
// });

// console.log('Double Ratchet State initialisiert:', drState);