import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/SideBar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { selectedUser,authUser } = useChatStore();
  return (
    <div className="h-full bg-base-200">
      <div className="flex flex-col items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <NoChatSelected/>
          </div>
        </div>
        <div className="bg-base-100 mb-8 rounded-lg shadow-cl w-full ">
          <div className="flex flex-col h-full rounded-lg overflow-hidden" 
          style={{alignItems:"center"}}>
          <div className="flex flex-col h-full p-4">
            <h2 className="text-2xl pb-8 font-bold">What Is TechMela</h2>
            <p style={{letterSpacing:'2px'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
              Nostrum facere dolore culpa eveniet, nesciunt iste consequatur eum a
               debitis dolor placeat neque nisi adipisci.
               Error alias voluptatibus voluptate cum accusantium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro illo assumenda reprehenderit eveniet iusto! Voluptates, facere sint labore quod tempore perferendis sapiente
                architecto culpa suscipit eius quis itaque, veniam odio?</p>
          </div>
          
          <div className="flex h-full rounded-lg overflow-hidden pb-8">
          <Link to="https://unstop.com/internships/full-stack-developer-internship-extion-infotech-1146627" className="link link-primary">
          <button class="btn btn-accent btn-outline">Register Here</button>
          </Link>
          </div>
          <div className="flex h-full rounded-lg overflow-hidden">
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;