import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { CategoryStats } from "@/types";
import { Card, CardHeader, CardContent } from "./ui/Card";
import { formatCurrency } from "@/lib/utils";

interface ExpenseChartProps {
  data: CategoryStats[];
}

interface TooltipProps {
  active: boolean;
  payload: { payload: { name: string; value: number; count: number } }[];
}

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E9",
];

const ExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
  const chartData = data.map((item, index) => ({
    name: item._id,
    value: item.total,
    count: item.count,
    color: COLORS[index % COLORS.length],
  }));

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">
            Amount: {formatCurrency(data.value)}
          </p>
          <p className="text-sm text-gray-600">Transactions: {data.count}</p>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Expense Breakdown</h3>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">No data to display</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Expense Breakdown by Category</h3>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent ?? 0).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => (
                  <CustomTooltip active={active} payload={payload} />
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {chartData.map((entry, index) => (
            <div key={entry.name} className="flex items-center text-sm">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600">{entry.name}</span>
              <span className="ml-auto font-medium">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
