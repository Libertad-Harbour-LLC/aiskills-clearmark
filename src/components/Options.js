"use client";

import { TASKS, RESOLUTIONS } from "@/lib/app.config";
import { useLang } from "@/lib/i18n";
import { PresetGrid, TextField, Check } from "./Fields";

export default function Options({ state, set, Chips }) {
  const { t, lang } = useLang();
  return (
    <>
      <PresetGrid label={{ en: "What to remove", ru: "Что убрать" }} items={TASKS} value={state.task} onChange={(v) => set({ task: v })} />
      <TextField id="what" required={state.task === "objects"} label={state.task === "objects"
        ? { en: "Which objects", ru: "Какие предметы" } : { en: "Details (optional)", ru: "Уточнение (необязательно)" }}
        value={state.what} max={200}
        placeholder={{ en: "e.g. the red trash bin on the left", ru: "например: красную урну слева" }} onChange={(v) => set({ what: v })} />
      <Chips label={t("resolution")} options={RESOLUTIONS} value={state.resolution} onChange={(v) => set({ resolution: v })} render={(v) => v.toUpperCase()} />
      <Check id="own" checked={state.own} onChange={(v) => set({ own: v })}>
        {lang === "ru"
          ? "Это моё изображение, или у меня есть право его изменять. Водяные знаки, копирайты, подписи и печати сервис не удаляет."
          : "This image is mine, or I have the right to edit it. Watermarks, copyright notices, signatures and stamps are not removed."}
      </Check>
    </>
  );
}
