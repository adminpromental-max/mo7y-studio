"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  CheckCircle,
  Gift,
  Loader2,
  Copy,
  Lock,
  Phone,
} from "lucide-react";
import {
  quizQuestions,
  calculateQuizResult,
  type QuizResult,
} from "@/data/quiz";
import { saudiRegions } from "@/data/regions";

const DISCOUNT_CODE = "MO7Y20";

export default function GrowthQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [leadDone, setLeadDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const current = quizQuestions[step];
  const progress = result
    ? 100
    : ((step + 1) / quizQuestions.length) * 100;

  const selectOption = (optionId: string) => {
    const next = { ...answers, [current.id]: optionId };
    setAnswers(next);

    if (step < quizQuestions.length - 1) {
      setTimeout(() => setStep(step + 1), 250);
    } else {
      setTimeout(() => {
        setResult(calculateQuizResult(next));
      }, 300);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setLeadDone(false);
    setError("");
  };

  const submitLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          region: form.get("region"),
          quizResult: result?.title,
          quizServices: result?.services.join("، "),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message || "فشل الإرسال — تأكد من تعبئة جميع الحقول");
        return;
      }
      setLeadDone(true);
    } catch {
      setError("تعذّر الإرسال، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(DISCOUNT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="quiz" className="py-24 bg-gradient-to-b from-purple-50/80 to-white scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            اكتشف احتياجك
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            وين مشروعك الحين؟
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            جاوب على 4 أسئلة سريعة — واحصل على{" "}
            <strong className="text-purple-700">خصم 20%</strong> عند إكمال بياناتك
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <div className="h-2 bg-purple-100 rounded-full mb-8 overflow-hidden">
            <motion.div
              className="h-full bg-purple-600 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-purple-100 p-6 sm:p-8 min-h-[320px]">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {leadDone ? (
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl p-8 text-white mb-6">
                        <Gift className="w-12 h-12 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-2">مبروك! كود الخصم جاهز</h3>
                        <p className="text-white/90 text-sm mb-6">
                          فريق Mo7y Studio بيتواصل معك قريباً على الواتساب
                        </p>
                        <button
                          type="button"
                          onClick={copyCode}
                          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-purple-700 font-bold text-2xl tracking-widest shadow-lg hover:scale-105 transition-transform"
                        >
                          {DISCOUNT_CODE}
                          <Copy className="w-5 h-5" />
                        </button>
                        {copied && (
                          <p className="text-emerald-200 text-sm mt-3 font-medium">✓ تم نسخ الكود</p>
                        )}
                        <p className="text-white/70 text-xs mt-4">
                          استخدم الكود عند الحجز أو التواصل معنا
                        </p>
                      </div>

                      <div className="text-center mb-4">
                        <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                        <h4 className="font-bold text-gray-900">{result.title}</h4>
                        <p className="text-gray-500 text-sm mt-1">{result.description}</p>
                      </div>

                      <Link
                        href="/booking"
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
                      >
                        احجز استشارتك الآن
                        <ArrowLeft className="w-5 h-5" />
                      </Link>
                    </div>
                  ) : (
                    <>
                      {/* عرض تسويقي بارز */}
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-purple-600 p-[2px] mb-6">
                        <div className="bg-white rounded-[14px] p-5 sm:p-6 text-center">
                          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold mb-3">
                            <Gift className="w-3.5 h-3.5" />
                            عرض حصري لك
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-snug">
                            أكمل بياناتك الآن
                            <br />
                            <span className="text-purple-600">واحصل على خصم 20%</span>
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 flex items-center justify-center gap-1.5">
                            <Phone className="w-4 h-4 text-purple-500" />
                            سيتواصل معك فريقنا على الواتساب
                          </p>

                          {/* كود مقفول قبل الإرسال */}
                          <div className="inline-flex items-center gap-3 bg-gray-100 border-2 border-dashed border-purple-300 rounded-xl px-6 py-3">
                            <Lock className="w-5 h-5 text-purple-400" />
                            <span className="text-2xl font-bold tracking-widest text-gray-400 blur-[3px] select-none">
                              {DISCOUNT_CODE}
                            </span>
                            <span className="text-xs text-purple-600 font-semibold bg-purple-50 px-2 py-1 rounded-lg">
                              يُكشف بعد الإرسال
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* نتيجة الكويز مختصرة */}
                      <div className="flex items-start gap-3 bg-purple-50 rounded-xl p-4 mb-5">
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{result.title}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {result.services.map((s) => (
                              <span
                                key={s}
                                className="px-2 py-0.5 rounded-full bg-white text-purple-700 text-xs font-medium border border-purple-100"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <form onSubmit={submitLead} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            الاسم الكامل
                          </label>
                          <input
                            name="name"
                            required
                            placeholder="مثال: أحمد محمد"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            رقم الواتساب
                          </label>
                          <input
                            name="phone"
                            type="tel"
                            required
                            dir="ltr"
                            placeholder="05xxxxxxxx"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none text-left"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            المنطقة
                          </label>
                          <select
                            name="region"
                            required
                            defaultValue=""
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none bg-white"
                          >
                            <option value="" disabled>
                              اختر منطقتك
                            </option>
                            {saudiRegions.map((r) => (
                              <option key={r} value={r}>
                                {r}
                              </option>
                            ))}
                          </select>
                        </div>

                        {error && (
                          <p className="text-sm text-red-600 text-center bg-red-50 rounded-lg py-2 px-3">
                            {error}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold text-base hover:from-purple-700 hover:to-violet-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-purple-200"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              جاري الإرسال...
                            </>
                          ) : (
                            <>
                              <Gift className="w-5 h-5" />
                              أرسل بياناتي واحصل على كود MO7Y20
                            </>
                          )}
                        </button>
                      </form>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={reset}
                    className="block w-full mt-5 text-sm text-purple-600 hover:text-purple-800 text-center"
                  >
                    أعد الاختبار
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-sm text-purple-600 font-medium mb-2">
                    سؤال {step + 1} من {quizQuestions.length}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                    {current.question}
                  </h3>
                  <div className="space-y-3">
                    {current.options.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => selectOption(option.id)}
                        className={`w-full text-right px-5 py-4 rounded-xl border-2 transition-all font-medium ${
                          answers[current.id] === option.id
                            ? "border-purple-500 bg-purple-50 text-purple-800"
                            : "border-gray-100 bg-gray-50 text-gray-700 hover:border-purple-200 hover:bg-purple-50/50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
