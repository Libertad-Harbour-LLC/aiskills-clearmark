// ClearMark — remove unwanted text and objects from YOUR OWN photos and scans.
// Model: nano-banana-2-1-edit (edits the photo by instruction and rebuilds the background).
// Deliberately NOT a watermark remover: the visitor must confirm the rights to the photo, and the
// prompt tells the model to leave watermarks, copyright notices, signatures and official stamps alone.

export const MODEL = "nano-banana-2-1-edit";

export const TASKS = [
  { id: "text", label: { en: "Date stamp & added text", ru: "Дата и добавленный текст" },
    desc: { en: "Camera date, captions, stickers you put on", ru: "Дата камеры, подписи, наклейки, что вы добавили" },
    prompt: "Remove the camera date/time stamp, captions, emoji, stickers and other text or graphics that were added on top of the photo by its owner." },
  { id: "people", label: { en: "People in the background", ru: "Люди на заднем плане" },
    desc: { en: "Passers-by and photobombers", ru: "Прохожие и случайные люди" },
    prompt: "Remove the passers-by and strangers in the background; keep the main subject in the foreground untouched." },
  { id: "objects", label: { en: "Distracting objects", ru: "Лишние предметы" },
    desc: { en: "Trash, cones, bins, cables — say what", ru: "Мусор, конусы, урны, провода — укажите что" },
    prompt: "Remove distracting objects such as litter, trash bins, traffic cones, stray cables and similar clutter." },
  { id: "wires", label: { en: "Power lines & poles", ru: "Провода и столбы" },
    desc: { en: "Clean sky and skyline", ru: "Чистое небо и горизонт" },
    prompt: "Remove overhead power lines, wires and utility poles crossing the sky and scene." },
  { id: "spots", label: { en: "Spots on old prints", ru: "Пятна на старых снимках" },
    desc: { en: "Dust, scratches, stains on your scans", ru: "Пыль, царапины, пятна на ваших сканах" },
    prompt: "Remove dust specks, small scratches, stains and spots from this scanned print, keep everything else the same." },
  { id: "notes", label: { en: "Notes on my document", ru: "Пометки на моём документе" },
    desc: { en: "Pen notes, highlighter, coffee stains", ru: "Пометки ручкой, маркер, пятна от кофе" },
    prompt: "Remove handwritten pen notes in the margins, highlighter marks, coffee stains and scan shadows; keep all printed text and layout perfectly legible." },
];

export const RESOLUTIONS = ["1k", "2k"];

export const APP = {
  id: "clearmark",
  name: "ClearMark",
  theme: "midnight",
  tagline: { en: "Clean up your own photos", ru: "Чистка своих фото" },
  kicker: { en: "For photos you own", ru: "Для ваших собственных фото" },
  headline: { en: "Remove unwanted text and objects from your photos", ru: "Уберите лишний текст и предметы со своих фото" },
  description: {
    en: "Date stamps, passers-by, wires, trash, pen notes on your scans — pick what to remove and get a clean photo. Only for images you own or have the right to edit.",
    ru: "Дата на снимке, прохожие, провода, мусор, пометки на ваших сканах — выберите, что убрать, и получите чистое фото. Только для изображений, которые принадлежат вам или которые вы вправе изменять.",
  },
  cta: { en: "Clean up photo", ru: "Очистить фото" },
  models: [MODEL],
  upload: { types: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"], maxBytes: 20 * 1024 * 1024 },
  slots: [{
    key: "photo", kind: "image", min: 1, max: 1,
    label: { en: "Your photo", ru: "Ваше фото" },
    hint: { en: "A photo or scan that you took or own.", ru: "Фото или скан, которые вы сделали сами или которые вам принадлежат." },
  }],
  counts: [1, 2],
  compare: true,
  initialState: () => ({ task: "text", what: "", own: false, resolution: "1k", count: 1 }),
  check: (s) => {
    if (!s.own) return { en: "Confirm that you own this image or have the right to edit it.", ru: "Подтвердите, что изображение ваше или вы вправе его изменять." };
    if (s.task === "objects" && !s.what.trim()) return { en: "Say which objects to remove.", ru: "Напишите, какие предметы убрать." };
    return null;
  },
  priceModel: () => MODEL,
  label: (s, tx) => tx(TASKS.find((x) => x.id === s.task)?.label) || "",
};
