import { faker } from "@faker-js/faker";
import { PopoverClose } from "@radix-ui/react-popover";
import { ArrowLeft, Minus } from "iconsax-react";
import { useCallback, useContext, useState } from "react";
import {} from "../../App";
import ChatWindow from "./ChatWindow";
import { MessagingInputs } from "./MessagingInputs";
import { IImageMessage, ITextMessage, IVoiceMessage } from "./types";

import { ChatBubbleContext } from "./ChatBubble";
import { cn } from "../../utils/cn";
import { Avatar } from "./Avatar";
import i18n from "../../locales/i18n";
import { getOneDiscussion } from "./mockData";

const ChatMessages = () => {
  const context = useContext(ChatBubbleContext);

  const discussion = getOneDiscussion(context?.selectedDiscussion?.meta);
  const [messages, setMessages] = useState(discussion.messages);

  const onSendMessage = useCallback(
    (messagesToSend: Array<IImageMessage | ITextMessage | IVoiceMessage>) => {
      messagesToSend;
      setMessages([
        ...messages,
        ...messagesToSend.map((message) => ({
          id: faker.number.int({ max: 10000 }),
          user: {
            name: "ME",
            avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Zahzouh",
            isMe: true,
          },
          message,
          createdAt: new Date().toISOString(),
        })),
      ]);
    },
    [messages],
  );

  return (
    <>
      <ChatMessagesHeader
        accentColor={
          context?.selectedDiscussion?.meta.accentColor ??
          discussion.meta.accentColor
        }
      />
      <ChatWindow messages={messages} />

      <MessagingInputs onSendMessage={onSendMessage} />
    </>
  );
};

export default ChatMessages;

function ChatMessagesHeader({ accentColor }: { accentColor: string }) {
  const context = useContext(ChatBubbleContext);

  const layoutDirection = i18n.dir();
  return (
    <header
      className={cn(
        "flex h-[50px] items-center justify-between gap-2 bg-gray-700 p-2 text-white  backdrop-invert",
        "drop-shadow-[black]",
      )}
      style={{
        backgroundColor: accentColor,
      }}
    >
      <button
        onClick={() => {
          if (context) {
            context.setSelectedDiscussion(null);
          }
        }}
        className={cn(layoutDirection === "rtl" && "-scale-x-100")}
      >
        <ArrowLeft color="white" />
      </button>

      <div className="flex flex-1 items-center justify-start gap-1">
        {context?.selectedDiscussion?.meta.avatarUrl && (
          <Avatar url={context.selectedDiscussion.meta.avatarUrl} />
        )}
        {context?.selectedDiscussion?.meta.title}
      </div>

      <PopoverClose asChild>
        <button>
          <Minus size="24" color="#FFF" />
        </button>
      </PopoverClose>
    </header>
  );
}
