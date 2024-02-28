import ChatBubble from "./components/chatBubble/ChatBubble";
import { getAllDiscussions } from "./components/chatBubble/mockData";
import { useTranslation } from "react-i18next";
import i18n from "./locales/i18n";

function App() {
  const { t } = useTranslation();

  const changeLanguage = (lng: "ar" | "en" | "es") => {
    i18n.changeLanguage(lng);
  };

  document.body.dir = i18n.dir();

  return (
    <>
      <div className="flex h-screen items-center justify-center flex-col gap-10">
        <div className="flex gap-10">
          <button
            onClick={() => changeLanguage("ar")}
            className="border rounded px-2"
          >
            {t("arabic")}
          </button>
          <button
            onClick={() => changeLanguage("en")}
            className="border rounded px-2"
          >
            {t("english")}
          </button>

          <button
            onClick={() => changeLanguage("es")}
            className="border rounded px-2"
          >
            {t("spanish")}
          </button>
        </div>

        <p>{t("an-empty-page-to-make-use-of-a-chatbubble-component")}</p>
        <ChatBubble data={getAllDiscussions()} />
      </div>
    </>
  );
}

export default App;
