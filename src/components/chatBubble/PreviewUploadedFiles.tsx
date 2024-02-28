import { useContext } from "react";
import { PreviewUploadedFile } from "./PreviewUploadedFile";
import { MessagingInputsContext } from "./MessagingInputs";

export const PreviewUploadedFiles = () => {
  const context = useContext(MessagingInputsContext);

  return context && context.files?.length > 0 ? (
    <div className="flex gap-4 p-4 ">
      {context.files?.map((file: File) => (
        <PreviewUploadedFile file={file} key={file.lastModified + file.name} />
      ))}
    </div>
  ) : null;
};
