import "server-only";
import { MODEL, TASKS, RESOLUTIONS } from "@/lib/app.config";
import { PlanError, pick, urls, text } from "@/lib/plan-helpers";

export function plan(body) {
  // The visitor has to confirm the rights to the image; the server checks it too.
  if (body.own !== true) throw new PlanError("Confirm that you own this image or have the right to edit it", "rights_not_confirmed");
  const [photo] = urls(body.inputs, "photo", { name: "photo" });
  const task = TASKS.find((t) => t.id === body.task) || TASKS[0];
  const what = text(body.what, 200);
  if (task.id === "objects" && !what) throw new PlanError("Say which objects to remove", "missing_field");
  const count = pick(Number(body.count), [1, 2], 1);
  const job = {
    model: MODEL,
    prompt:
      `${task.prompt}${what ? ` Specifically remove: ${what}.` : ""} ` +
      "Rebuild the cleared areas from the surrounding background so they blend seamlessly, with matching texture, light and grain. " +
      "Keep everything else exactly the same: people's faces, composition, colors and sharpness. " +
      "Do NOT remove or alter any watermark, copyright notice, photographer or stock-agency mark, signature, official seal or stamp — leave those exactly as they are.",
    params: { aspect_ratio: "Auto", resolution: pick(body.resolution, RESOLUTIONS, "1k") },
    inputs: { image_urls: [photo] },
  };
  return Array.from({ length: count }, () => job);
}
