import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button onClick={() => setDark(!dark)} className="px-3 py-2 rounded bg-white/70 dark:bg-gray-800/60 border hover:scale-105 transition">
      {dark ? "Light" : "Dark"}
    </button>
  );
}
