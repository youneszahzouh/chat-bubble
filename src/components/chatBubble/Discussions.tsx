import { useContext } from "react";
import { cn } from "../../utils/cn";
import { getRelativeTime } from "../../utils/getRelativeTime";
import { Avatar } from "./Avatar";
import { PopoverClose } from "@radix-ui/react-popover";
import { Minus } from "iconsax-react";
import { ChatBubbleContext } from "./ChatBubble";
import i18n from "../../locales/i18n";
import { useTranslation } from "react-i18next";

const ChatDiscussions = () => {
  const context = useContext(ChatBubbleContext);

  const { t } = useTranslation();

  return (
    <>
      <header className="flex h-[50px] items-center justify-between bg-gray-700 p-2  text-white ">
        <span className="flex-1 text-center">{t("conversations")}</span>
        <PopoverClose asChild>
          <button>
            <Minus size="24" color="#FFF" />
          </button>
        </PopoverClose>
      </header>

      <div className="flex flex-1 flex-col overflow-auto">
        {context?.discussions?.map((discussion, index) => (
          <button
            key={index}
            className={cn(
              "flex w-full cursor-pointer gap-4 border-b  border-b-gray-600 p-4 text-white hover:bg-gray-600",
            )}
            onClick={() => {
              if (context) {
                context.setSelectedDiscussion(discussion);
              }
            }}
          >
            <Avatar url={discussion.meta.avatarUrl} />
            <div className="flex w-full flex-col items-start">
              <span>{discussion.meta.title}</span>
              <div className="flex w-full justify-between gap-2 text-gray-400">
                <p className="w-full flex-1  text-start">
                  {discussion.latestMessage?.message.content}
                </p>
                <span>
                  {getRelativeTime(
                    new Date(discussion.latestMessage.createdAt),
                    i18n.language,
                  )}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default ChatDiscussions;
