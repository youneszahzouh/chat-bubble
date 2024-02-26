import { cn } from "../../utils/cn";
import { IMessage } from "./mockData";
import { Avatar } from "./Avatar";

export const MessageItem = ({ data }: { data: IMessage; }) => {
    return (
        <div
            className={cn(
                "flex items-start gap-1",
                data.user.isMe && "flex-row-reverse"
            )}
        >
            <Avatar url={data?.user?.avatarUrl} />
            <p
                className={cn(
                    "bg-blue-500 px-2 py-1 rounded-full  text-white",
                    data.user.isMe && "bg-gray-500"
                )}
            >
                {data.message.content}
            </p>
        </div>
    );
};
