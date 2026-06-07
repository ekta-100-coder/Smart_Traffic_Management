import React, { useState } from "react";

const LanguageSelector = () => {
  const [lang, setLang] = useState("English");
  const languages = ["English", "Hindi", "Tamil", "Bengali"];

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
    >
      {languages.map((l) => (
        <option key={l} value={l}>
          {l}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
