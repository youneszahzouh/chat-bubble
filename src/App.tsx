import { MessageText1 } from "iconsax-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/Popover/Popover";
import ChatMessages from "./components/chatBubble/ChatMessages";

function App() {
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
            <ChatMessages />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export default App;
