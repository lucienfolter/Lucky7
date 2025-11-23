import { useState } from "react";
import SidebarEmployer from "../Components/SidebarEmployer";
import ImageUploader from "../Components/ImageUploader";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function EmployerPostJob() {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    title: "",
    category: "Plumbing",
    location: "",
    rate: "",
    description: "",
  });

  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { ...form, image: imageData };
      await axios.post(import.meta.env.VITE_API_BASE + "/jobs/create", payload, { withCredentials: true });
      alert("Job posted successfully!");
      window.location.href = "/employer-jobs";
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post job");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      <SidebarEmployer />

      <main className="flex-1 p-10">
        <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-300 mb-10">
          {t("postJob")}
        </h1>

        <form onSubmit={handleSubmit} className="glass p-10 rounded-xl max-w-3xl space-y-6">

          {/* title */}
          <div>
            <label className="block text-sm font-semibold">{t("jobTitle")}</label>
            <input
              className="w-full mt-1 border px-4 py-2 rounded-lg"
              value={form.title}
              name="title"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          {/* category + location */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold">{t("category")}</label>
              <select
                className="w-full mt-1 border px-4 py-2 rounded-lg"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option>Plumbing</option>
                <option>Electrical</option>
                <option>Carpentry</option>
                <option>Painting</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold">{t("location")}</label>
              <input
                className="w-full mt-1 border px-4 py-2 rounded-lg"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
          </div>

          {/* rate */}
          <div>
            <label className="block text-sm font-semibold">{t("rate")}</label>
            <input
              className="w-full mt-1 border px-4 py-2 rounded-lg"
              value={form.rate}
              onChange={(e) => setForm({ ...form, rate: e.target.value })}
            />
          </div>

          {/* description */}
          <div>
            <label className="block text-sm font-semibold">{t("description")}</label>
            <textarea
              className="w-full mt-1 border px-4 py-2 rounded-lg h-28"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {/* uploader */}
          <ImageUploader onUploadComplete={(url, publicId) => setImageData({ url, publicId })} label={t("form.uploadImage")} />

          {/* buttons */}
          <button type="submit" className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white font-semibold">
            {loading ? "..." : t("post")}
          </button>
        </form>
      </main>
    </div>
  );
}
