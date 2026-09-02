import { createStatusMessage } from "./status.mjs";

const statusMessage = document.querySelector("#status-message");

if (statusMessage) {
  statusMessage.textContent = createStatusMessage("woonieh2017-coder/gpt-web");
}
