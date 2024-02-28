import { MessageText1 } from "iconsax-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/Popover/Popover";
import ChatMessages from "./components/chatBubble/ChatMessages";
import ChatDiscussions from "./components/chatBubble/Discussions";
import { createContext, useState } from "react";

export interface IChatBubbleContext {
  selectedDiscussion: number | null;
  setSelectedDiscussion: React.Dispatch<React.SetStateAction<number | null>>;
}

export const ChatBubbleContext = createContext<IChatBubbleContext | null>(null);

function App() {
  const [selectedDiscussion, setSelectedDiscussion] = useState<number | null>(
    null
  );
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <Popover modal>
          <PopoverTrigger className="absolute flex  bg-gray-600 transition  rounded-full items-center justify-center p-2 bottom-10 end-10 h-10 w-10">
            <MessageText1 variant="Bold" color="#FFF" />
          </PopoverTrigger>
          <PopoverContent
            align="end"
            side="top"
            className="w-[400px] overflow-hidden max-h-[min(80vh,800px)] p-0 bg-gray-800 rounded-lg border-gray-200"
          >
            <ChatBubbleContext.Provider
              value={{
                selectedDiscussion,
                setSelectedDiscussion,
              }}
            >
              {selectedDiscussion ? <ChatMessages /> : <ChatDiscussions />}
            </ChatBubbleContext.Provider>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export default App;
