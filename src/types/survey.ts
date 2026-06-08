export type QuestionType = "rating" | "yesNo" | "choice" | "text" | "textarea";

export type QuestionOption = {
  value: string;
  label: string;
};

export type Question = {
  id: string;
  text: string;
  type: QuestionType;
  required?: boolean;
  options?: QuestionOption[];
  /**
   * عند تفعيلها على سؤال تقييم خاص بالانتظار، يظهر سؤال مدة الانتظار
   * فقط إذا كانت الإجابة ضعيف أو سيء.
   */
  waitingDurationOnLowRating?: boolean;
  showIf?: {
    questionId: string;
    equals: string;
  };
};

export type SurveySection = {
  id: string;
  title: string;
  subtitle?: string;
  questions: Question[];
};

export type Answers = Record<string, string>;
