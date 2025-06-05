"use client";
import StatsCard from "@/components/common/StatsCard";
import RegisUserIcon from "@/assets/svg/ic_register_people 1.svg";
import Syringe from "@/assets/svg/ic_injection.svg";
import VaccinationChart from "@/components/VaccinationChart";
import VaccinationLocationTable from "@/components/VaccinationLocationTable";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="">
        {/* Main content */}
        <div className="relative flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0 items-stretch">
          <StatsCard
            title="Đối tượng đăng ký tiêm"
            value="11,203,873"
            unit="lượt"
            iconSrc={RegisUserIcon}
            // className="flex-1"
          />
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-[66.67%] w-px bg-gray-400 top-[16.67%] z-10"></div>
          <StatsCard
            title="Số mũi tiêm hôm qua"
            value="1,762,119"
            unit="mũi"
            iconSrc={Syringe}
            // className="flex-1"
          />
        </div>

        {/* Chart */}
        <div className="md:mt-21">
          <VaccinationChart />
        </div>

        <div>
          <VaccinationLocationTable />
        </div>
      </div>
    </main>
  );
}
