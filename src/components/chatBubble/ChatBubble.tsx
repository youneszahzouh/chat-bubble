import { MessageText1 } from "iconsax-react";
import { ReactNode, createContext, useContext, useState } from "react";
import { cn } from "../../utils/cn";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover";
import ChatMessages from "./ChatMessages";
import ChatDiscussions from "./Discussions";
import {
  IDiscussion,
  IImageMessage,
  ITextMessage,
  getAllDiscussions,
} from "./mockData";

export interface IChatBubbleContext {
  discussions: IDiscussion[];
  setDiscussions: React.Dispatch<React.SetStateAction<IDiscussion[]>>;
  selectedDiscussion: IDiscussion | null;
  setSelectedDiscussion: React.Dispatch<
    React.SetStateAction<IDiscussion | null>
  >;

  messageTypes?: ITypeOfMessage[];
}

type IDataMessage =
  | (ITextMessage & { files?: never })
  | (IImageMessage & { content?: never });

interface ITypeOfMessage {
  type: string;
  component: (props: { data: IDataMessage; isMe: boolean }) => JSX.Element;
}

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
    data ?? getAllDiscussions()
  );

  const [selectedDiscussion, setSelectedDiscussion] =
    useState<IDiscussion | null>(null);
  return (
    <Popover modal>
      <ChatBubbleContext.Provider
        value={{
          selectedDiscussion,
          setSelectedDiscussion,
          discussions,
          setDiscussions,
          messageTypes,
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
  return (
    <PopoverTrigger
      className={cn(
        "absolute flex  bg-gray-600 transition  rounded-full items-center justify-center p-2 bottom-10 end-10 h-10 w-10",
        className
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
      className={cn(
        "w-[400px] flex flex-col h-[calc(100vh-100px)] p-0 bg-gray-800 rounded-lg border-gray-200",
        className
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
