import { createDeliveryBadge, createStatusMessage } from "./status.mjs";

const statusMessage = document.querySelector("#status-message");
const deliveryBadge = document.querySelector("#delivery-badge");

if (statusMessage) {
  statusMessage.textContent = createStatusMessage("woonieh2017-coder/gpt-web");
}

if (deliveryBadge) {
  const badge = createDeliveryBadge();
  deliveryBadge.textContent = badge.label;
  deliveryBadge.dataset.tone = badge.tone;
}
