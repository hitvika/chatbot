import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const profileStr = localStorage.getItem('userProfile');
    if (!profileStr) return alert('No profile found. Please sign up first.');

    const profile = JSON.parse(profileStr);
    if (profile.fullName === fullName && profile.password === password) {
      router.push('/chat');
    } else {
      alert('Invalid name or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-purple-200">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Log In</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Continue to Chat
        </button>
        <button
          onClick={() => router.push('/signup')}
          className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition"
        >
          New user? Create a profile
        </button>
      </div>
    </div>
  );
}
