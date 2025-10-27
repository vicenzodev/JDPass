"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "Seg", senhas: 12 },
  { name: "Ter", senhas: 20 },
  { name: "Qua", senhas: 18 },
  { name: "Qui", senhas: 25 },
  { name: "Sex", senhas: 22 },
];

export default function PasswordStatsChart() {
  return (
    <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Senhas Geradas na Semana
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="senhas"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 4, fill: "#166534" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
