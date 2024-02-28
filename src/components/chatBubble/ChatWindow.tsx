import { MessageItem } from "./MessageItem";
import { IMessage } from "./mockData";

const ChatWindow = ({ messages }: { messages: IMessage[] }) => {
  return (
    <div className="flex flex-col gap-2 overflow-auto flex-1 p-4">
      {messages?.map((message, index) => (
        <MessageItem key={index} data={message} />
      ))}
    </div>
  );
};

export default ChatWindow;
