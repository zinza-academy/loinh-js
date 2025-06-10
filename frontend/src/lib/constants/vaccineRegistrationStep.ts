export enum StepNumber {
    PersonalInfo = 1,
    ConsentForm,
    Finish,
}

export const StepTitle: Record<StepNumber, string> = {
    [StepNumber.PersonalInfo]: "Thông tin cá nhân",
    [StepNumber.ConsentForm]: "Phiếu đồng ý tiêm",
    [StepNumber.Finish]: "Hoàn thành",
};