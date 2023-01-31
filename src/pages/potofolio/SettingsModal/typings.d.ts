export type DetailDrawerRef = {
  init: () => void;
};
export type StepOneType = {
  onchangeStep: (e) => void;
  onSaveEmail?: (email: string, emailCode: string) => void;
  closeModal?: () => void;
  email?: string;
  emailCode?: string;
};
