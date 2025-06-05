import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  unit: string;
  iconSrc: string;
}

const StatsCard = ({ title, value, unit, iconSrc }: StatsCardProps) => {
  return (
    <Card className="flex-1">
      <CardContent className="">
        <div className="flex items-center space-x-4">
          <Image src={iconSrc} alt={title} width={32} height={32} />
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1 font-bold">{title}</p>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-gray-900">{value}</span>
              <span className="text-sm text-gray-500">({unit})</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
