import ChatBubble, {
  ChatBubbleContent,
  ChatBubbleTrigger,
} from "./components/chatBubble/ChatBubble";
import { getAllDiscussions } from "./components/chatBubble/mockData";
import { cn } from "./utils/cn";

function App() {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <ChatBubble
          data={getAllDiscussions()}
          messageTypes={[
            {
              type: "IMAGE",
              component: (props) => {
                const files = props.data.files;
                return (
                  <div
                    className={cn(
                      "grid grid-cols-1 gap-1 col-span-full ",
                      files?.length &&
                        files?.length < 2 &&
                        `grid-cols-${files?.length}`
                    )}
                  >
                    {files?.map((image, index) => (
                      <img
                        className="h-4 w-full min-w-28 rounded object-cover"
                        src={image}
                        alt="picture"
                        key={index}
                      />
                    ))}
                  </div>
                );
              },
            },
          ]}
        >
          <ChatBubbleTrigger className="bg-red-500" />
          <ChatBubbleContent />
        </ChatBubble>
      </div>
    </>
  );
}

export default App;
