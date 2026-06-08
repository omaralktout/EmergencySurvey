import { CheckCircle2, Download, RotateCcw } from "lucide-react";
import type { Answers } from "../types/survey";

type ThankYouProps = {
  answers: Answers;
  onRestart: () => void;
};

export default function ThankYou({ answers, onRestart }: ThankYouProps) {
  const downloadAnswers = () => {
    const payload = {
      survey: "استبيان رضا مرضى الطوارئ",
      hospital: "مستشفى إربد التخصصي",
      submittedAt: new Date().toISOString(),
      answers,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "emergency-survey-answers.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-hospital-bg px-4 py-10 font-cairo" dir="rtl">
      <section className="w-full max-w-2xl rounded-[2rem] border border-hospital-border bg-white p-7 text-center shadow-soft sm:p-9">
        <div className="mx-auto mb-5 flex h-18 w-18 items-center justify-center rounded-full bg-hospital-greenSoft text-hospital-green">
          <CheckCircle2 size={42} />
        </div>
        <img
          src={`${import.meta.env.BASE_URL}logo-mark.png`}
          alt="شعار مستشفى إربد التخصصي"
          className="mx-auto mb-5 h-20 w-20 object-contain"
        />
        <h1 className="text-3xl font-black text-hospital-ink sm:text-4xl">شكراً لمشاركتك</h1>
        <p className="mt-4 text-base font-semibold leading-8 text-hospital-gray sm:text-lg">
          تم حفظ إجاباتك بنجاح. رأيك يساعدنا على تحسين جودة الرعاية وتجربة المرضى والمراجعين في قسم الطوارئ.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={downloadAnswers}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-hospital-green px-5 py-4 text-base font-extrabold text-white transition hover:bg-hospital-greenDark"
          >
            <Download size={18} />
            تحميل الإجابات
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-hospital-border bg-white px-5 py-4 text-base font-extrabold text-hospital-ink transition hover:bg-hospital-greenSoft"
          >
            <RotateCcw size={18} />
            تعبئة من جديد
          </button>
        </div>
      </section>
    </main>
  );
}
