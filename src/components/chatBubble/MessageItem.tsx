import { cn } from "../../utils/cn";
import {
  IImageMessage,
  IMessage,
  ITextMessage,
  IVoiceMessage,
} from "./mockData";
import { Avatar } from "./Avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../toolTip/ToolTip";
import { getRelativeTime } from "../../utils/getRelativeTime";
import { useContext, useEffect, useRef } from "react";
import { ChatBubbleContext } from "./ChatBubble";
import i18n from "../../locales/i18n";
import { useTranslation } from "react-i18next";
import { DisplayAudio } from "./MessagingInputs";

export const MessageItem = ({ data }: { data: IMessage }) => {
  const { t } = useTranslation();

  const context = useContext(ChatBubbleContext);

  const CustomMessageComponent = context?.messageTypes?.find(
    (item) => item.type === data.message.contentType,
  )?.component;

  const lastItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastItemRef.current) lastItemRef.current.scrollIntoView();
  }, []);

  return (
    <div
      className={cn(
        "flex items-start gap-1",
        data.user.isMe && "flex-row-reverse",
      )}
      ref={lastItemRef}
    >
      {data.user.isMe ? null : <Avatar url={data?.user?.avatarUrl} />}

      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div>
              {data.message.contentType === "TEXT" ? (
                CustomMessageComponent ? (
                  <CustomMessageComponent
                    data={data.message}
                    isMe={data.user.isMe}
                  />
                ) : (
                  <TextMessageItem data={data.message} isMe={data.user.isMe} />
                )
              ) : data.message.contentType === "IMAGE" ? (
                CustomMessageComponent ? (
                  <CustomMessageComponent
                    data={data.message}
                    isMe={data.user.isMe}
                  />
                ) : (
                  <ImageMessageItem data={data.message} isMe={data.user.isMe} />
                )
              ) : data.message.contentType === "VOICE" ? (
                CustomMessageComponent ? (
                  <CustomMessageComponent
                    data={data.message}
                    isMe={data.user.isMe}
                  />
                ) : (
                  <VoiceMessageItem data={data.message} isMe={data.user.isMe} />
                )
              ) : (
                t("type-is-not-supported")
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="left"
            sideOffset={0}
            className="m-1 rounded bg-gray-100/80 p-1 capitalize"
          >
            {getRelativeTime(new Date(data.createdAt), i18n.language)}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

function TextMessageItem(props: { data: ITextMessage; isMe: boolean }) {
  const context = useContext(ChatBubbleContext);

  return (
    <p
      className={cn(
        "rounded-xl bg-blue-500 px-2 py-1 text-white",
        context?.selectedDiscussion?.meta.accentColor &&
          "bg-[var(--accentColor)]",
        props.isMe && "bg-gray-500",
      )}
      style={
        {
          "--accentColor": context?.selectedDiscussion?.meta.accentColor,
        } as React.CSSProperties
      }
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
        "col-span-full grid grid-cols-2 gap-1 ",
        files?.length < 2 && `grid-cols-${files?.length}`,
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

function VoiceMessageItem(props: { data: IVoiceMessage; isMe: boolean }) {
  const file = props.data.file;
  const context = useContext(ChatBubbleContext);

  return (
    <DisplayAudio
      audioUrl={file}
      accentColor={context?.selectedDiscussion?.meta.accentColor}
    />
  );
}
