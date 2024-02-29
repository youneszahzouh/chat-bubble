export interface IUser {
  name: string;
  avatarUrl: string;
  isMe: boolean;
}
export interface IMessage {
  id: number;

  user: IUser;
  message: ITextMessage | IImageMessage | IVoiceMessage;
  createdAt: string;
}

export interface ITextMessage {
  contentType: "TEXT";
  content: string;
}

export interface IImageMessage {
  contentType: "IMAGE";
  files: string[];
}

export interface IVoiceMessage {
  contentType: "VOICE";
  file: string;
}

export interface IChatBubbleContext {
  discussions: IDiscussion[];
  setDiscussions: React.Dispatch<React.SetStateAction<IDiscussion[]>>;
  selectedDiscussion: IDiscussion | null;
  setSelectedDiscussion: React.Dispatch<
    React.SetStateAction<IDiscussion | null>
  >;

  messageTypes?: ITypeOfMessage[];
  popoverOpen: boolean;
}

export interface IOneDiscussion {
  meta: IDiscussionMeta;
  messages: Array<IMessage>;
}

export interface IDiscussionMeta {
  accentColor: string;
  title: string;
  avatarUrl: string;
}

export interface IDiscussion {
  id: number;
  meta: IDiscussionMeta;
  latestMessage: {
    message: {
      contentType: TMessageContentType;
      content: string;
    };
    createdAt: Date;
  };
}

export interface ITypeOfMessage {
  type: string;
  component: (props: { data: IDataMessage; isMe: boolean }) => JSX.Element;
}

export type IDataMessage =
  | (ITextMessage & { files?: never })
  | (IImageMessage & { content?: never })
  | (IVoiceMessage & { content?: never; files?: never });

export type TMessageContentType = "TEXT" | "IMAGE" | "VOICE";
