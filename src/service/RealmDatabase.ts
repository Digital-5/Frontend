import Realm from 'realm';

export class Message extends Realm.Object<Message> {
    _id!: Realm.BSON.ObjectId;
    chatId!: string;
    text!: string;
    isSent!: boolean;
    timestamp!: Date;

    static schema: Realm.ObjectSchema = {
        name: 'Message',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            chatId: { type: 'string', indexed: true },
            text: 'string',
            isSent: 'bool',
            timestamp: 'date',
        },
    };
}
export class Conversation extends Realm.Object<Conversation> {
    _id!: Realm.BSON.ObjectId;
    chatId!: string;
    name!: string;
    username!: string;
    lastMessage!: string;
    lastMessageAt!: Date;
    unreadCount!: number;

    static schema: Realm.ObjectSchema = {
        name: 'Conversation',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            chatId: { type: 'string', indexed: true },
            name: 'string',
            username: 'string',
            lastMessage: { type: 'string', default: '' },
            lastMessageAt: 'date',
            unreadCount: { type: 'int', default: 0 },
        },
    };
}

export function getRealmConfig(encryptionKey: ArrayBuffer): Realm.Configuration {
    return {
        schema: [Message, Conversation],  // Conversation hinzufügen
schemaVersion: 2, 
        encryptionKey,
    };
}