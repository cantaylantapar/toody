import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div>
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={changeLanguage}
      >
        <option value="en">English</option>
        <option value="ru">русский</option>
        <option value="tr">Türkçe</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
