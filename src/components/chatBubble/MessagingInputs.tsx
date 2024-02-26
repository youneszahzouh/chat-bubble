import { KeyboardEvent, useCallback, useState } from "react";
import { IMessage, defaultMessage } from "./mockData";
import { cn } from "../../utils/cn";
import { GalleryExport, Microphone, Send } from "iconsax-react";

export const MessagingInputs = ({
  onSendMessage,
}: {
  onSendMessage: (message: IMessage) => void;
}) => {
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

  const onTextAreaKeyUp = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>): void => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();

        handleSendMessage(message);
      }
    },
    [handleSendMessage, message]
  );

  const onMessageChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage({
        ...message,
        message: { ...message.message, content: e.target.value },
      });
    },
    [message]
  );

  return (
    <div className="flex gap-1">
      <div className="flex gap-2">
        <Microphone size="32" variant="Bold" color="#ED3C3A" />
        <GalleryExport size="32" variant="Bold" color="#ED3C3A" />
      </div>

      <textarea
        className={cn(
          "resize-none rounded-full max-h-16 h-auto flex-wrap flex w-full  bg-gray-700 text-white px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-none focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50"
        )}
        rows={message.message.content.split("\n").length || 1}
        value={message.message.content}
        onChange={onMessageChange}
        onKeyUp={onTextAreaKeyUp}
      />
      <button onClick={() => handleSendMessage(message)}>
        <Send size="32" variant="Bold" color="#ED3C3A" />
      </button>
    </div>
  );
};
