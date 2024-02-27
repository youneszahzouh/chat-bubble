import { useCallback, useState } from "react";
import ChatWindow from "./ChatWindow";
import { MessagingInputs } from "./MessagingInputs";
import { IImageMessage, ITextMessage, localMessages } from "./mockData";

const ChatBubble = () => {
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
      <header className="p-2 h-[60px] flex items-center border-b-gray-200 border-b text-white ">
        younes
      </header>
      <ChatWindow messages={messages} />

      <MessagingInputs onSendMessage={onSendMessage} />
    </>
  );
};

export default ChatBubble;
