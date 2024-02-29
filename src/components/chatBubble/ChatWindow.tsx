import { MessageItem } from "./MessageItem";
import { IMessage } from "./mockData";

const ChatWindow = ({ messages }: { messages: IMessage[] }) => {
  return (
    <div className="flex flex-col gap-4 overflow-auto flex-1 p-4">
      {messages?.map((message) => (
        <MessageItem key={message.id} data={message} />
      ))}
    </div>
  );
};

export default ChatWindow;
