import { useContext } from "react";
import { cn } from "../../utils/cn";
import { getRelativeTime } from "../../utils/getRelativeTime";
import { Avatar } from "./Avatar";
import { PopoverClose } from "@radix-ui/react-popover";
import { Minus } from "iconsax-react";
import { ChatBubbleContext } from "./ChatBubble";

const ChatDiscussions = () => {
  const context = useContext(ChatBubbleContext);
  return (
    <>
      <header className="p-2 h-[50px] flex justify-between items-center bg-gray-700  text-white ">
        <span className="text-center flex-1">Messages</span>
        <PopoverClose asChild>
          <button>
            <Minus size="24" color="#FFF" />
          </button>
        </PopoverClose>
      </header>

      <div className="flex flex-col overflow-auto flex-1">
        {context?.discussions?.map((discussion, index) => (
          <button
            key={index}
            className={cn(
              "flex w-full p-4 cursor-pointer hover:bg-gray-600  gap-4 border-b border-b-gray-600 text-white"
            )}
            onClick={() => {
              if (context) {
                context.setSelectedDiscussion(discussion);
              }
            }}
          >
            <Avatar url={discussion.user.avatarUrl} />
            <div className="flex flex-col items-start w-full">
              <span>{discussion.user.name}</span>
              <div className="flex gap-2 justify-between w-full text-gray-400">
                <p className="w-full flex-1  text-start">
                  {discussion.latestMessage?.message.content}
                </p>
                <span>
                  {getRelativeTime(
                    new Date(discussion.latestMessage.createdAt)
                  )}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default ChatDiscussions;
