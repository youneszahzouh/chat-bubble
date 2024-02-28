import { faker } from "@faker-js/faker";

export type TMessageContentType = "TEXT" | "IMAGE" | "VOICE";

const MessageContentType = {
  TEXT: "TEXT",
  IMAGE: "IMAGE",
  // VOICE = "VOICE",
} as const;

const ACCENT_COLORS = ["#F4538A", "#D04848 ", "#59D5E0", "#FAA300", "#525CEB"];
export interface IUser {
  name: string;
  avatarUrl: string;
  isMe: boolean;
}
export interface IMessage {
  id: number;

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

export const defaultMessage: IMessage = {
  id: faker.number.int({ max: 10000 }),
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

export const getOneDiscussion = (user?: IUser): IOneDiscussion => {
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
                id: uniqueIntegers[index],
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

  return {
    meta: {
      accentColor: faker.helpers?.arrayElement(ACCENT_COLORS),
      title: name,
      avatarUrl: avatar,
    },
    messages: data,
  };
};

export interface IOneDiscussion {
  meta: {
    accentColor: string;
    title: string;
    avatarUrl: string;
  };
  messages: Array<IMessage>;
}

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
