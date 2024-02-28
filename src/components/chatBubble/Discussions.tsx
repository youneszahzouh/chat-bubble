import { useContext } from "react";
import { cn } from "../../utils/cn";
import { getRelativeTime } from "../../utils/getRelativeTime";
import { Avatar } from "./Avatar";
import { localDiscussions } from "./mockData";
import { ChatBubbleContext } from "../../App";

const ChatDiscussions = () => {
  const context = useContext(ChatBubbleContext);
  return (
    <>
      <header className="p-2 h-[50px] flex justify-center items-center bg-gray-700  text-white ">
        Messages
      </header>

      <div className="flex flex-col overflow-auto max-h-[60vh]">
        {localDiscussions?.map((discussion, index) => (
          <button
            key={index}
            className={cn(
              "flex w-full p-4 cursor-pointer hover:bg-gray-600  gap-4 border-b border-b-gray-600 text-white"
            )}
            onClick={() => {
              if (context) {
                context.setSelectedDiscussion(1);
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
