import ReactPlayer from "react-player";
import ChatBubble from "./components/chatBubble/ChatBubble";
import { getAllDiscussions } from "./components/chatBubble/mockData";

const CustomChatBubble = () => {
  return (
    <>
      <ChatBubble
        data={getAllDiscussions()}
        messageTypes={[
          {
            type: "VIDEO",
            component: (props) => (
              <div>
                <ReactPlayer
                  width={"full"}
                  height={200}
                  url={props.data.file}
                />
              </div>
            ),
          },
        ]}
      />
    </>
  );
};

export default CustomChatBubble;
