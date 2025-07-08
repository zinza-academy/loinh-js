import { create } from "zustand";
import { VaccinationRegistrationParams } from "../types";
import { persist } from "zustand/middleware";

interface VaccinationRegistrationState {
  data: Partial<VaccinationRegistrationParams>;
  registrationId?: string;
  setData: (data: Partial<VaccinationRegistrationParams>) => void;
  updateData: (data: Partial<VaccinationRegistrationParams>) => void;
  clearData: () => void;
  setRegistrationId: (id: string) => void;
}

export const useVaccinationRegistrationStore =
  create<VaccinationRegistrationState>()(
    persist(
      (set) => ({
        data: {},
        registrationId: undefined,
        setData: (data) => set({ data }),
        updateData: (newData) =>
          set((state) => ({ data: { ...state.data, ...newData } })),
        clearData: () => set({ data: {}, registrationId: undefined }),
        setRegistrationId: (id) => set({ registrationId: id }),
      }),
      {
        name: "vaccination-registration-storage",
        partialize: (state) => ({
          data: state.data,
          registrationId: state.registrationId,
        }),
      }
    )
  );
