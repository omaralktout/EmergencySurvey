import {
  getWaitingDurationAnswerId,
  ratingOptions,
  shouldShowWaitingDuration,
  waitingDurationOptions,
  yesNoOptions,
} from "../data/survey";
import type { Answers, Question, QuestionOption } from "../types/survey";

type QuestionCardProps = {
  question: Question;
  index: number;
  answers: Answers;
  onChange: (questionId: string, value: string) => void;
};

function OptionGrid({
  options,
  value,
  onSelect,
  columns = "sm:grid-cols-5",
}: {
  options: QuestionOption[];
  value: string;
  onSelect: (value: string) => void;
  columns?: string;
}) {
  return (
    <div className={`grid grid-cols-2 gap-2 ${columns} sm:gap-3`}>
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={`option-button rounded-2xl border px-3 py-3 text-sm font-extrabold leading-6 sm:text-base ${
              selected
                ? "border-hospital-green bg-hospital-green text-white shadow-soft"
                : "border-hospital-border bg-white text-hospital-ink hover:border-hospital-green hover:bg-hospital-greenSoft"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default function QuestionCard({ question, index, answers, onChange }: QuestionCardProps) {
  const value = answers[question.id] ?? "";
  const waitingDurationAnswerId = getWaitingDurationAnswerId(question.id);
  const waitingDurationValue = answers[waitingDurationAnswerId] ?? "";
  const showWaitingDuration =
    question.waitingDurationOnLowRating && shouldShowWaitingDuration(value);

  return (
    <article className="question-card rounded-[1.5rem] p-4 sm:p-5">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-hospital-green text-sm font-black text-white">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-extrabold leading-8 text-hospital-ink sm:text-lg">{question.text}</h3>
          {question.required && <p className="mt-0.5 text-xs font-bold text-hospital-gray">هذا السؤال مطلوب</p>}
        </div>
      </div>

      {question.type === "rating" && (
        <OptionGrid
          options={ratingOptions}
          value={value}
          onSelect={(nextValue) => onChange(question.id, nextValue)}
        />
      )}

      {showWaitingDuration && (
        <div className="mt-4 rounded-[1.25rem] border border-hospital-border bg-hospital-greenSoft/45 p-4">
          <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-extrabold text-hospital-ink sm:text-base">
              كم كانت مدة الانتظار تقريباً؟
            </p>
            <p className="text-xs font-bold text-hospital-gray">هذا السؤال مطلوب</p>
          </div>

          <OptionGrid
            options={waitingDurationOptions}
            value={waitingDurationValue}
            onSelect={(nextValue) => onChange(waitingDurationAnswerId, nextValue)}
            columns="sm:grid-cols-4"
          />
        </div>
      )}

      {question.type === "yesNo" && (
        <div className="grid grid-cols-2 gap-3 sm:max-w-sm">
          {yesNoOptions.map((option) => {
            const selected = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange(question.id, option.value)}
                className={`option-button rounded-2xl border px-4 py-3 text-base font-extrabold ${
                  selected
                    ? "border-hospital-green bg-hospital-green text-white shadow-soft"
                    : "border-hospital-border bg-white text-hospital-ink hover:border-hospital-green hover:bg-hospital-greenSoft"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}

      {question.type === "choice" && question.options && (
        <OptionGrid
          options={question.options}
          value={value}
          onSelect={(nextValue) => onChange(question.id, nextValue)}
          columns={question.options.length <= 3 ? "sm:grid-cols-3" : "sm:grid-cols-5"}
        />
      )}

      {question.type === "text" && (
        <input
          value={value}
          onChange={(event) => onChange(question.id, event.target.value)}
          placeholder="اكتب الإجابة هنا..."
          className="w-full rounded-2xl border border-hospital-border bg-white px-4 py-4 text-base font-semibold leading-8 text-hospital-ink outline-none transition focus:border-hospital-green focus:ring-4 focus:ring-hospital-greenSoft"
        />
      )}

      {question.type === "textarea" && (
        <textarea
          value={value}
          onChange={(event) => onChange(question.id, event.target.value)}
          rows={5}
          placeholder="اكتب ملاحظاتك هنا..."
          className="w-full resize-none rounded-2xl border border-hospital-border bg-white px-4 py-4 text-base font-semibold leading-8 text-hospital-ink outline-none transition focus:border-hospital-green focus:ring-4 focus:ring-hospital-greenSoft"
        />
      )}
    </article>
  );
}
