import { MessageText1 } from "iconsax-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/Popover/Popover";
import ChatMessages from "./components/chatBubble/ChatMessages";
import ChatDiscussions from "./components/chatBubble/Discussions";
import { createContext, useState } from "react";
import {
  IDiscussion,
  getAllDiscussions,
} from "./components/chatBubble/mockData";

export interface IChatBubbleContext {
  discussions: IDiscussion[];
  setDiscussions: React.Dispatch<React.SetStateAction<IDiscussion[]>>;
  selectedDiscussion: IDiscussion | null;
  setSelectedDiscussion: React.Dispatch<
    React.SetStateAction<IDiscussion | null>
  >;
}

export const ChatBubbleContext = createContext<IChatBubbleContext | null>(null);

function App() {
  const [discussions, setDiscussions] = useState<IDiscussion[]>(
    getAllDiscussions()
  );
  const [selectedDiscussion, setSelectedDiscussion] =
    useState<IDiscussion | null>(null);
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
            className="w-[400px] flex flex-col h-[calc(100vh-100px)] p-0 bg-gray-800 rounded-lg border-gray-200"
          >
            <ChatBubbleContext.Provider
              value={{
                selectedDiscussion,
                setSelectedDiscussion,
                discussions,
                setDiscussions,
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
