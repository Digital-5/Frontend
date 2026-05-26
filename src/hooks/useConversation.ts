import { useRealm, useQuery } from '@realm/react';
import Realm from 'realm';
import { Conversation } from '../service/RealmDatabase';

export function useConversations() {
    const realm = useRealm();
    const conversations = useQuery(Conversation).sorted('lastMessageAt', true);

    const createConversation = (name: string, username: string): string => {
        const id = new Realm.BSON.ObjectId();
        const chatId = id.toHexString();
        realm.write(() => {
            realm.create(Conversation, {
                _id: id,
                chatId,
                name,
                username,
                lastMessage: '',
                lastMessageAt: new Date(),
                unreadCount: 0,
            });

        });
        return chatId;
    };

    return { conversations, createConversation };
}