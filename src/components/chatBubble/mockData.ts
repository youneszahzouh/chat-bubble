export type TMessageContentType = "TEXT" | "IMAGE" | "VOICE";

export interface IMessage {
  user: {
    name: string;
    avatarUrl: string;
    isMe: boolean;
  };
  message: {
    contentType: TMessageContentType;
    content: string;
  };
  createdAt: string;
}

export const localMessages: Array<IMessage> = [
  {
    user: {
      name: "Younes",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Younes",
      isMe: false,
    },
    message: {
      contentType: "TEXT",
      content: "Test message",
    },
    createdAt: new Date().toISOString(),
  },

  {
    user: {
      name: "Younes",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Younes",
      isMe: false,
    },
    message: {
      contentType: "TEXT",
      content: "can we have a meet ?",
    },
    createdAt: new Date().toISOString(),
  },
];

export const defaultMessage: IMessage = {
  user: {
    name: "Zahzouh",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Zahzouh",
    isMe: true,
  },
  message: {
    contentType: "TEXT",
    content: "",
  },
  createdAt: new Date().toISOString(),
};
