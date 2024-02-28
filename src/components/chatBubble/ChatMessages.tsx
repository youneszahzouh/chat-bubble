import { faker } from "@faker-js/faker";
import { PopoverClose } from "@radix-ui/react-popover";
import { ArrowLeft, Minus } from "iconsax-react";
import { useCallback, useContext, useState } from "react";
import {} from "../../App";
import ChatWindow from "./ChatWindow";
import { MessagingInputs } from "./MessagingInputs";
import { IImageMessage, ITextMessage, getOneDiscussion } from "./mockData";
import { ChatBubbleContext } from "./ChatBubble";
import { cn } from "../../utils/cn";
import { Avatar } from "./Avatar";
import i18n from "../../locales/i18n";

const ChatMessages = () => {
  const context = useContext(ChatBubbleContext);

  const discussion = getOneDiscussion(context?.selectedDiscussion?.user);
  const [messages, setMessages] = useState(discussion.messages);

  const onSendMessage = useCallback(
    (messagesToSend: Array<IImageMessage | ITextMessage>) => {
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
    [messages]
  );

  return (
    <>
      <ChatMessagesHeader accentColor={discussion.meta.accentColor} />
      <ChatWindow messages={messages} />

      <MessagingInputs
        onSendMessage={onSendMessage}
        accentColor={discussion.meta.accentColor}
      />
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
        "p-2 h-[50px] flex gap-2 items-center justify-between bg-gray-700 text-white  backdrop-invert",
        "drop-shadow-[black]"
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

      <div className="flex gap-1 justify-start flex-1 items-center">
        {context?.selectedDiscussion?.user.avatarUrl && (
          <Avatar url={context.selectedDiscussion.user.avatarUrl} />
        )}
        {context?.selectedDiscussion?.user.name}
      </div>

      <PopoverClose asChild>
        <button>
          <Minus size="24" color="#FFF" />
        </button>
      </PopoverClose>
    </header>
  );
}
