'use client';

import { useEffect, useState } from 'react';

export default function Chat() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const profileData = localStorage.getItem('userProfile');
    if (profileData) setProfile(JSON.parse(profileData));
  }, []);

  const handleChat = async () => {
    if (profile && userInput) {
      setLoading(true);
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: userInput, profile }),
      });
      const data = await res.json();
      setResponse(data.reply);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-indigo-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-6 mt-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">Your Personalized Chatbot</h1>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask something..."
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={handleChat}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? 'Thinking...' : 'Ask'}
        </button>
        {response && (
          <div className="mt-6 p-4 border-l-4 border-purple-500 bg-purple-50 text-gray-800 rounded">
            <strong>Bot:</strong> {response}
          </div>
        )}
      </div>
    </div>
  );
}
