import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Home() {
  const [zone, setZone] = useState('SE3');
  const [prices, setPrices] = useState([]);
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    fetch(`/api/prices?zone=${zone}`)
      .then(res => res.json())
      .then(data => {
        setPrices(data);
        const now = new Date().getHours();
        const currentPrice = data[now]?.price || 0;
        if (currentPrice < 0.5) setRecommendation('🔋 Rekommendation: Ladda batteri');
        else if (currentPrice > 1.2) setRecommendation('⚡ Rekommendation: Sälj el');
        else setRecommendation('⏳ Rekommendation: Avvakta');
      });
  }, [zone]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-start py-10 px-4">
      <h1 className="text-4xl font-bold text-green-600 mb-6">SunMind</h1>

      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <label className="mb-2 sm:mb-0 font-medium">Välj elpriszon:</label>
          <select value={zone} onChange={(e) => setZone(e.target.value)} className="border p-2 rounded w-full sm:w-40">
            <option value="SE1">SE1</option>
            <option value="SE2">SE2</option>
            <option value="SE3">SE3</option>
            <option value="SE4">SE4</option>
          </select>
        </div>

        <p className="text-lg font-semibold text-blue-600">{recommendation}</p>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={prices}>
            <XAxis dataKey="hour" />
            <YAxis domain={[0, 'auto']} unit=" kr" />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#10B981" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <footer className="text-sm text-gray-500 mt-10">Powered by Elnature</footer>
    </div>
  );
}