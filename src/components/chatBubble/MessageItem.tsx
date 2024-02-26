import { cn } from "../../utils/cn";
import { IMessage } from "./mockData";
import { Avatar } from "./Avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../toolTip/ToolTip";
import { getRelativeTime } from "../../utils/getRelativeTime";

export const MessageItem = ({ data }: { data: IMessage }) => {
  return (
    <div
      className={cn(
        "flex items-start gap-1",
        data.user.isMe && "flex-row-reverse"
      )}
    >
      <Avatar url={data?.user?.avatarUrl} />

      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <p
              className={cn(
                "bg-blue-500 px-2 py-1 rounded-xl  text-white",
                data.user.isMe && "bg-gray-500"
              )}
            >
              {data.message.content}
            </p>
          </TooltipTrigger>
          <TooltipContent
            side="left"
            sideOffset={0}
            className="bg-gray-100/80 rounded p-1 m-1 capitalize"
          >
            {getRelativeTime(new Date(data.createdAt))}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
