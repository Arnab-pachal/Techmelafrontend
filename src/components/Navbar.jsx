import { Link } from "react-router-dom";
import { useauthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useauthStore();

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <img src="https://res.cloudinary.com/dfdvyif4v/image/upload/v1734971530/nw2wndhwg2ado6yt9p8u.png"
                 style={{height:'50px',width:'50px',borderRadius:'50%'}}/>
              </div>
             
            </Link>
          </div>
           
          <Link
              to={"/announce"}
              className={`
              btn btn-sm gap-2 transition-colors`}
            >
              <img src="https://res.cloudinary.com/dfdvyif4v/image/upload/v1734965874/announcement_imdv4i.png" 
              style={{height:'30px' ,width:'30px',borderRadius:'50%'}}/>
            </Link>
     
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      
    </header>
  );
};
export default Navbar;