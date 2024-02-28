import { ArrowLeft } from "iconsax-react";
import { useCallback, useContext, useState } from "react";
import { ChatBubbleContext } from "../../App";
import ChatWindow from "./ChatWindow";
import { MessagingInputs } from "./MessagingInputs";
import { IImageMessage, ITextMessage, getOneDiscussion } from "./mockData";

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
        {context?.selectedDiscussion?.user.name}
      </header>
      <ChatWindow messages={messages} />

      <MessagingInputs onSendMessage={onSendMessage} />
    </>
  );
};

export default ChatMessages;
