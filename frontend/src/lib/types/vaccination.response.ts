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

export type VaccinationLocation = {
    id: string;
    province: string;
    address: string;
    person: string;
    tableCount: number;
}

export type VaccinationDocument = {
  id: string;
  documentType: string; // e.g., "Certificate", "Health Declaration"
  fullName: string;
  idNumber: string;
  issueDate: string;
  status: string; // e.g., "Issued", "Pending"
};

export type VaccineRegistration = {
  id: string;
  fullName: string;
  idNumber: string;
  registrationDate: string;
  vaccineType: string; // e.g., "AstraZeneca", "Pfizer"
  status: string; // e.g., "Registered", "Completed"
};