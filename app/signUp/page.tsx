'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export type UserProfile = {
  fullName: string;
  age: string;
  profession: string;
  interests: string;
  region: string;
  country: string;
  language: string;
  password: string;
};

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<UserProfile>({
    fullName: '', age: '', profession: '', interests: '', region: '', country: '', language: '', password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(formData));
    router.push('/chat');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 to-blue-200">
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-2xl space-y-6">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        {(Object.keys(formData) as (keyof UserProfile)[]).map((key) => (
          <div key={key}>
            <label className="block text-gray-700 capitalize mb-1">{key}</label>
            <input
              name={key}
              type={key === 'password' ? 'password' : 'text'}
              value={formData[key]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
        ))}

        <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">Create Account</button>
        <button type="button" onClick={() => router.push('/login')} className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition">Already have an account? Log in</button>
      </form>
    </div>
  );
}