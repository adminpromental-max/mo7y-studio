export interface Partner {
  id: string;
  name: string;
  /** ضع اللوجو في public/partners/ */
  logo?: string;
}

export const partners: Partner[] = [
  { id: "p1", name: "مطعم الذوق الرفيع" },
  { id: "p2", name: "كافيه لاونج" },
  { id: "p3", name: "براند كوفي" },
  { id: "p4", name: "متجر أناقة" },
  { id: "p5", name: "شركة نمو" },
  { id: "p6", name: "مؤسسة فعاليات" },
  { id: "p7", name: "مطعم بيتزا هاوس" },
  { id: "p8", name: "ستارت أب تك" },
  { id: "p9", name: "عيادة سمايل" },
  { id: "p10", name: "متجر عطور فاخرة" },
];
