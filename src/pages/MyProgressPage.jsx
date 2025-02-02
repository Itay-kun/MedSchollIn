import { useState, useEffect } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { collection, query, where, getDocs } from 'firebase/firestore';

function MyProgressPage() {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const { db } = useFirebase();

  useEffect(() => {
    // בהמשך נוסיף כאן את ה-userId מהאותנטיקציה
    const userId = 'temp-user-id';
    
    async function fetchProgress() {
      try {
        const progressRef = collection(db, 'studentProgress');
        const progressQuery = query(progressRef, where('studentId', '==', userId));
        const snapshot = await getDocs(progressQuery);
        
        const progressData = [];
        for (const doc of snapshot.docs) {
          // נביא גם את שם הנושא
          const topicDoc = await getDocs(collection(db, 'topics'), doc.data().topicId);
          const topicName = topicDoc.exists() ? topicDoc.data().name : 'נושא לא ידוע';
          
          progressData.push({
            id: doc.id,
            topicName,
            ...doc.data()
          });
        }
        
        setProgress(progressData);
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, [db]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">טוען נתונים...</div>
      </div>
    );
  }

  if (progress.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-10">
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">אין עדיין נתוני התקדמות</h2>
          <p className="text-gray-600">
            התחל לפתור תרגילים כדי לראות את ההתקדמות שלך כאן
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center">ההתקדמות שלי</h1>
      
      <div className="bg-white shadow rounded-lg">
        <div className="divide-y divide-gray-200">
          {progress.map((item) => (
            <div key={item.id} className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {item.topicName}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">מספר ניסיונות:</span>{' '}
                  {item.totalAttempts}
                </div>
                <div>
                  <span className="font-medium">תשובות נכונות:</span>{' '}
                  {item.correctAnswers}
                </div>
                <div>
                  <span className="font-medium">ציון ממוצע:</span>{' '}
                  {item.averageScore}%
                </div>
                <div>
                  <span className="font-medium">ניסיון אחרון:</span>{' '}
                  {new Date(item.lastAttemptAt.seconds * 1000).toLocaleDateString()}
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-4">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{
                      width: `${(item.correctAnswers / item.totalAttempts) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyProgressPage;
