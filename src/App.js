import { useState } from "react";
import ShowData from "./components/showData";
import AddData from "./components/addData";
import DelData from "./components/delData";
import lightIcon from "./assets/light.svg";
import darkIcon from "./assets/dark.svg";
import { useTranslation } from "react-i18next";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  // const [language, setLanguage] = useState("en");

  const { t } = useTranslation();

  const handleChange = (lang) => {
    // setLanguage(lang);
    // console.log(language);
    // let loc = "http://localhost:3000/";
    let loc = window.location.origin;
    window.location.replace(loc + "?lng=" + lang);
  };

  return (
    <div className={`${darkMode && "dark bg-black text-white"}`}>
      <header className="border-b-[2px] h-fit border-black ml-6 mr-6 dark:border-white">
        <div className="pl-5">
          <h1 className="font-black text-[2.5em] font-mono">std.</h1>
        </div>
        <div className="absolute flex items-center right-11 top-4 h-fit">
          <div className="mr-6">
            <button onClick={() => handleChange("id")}>ID</button>
            {" | "}
            <button onClick={() => handleChange("en")}>EN</button>
            {" | "}
            <button onClick={() => handleChange("zh")}>中文</button>
          </div>
          <div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`${darkMode && "hidden"} w-[1.5em]`}
            >
              <img src={lightIcon} className="" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`${!darkMode && "hidden"} w-[1.5em]`}
            >
              <img src={darkIcon} className="" />
            </button>
          </div>
        </div>
      </header>
      <h1 className="font-black text-[2.5em] text-center p-6">
        {/* Student Data Application */}
        {t("title")}
      </h1>
      <div className="flex flex-wrap justify-center">
        <div>
          <AddData />
          <DelData />
        </div>
        <ShowData />
      </div>
    </div>
  );
}

export default App;
