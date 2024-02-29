import { useTranslation } from "react-i18next";
import { useAudioRecorder } from "./components/AudioRecorder/AudioRecorder";
import ChatBubble from "./components/chatBubble/ChatBubble";
import { getAllDiscussions } from "./components/chatBubble/mockData";
import i18n from "./locales/i18n";
import { formatTime } from "./utils/formatTime";

function App() {
  const { t } = useTranslation();

  const changeLanguage = (lng: "ar" | "en" | "es") => {
    i18n.changeLanguage(lng);
  };

  document.body.dir = i18n.dir();

  const { duration, startRecording, recordingStatus, stopRecording } =
    useAudioRecorder();

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

        {recordingStatus === "inactive" ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}

        {formatTime(duration)}

        <ChatBubble data={getAllDiscussions()} />
      </div>
    </>
  );
}

export default App;
