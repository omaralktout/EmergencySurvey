import { ClipboardCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6">
      <div className="rounded-[1.5rem] border border-hospital-border bg-white px-4 py-4 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-hospital-border bg-hospital-greenSoft p-1 sm:h-16 sm:w-16">
              <img
                src={`${import.meta.env.BASE_URL}logo-mark.png`}
                alt="شعار مستشفى إربد التخصصي"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-hospital-greenSoft px-3 py-1 text-[0.72rem] font-bold text-hospital-greenDark sm:text-xs">
                <ClipboardCheck size={14} />
                استبيان رسمي
              </p>
              <h1 className="mt-1 truncate text-base font-extrabold text-hospital-ink sm:text-2xl">
                استبيان رضا مرضى الطوارئ
              </h1>
              <p className="mt-0.5 text-xs font-semibold text-hospital-gray sm:text-sm">
                مستشفى إربد التخصصي
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
