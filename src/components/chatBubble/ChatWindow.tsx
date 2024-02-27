import { useCallback, useState } from "react";
import { MessageItem } from "./MessageItem";
import { IImageMessage, ITextMessage, localMessages } from "./mockData";
import { MessagingInputs } from "./MessagingInputs";

const ChatWindow = () => {
  const [messages, setMessages] = useState(localMessages);

  const onSendMessage = useCallback(
    (message: IImageMessage | ITextMessage) => {
      setMessages([
        ...messages,
        {
          user: {
            name: "Zahzouh",
            avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Zahzouh",
            isMe: true,
          },
          message,
          createdAt: new Date().toISOString(),
        },
      ]);
    },
    [messages]
  );

  return (
    <div className="flex flex-col  gap-4 w-full bg-gray-800 rounded-lg p-4 border-gray-200">
      <div className="flex flex-col gap-2">
        {messages?.map((message, index) => (
          <MessageItem key={index} data={message} />
        ))}
      </div>

      <MessagingInputs onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatWindow;
