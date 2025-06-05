import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { date: "21/08", vaccinated: 600000 },
  { date: "22/09", vaccinated: 450000 },
  { date: "23/09", vaccinated: 750000 },
  { date: "24/09", vaccinated: 780000 },
  { date: "25/08", vaccinated: 820000 },
  { date: "26/09", vaccinated: 850000 },
  { date: "27/09", vaccinated: 1000000 },
  { date: "28/09", vaccinated: 1050000 },
  { date: "29/09", vaccinated: 720000 },
  { date: "30/09", vaccinated: 650000 },
  { date: "01/10", vaccinated: 1350000 },
  { date: "02/10", vaccinated: 1200000 },
  { date: "03/10", vaccinated: 1100000 },
  { date: "04/10", vaccinated: 1250000 },
  { date: "05/10", vaccinated: 1300000 },
  { date: "06/10", vaccinated: 1450000 },
  { date: "07/10", vaccinated: 1200000 },
  { date: "08/10", vaccinated: 1250000 },
  { date: "09/10", vaccinated: 900000 },
  { date: "10/10", vaccinated: 1150000 },
  { date: "11/10", vaccinated: 1000000 },
  { date: "12/10", vaccinated: 1200000 },
  { date: "13/10", vaccinated: 1250000 },
  { date: "14/10", vaccinated: 1500000 },
  { date: "15/10", vaccinated: 1300000 },
  { date: "16/10", vaccinated: 1450000 },
  { date: "17/10", vaccinated: 1500000 },
  { date: "18/10", vaccinated: 1600000 },
  { date: "19/10", vaccinated: 2100000 },
  { date: "20/1", vaccinated: 1800000 },
];

const VaccinationChart = () => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Dữ liệu tiêm theo ngày</span>
          <div className="flex items-center space-x-2 ml-auto">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span className="text-sm text-gray-600">Đã tiêm</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
            <Line 
              type="monotone" 
              dataKey="vaccinated" 
              stroke="#2563eb" 
              strokeWidth={3}
              dot={{ fill: "#dc2626", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#dc2626" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default VaccinationChart;