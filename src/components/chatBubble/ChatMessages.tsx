import { faker } from "@faker-js/faker";
import { PopoverClose } from "@radix-ui/react-popover";
import { ArrowLeft, Minus } from "iconsax-react";
import { useCallback, useContext, useState } from "react";
import {} from "../../App";
import ChatWindow from "./ChatWindow";
import { MessagingInputs } from "./MessagingInputs";
import { IImageMessage, ITextMessage, getOneDiscussion } from "./mockData";
import { ChatBubbleContext } from "./ChatBubble";

const ChatMessages = () => {
  const context = useContext(ChatBubbleContext);

  const [messages, setMessages] = useState(
    getOneDiscussion(context?.selectedDiscussion?.user)
  );

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
      <ChatMessagesHeader />
      <ChatWindow messages={messages} />

      <MessagingInputs onSendMessage={onSendMessage} />
    </>
  );
};

export default ChatMessages;

function ChatMessagesHeader() {
  const context = useContext(ChatBubbleContext);

  return (
    <header className="p-2 h-[50px] flex gap-2 items-center justify-between bg-gray-700  text-white ">
      <button
        onClick={() => {
          if (context) {
            context.setSelectedDiscussion(null);
          }
        }}
      >
        <ArrowLeft color="white" />
      </button>

      {context?.selectedDiscussion?.user.name}

      <PopoverClose asChild>
        <button>
          <Minus size="24" color="#FFF" />
        </button>
      </PopoverClose>
    </header>
  );
}
