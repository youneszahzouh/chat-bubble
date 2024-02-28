export const Avatar = ({ url }: { url: string }) => {
  return (
    <div className="bottom-4 right-4">
      <div className="w-8 h-8 overflow-hidden rounded-full ">
        <img src={url} alt="chat-bubble" className="object-fit w-full h-full" />
      </div>
    </div>
  );
};
