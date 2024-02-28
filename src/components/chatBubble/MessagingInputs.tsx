import { GalleryExport, Microphone, Send } from "iconsax-react";
import {
  KeyboardEvent,
  RefObject,
  createContext,
  useCallback,
  useRef,
  useState,
} from "react";
import { cn } from "../../utils/cn";
import { PreviewUploadedFiles } from "./PreviewUploadedFiles";
import { IImageMessage, ITextMessage } from "./mockData";

export const MessagingInputsContext = createContext<{
  onRemoveFileLocal: (file: File) => void;
  textMessage: string;
  files: File[];

  inputRef: RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  onTextAreaKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSendMessage: () => void;
} | null>(null);

export const MessagingInputs = ({
  onSendMessage,
}: {
  onSendMessage: (messagesToSend: Array<ITextMessage | IImageMessage>) => void;
}) => {
  const [textMessage, setTextMessage] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const handleSendMessage = useCallback(() => {
    const messagesToSend: Array<ITextMessage | IImageMessage> = [];
    if (textMessage) {
      messagesToSend.push({
        contentType: "TEXT",
        content: textMessage,
      });
    }

    if (files && files.length > 0) {
      messagesToSend.push({
        contentType: "IMAGE",
        files: files?.map((file) => URL.createObjectURL(file)),
      });

      onSendMessage(messagesToSend);
    }
    setTextMessage("");
    resetFiles();
  }, [files, onSendMessage, textMessage]);

  const resetFiles = () => {
    setFiles([]);

    const dataTransfer = new DataTransfer();

    if (inputRef && inputRef.current)
      inputRef.current.files = dataTransfer.files;
  };
  const onTextAreaKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>): void => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();

        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const onMessageChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextMessage(e.target.value);
    },
    []
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    const newFiles = [...files, ...Array.from(event?.target?.files ?? [])];
    setFiles(newFiles);
  };

  const inputRef: RefObject<HTMLInputElement> = useRef(null);

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    if (inputRef && inputRef.current) inputRef.current.click();
  };

  const onRemoveFileLocal = useCallback(
    (file: File) => {
      const newFiles = files?.filter((item) => item !== file) ?? [];
      setFiles(files?.length > 0 ? newFiles : []);

      const dataTransfer = new DataTransfer();
      newFiles.forEach((file) => dataTransfer.items.add(file));

      if (inputRef && inputRef.current)
        inputRef.current.files = dataTransfer.files;
    },
    [files]
  );

  return (
    <MessagingInputsContext.Provider
      value={{
        textMessage,
        files,
        inputRef,
        handleFileChange,
        onRemoveFileLocal,
        handleClick,
        onTextAreaKeyDown,
        onMessageChange,
        handleSendMessage,
      }}
    >
      <div className="flex gap-1 items-end p-2 ">
        <div className="flex gap-2">
          <Microphone size="24" variant="Bold" color="#ED3C3A" />

          <button onClick={handleClick}>
            <GalleryExport size="24" variant="Bold" color="#ED3C3A" />
          </button>
        </div>

        <div
          className={cn(
            "rounded-xl gap-4 h-auto overflow-auto flex-wrap flex w-full  bg-gray-700 text-white px-3 py-2 shadow-sm "
          )}
        >
          <PreviewUploadedFiles />
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
            multiple
          />

          <textarea
            className={cn(
              "resize-none flex-wrap flex w-full  bg-gray-700 text-white px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-none focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50"
            )}
            rows={1}
            value={textMessage}
            onChange={onMessageChange}
            onKeyDown={onTextAreaKeyDown}
          />
        </div>
        <button onClick={handleSendMessage}>
          <Send size="24" variant="Bold" color="#ED3C3A" />
        </button>
      </div>
    </MessagingInputsContext.Provider>
  );
};
