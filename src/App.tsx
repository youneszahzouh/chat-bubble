import { useTranslation } from "react-i18next";
import ChatBubble from "./components/chatBubble/ChatBubble";
import { getAllDiscussions } from "./components/chatBubble/mockData";
import i18n from "./locales/i18n";
import ReactPlayer from "react-player";

function App() {
  const { t } = useTranslation();

  const changeLanguage = (lng: "ar" | "en" | "es") => {
    i18n.changeLanguage(lng);
  };

  document.body.dir = i18n.dir();

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-10">
        <div className="flex gap-10">
          <button
            onClick={() => changeLanguage("ar")}
            className="rounded border px-2"
          >
            {t("arabic")}
          </button>
          <button
            onClick={() => changeLanguage("en")}
            className="rounded border px-2"
          >
            {t("english")}
          </button>

          <button
            onClick={() => changeLanguage("es")}
            className="rounded border px-2"
          >
            {t("spanish")}
          </button>
        </div>

        <p>{t("an-empty-page-to-make-use-of-a-chatbubble-component")}</p>

        <ChatBubble
          data={getAllDiscussions()}
          messageTypes={[
            {
              type: "VIDEO",
              component: (props) => (
                <div>
                  <ReactPlayer
                    width={"full"}
                    height={200}
                    url={props.data.file}
                  />
                </div>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}

export default App;
