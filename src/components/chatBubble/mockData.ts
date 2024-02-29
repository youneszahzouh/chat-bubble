import { faker } from "@faker-js/faker";
import {
  IDiscussionMeta,
  IOneDiscussion,
  TMessageContentType,
  ITextMessage,
  IVoiceMessage,
  IImageMessage,
  IMessage,
} from "./types";

const MessageContentType = {
  TEXT: "TEXT",
  IMAGE: "IMAGE",
  VOICE: "VOICE",
} as const;

const ACCENT_COLORS = ["#F4538A", "#D04848 ", "#59D5E0", "#FAA300", "#525CEB"];

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
  count: number,
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
        meta: {
          title: name,
          avatarUrl: faker.image.avatar(),
          accentColor: faker.helpers.arrayElement(ACCENT_COLORS),
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

export const getOneDiscussion = (meta?: IDiscussionMeta): IOneDiscussion => {
  const dataLength = 20;

  const uniqueIntegers = generateUniqueIntegers(1, dataLength, dataLength);

  const name = meta?.title ?? faker.person.fullName();
  const avatar = meta?.avatarUrl ?? faker.image.avatar();

  const data = Array(dataLength)
    .fill(1)
    .map((_item, index) => {
      const contentType = faker.helpers.enumValue(
        MessageContentType,
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
            : contentType === "VOICE"
              ? ({
                  contentType: "VOICE",
                  file: "https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_OGG.ogg",
                } as IVoiceMessage)
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
