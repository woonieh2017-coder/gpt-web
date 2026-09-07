import { getUiCopy } from "./i18n.mjs";

export function createStatusMessage(repository, state = "ready", language = "en") {
  const normalizedRepository = repository.trim();

  if (!normalizedRepository) {
    throw new TypeError("repository must not be empty");
  }

  const copy = getUiCopy(language);

  if (state !== "ready") {
    return copy.stateStatus(normalizedRepository, state);
  }

  return copy.readyStatus(normalizedRepository);
}

export function createDeliveryBadge(mode = "automatic", language = "en") {
  const copy = getUiCopy(language);

  if (mode === "automatic") {
    return { label: copy.automaticDelivery, tone: "success" };
  }

  if (mode === "manual") {
    return { label: copy.manualDelivery, tone: "neutral" };
  }

  throw new RangeError(`unsupported delivery mode: ${mode}`);
}
