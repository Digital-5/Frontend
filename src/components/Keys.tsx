import * as StoreKeys from './StoreKeys'
import uuid from 'react-native-uuid'
import {generateX25519Keys, generateKyberKeyPair, signKey} from 'signal-protocol-react-lib';


// generate all necessary keys, sign the keys and store them securely
export async function generateKeys() {
    const ourIdentityKeyPair = await generateX25519Keys(); //save privatekey name:IdentityPrivate
    StoreKeys.saveValue('IdentityPrivate', ourIdentityKeyPair.privateKey)

    const ourEphemeralKeyPair = await generateX25519Keys(); //save private key name: EphemeralPrivate (overwrite periodically)
    StoreKeys.saveValue('EphemeralPrivate', ourEphemeralKeyPair.privateKey)

    //EphemeralPublicKey signieren
    
    const EphemeralPublicSignature = await signKey(ourIdentityKeyPair.privateKey, ourEphemeralKeyPair.publicKey);
    console.log('signed: ',EphemeralPublicSignature)

    //Generate LastResortPQKEM KeyPair and signature

    const PQKEMKeyPair = await generateKyberKeyPair(); //save privatekey name: PQKEMLastResortPrivate (overwrite periodically)
    StoreKeys.saveValue('PQKEMLastResortPrivate', PQKEMKeyPair.privateKey)
    console.log('Stored Key: PQKEMLastResortPrivate with Value:', PQKEMKeyPair.privateKey)
    const PQKEMSignature = await signKey(ourIdentityKeyPair.privateKey, PQKEMKeyPair.publicKey);
    console.log("signed",PQKEMSignature)
    
    //Generate One-Time Keys    

    const oneTimeX25519KeyPair = await generateX25519Keys(); //save privatekey with uuid (oneTimeX25519Private:oneTimePQKEMPrivate)
    const oneTimePQKEMKeyPair = await generateKyberKeyPair(); //save privatekey with uuid (generator library)                  "
    const generatedUUID = uuid.v4();

    //store both private keys in one entry

    const oneTimeKeypair = oneTimePQKEMKeyPair.privateKey + ':' + oneTimeX25519KeyPair.privateKey
    StoreKeys.saveValue(generatedUUID, oneTimeKeypair)
    console.log('Stored Key: ', generatedUUID, 'with Value:', oneTimeKeypair)

    //OneTime Key signed, overwrite priodically
    const oneTimePQKEMSignature = await signKey(ourIdentityKeyPair.privateKey, oneTimePQKEMKeyPair.publicKey);
    console.log("signed",oneTimePQKEMSignature)

}


/*
    Alle Public Keys und Signaturen können nun an den Server gesendet werden
*/

//WARTEN BIS DOUBLE RATCHET IMPLEMENTIERT IST


// // 2. Empfange öffentliche Schlüssel der Gegenseite
// const theirIdentityPublicKey = "";
// const theirEphemeralPublicKey = new Uint8Array(32);
// const theirEphemeralSignature = "";
// const theirOneTimeX25519PublicKey = "";
// const theirOneTimePQKEMPublicKey = new Uint8Array(32);
// const theirOneTimePQKEMSignature = "";


// //Überprüfe Signaturen
// const isEphemeralValid = await verifySignature(
//     theirIdentityPublicKey,
//     theirEphemeralPublicKey,
//     theirEphemeralSignature,

// );
// const isOneTimePQKEMValid = await verifySignature(
//     theirIdentityPublicKey,
//     theirOneTimePQKEMPublicKey,
//     theirOneTimePQKEMSignature
// );

// //Konvertiere Strings zu Uint8Arrays falls nötig
// //ourIdentityKeyPair bleibt in StringKeyPair Format



// // 3. Initialisiere den Root Key (z.B. aus einem X3DH Handshake)
// const rootKey = new Uint8Array(32); // 32 zufällige Bytes

// const headerKey = new Uint8Array(32); // 32 zufällige Bytes

// const nextHeaderKey = new Uint8Array(32); // 32 zufällige Bytes


// // // 4. Initialisiere den Double Ratchet State
// // const drState = await DR_Init_HE({
// //     rootKey,
// //     ourIdentityKeyPair,
// //     theirIdentityPublicKey,
// //     ourEphemeralKeyPair,
// //     theirEphemeralPublicKey,
// //     headerKey,
// //     nextHeaderKey,
// //     isInitiator: true,
// // });

// // console.log('Double Ratchet State initialisiert:', drState);