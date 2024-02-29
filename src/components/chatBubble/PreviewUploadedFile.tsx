import { CloseCircle } from "iconsax-react";
import { FilePreview } from "./FilePreview";
import { useContext } from "react";
import { MessagingInputsContext } from "./MessagingInputs";

export function PreviewUploadedFile(props: { file: File }) {
  const context = useContext(MessagingInputsContext);
  return (
    context && (
      <div className="relative rounded">
        <button
          className="absolute -right-2 -top-2"
          onClick={() => context.onRemoveFileLocal(props.file)}
        >
          <CloseCircle variant="Bold" color="#d9e3f0" />
        </button>
        <FilePreview file={props.file} />
      </div>
    )
  );
}
