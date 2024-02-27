import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/Popover/Popover";
import ChatBubble from "./components/chatBubble/ChatBubble";

function App() {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <Popover>
          <PopoverTrigger className="absolute bottom-10 end-10 bg-red-500 rounded-full w-20 h-20">
            Chat
          </PopoverTrigger>
          <PopoverContent
            align="end"
            side="top"
            className="w-[400px] overflow-hidden max-h-[min(80vh,800px)] p-0 bg-gray-800 rounded-lg border-gray-200"
          >
            <ChatBubble />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export default App;
