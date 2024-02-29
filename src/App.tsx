import { useTranslation } from "react-i18next";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import CustomChatBubble from "./CustomChatBubble";
import CustomChatBubbleStyles from "./CustomChatBubbleStyles";
import DefaultChatBubble from "./DefaultChatBubble";
import i18n, { changeLanguage } from "./locales/i18n";
import { cn } from "./utils/cn";

const routes = [
  {
    path: "/",
    element: <DefaultChatBubble />,
    label: "default-chatbubble",
  },
  {
    path: "/chat-bubble-with-custom-type-video",
    element: <CustomChatBubble />,
    label: "chat-bubble-with-custom-type-video",
  },
  {
    path: "/chat-bubble-with-custom-styles",
    element: <CustomChatBubbleStyles />,
    label: "chat-bubble-with-custom-styles",
  },
];

function App() {
  const { t } = useTranslation();
  document.body.dir = i18n.dir();

  const currentPath = useLocation().pathname;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <div className="flex flex-wrap gap-10 px-2">
        <button
          onClick={() => changeLanguage("ar")}
          className={cn(
            "rounded border px-2",
            i18n.language === "ar" && "bg-gray-700 text-white",
          )}
        >
          {t("arabic")}
        </button>
        <button
          onClick={() => changeLanguage("en")}
          className={cn(
            "rounded border px-2",
            i18n.language === "en" && "bg-gray-700 text-white",
          )}
        >
          {t("english")}
        </button>
        <button
          onClick={() => changeLanguage("es")}
          className={cn(
            "rounded border px-2",
            i18n.language === "es" && "bg-gray-700 text-white",
          )}
        >
          {t("spanish")}
        </button>
      </div>
      <p className="p-2 text-center">
        {t("an-empty-page-to-make-use-of-a-chatbubble-component")}
      </p>

      <p className="p-2 text-center">
        {t("click-below-to-try-different-variations")}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-10 p-2 ">
        {routes?.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className={cn(
              "rounded-full bg-red-100 p-2",
              currentPath === route.path && "bg-gray-700 text-white",
            )}
          >
            {t(route.label)}
          </Link>
        ))}
      </div>

      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
