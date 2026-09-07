export const DEFAULT_LANGUAGE = "en";
export const LANGUAGE_STORAGE_KEY = "gpt-web-language";

const copy = {
  en: {
    documentTitle: "GPT Web is ready",
    eyebrow: "Autonomous delivery workspace",
    pageTitle: "GPT Web is ready",
    switchLanguage: "한국어",
    switchLanguageLabel: "Switch language to Korean",
    readyStatus: (repository) => `${repository} is ready for autonomous changes.`,
    stateStatus: (repository, state) => `${repository} is currently ${state}.`,
    automaticDelivery: "Automated delivery",
    manualDelivery: "Manual delivery",
  },
  ko: {
    documentTitle: "GPT Web 준비 완료",
    eyebrow: "자율 배포 작업 공간",
    pageTitle: "GPT Web 준비 완료",
    switchLanguage: "English",
    switchLanguageLabel: "언어를 영어로 전환",
    readyStatus: (repository) => `${repository}는 자율 변경을 적용할 준비가 되었습니다.`,
    stateStatus: (repository, state) => `${repository}는 현재 ${state} 상태입니다.`,
    automaticDelivery: "자동 배포",
    manualDelivery: "수동 배포",
  },
};

export function normalizeLanguage(language) {
  return language === "ko" ? "ko" : DEFAULT_LANGUAGE;
}

export function getUiCopy(language = DEFAULT_LANGUAGE) {
  return copy[normalizeLanguage(language)];
}

export function getNextLanguage(language) {
  return normalizeLanguage(language) === "ko" ? "en" : "ko";
}
