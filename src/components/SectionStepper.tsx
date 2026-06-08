import { useEffect, useRef } from "react";
import type { SurveySection } from "../types/survey";

type SectionStepperProps = {
  sections: SurveySection[];
  currentIndex: number;
};

export default function SectionStepper({ sections, currentIndex }: SectionStepperProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const container = scrollRef.current;
    const currentItem = itemRefs.current[currentIndex];

    if (!container || !currentItem) return;
    if (window.matchMedia("(min-width: 768px)").matches) return;

    const nextLeft = currentItem.offsetLeft - (container.clientWidth - currentItem.clientWidth) / 2;
    container.scrollTo({ left: nextLeft, behavior: "smooth" });
  }, [currentIndex]);

  return (
    <nav className="mx-auto w-full max-w-6xl px-4 pt-5 sm:px-6" aria-label="مراحل الاستبيان" dir="rtl">
      <div className="rounded-[1.75rem] border border-hospital-border bg-white px-4 py-5 shadow-soft sm:px-6">
        <div ref={scrollRef} className="stepper-scroll">
          <ol className="stepper-list">
            {sections.map((section, index) => {
              const isDone = index < currentIndex;
              const isCurrent = index === currentIndex;
              const isConnectorActive = index < currentIndex;

              return (
                <li
                  key={section.id}
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                  className={`stepper-item ${isConnectorActive ? "connector-active" : ""}`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  <div className={`stepper-circle ${isCurrent ? "current" : ""} ${isDone ? "done" : ""}`}>
                    {index + 1}
                  </div>
                  <div className={`stepper-title ${isCurrent || isDone ? "active" : ""}`}>
                    {section.title}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </nav>
  );
}
