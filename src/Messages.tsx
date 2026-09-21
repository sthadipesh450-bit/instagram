import { useState } from "react";

type Message = {
  id: number;
  sender: "me" | "them";
  text: string;
};

type MessageThread = {
  id: number;
  name: string;
  status: string;
  unread: number;
  preview: string;
  messages: Message[];
};

const messageThreads: MessageThread[] = [
  {
    id: 1,
    name: "Lena",
    status: "Online",
    unread: 2,
    preview: "Love the sunset shot!",
    messages: [
      { id: 1, sender: "them", text: "Hey! Did you post the beach pics yet?" },
      { id: 2, sender: "me", text: "Yes, just uploaded them." },
      { id: 3, sender: "them", text: "Love the sunset shot!" },
    ],
  },
  {
    id: 2,
    name: "Marcus",
    status: "Last seen 5m ago",
    unread: 0,
    preview: "Dinner plans for Friday?",
    messages: [
      { id: 1, sender: "them", text: "Dinner plans for Friday?" },
      { id: 2, sender: "me", text: "I’m in. What time?" },
    ],
  },
  {
    id: 3,
    name: "Ava",
    status: "Typing...",
    unread: 1,
    preview: "Need your photo edit tips",
    messages: [
      { id: 1, sender: "them", text: "Need your photo edit tips" },
      { id: 2, sender: "me", text: "Sure, send me the raw image." },
    ],
  },
];

function Messages() {
  const [selectedThreadId, setSelectedThreadId] = useState(1);

  const selectedThread =
    messageThreads.find((thread) => thread.id === selectedThreadId) ?? messageThreads[0];

  return (
    <section className="messages-card">
      <aside className="messages-sidebar">
        <div className="messages-header">
          <h3>Messages</h3>
          <button type="button" className="messages-new-btn">
            New
          </button>
        </div>

        {messageThreads.map((thread) => (
          <button
            key={thread.id}
            type="button"
            className={selectedThreadId === thread.id ? "message-thread active" : "message-thread"}
            onClick={() => setSelectedThreadId(thread.id)}
          >
            <div className="message-avatar" />
            <div className="message-thread-main">
              <div className="message-thread-top">
                <strong>{thread.name}</strong>
                {thread.unread > 0 && <span className="message-badge">{thread.unread}</span>}
              </div>
              <p>{thread.preview}</p>
            </div>
          </button>
        ))}
      </aside>

      <div className="chat-panel">
        <div className="chat-header">
          <div className="chat-user">
            <div className="message-avatar" />
            <div>
              <strong>{selectedThread.name}</strong>
              <p>{selectedThread.status}</p>
            </div>
          </div>

          <div className="chat-actions">
            <button type="button" className="chat-action-btn">
              Call
            </button>
            <button type="button" className="chat-action-btn">
              Video
            </button>
          </div>
        </div>

        <div className="chat-body">
          {selectedThread.messages.map((message) => (
            <div
              key={message.id}
              className={message.sender === "me" ? "chat-bubble me" : "chat-bubble"}
            >
              {message.text}
            </div>
          ))}
        </div>

        <div className="chat-input-row">
          <input type="text" placeholder="Type a message..." />
          <button type="button">Send</button>
        </div>
      </div>
    </section>
  );
}

export default Messages;
