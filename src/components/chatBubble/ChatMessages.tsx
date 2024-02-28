import { useCallback, useContext, useState } from "react";
import ChatWindow from "./ChatWindow";
import { MessagingInputs } from "./MessagingInputs";
import { IImageMessage, ITextMessage, localMessages } from "./mockData";
import { ArrowLeft } from "iconsax-react";
import { ChatBubbleContext } from "../../App";

const ChatMessages = () => {
  const context = useContext(ChatBubbleContext);

  const [messages, setMessages] = useState(localMessages);

  const onSendMessage = useCallback(
    (messagesToSend: Array<IImageMessage | ITextMessage>) => {
      messagesToSend;
      setMessages([
        ...messages,
        ...messagesToSend.map((message) => ({
          user: {
            name: "Zahzouh",
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
      <header className="p-2 h-[50px] flex gap-2 items-center bg-gray-700  text-white ">
        <button
          onClick={() => {
            if (context) {
              context.setSelectedDiscussion(null);
            }
          }}
        >
          <ArrowLeft color="white" />
        </button>
        Messages
      </header>
      <ChatWindow messages={messages} />

      <MessagingInputs onSendMessage={onSendMessage} />
    </>
  );
};

export default ChatMessages;
