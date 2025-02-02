import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { useFirebase } from '../context/FirebaseContext';

function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const { db } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTopics() {
      try {
        const topicsCollection = collection(db, 'topics');
        const topicsSnapshot = await getDocs(topicsCollection);
        const topicsList = topicsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTopics(topicsList);
      } catch (error) {
        console.error('Error fetching topics:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, [db]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-xl text-gray-600">טוען נושאים...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">נושאי לימוד</h1>
      <div className="topic-grid">
        {topics.map(topic => (
          <div
            key={topic.id}
            className="topic-item"
            onClick={() => navigate(`/quiz/${topic.id}`)}
          >
            <h2>{topic.name}</h2>
            <p>{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopicsPage;
