export const Avatar = ({ url }: { url: string }) => {
  return (
    <div className="bottom-4 right-4">
      <div className="h-8 w-8 overflow-hidden rounded-full ">
        <img src={url} alt="chat-bubble" className="object-fit h-full w-full" />
      </div>
    </div>
  );
};
