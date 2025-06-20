import { VaccinationCertificate } from "../types/vaccination.response";


export const vaccinationData:VaccinationCertificate = {
  fullName: "Nguyễn Văn A",
  birthDate: "16/10/1994",
  idNumber: "030012345678",
  healthInsurance: "030094005102",
  address: "Phường Giang Biên - Quận Long Biên - Thành phố Hà Nội",
  conclusion: "Đã được tiêm phòng vắc xin phòng bệnh Covid-19",
  vaccinations: [
    {
      dose: 1,
      date: "08/09/2021 - 16:56",
      vaccine: "COVID-19 Vaccine AstraZeneca",
      batch: "NJ0342",
      location: "TYT Dịch Vọng Hậu",
    },
    {
      dose: 2,
      date: "05/09/2021 - 16:56",
      vaccine: "COVID-19 Vaccine AstraZeneca",
      batch: "NJ0343",
      location: "TYT Dịch Vọng Hậu",
    },
  ],
};