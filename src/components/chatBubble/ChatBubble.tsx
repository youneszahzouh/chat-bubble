import { MessageText1 } from "iconsax-react";
import { ReactNode, createContext, useContext, useState } from "react";
import { cn } from "../../utils/cn";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover";
import ChatMessages from "./ChatMessages";
import ChatDiscussions from "./Discussions";
import { getAllDiscussions } from "./mockData";
import { IChatBubbleContext, IDiscussion, ITypeOfMessage } from "./types";

export const ChatBubbleContext = createContext<IChatBubbleContext | null>(null);

function ChatBubble({
  children,
  data,
  messageTypes,
}: {
  children?: ReactNode;
  data: IDiscussion[];
  messageTypes?: ITypeOfMessage[];
}) {
  const [discussions, setDiscussions] = useState<IDiscussion[]>(
    data ?? getAllDiscussions(),
  );

  const [selectedDiscussion, setSelectedDiscussion] =
    useState<IDiscussion | null>(null);

  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <ChatBubbleContext.Provider
        value={{
          selectedDiscussion,
          setSelectedDiscussion,
          discussions,
          setDiscussions,
          messageTypes,
          popoverOpen,
        }}
      >
        {children ? (
          children
        ) : (
          <>
            <ChatBubbleTrigger />
            <ChatBubbleContent />
          </>
        )}
      </ChatBubbleContext.Provider>
    </Popover>
  );
}

export default ChatBubble;

export function ChatBubbleTrigger({
  children,
  className,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const context = useContext(ChatBubbleContext);

  return (
    <PopoverTrigger
      className={cn(
        "absolute bottom-10 end-10  hidden h-10  w-10 items-center justify-center rounded-full bg-gray-600 p-2 transition sm:block",
        !context?.popoverOpen && "block",
        className,
      )}
    >
      {children ? children : <MessageText1 variant="Bold" color="#FFF" />}
    </PopoverTrigger>
  );
}

export function ChatBubbleContent({
  children,
  className,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const context = useContext(ChatBubbleContext);

  return (
    <PopoverContent
      align="end"
      side="top"
      sideOffset={0}
      className={cn(
        "flex flex-col rounded-lg border-gray-200 bg-gray-800 p-0 sm:h-[calc(100dvh-100px)] sm:w-[400px]",
        "h-[100dvh] w-screen ",
        className,
      )}
    >
      {children ? (
        children
      ) : context?.selectedDiscussion ? (
        <ChatMessages />
      ) : (
        <ChatDiscussions />
      )}
    </PopoverContent>
  );
}
