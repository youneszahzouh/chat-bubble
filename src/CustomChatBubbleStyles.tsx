import ChatBubble, {
  ChatBubbleContent,
  ChatBubbleTrigger,
} from "./components/chatBubble/ChatBubble";
import { getAllDiscussions } from "./components/chatBubble/mockData";

const CustomChatBubbleStyles = () => {
  return (
    <>
      <ChatBubble data={getAllDiscussions()}>
        <ChatBubbleTrigger className="bg-red-500" />
        <ChatBubbleContent className="bg-green-900" />
      </ChatBubble>
    </>
  );
};

export default CustomChatBubbleStyles;
