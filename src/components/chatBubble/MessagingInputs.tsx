import { KeyboardEvent, RefObject, useCallback, useRef, useState } from "react";
import { IMessage, defaultMessage } from "./mockData";
import { cn } from "../../utils/cn";
import { CloseCircle, GalleryExport, Microphone, Send } from "iconsax-react";
import { FilePreview } from "./FilePreview";

export const MessagingInputs = ({
  onSendMessage,
}: {
  onSendMessage: (message: IMessage) => void;
}) => {
  const [message, setMessage] = useState<IMessage>(defaultMessage);

  const handleSendMessage = useCallback(
    (message: IMessage) => {
      onSendMessage(message);
      setMessage({
        ...message,
        message: { ...message.message, content: "" },
      });
    },
    [onSendMessage]
  );

  const onTextAreaKeyUp = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>): void => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();

        handleSendMessage(message);
      }
    },
    [handleSendMessage, message]
  );

  const onMessageChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage({
        ...message,
        message: { ...message.message, content: e.target.value },
      });
    },
    [message]
  );

  const [files, setFiles] = useState<File[]>([]);
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
    <div className="flex gap-1 items-end">
      <div className="flex gap-2">
        <Microphone size="32" variant="Bold" color="#ED3C3A" />

        <button onClick={handleClick}>
          <GalleryExport size="32" variant="Bold" color="#ED3C3A" />
        </button>
      </div>

      <div
        className={cn(
          "rounded-xl gap-4 h-auto overflow-auto flex-wrap flex w-full  bg-gray-700 text-white px-3 py-2 shadow-sm "
        )}
      >
        <div className="flex gap-4 p-4 ">
          {files?.map((file) => (
            <div className="rounded relative">
              <button
                className="absolute -right-2 -top-2"
                onClick={() => onRemoveFileLocal(file)}
              >
                <CloseCircle variant="Bold" color="#d9e3f0" />
              </button>
              <FilePreview file={file} />
            </div>
          ))}
        </div>
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
          value={message.message.content}
          onChange={onMessageChange}
          onKeyUp={onTextAreaKeyUp}
        />
      </div>
      <button onClick={() => handleSendMessage(message)}>
        <Send size="32" variant="Bold" color="#ED3C3A" />
      </button>
    </div>
  );
};
