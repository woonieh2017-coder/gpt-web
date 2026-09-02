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
