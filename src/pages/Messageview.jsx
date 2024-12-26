import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/SideBar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useauthStore } from "../store/useAuthStore";
import { useEffect, useState } from "react";

const Messageview = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { authUser } = useauthStore();

  // Use state to manage `isHost` and `id` values
  const [isHost, setIsHost] = useState(authUser._id === '676ce288acdbf7074030ed6f');
  const [id, setId] = useState(authUser._id !== '676ce288acdbf7074030ed6f' ? '676ce288acdbf7074030ed6f' : "");

  // Update `isHost` and `id` when `authUser` changes
  useEffect(() => {
    setIsHost(authUser._id === '676ce288acdbf7074030ed6f');
    setId(authUser._id !== '676ce288acdbf7074030ed6f' ? '676ce288acdbf7074030ed6f' : "");
  }); // Re-run when `authUser` changes

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            {/* Pass the `id` and `isHost` to Sidebar */}
            <Sidebar id={id} isHost={isHost} />
            
            {/* Chat container will show based on the selectedUser */}
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messageview;
