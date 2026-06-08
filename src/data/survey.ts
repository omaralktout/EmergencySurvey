import type { SurveySection } from "../types/survey";

export const ratingOptions = [
  { value: "very-poor", label: "سيء" },
  { value: "poor", label: "ضعيف" },
  { value: "fair", label: "مقبول" },
  { value: "good", label: "جيد" },
  { value: "very-good", label: "جيد جداً" },
];

export const yesNoOptions = [
  { value: "yes", label: "نعم" },
  { value: "no", label: "لا" },
];

export const waitingDurationOptions = [
  { value: "0-10", label: "من 0 إلى 10 دقائق" },
  { value: "10-20", label: "من 10 إلى 20 دقيقة" },
  { value: "30-40", label: "من 30 إلى 40 دقيقة" },
  { value: "50-more", label: "50 دقيقة فأكثر" },
];

export const lowRatingValues = ["very-poor", "poor"];

export function getWaitingDurationAnswerId(questionId: string) {
  return `${questionId}_waiting_duration`;
}

export function shouldShowWaitingDuration(answerValue?: string) {
  return Boolean(answerValue && lowRatingValues.includes(answerValue));
}

export const surveySections: SurveySection[] = [
  {
    id: "basic",
    title: "أسئلة أساسية",
    subtitle: "معلومات عامة قبل تقييم تجربة زيارة قسم الطوارئ",
    questions: [
      {
        id: "respondent_type",
        text: "من الذي يقوم بالإجابة على هذا الاستبيان؟",
        type: "choice",
        required: true,
        options: [
          { value: "patient", label: "المريض" },
          { value: "parent_guardian", label: "أحد الوالدين / المسؤول عن رعاية المريض" },
          { value: "other", label: "شخص آخر" },
        ],
      },
      { id: "first_ed_visit", text: "هل كانت هذه أول زيارة لك إلى طوارئ المستشفى؟", type: "yesNo", required: true },
      {
        id: "payment_source",
        text: "المصدر الرئيسي لتغطية تكاليف العلاج",
        type: "choice",
        required: true,
        options: [
          { value: "self_pay", label: "الحساب الشخصي / كاش" },
          { value: "insurance", label: "التأمين" },
          { value: "moh", label: "وزارة الصحة" },
          { value: "aramco", label: "أرامكو" },
          { value: "other", label: "أخرى" },
        ],
      },
      {
        id: "insurance_company",
        text: "ما هي شركة التأمين الخاصة بكم؟",
        type: "text",
        required: true,
        showIf: { questionId: "payment_source", equals: "insurance" },
      },
    ],
  },
  {
    id: "admission",
    title: "دخول المستشفى",
    subtitle: "تقييم تجربة الاستقبال والانتظار قبل الدخول لمنطقة العلاج",
    questions: [
      { id: "arrival_acknowledged_waiting", text: "مدة الانتظار قبل انتباه الموظفين لوصولك", type: "rating", required: true, waitingDurationOnLowRating: true },
      { id: "waiting_area_comfort", text: "الراحة في منطقة الانتظار", type: "rating", required: true },
      { id: "treatment_area_waiting", text: "مدة الانتظار قبل دخولك لمنطقة العلاج", type: "rating", required: true, waitingDurationOnLowRating: true },
    ],
  },
  {
    id: "physician",
    title: "الطبيب",
    subtitle: "تقييم تعامل الطبيب وشرحه واهتمامه خلال العلاج",
    questions: [
      { id: "physician_professionalism", text: "حسن تعامل الطبيب", type: "rating", required: true },
      { id: "physician_listening", text: "مدى إصغاء الأطباء لك", type: "rating", required: true },
      { id: "physician_involvement", text: "مدى قيام الأطباء بإشراكك في القرارات الخاصة بعلاجك", type: "rating", required: true },
      { id: "physician_informed", text: "حرص الأطباء على إطلاعك على تفاصيل علاجك", type: "rating", required: true },
      { id: "physician_comfort", text: "حرص الأطباء على راحتك خلال مراحل علاجك", type: "rating", required: true },
    ],
  },
  {
    id: "laboratory",
    title: "المختبر",
    subtitle: "هذا القسم يظهر حسب تلقي الخدمة من المختبر",
    questions: [
      { id: "lab_received", text: "هل تلقيت خدمات من المختبر؟", type: "yesNo", required: true },
      { id: "lab_comfort", text: "الحرص على راحتك خلال عملية سحب عينة الدم", type: "rating", required: true, showIf: { questionId: "lab_received", equals: "yes" } },
    ],
  },
  {
    id: "radiology",
    title: "الأشعة",
    subtitle: "الأشعة السينية، الموجات فوق الصوتية، الأشعة المقطعية، الرنين المغناطيسي",
    questions: [
      { id: "radiology_received", text: "هل تلقيت خدمات من قسم الأشعة؟", type: "yesNo", required: true },
      { id: "radiology_waiting", text: "فترة الانتظار لإجراء الأشعة", type: "rating", required: true, waitingDurationOnLowRating: true, showIf: { questionId: "radiology_received", equals: "yes" } },
      { id: "radiology_comfort", text: "الحرص على راحتك خلال إجراء الأشعة", type: "rating", required: true, showIf: { questionId: "radiology_received", equals: "yes" } },
    ],
  },
  {
    id: "nurses",
    title: "فريق التمريض",
    subtitle: "تقييم تعامل فريق التمريض واستجابته لاحتياجاتك",
    questions: [
      { id: "nurses_professionalism", text: "حسن تعامل فريق التمريض", type: "rating", required: true },
      { id: "nurses_listening", text: "مدى إصغاء فريق التمريض إليك", type: "rating", required: true },
      { id: "nurses_responsiveness", text: "مراعاة فريق التمريض لاحتياجاتك", type: "rating", required: true },
      { id: "nurses_answers", text: "إجابة فريق التمريض على أسئلتك وملاحظاتك", type: "rating", required: true },
      { id: "nurses_privacy", text: "مراعاة فريق التمريض لخصوصيتك", type: "rating", required: true },
    ],
  },
  {
    id: "facility",
    title: "المرافق",
    subtitle: "تقييم المرافق والمواقف خلال زيارة قسم الطوارئ",
    questions: [
      { id: "parkings", text: "المواقف", type: "rating", required: true },
    ],
  },
  {
    id: "pharmacy",
    title: "الصيدلية",
    subtitle: "هذا القسم يظهر حسب صرف الأدوية من صيدلية المستشفى",
    questions: [
      { id: "pharmacy_received", text: "هل صرفت أدويتك من صيدلية المستشفى؟", type: "yesNo", required: true },
      { id: "pharmacy_waiting", text: "مدة الانتظار لصرف الأدوية", type: "rating", required: true, waitingDurationOnLowRating: true, showIf: { questionId: "pharmacy_received", equals: "yes" } },
      { id: "pharmacy_instructions", text: "شرح الصيدلي لتعليمات استخدام الأدوية", type: "rating", required: true, showIf: { questionId: "pharmacy_received", equals: "yes" } },
      { id: "pharmacy_availability", text: "توفر الأدوية الموصوفة", type: "rating", required: true, showIf: { questionId: "pharmacy_received", equals: "yes" } },
    ],
  },
  {
    id: "personal_issues",
    title: "أمور شخصية",
    subtitle: "تقييم الإبلاغ عن التأخير وتخفيف الألم والإرشادات بعد الزيارة",
    questions: [
      { id: "delay_information", text: "مدى إخبارك بأي تأخير في الإجراءات", type: "rating", required: true },
      { id: "pain_management", text: "مدى تخفيف شعورك بالألم", type: "rating", required: true },
      { id: "home_care_information", text: "المعلومات التي قدمت لك حول كيفية الاعتناء بنفسك في المنزل مثل أخذ الدواء وموعد المتابعة", type: "rating", required: true },
    ],
  },
  {
    id: "overall",
    title: "التقييم العام",
    subtitle: "تقييمك النهائي لتجربة الرعاية في قسم الطوارئ",
    questions: [
      { id: "staff_compassion", text: "مدى تعامل الموظفين معك بإنسانية", type: "rating", required: true },
      { id: "staff_cooperation", text: "مدى تعاون الموظفين في تقديم الرعاية لك", type: "rating", required: true },
      { id: "ed_cleanliness", text: "نظافة قسم الطوارئ", type: "rating", required: true },
      { id: "exceptional_staff", text: "هل قدم لك أحد الموظفين رعاية مميزة تذكر؟", type: "yesNo", required: true },
      { id: "exceptional_staff_name", text: "اذكر اسم الموظف إن أمكن", type: "text", required: false, showIf: { questionId: "exceptional_staff", equals: "yes" } },
      { id: "recommend_likelihood", text: "احتمالية أن توصي بخدماتنا للآخرين", type: "rating", required: true },
      { id: "comments", text: "تعليقات: صف التجارب الجيدة أو السيئة", type: "textarea", required: false },
    ],
  },
];
