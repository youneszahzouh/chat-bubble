# Chat Bubble

## About

ChatBubble component tailored to diverse messaging needs. Key features include:

- Displaying a message list between multiple users, supporting various types such as text, image, and voice.
- Providing inputs for sending messages of different types.
- Customizable title, avatar, and accent color for personalization.
- Supporting both RTL and LTR languages for global accessibility.
- Localization support for multilingual audiences.
- Auto-expansion to full screen on mobile devices for enhanced user experience.
- Initial state as a collapsed circle, expandable on click, mimicking a typical chat bubble.
- Integration into an example empty page with mock message data stored locally.
- Designing the component with extensibility in mind, facilitating the addition of new message types.
- Ensuring each component maintains a singular responsibility to adhere to best practices.

### DEMO : https://chat-bubble-liard.vercel.app/

## Tools

- React
- TypeScript
- Vite
- Tailwind CSS
- Yarn
- @radix-ui for Popover and Tooltip
- i18next for Localization
- iconsax-react for Icons
- FakerJs for mock data generation.


## Installation

### Installation and Setup

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>



2. **Start dev server:**
   ```bash
   yarn dev

## Usage

1. **Default:**
   ```jsx
   <ChatBubble data={getAllDiscussions()} />


1. **With Custom Types:**
   ```jsx
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


1. **With Custom Styles:**
   ```jsx
   <ChatBubble data={getAllDiscussions()}>
        <ChatBubbleTrigger className="bg-red-500" />
        <ChatBubbleContent className="bg-green-900" />
    </ChatBubble>

