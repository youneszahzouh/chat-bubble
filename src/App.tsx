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
    label: "Default ChatBubble",
  },
  {
    path: "/chat-bubble-with-custom-type-video",
    element: <CustomChatBubble />,
    label: "Chat Bubble With Custom Type VIDEO",
  },
  {
    path: "/chat-bubble-with-custom-styles",
    element: <CustomChatBubbleStyles />,
    label: "Chat Bubble With Custom Styles",
  },
];

function App() {
  const { t } = useTranslation();
  document.body.dir = i18n.dir();

  const currentPath = useLocation().pathname;

  return (
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

      <p>Click below to try different variations</p>

      <div className="flex gap-10">
        {routes?.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className={cn(
              "rounded-full bg-red-100 p-2",
              currentPath === route.path && "bg-gray-700 text-white",
            )}
          >
            {route.label}
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
