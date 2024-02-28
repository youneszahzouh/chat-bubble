import { cn } from "../../utils/cn";
import { IImageMessage, IMessage, ITextMessage } from "./mockData";
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
      {data.user.isMe ? null : <Avatar url={data?.user?.avatarUrl} />}

      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div>
              {data.message.contentType === "TEXT" ? (
                <TextMessageItem data={data.message} isMe={data.user.isMe} />
              ) : data.message.contentType === "IMAGE" ? (
                <ImageMessageItem data={data.message} isMe={data.user.isMe} />
              ) : (
                "Type is not supported"
              )}
            </div>
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

function TextMessageItem(props: { data: ITextMessage; isMe: boolean }) {
  return (
    <p
      className={cn(
        "bg-blue-500 px-2 py-1 rounded-xl  text-white",
        props.isMe && "bg-gray-500"
      )}
    >
      {props?.data?.content}
    </p>
  );
}

function ImageMessageItem(props: { data: IImageMessage; isMe: boolean }) {
  const files = props.data.files;
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-1 col-span-full ",
        files?.length < 2 && `grid-cols-${files?.length}`
      )}
    >
      {files?.map((image, index) => (
        <img
          className="h-20 w-full min-w-28 rounded object-cover"
          src={image}
          alt="picture"
          key={index}
        />
      ))}
    </div>
  );
}
