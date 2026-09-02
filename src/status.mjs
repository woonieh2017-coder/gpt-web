export function createStatusMessage(repository, state = "ready") {
  const normalizedRepository = repository.trim();

  if (!normalizedRepository) {
    throw new TypeError("repository must not be empty");
  }

  if (state !== "ready") {
    return `${normalizedRepository} is currently ${state}.`;
  }

  return `${normalizedRepository} is ready for autonomous changes.`;
}

export function createDeliveryBadge(mode = "automatic") {
  if (mode === "automatic") {
    return { label: "Automated delivery", tone: "success" };
  }

  if (mode === "manual") {
    return { label: "Manual delivery", tone: "neutral" };
  }

  throw new RangeError(`unsupported delivery mode: ${mode}`);
}
