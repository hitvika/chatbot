import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { input, profile } = await req.json();

  const prompt = `You are a helpful assistant. Reply in a tone suitable for a ${profile.age}-year-old ${profile.profession} from ${profile.region}, ${profile.country} who prefers ${profile.language}. Interests: ${profile.interests}. Question: ${input}`;

  const res = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.TOGETHER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await res.json();
  return NextResponse.json({ reply: data.choices?.[0]?.message?.content || "No reply." });
}
