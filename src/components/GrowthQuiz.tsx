"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, CheckCircle } from "lucide-react";
import {
  quizQuestions,
  calculateQuizResult,
  type QuizResult,
} from "@/data/quiz";

export default function GrowthQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

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
      setTimeout(() => setResult(calculateQuizResult(next)), 300);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
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
            جاوب على 4 أسئلة سريعة ونعرف لك الخدمات المناسبة
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
                  className="text-center"
                >
                  <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {result.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {result.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {result.services.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-sm font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/25"
                  >
                    {result.cta}
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                  <button
                    type="button"
                    onClick={reset}
                    className="block w-full mt-4 text-sm text-purple-600 hover:text-purple-800"
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
