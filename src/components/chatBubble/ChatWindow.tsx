import { MessageItem } from "./MessageItem";
import { messages } from "./mockData";

const ChatWindow = () => {
  return (
    <div className="flex flex-col w-full bg-slate-100 rounded-lg p-4 border-slate-200">
      <div className="flex flex-col gap-2">
        {messages?.map((message) => (
          <MessageItem data={message} />
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
