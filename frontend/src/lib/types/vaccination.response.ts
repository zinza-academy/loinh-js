export type VaccinationCertificate = {
  fullName: string;
  birthDate: string;
  idNumber: string;
  healthInsurance: string;
  address: string;
  conclusion: string;
  vaccinations: Vaccination[];
};

export type Vaccination = {
  dose: number;
  date: string;
  vaccine: string;
  batch: string;
  location: string;
};