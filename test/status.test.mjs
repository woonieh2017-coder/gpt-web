import assert from "node:assert/strict";
import test from "node:test";

import { getNextLanguage, getUiCopy, normalizeLanguage } from "../src/i18n.mjs";
import { createDeliveryBadge, createStatusMessage } from "../src/status.mjs";

test("reports that a ready repository accepts autonomous changes", () => {
  assert.equal(
    createStatusMessage("owner/project"),
    "owner/project is ready for autonomous changes.",
  );
});

test("reports a non-ready state", () => {
  assert.equal(
    createStatusMessage("owner/project", "building"),
    "owner/project is currently building.",
  );
});

test("localizes repository status in Korean", () => {
  assert.equal(
    createStatusMessage("owner/project", "ready", "ko"),
    "owner/project는 자율 변경을 적용할 준비가 되었습니다.",
  );
  assert.equal(
    createStatusMessage("owner/project", "building", "ko"),
    "owner/project는 현재 building 상태입니다.",
  );
});

test("rejects an empty repository name", () => {
  assert.throws(() => createStatusMessage("  "), /must not be empty/);
});

test("creates automatic and manual delivery badges", () => {
  assert.deepEqual(createDeliveryBadge("automatic"), { label: "Automated delivery", tone: "success" });
  assert.deepEqual(createDeliveryBadge("manual"), { label: "Manual delivery", tone: "neutral" });
});

test("localizes delivery badges in Korean", () => {
  assert.deepEqual(createDeliveryBadge("automatic", "ko"), {
    label: "자동 배포",
    tone: "success",
  });
  assert.deepEqual(createDeliveryBadge("manual", "ko"), {
    label: "수동 배포",
    tone: "neutral",
  });
});

test("rejects an unsupported delivery mode", () => {
  assert.throws(() => createDeliveryBadge("paused"), /unsupported delivery mode/);
});

test("normalizes persisted language values and toggles languages", () => {
  assert.equal(normalizeLanguage("ko"), "ko");
  assert.equal(normalizeLanguage("en"), "en");
  assert.equal(normalizeLanguage("unexpected"), "en");
  assert.equal(normalizeLanguage(null), "en");
  assert.equal(getNextLanguage("en"), "ko");
  assert.equal(getNextLanguage("ko"), "en");
});

test("provides localized title and language switch labels", () => {
  assert.equal(getUiCopy("en").pageTitle, "GPT Web is ready");
  assert.equal(getUiCopy("en").switchLanguage, "한국어");
  assert.equal(getUiCopy("ko").pageTitle, "GPT Web 준비 완료");
  assert.equal(getUiCopy("ko").switchLanguage, "English");
});
