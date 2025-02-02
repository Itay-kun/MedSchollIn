// src/firebase/utils/responses.js
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc,
  writeBatch,
  increment,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../init';

export async function recordStudentResponse(sessionId, studentId, questionId, selectedAnswerId, timeSpent) {
  const batch = writeBatch(db);

  const answerDoc = await getDoc(doc(db, 'answers', selectedAnswerId));
  const answer = answerDoc.data();

  const responseRef = doc(collection(db, 'studentResponses'));
  const timestamp = Timestamp.now();

  const response = {
    id: responseRef.id,
    sessionId,
    studentId,
    questionId,
    selectedAnswerId,
    isCorrect: answer.isCorrect,
    timeSpent,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  const sessionRef = doc(db, 'quizSessions', sessionId);
  batch.update(sessionRef, {
    completedQuestions: increment(1),
    updatedAt: timestamp
  });

  const sessionDoc = await getDoc(sessionRef);
  const session = sessionDoc.data();

  for (const topicId of session.topicIds) {
    const progressRef = doc(db, 'studentProgress', `${studentId}_${topicId}`);
    const progressDoc = await getDoc(progressRef);

    if (progressDoc.exists()) {
      batch.update(progressRef, {
        totalAttempts: increment(1),
        correctAnswers: increment(answer.isCorrect ? 1 : 0),
        lastAttemptAt: timestamp,
        updatedAt: timestamp
      });
    } else {
      const progress = {
        id: `${studentId}_${topicId}`,
        studentId,
        topicId,
        totalAttempts: 1,
        correctAnswers: answer.isCorrect ? 1 : 0,
        averageScore: answer.isCorrect ? 100 : 0,
        lastAttemptAt: timestamp,
        createdAt: timestamp,
        updatedAt: timestamp
      };
      batch.set(progressRef, progress);
    }
  }

  batch.set(responseRef, response);
  await batch.commit();

  return response;
}
