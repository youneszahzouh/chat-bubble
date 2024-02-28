import ChatBubble, {
  ChatBubbleContent,
  ChatBubbleTrigger,
} from "./components/chatBubble/ChatBubble";
import { getAllDiscussions } from "./components/chatBubble/mockData";

function App() {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <ChatBubble data={getAllDiscussions()} messageTypes={[]}>
          <ChatBubbleTrigger className="bg-red-500" />
          <ChatBubbleContent />
        </ChatBubble>
      </div>
    </>
  );
}

export default App;
