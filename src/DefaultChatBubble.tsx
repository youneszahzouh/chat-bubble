import ChatBubble from "./components/chatBubble/ChatBubble";
import { getAllDiscussions } from "./components/chatBubble/mockData";

const DefaultChatBubble = () => {
  return (
    <>
      <ChatBubble data={getAllDiscussions()} />
    </>
  );
};

export default DefaultChatBubble;
