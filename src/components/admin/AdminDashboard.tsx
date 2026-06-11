"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Video,
  Globe,
  ImageIcon,
  Users,
  Plus,
  Trash2,
  LogOut,
  Loader2,
  RefreshCw,
  Settings,
} from "lucide-react";
import type { PortfolioItem } from "@/data/portfolio";
import type { LeadRecord } from "@/lib/cms";

type Tab = "leads" | "videos" | "websites" | "photos" | "settings";

interface CmsData {
  videos: PortfolioItem[];
  websites: PortfolioItem[];
  photos: PortfolioItem[];
  leads: LeadRecord[];
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("leads");
  const [data, setData] = useState<CmsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/cms");
      const json = await res.json();
      if (res.ok) setData(json.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };

  const addVideo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/admin/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "add",
        type: "videos",
        item: {
          title: form.get("title"),
          videoUrl: form.get("videoUrl"),
          aspect: form.get("aspect"),
          tag: form.get("tag"),
        },
      }),
    });

    const json = await res.json();
    setSaving(false);
    if (json.success) {
      setMessage("تمت إضافة الفيديو");
      e.currentTarget.reset();
      load();
    } else {
      setMessage(json.message || "فشل الإضافة");
    }
  };

  const addWebsite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/admin/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "add",
        type: "websites",
        item: {
          title: form.get("title"),
          image: form.get("image"),
          siteUrl: form.get("siteUrl"),
          tag: form.get("tag"),
        },
      }),
    });

    const json = await res.json();
    setSaving(false);
    if (json.success) {
      setMessage("تمت إضافة الموقع");
      e.currentTarget.reset();
      load();
    } else {
      setMessage(json.message || "فشل الإضافة");
    }
  };

  const uploadPhoto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: form,
    });

    const json = await res.json();
    setSaving(false);
    if (json.success) {
      setMessage("تم رفع الصورة");
      e.currentTarget.reset();
      load();
    } else {
      setMessage(json.message || "فشل الرفع");
    }
  };

  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/admin/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        current: form.get("current"),
        next: form.get("next"),
      }),
    });

    const json = await res.json();
    setSaving(false);
    if (json.success) {
      setMessage("تم تغيير كلمة المرور بنجاح");
      e.currentTarget.reset();
    } else {
      setMessage(json.message || "فشل تغيير كلمة المرور");
    }
  };

  const removeItem = async (type: "videos" | "websites" | "photos", id: string) => {
    if (!confirm("حذف هذا العنصر؟")) return;
    await fetch("/api/admin/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", type, id }),
    });
    load();
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: "leads", label: "العملاء", icon: <Users className="w-4 h-4" />, count: data?.leads.length },
    { id: "videos", label: "فيديوهات", icon: <Video className="w-4 h-4" />, count: data?.videos.length },
    { id: "websites", label: "مواقع", icon: <Globe className="w-4 h-4" />, count: data?.websites.length },
    { id: "photos", label: "صور", icon: <ImageIcon className="w-4 h-4" />, count: data?.photos.length },
    { id: "settings", label: "الإعدادات", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-800 bg-slate-900/80 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">لوحة تحكم Mo7y Studio</h1>
            <p className="text-slate-400 text-sm">إدارة الأعمال والعملاء</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={load}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-300"
              aria-label="تحديث"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm"
            >
              <LogOut className="w-4 h-4" />
              خروج
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                tab === t.id
                  ? "bg-purple-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {t.icon}
              {t.label}
              {t.count !== undefined && (
                <span className="bg-black/20 px-2 py-0.5 rounded-full text-xs">{t.count}</span>
              )}
            </button>
          ))}
        </div>

        {message && (
          <p className="mb-4 text-sm text-emerald-400 bg-emerald-950/50 border border-emerald-800 rounded-xl px-4 py-2">
            {message}
          </p>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
          </div>
        ) : (
          <>
            {tab === "leads" && (
              <div className="space-y-4">
                <p className="text-slate-400 text-sm">
                  عملاء الكويز + حجوزات Amelia (عبر Webhook) — كلهم في مكان واحد
                </p>
                {data?.leads.length === 0 ? (
                  <p className="text-slate-500 py-12 text-center">لا يوجد عملاء بعد</p>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-900 text-slate-400">
                        <tr>
                          <th className="text-right p-3">المصدر</th>
                          <th className="text-right p-3">الاسم</th>
                          <th className="text-right p-3">واتساب</th>
                          <th className="text-right p-3">المنطقة</th>
                          <th className="text-right p-3">التفاصيل</th>
                          <th className="text-right p-3">التاريخ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.leads.map((lead) => (
                          <tr key={lead.id} className="border-t border-slate-800">
                            <td className="p-3">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  lead.source === "amelia"
                                    ? "bg-blue-900/50 text-blue-300"
                                    : "bg-purple-900/50 text-purple-300"
                                }`}
                              >
                                {lead.source === "amelia" ? "حجز" : "كويز"}
                              </span>
                            </td>
                            <td className="p-3">{lead.name}</td>
                            <td className="p-3" dir="ltr">
                              {lead.phone}
                            </td>
                            <td className="p-3">{lead.region}</td>
                            <td className="p-3 text-slate-400">{lead.quizResult || "—"}</td>
                            <td className="p-3 text-slate-500 text-xs">
                              {new Date(lead.createdAt).toLocaleString("ar-SA")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {tab === "videos" && (
              <div className="grid lg:grid-cols-2 gap-6">
                <form onSubmit={addVideo} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة فيديو YouTube
                  </h2>
                  <input
                    name="title"
                    required
                    placeholder="عنوان الفيديو"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-purple-500"
                  />
                  <input
                    name="videoUrl"
                    required
                    dir="ltr"
                    placeholder="https://youtu.be/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-purple-500 text-left"
                  />
                  <select
                    name="aspect"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 outline-none"
                    defaultValue="landscape"
                  >
                    <option value="landscape">عرضي (أفقي)</option>
                    <option value="portrait">طولي (Short)</option>
                  </select>
                  <select
                    name="tag"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 outline-none"
                    defaultValue="horizontal"
                  >
                    <option value="horizontal">عرضية</option>
                    <option value="vertical">طولية</option>
                    <option value="restaurants">مطاعم</option>
                    <option value="cafes">كافيهات</option>
                  </select>
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 font-medium disabled:opacity-70"
                  >
                    إضافة
                  </button>
                </form>

                <ItemList
                  items={data?.videos ?? []}
                  onDelete={(id) => removeItem("videos", id)}
                />
              </div>
            )}

            {tab === "websites" && (
              <div className="grid lg:grid-cols-2 gap-6">
                <form onSubmit={addWebsite} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة موقع
                  </h2>
                  <input
                    name="title"
                    required
                    placeholder="اسم المشروع"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-purple-500"
                  />
                  <input
                    name="image"
                    required
                    dir="ltr"
                    placeholder="رابط صورة المعاينة"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-purple-500 text-left"
                  />
                  <input
                    name="siteUrl"
                    required
                    dir="ltr"
                    placeholder="https://example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-purple-500 text-left"
                  />
                  <select
                    name="tag"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 outline-none"
                  >
                    <option value="restaurant">مطعم</option>
                    <option value="cafe">كافيه</option>
                    <option value="ecommerce">متجر</option>
                    <option value="corporate">شركة</option>
                    <option value="landing">صفحة هبوط</option>
                  </select>
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 font-medium disabled:opacity-70"
                  >
                    إضافة
                  </button>
                </form>

                <ItemList
                  items={data?.websites ?? []}
                  onDelete={(id) => removeItem("websites", id)}
                />
              </div>
            )}

            {tab === "settings" && (
              <div className="max-w-md">
                <form
                  onSubmit={changePassword}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4"
                >
                  <h2 className="font-semibold flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    تغيير كلمة المرور
                  </h2>
                  <p className="text-slate-400 text-sm">
                    غيّر كلمة المرور من هنا — ما تحتاج تدخل Vercel
                  </p>
                  <input
                    name="current"
                    type="password"
                    required
                    placeholder="كلمة المرور الحالية"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-purple-500"
                  />
                  <input
                    name="next"
                    type="password"
                    required
                    minLength={6}
                    placeholder="كلمة المرور الجديدة (6 أحرف+)"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-purple-500"
                  />
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 font-medium disabled:opacity-70"
                  >
                    حفظ كلمة المرور الجديدة
                  </button>
                </form>
              </div>
            )}

            {tab === "photos" && (
              <div className="grid lg:grid-cols-2 gap-6">
                <form onSubmit={uploadPhoto} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    رفع صورة
                  </h2>
                  <input
                    name="title"
                    required
                    placeholder="عنوان الصورة"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-purple-500"
                  />
                  <select
                    name="tag"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 outline-none"
                  >
                    <option value="cafes">كافيهات</option>
                    <option value="restaurants">مطاعم</option>
                    <option value="events">فعاليات</option>
                    <option value="products">منتجات</option>
                  </select>
                  <input
                    name="file"
                    type="file"
                    accept="image/*"
                    required
                    className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white"
                  />
                  <p className="text-xs text-slate-500">
                    الصور المرفوعة من اللوحة تظهر في معرض الصور مباشرة
                  </p>
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 font-medium disabled:opacity-70"
                  >
                    رفع
                  </button>
                </form>

                <ItemList
                  items={data?.photos ?? []}
                  onDelete={(id) => removeItem("photos", id)}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ItemList({
  items,
  onDelete,
}: {
  items: PortfolioItem[];
  onDelete: (id: string) => void;
}) {
  if (items.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-500">
        لا توجد عناصر مضافة من اللوحة بعد
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 max-h-[480px] overflow-y-auto">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50"
        >
          <div
            className="w-14 h-14 rounded-lg bg-cover bg-center shrink-0"
            style={{ backgroundImage: `url(${item.image})` }}
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{item.title}</p>
            <p className="text-xs text-slate-400 truncate">{item.videoUrl || item.siteUrl || item.image}</p>
          </div>
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="p-2 text-red-400 hover:bg-red-950/50 rounded-lg shrink-0"
            aria-label="حذف"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
