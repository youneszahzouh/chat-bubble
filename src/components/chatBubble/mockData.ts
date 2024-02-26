export interface IMessage {
    user: {
      name: string;
      avatarUrl: string;
      isMe: boolean;
    };
    message: {
      contentType: "TEXT" | "IMAGE" | "VOICE";
      content: string;
    };
    createdAt: string;
  }
  

  
export const messages: Array<IMessage> = [
  {
    user: {
      name: "Younes",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Younes",
      isMe: false,
    },
    message: {
      contentType: "TEXT",
      content: "Hey Younes, How are you ?",
    },
    createdAt: new Date().toISOString(),
  },

  {
    user: {
      name: "Zahzouh",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Zahzouh",
      isMe: true,
    },
    message: {
      contentType: "TEXT",
      content: "Hey Younes, How are you ?",
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
      content: "Hey Younes, How are you ?",
    },
    createdAt: new Date().toISOString(),
  },
];
