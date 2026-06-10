export interface QuizOption {
  id: string;
  label: string;
  scores: Record<string, number>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizResult {
  id: string;
  title: string;
  description: string;
  services: string[];
  cta: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "وين مشروعك الحين؟",
    options: [
      { id: "a", label: "عندي فكرة وبأخطط", scores: { idea: 3, growth: 1 } },
      { id: "b", label: "المشروع شغال وبأبغى أقوّي حضوري", scores: { active: 3, growth: 2 } },
      { id: "c", label: "بأطلق قريب وبأحتاج دعم كامل", scores: { launch: 3, web: 2 } },
      { id: "d", label: "بأوسّع وأزيد المبيعات", scores: { scale: 3, growth: 3 } },
    ],
  },
  {
    id: "q2",
    question: "وش أكثر شي تحتاجه هالفترة؟",
    options: [
      { id: "a", label: "محتوى بصري (صور وفيديو)", scores: { visual: 3, photo: 2, video: 2 } },
      { id: "b", label: "موقع أو متجر إلكتروني", scores: { web: 3 } },
      { id: "c", label: "تسويق وحملات رقمية", scores: { growth: 3 } },
      { id: "d", label: "كل شي من الصفر", scores: { idea: 2, visual: 2, web: 2, growth: 2 } },
    ],
  },
  {
    id: "q3",
    question: "عندك هوية بصرية جاهزة؟",
    options: [
      { id: "a", label: "لا، لسه ما عندي", scores: { idea: 2, visual: 2 } },
      { id: "b", label: "جزئياً وبأحتاج تطوير", scores: { active: 2, visual: 1 } },
      { id: "c", label: "نعم، جاهزة", scores: { active: 1, growth: 2 } },
    ],
  },
  {
    id: "q4",
    question: "متى تبغى تطلق أو تطوّر؟",
    options: [
      { id: "a", label: "خلال شهر", scores: { launch: 3 } },
      { id: "b", label: "خلال 3 أشهر", scores: { active: 2 } },
      { id: "c", label: "ما عندي استعجال", scores: { idea: 1 } },
    ],
  },
];

export const quizResults: QuizResult[] = [
  {
    id: "starter",
    title: "مرحلة البداية — نبني أساسك",
    description:
      "أنت في بداية الرحلة. ننصحك تبدأ بخطة محتوى بصري + هوية قوية + موقع يعرّف بمشروعك.",
    services: ["صناعة المحتوى البصري", "تصميم المواقع", "تصوير فوتوغرافي"],
    cta: "احجز استشارة تأسيس",
  },
  {
    id: "launch",
    title: "مرحلة الإطلاق — جاهز للانطلاق",
    description:
      "قرب تطلق! تحتاج إنتاج بصري احترافي + موقع + حملة تسويق أولى تخلّي إطلاقك يفرق.",
    services: ["تصوير فيديو", "مونتاج احترافي", "تصميم المواقع", "النمو الرقمي"],
    cta: "احجز استشارة إطلاق",
  },
  {
    id: "growth",
    title: "مرحلة النمو — وقت التوسع",
    description:
      "مشروعك شغال وبتحتاج تزيد الظهور والمبيعات. التركيز على التسويق الرقمي والمحتوى المستمر.",
    services: ["النمو الرقمي للمشاريع", "صناعة المحتوى البصري", "تصوير فيديو"],
    cta: "احجز استشارة نمو",
  },
  {
    id: "full",
    title: "حل متكامل — شريك واحد لكل شي",
    description:
      "تحتاج شريك يغطي كل المراحل: من الفكرة والمحتوى للموقع والتسويق. Mo7y Studio شريكك.",
    services: ["كل الخدمات الست"],
    cta: "احجز استشارة شاملة",
  },
];

export function calculateQuizResult(
  answers: Record<string, string>
): QuizResult {
  const scores: Record<string, number> = {};

  quizQuestions.forEach((q) => {
    const optionId = answers[q.id];
    const option = q.options.find((o) => o.id === optionId);
    if (!option) return;
    Object.entries(option.scores).forEach(([key, val]) => {
      scores[key] = (scores[key] ?? 0) + val;
    });
  });

  if ((scores.idea ?? 0) >= 5 || (scores.launch ?? 0) >= 5) {
    if ((scores.launch ?? 0) > (scores.idea ?? 0)) return quizResults[1];
    return quizResults[0];
  }
  if ((scores.scale ?? 0) >= 3 || (scores.growth ?? 0) >= 5) return quizResults[2];
  if ((scores.web ?? 0) >= 3 && (scores.visual ?? 0) >= 3) return quizResults[3];
  if ((scores.active ?? 0) >= 4) return quizResults[2];
  return quizResults[3];
}
