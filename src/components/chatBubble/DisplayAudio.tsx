import { cn } from "../../utils/cn";


export const DisplayAudio = ({
  audioUrl, accentColor = "gray",
}: {
  audioUrl: string;
  accentColor?: string;
}) => {
  return (
    <div
      className={cn(
        "flex- flex w-full",
        "[&>audio::-webkit-media-controls-panel]:bg-[var(--accentColor)] [&>audio]:h-8"
      )}
      style={{
        "--accentColor": accentColor,
      } as React.CSSProperties}
    >
      <audio controls controlsList="nodownload" src={audioUrl} />
    </div>
  );
};
