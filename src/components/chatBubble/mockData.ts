import { faker } from "@faker-js/faker";

export type TMessageContentType = "TEXT" | "IMAGE" | "VOICE";

const MessageContentType = {
  TEXT: "TEXT",
  IMAGE: "IMAGE",
  // VOICE = "VOICE",
} as const;

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

function shuffle(array: number[]) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function generateUniqueIntegers(
  min: number,
  max: number,
  count: number
): number[] {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  const shuffledNumbers = shuffle(numbers);
  return shuffledNumbers.slice(0, count);
}

export const getAllDiscussions = () => {
  const dataLength = 10;

  const uniqueIntegers = generateUniqueIntegers(1, dataLength, dataLength);

  return Array(dataLength)
    .fill(1)
    .map((_item, index) => {
      const name = faker.person.fullName();
      return {
        id: uniqueIntegers[index],
        user: {
          name,
          avatarUrl: faker.image.avatar(),
          isMe: false,
        },
        latestMessage: {
          message: {
            contentType: faker.helpers.enumValue(MessageContentType),
            content: faker.word.preposition(),
          },
          createdAt: faker.date.recent(),
        },
      };
    });
};

export const getOneDiscussion = (user?: IUser): Array<IMessage> => {
  const dataLength = 20;

  const uniqueIntegers = generateUniqueIntegers(1, dataLength, dataLength);

  const name = user?.name ?? faker.person.fullName();
  const avatar = user?.avatarUrl ?? faker.image.avatar();

  const data = Array(dataLength)
    .fill(1)
    .map((_item, index) => {
      const contentType = faker.helpers.enumValue(
        MessageContentType
      ) as TMessageContentType;
      return {
        id: uniqueIntegers[index],
        user: {
          name,
          avatarUrl: avatar,
          isMe: index === 0 ? false : faker.datatype.boolean(),
        },
        message:
          contentType === "TEXT"
            ? ({
                contentType,
                content: faker.lorem.sentence(),
              } as ITextMessage)
            : ({
                contentType: "IMAGE",
                files: [
                  ...Array(2)
                    .fill(1)
                    .map(() => faker.image.urlLoremFlickr()),
                ],
              } as IImageMessage),
        createdAt: faker.date.recent().toISOString(),
      };
    });

  return data;
};

export interface IDiscussion {
  id: number;
  user: {
    name: string;
    avatarUrl: string;
    isMe: boolean;
  };
  latestMessage: {
    message: {
      contentType: TMessageContentType;
      content: string;
    };
    createdAt: Date;
  };
}
