import QuestionCard from "./QuestionCard";
import type { Answers, Question, SurveySection } from "../types/survey";

type SurveyStepProps = {
  section: SurveySection;
  sectionIndex: number;
  totalSections: number;
  visibleQuestions: Question[];
  answers: Answers;
  canGoNext: boolean;
  onAnswer: (questionId: string, value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
};

export default function SurveyStep({
  section,
  sectionIndex,
  totalSections,
  visibleQuestions,
  answers,
  canGoNext,
  onAnswer,
  onNext,
  onPrevious,
}: SurveyStepProps) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
      <section className="mb-5 rounded-[1.75rem] border border-hospital-border bg-white p-5 shadow-soft sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-black leading-tight text-hospital-ink sm:text-[2.35rem]">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="mt-2 max-w-2xl text-base font-semibold leading-8 text-hospital-gray">
                {section.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="space-y-4">
        {visibleQuestions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            answers={answers}
            onChange={onAnswer}
          />
        ))}
      </div>

      <div className="sticky bottom-0 z-10 mt-7 rounded-t-[1.75rem] border border-hospital-border bg-white p-3 shadow-soft sm:p-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <button
            type="button"
            onClick={onPrevious}
            disabled={sectionIndex === 0}
            className="rounded-2xl border border-hospital-border bg-white px-5 py-3 text-base font-extrabold text-hospital-ink transition hover:bg-hospital-greenSoft disabled:cursor-not-allowed disabled:opacity-40"
          >
            السابق
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canGoNext}
            className="rounded-2xl bg-hospital-green px-7 py-3 text-base font-extrabold text-white shadow-soft transition hover:bg-hospital-greenDark disabled:cursor-not-allowed disabled:bg-hospital-gray disabled:opacity-60"
          >
            {sectionIndex === totalSections - 1 ? "إنهاء الاستبيان" : "التالي"}
          </button>
        </div>
      </div>
    </main>
  );
}
