import { DocumentText } from "iconsax-react";
import { isImage } from "../../utils/isImage";
import { useTranslation } from "react-i18next";

export const FilePreview = ({ file }: { file: File }) => {
  const { t } = useTranslation();
  return isImage(file) ? (
    <div className="h-10 w-10 overflow-hidden rounded">
      <img
        className="h-full w-full object-cover"
        alt={t("preview-image")}
        src={URL.createObjectURL(file)}
      />
    </div>
  ) : (
    <div className="flex gap-1 rounded bg-gray-600 p-2">
      <DocumentText size="24" color="black" variant="Bulk" />
      <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm">
        {file?.name}
      </span>
    </div>
  );
};
