type WelcomeProps = {
  onStart: () => void;
};

export default function Welcome({ onStart }: WelcomeProps) {
  return (
    <main className="min-h-screen bg-hospital-bg font-cairo" dir="rtl">
      <section className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-8 rounded-[2rem] border border-hospital-border bg-white/90 p-5 shadow-soft md:grid-cols-[1.08fr_0.92fr] md:p-8 lg:p-10">
          <div className="text-center md:text-right">
            <p className="mx-auto mb-4 inline-flex items-center rounded-full bg-hospital-greenSoft px-5 py-2 text-sm font-extrabold text-hospital-greenDark md:mx-0">
              استبيان رضا مرضى الطوارئ
            </p>

            <h1 className="mx-auto max-w-2xl text-[2.15rem] font-black leading-[1.25] text-hospital-ink sm:text-[2.7rem] lg:text-[3.15rem]">
              رأيك يساعدنا على تحسين تجربة الرعاية في قسم الطوارئ
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-8 text-hospital-gray sm:text-lg md:mx-0">
              نرجو منك الإجابة على الأسئلة التالية باللغة العربية. إجابتك تساعدنا على تطوير جودة الخدمة وتجربة المرضى والمراجعين.
            </p>

            <div className="mx-auto mt-7 max-w-2xl rounded-[1.35rem] border border-hospital-border bg-hospital-greenSoft/55 px-5 py-4 text-base font-bold leading-8 text-hospital-ink md:mx-0">
              سيتم عرض الأسئلة على مجموعات مرتبة، ويمكنك الرجوع للصفحة السابقة أو المتابعة للصفحة التالية عند الحاجة.
            </div>

            <button
              type="button"
              onClick={onStart}
              className="mt-7 w-full rounded-2xl bg-hospital-green px-8 py-4 text-xl font-extrabold text-white shadow-soft transition hover:bg-hospital-greenDark sm:w-auto sm:min-w-[270px]"
            >
              ابدأ الاستبيان
            </button>
          </div>

          <div className="flex justify-center">
            <div className="logo-bg flex w-full max-w-[380px] items-center justify-center rounded-[2rem] border border-hospital-border p-5 shadow-soft">
              <div className="flex w-full items-center justify-center rounded-[1.5rem] border border-hospital-border bg-white p-4 shadow-soft">
                <img
                  src={`${import.meta.env.BASE_URL}logo.jpg`}
                  alt="شعار مستشفى إربد التخصصي"
                  className="h-auto w-full max-w-[310px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
