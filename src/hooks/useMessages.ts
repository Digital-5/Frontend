import { useEffect } from 'react';
import { useRealm, useQuery } from '@realm/react';
import Realm from 'realm';
import { Message, Conversation } from '../service/RealmDatabase';

export function useMessages(chatId: string) {
  const realm = useRealm();
  const messages = useQuery(Message)
    .filtered('chatId == $0', chatId)
    .sorted('timestamp');

  // Wenn der Chat geöffnet wird → unreadCount auf 0 zurücksetzen
  useEffect(() => {
    const conv = realm.objects(Conversation).filtered('chatId == $0', chatId)[0];
    if (conv && conv.unreadCount > 0) {
      realm.write(() => { conv.unreadCount = 0; });
    }
  }, [chatId]);

  const addMessage = (text: string, isSent: boolean) => {
    realm.write(() => {
      realm.create(Message, {
        _id: new Realm.BSON.ObjectId(),
        chatId,
        text,
        isSent,
        timestamp: new Date(),
      });

      const conv = realm.objects(Conversation).filtered('chatId == $0', chatId)[0];
      if (conv) {
        conv.lastMessage = text;
        conv.lastMessageAt = new Date();
        // Nur erhöhen wenn empfangen (nicht selbst gesendet)
        if (!isSent) {
          conv.unreadCount = conv.unreadCount + 1;
        }
      }
    });
  };

  return { messages, addMessage };
}