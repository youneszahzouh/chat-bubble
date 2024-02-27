import { DocumentText } from "iconsax-react";
import { isImage } from "../../utils/isImage";


export const FilePreview = ({ file }: { file: File; }) => {
  return isImage(file) ? (
    <div className="w-10 h-10 overflow-hidden rounded">
      <img
        className="h-full w-full object-cover"
        alt="preview image"
        src={URL.createObjectURL(file)} />
    </div>
  ) : (
    <div className="flex gap-1 bg-gray-600 p-2 rounded">
      <DocumentText size="24" color="black" variant="Bulk" />
      <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm">
        {file?.name}
      </span>
    </div>
  );
};
