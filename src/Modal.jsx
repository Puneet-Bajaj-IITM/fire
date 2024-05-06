import { useState, useRef, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { FaPaperclip } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
function Modal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
   
    }
  };

  useEffect(() => {
    
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className={`fixed  flex items-center justify-center ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* <div className="fixed inset-0 bg-black bg-opacity-50"></div> */}
      <div className="fixed bottom-32  w-[400px] right-5">
        <div className="bg-white rounded-lg shadow-lg relative">
          <button
            className="absolute top-8 right-4  text-white text-3xl hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            <IoIosClose className="text-lg" />
          </button>
          <div className="flex bg-[#F23005] p-4 gap-6 items-center mb-4">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Obi-Wan Kenobi</h2>
              <p className="text-sm text-gray-500">We'll return today at 07:00 PM</p>
            </div>
          </div>
          <div ref={chatContainerRef} className="overflow-y-auto max-h-60 p-4 mb-4">
  {messages.map((message, index) => (
    <div
      key={index}
      className={`chat ${index === messages.length - 1 ? "chat-end" : "chat-start"}`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Avatar"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <div className="chat-header">
        {message.sender}
        <time className="text-xs opacity-50">12:45</time>
      </div>
      <div className="chat-bubble">
        {message.text}
        <div className="text-xs text-gray-500">{message.time}</div>
      </div>
      <div className="chat-footer opacity-50">
        {index === messages.length - 1 ? "Delivered" : "Seen at 12:46"}
      </div>
    </div>
  ))}
</div>

<div className="flex items-center">
  <input
    type="text"
    placeholder="Type your message..."
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    className="flex-1 py-2 px-4  border border-gray-200 bg-white text-black focus:outline-none  mr-2"
  />
  <div className="flex items-center">
    <label htmlFor="attachments" className="mr-2 cursor-pointer">
      <FaPaperclip className="text-gray-500 hover:text-blue-500" />
      <input
        type="file"
        id="attachments"
        className="hidden"
      
      />
    </label>
    <button
      onClick={handleSendMessage}
      className="py-2 px-4  text-black  focus:outline-none"
    >
      <IoSend />
    </button>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
