import assert from "node:assert/strict";
import test from "node:test";

import { createStatusMessage } from "../src/status.mjs";

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

test("rejects an empty repository name", () => {
  assert.throws(() => createStatusMessage("  "), /must not be empty/);
});
