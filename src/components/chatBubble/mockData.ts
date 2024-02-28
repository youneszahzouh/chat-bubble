export type TMessageContentType = "TEXT" | "IMAGE" | "VOICE";

export interface IUser {
  name: string;
  avatarUrl: string;
  isMe: boolean;
}
export interface IMessage {
  user: IUser;
  message: ITextMessage | IImageMessage;
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
    createdAt: new Date("2024-02-26 00:22").toISOString(),
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
  {
    user: {
      name: "Younes",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Younes",
      isMe: true,
    },
    message: {
      contentType: "IMAGE",
      files: [
        "https://projects.seattletimes.com/2022/local/photos-of-the-year-2022/assets/POY2022/1POY.webp",
        "https://www.planetware.com/wpimages/2019/11/canada-in-pictures-beautiful-places-to-photograph-morraine-lake.jpg",
        "https://www.planetware.com/wpimages/2019/11/canada-in-pictures-beautiful-places-to-photograph-morraine-lake.jpg",
        "https://www.planetware.com/wpimages/2019/11/canada-in-pictures-beautiful-places-to-photograph-morraine-lake.jpg",
        "https://www.planetware.com/wpimages/2019/11/canada-in-pictures-beautiful-places-to-photograph-morraine-lake.jpg",
      ],
    },
    createdAt: new Date().toISOString(),
  },
  {
    user: {
      name: "Younes",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Younes",
      isMe: true,
    },
    message: {
      contentType: "IMAGE",
      files: [
        "https://projects.seattletimes.com/2022/local/photos-of-the-year-2022/assets/POY2022/1POY.webp",
        "https://www.planetware.com/wpimages/2019/11/canada-in-pictures-beautiful-places-to-photograph-morraine-lake.jpg",
        "https://www.planetware.com/wpimages/2019/11/canada-in-pictures-beautiful-places-to-photograph-morraine-lake.jpg",
        "https://www.planetware.com/wpimages/2019/11/canada-in-pictures-beautiful-places-to-photograph-morraine-lake.jpg",
        "https://www.planetware.com/wpimages/2019/11/canada-in-pictures-beautiful-places-to-photograph-morraine-lake.jpg",
      ],
    },
    createdAt: new Date().toISOString(),
  },
  {
    user: {
      name: "Younes",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Younes",
      isMe: true,
    },
    message: {
      contentType: "IMAGE",
      files: [
        "https://projects.seattletimes.com/2022/local/photos-of-the-year-2022/assets/POY2022/1POY.webp",
      ],
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

export const localDiscussions = [
  {
    id: 1,
    user: {
      name: "Younes",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Younes",
    },
    latestMessage: {
      message: {
        contentType: "TEXT",
        content: "Hey Younes",
      },
      createdAt: new Date().toISOString(),
    },
  },

  {
    id: 2,
    user: {
      name: "Zahzouh",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Younes",
    },
    latestMessage: {
      message: {
        contentType: "TEXT",
        content: "Hey Younes",
      },
      createdAt: new Date().toISOString(),
    },
  },
  {
    id: 3,
    user: {
      name: "Zakaria",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Younes",
    },
    latestMessage: {
      message: {
        contentType: "TEXT",
        content: "Hey Younes",
      },
      createdAt: new Date().toISOString(),
    },
  },

  {
    id: 4,
    user: {
      name: "Yehya",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Younes",
    },
    latestMessage: {
      message: {
        contentType: "TEXT",
        content: "Hey Younes",
      },
      createdAt: new Date().toISOString(),
    },
  },
];
