import { KeyboardEvent, useCallback, useState } from "react";
import { MessageItem } from "./MessageItem";
import { IMessage, defaultMessage, localMessages } from "./mockData";
import { cn } from "../../utils/cn";
import { GalleryExport, Microphone, Send } from "iconsax-react";

const ChatWindow = () => {
  const [messages, setMessages] = useState(localMessages);

  const onSendMessage = (message: IMessage) => {
    setMessages([...messages, message]);
  };
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

export const MessagingInputs = ({ onSendMessage }) => {
  const [message, setMessage] = useState<IMessage>(defaultMessage);

  const handleSendMessage = useCallback(
    (message: IMessage) => {
      onSendMessage(message);
      setMessage({
        ...message,
        message: { ...message.message, content: "" },
      });
    },
    [onSendMessage]
  );

  const onKeyUp = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>): void => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();

        handleSendMessage(message);
      }
    },
    [handleSendMessage, message]
  );

  return (
    <div className="flex gap-1">
      <div className="flex gap-2">
        <Microphone size="32" variant="Bold" color="#ED3C3A" />
        <GalleryExport size="32" variant="Bold" color="#ED3C3A" />
      </div>

      <textarea
        className={cn(
          "resize-none rounded-full max-h-16  flex w-full  bg-gray-700 text-white px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-none focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50"
        )}
        rows={message.message.content.split("\n").length || 1}
        value={message.message.content}
        onChange={(e) => {
          setMessage({
            ...message,
            message: { ...message.message, content: e.target.value },
          });
        }}
        onKeyUp={onKeyUp}
      />
      <button onClick={() => handleSendMessage(message)}>
        <Send size="32" variant="Bold" color="#ED3C3A" />
      </button>
    </div>
  );
};

export default ChatWindow;
