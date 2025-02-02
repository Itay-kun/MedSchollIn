// src/firebase/utils/quizzes.js
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  getDoc,
  getDocs,
  query,
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../init';

export async function startQuizSession(studentId, topicIds, type, numberOfQuestions) {
  const sessionRef = doc(collection(db, 'quizSessions'));
  const timestamp = Timestamp.now();

  const session = {
    id: sessionRef.id,
    studentId,
    topicIds,
    type,
    status: 'inProgress',
    startedAt: timestamp,
    totalQuestions: numberOfQuestions,
    completedQuestions: 0,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  await setDoc(sessionRef, session);
  return session;
}

export async function completeQuizSession(sessionId) {
  const timestamp = Timestamp.now();

  const sessionRef = doc(db, 'quizSessions', sessionId);
  const session = (await getDoc(sessionRef)).data();

  const responses = await getDocs(
    query(
      collection(db, 'studentResponses'),
      where('sessionId', '==', sessionId)
    )
  );

  const correctAnswers = responses.docs.filter(
    doc => doc.data().isCorrect
  ).length;

  const score = (correctAnswers / session.totalQuestions) * 100;

  await updateDoc(sessionRef, {
    status: 'completed',
    completedAt: timestamp,
    score,
    updatedAt: timestamp
  });
}
