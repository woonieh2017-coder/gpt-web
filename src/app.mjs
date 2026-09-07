import {
  DEFAULT_LANGUAGE,
  getNextLanguage,
  getUiCopy,
  LANGUAGE_STORAGE_KEY,
  normalizeLanguage,
} from "./i18n.mjs";
import { createDeliveryBadge, createStatusMessage } from "./status.mjs";

const repository = "woonieh2017-coder/gpt-web";
const eyebrow = document.querySelector("#eyebrow");
const pageTitle = document.querySelector("#page-title");
const statusMessage = document.querySelector("#status-message");
const deliveryBadge = document.querySelector("#delivery-badge");
const languageToggle = document.querySelector("#language-toggle");

function readSavedLanguage() {
  try {
    return normalizeLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY));
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

function saveLanguage(language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // The language still changes for this page when storage is unavailable.
  }
}

let language = readSavedLanguage();

function render() {
  const copy = getUiCopy(language);
  const badge = createDeliveryBadge("automatic", language);

  document.documentElement.lang = language;
  document.title = copy.documentTitle;

  if (eyebrow) {
    eyebrow.textContent = copy.eyebrow;
  }

  if (pageTitle) {
    pageTitle.textContent = copy.pageTitle;
  }

  if (statusMessage) {
    statusMessage.textContent = createStatusMessage(repository, "ready", language);
  }

  if (deliveryBadge) {
    deliveryBadge.textContent = badge.label;
    deliveryBadge.dataset.tone = badge.tone;
  }

  if (languageToggle) {
    languageToggle.textContent = copy.switchLanguage;
    languageToggle.setAttribute("aria-label", copy.switchLanguageLabel);
  }
}

languageToggle?.addEventListener("click", () => {
  language = getNextLanguage(language);
  saveLanguage(language);
  render();
});

render();
