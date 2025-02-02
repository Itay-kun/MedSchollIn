// src/firebase/utils/topics.js
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../init';

export async function addTopic(topicData) {
  const topicRef = doc(collection(db, 'topics'));
  const timestamp = Timestamp.now();
  const topic = {
    id: topicRef.id,
    ...topicData,
    createdAt: timestamp,
    updatedAt: timestamp
  };
  await setDoc(topicRef, topic);
  return topic;
}
