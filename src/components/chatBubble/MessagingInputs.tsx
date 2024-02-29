import {
  CloseCircle,
  GalleryExport,
  Microphone,
  Send,
  StopCircle,
} from "iconsax-react";
import {
  KeyboardEvent,
  RefObject,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { cn } from "../../utils/cn";
import { getLayoutDirection } from "../../utils/getLayoutDirection";
import { useAudioRecorder } from "../AudioRecorder/AudioRecorder";
import { PreviewUploadedFiles } from "./PreviewUploadedFiles";
import { IImageMessage, ITextMessage, IVoiceMessage } from "./mockData";
import { formatTime } from "../../utils/formatTime";
import { ChatBubbleContext } from "./ChatBubble";

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
  onSendMessage: (
    messagesToSend: Array<ITextMessage | IImageMessage | IVoiceMessage>,
  ) => void;
}) => {
  const [textMessage, setTextMessage] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const {
    audio,
    duration,
    resetAudio,
    startRecording,
    recordingStatus,
    stopRecording,
  } = useAudioRecorder();

  const handleSendMessage = useCallback(() => {
    const messagesToSend: Array<ITextMessage | IImageMessage | IVoiceMessage> =
      [];

    if (audio) {
      messagesToSend.push({
        contentType: "VOICE",
        file: audio,
      });
    }

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
    }
    onSendMessage(messagesToSend);
    setTextMessage("");
    resetFiles();
    resetAudio();
  }, [audio, files, onSendMessage, resetAudio, textMessage]);

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
    [handleSendMessage],
  );

  const onMessageChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextMessage(e.target.value);
    },
    [],
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
    [files],
  );

  const layoutDirection = getLayoutDirection();

  const context = useContext(ChatBubbleContext);

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
      <div className="flex items-end gap-1 p-2 ">
        <div className="flex gap-2">
          {recordingStatus === "inactive" ? (
            audio ? (
              <button onClick={resetAudio}>
                <CloseCircle
                  size="24"
                  variant="Bold"
                  color={context?.selectedDiscussion?.meta.accentColor}
                />
              </button>
            ) : (
              <>
                <button onClick={startRecording}>
                  <Microphone
                    size="24"
                    variant="Bold"
                    color={context?.selectedDiscussion?.meta.accentColor}
                  />
                </button>

                <button onClick={handleClick}>
                  <GalleryExport
                    size="24"
                    variant="Bold"
                    color={context?.selectedDiscussion?.meta.accentColor}
                  />
                </button>
              </>
            )
          ) : (
            <button onClick={stopRecording}>
              <StopCircle
                size="24"
                variant="Bold"
                color={context?.selectedDiscussion?.meta.accentColor}
              />
            </button>
          )}
        </div>

        {audio ? (
          <DisplayAudio
            audioUrl={audio}
            accentColor={context?.selectedDiscussion?.meta.accentColor}
          />
        ) : recordingStatus === "recording" ? (
          <p
            className={cn(
              "flex w-full flex-1 items-center justify-center rounded-full text-white",
              context?.selectedDiscussion?.meta.accentColor &&
                "bg-[var(--accentColor)]",
            )}
            style={
              {
                "--accentColor": context?.selectedDiscussion?.meta.accentColor,
              } as React.CSSProperties
            }
          >
            {formatTime(duration)}
          </p>
        ) : (
          <div
            className={cn(
              "flex h-auto w-full flex-wrap gap-4 overflow-auto rounded-xl  bg-gray-700 px-3 py-2 text-white shadow-sm ",
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
                "placeholder:text-muted-foreground focus-visible:ring-none focus-visible:ring-none flex  w-full resize-none flex-wrap bg-gray-700 px-3 py-2 text-sm text-white shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              )}
              rows={1}
              value={textMessage}
              onChange={onMessageChange}
              onKeyDown={onTextAreaKeyDown}
            />
          </div>
        )}

        {recordingStatus === "recording" ? null : (
          <button
            onClick={handleSendMessage}
            className={cn(layoutDirection === "rtl" && "-scale-x-100")}
          >
            <Send
              size="24"
              variant="Bold"
              color={context?.selectedDiscussion?.meta.accentColor}
            />
          </button>
        )}
      </div>
    </MessagingInputsContext.Provider>
  );
};

export const DisplayAudio = ({
  audioUrl,
  accentColor = "gray",
}: {
  audioUrl: string;
  accentColor?: string;
}) => {
  return (
    <div
      className={cn(
        "flex- flex w-full",
        "[&>audio::-webkit-media-controls-panel]:bg-[var(--accentColor)] [&>audio]:h-8",
      )}
      style={
        {
          "--accentColor": accentColor,
        } as React.CSSProperties
      }
    >
      <audio controls controlsList="nodownload" src={audioUrl} />
    </div>
  );
};

export default MessagingInputs;
