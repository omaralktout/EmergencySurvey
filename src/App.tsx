import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import SectionStepper from "./components/SectionStepper";
import SurveyStep from "./components/SurveyStep";
import ThankYou from "./components/ThankYou";
import Welcome from "./components/Welcome";
import { getWaitingDurationAnswerId, shouldShowWaitingDuration, surveySections } from "./data/survey";
import type { Answers, Question } from "./types/survey";

const STORAGE_KEY = "irbid-emergency-survey-answers";

type AppView = "welcome" | "survey" | "thank-you";

function isQuestionVisible(question: Question, answers: Answers) {
  if (!question.showIf) return true;
  return answers[question.showIf.questionId] === question.showIf.equals;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function App() {
  const [view, setView] = useState<AppView>("welcome");
  const [sectionIndex, setSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(() => {
    const savedAnswers = localStorage.getItem(STORAGE_KEY);
    return savedAnswers ? (JSON.parse(savedAnswers) as Answers) : {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const currentSection = surveySections[sectionIndex];

  const visibleQuestions = useMemo(
    () => currentSection.questions.filter((question) => isQuestionVisible(question, answers)),
    [answers, currentSection]
  );

  const allVisibleRequiredAnswered = visibleQuestions.every((question) => {
    if (!question.required) return true;

    const value = answers[question.id];
    const hasMainAnswer = Boolean(value && value.trim().length > 0);

    if (!hasMainAnswer) return false;

    if (question.waitingDurationOnLowRating && shouldShowWaitingDuration(value)) {
      const waitingDurationAnswerId = getWaitingDurationAnswerId(question.id);
      const waitingDurationValue = answers[waitingDurationAnswerId];
      return Boolean(waitingDurationValue && waitingDurationValue.trim().length > 0);
    }

    return true;
  });

  const allVisibleQuestions = useMemo(
    () => surveySections.flatMap((section) => section.questions.filter((question) => isQuestionVisible(question, answers))),
    [answers]
  );

  const answeredCount = allVisibleQuestions.filter((question) => {
    const value = answers[question.id];
    return Boolean(value && value.trim().length > 0);
  }).length;

  const handleStart = () => {
    setView("survey");
    setSectionIndex(0);
    setTimeout(scrollToTop, 0);
  };

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((currentAnswers) => {
      const nextAnswers = { ...currentAnswers, [questionId]: value };
      const allQuestions = surveySections.flatMap((section) => section.questions);

      for (const question of allQuestions) {
        if (question.waitingDurationOnLowRating && !shouldShowWaitingDuration(nextAnswers[question.id])) {
          delete nextAnswers[getWaitingDurationAnswerId(question.id)];
        }

        if (question.showIf && nextAnswers[question.showIf.questionId] !== question.showIf.equals) {
          delete nextAnswers[question.id];
          delete nextAnswers[getWaitingDurationAnswerId(question.id)];
        }
      }

      return nextAnswers;
    });
  };

  const handleNext = () => {
    if (!allVisibleRequiredAnswered) return;

    if (sectionIndex < surveySections.length - 1) {
      setSectionIndex((current) => current + 1);
      setTimeout(scrollToTop, 0);
      return;
    }

    setView("thank-you");
    setTimeout(scrollToTop, 0);
  };

  const handlePrevious = () => {
    if (sectionIndex === 0) return;
    setSectionIndex((current) => current - 1);
    setTimeout(scrollToTop, 0);
  };

  const handleRestart = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAnswers({});
    setSectionIndex(0);
    setView("welcome");
    setTimeout(scrollToTop, 0);
  };

  if (view === "welcome") {
    return <Welcome onStart={handleStart} />;
  }

  if (view === "thank-you") {
    return <ThankYou answers={answers} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-hospital-bg">
      <Header />
      <SectionStepper sections={surveySections} currentIndex={sectionIndex} />
      <SurveyStep
        section={currentSection}
        sectionIndex={sectionIndex}
        totalSections={surveySections.length}
        visibleQuestions={visibleQuestions}
        answers={answers}
        canGoNext={allVisibleRequiredAnswered}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}
