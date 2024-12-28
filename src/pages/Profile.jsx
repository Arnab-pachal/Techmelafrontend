import { useState } from "react";
import { useauthStore } from "../store/useAuthStore";
import { Camera, User } from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile ,updateName,updateTeam} = useauthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  let name = authUser?.fullName;
  if(!name){name =""}
  const [text,setText]=useState(name)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };
const change =()=>{
  console.log("Name Want to change")
}
const namechange = (e)=>{
  setText(e.target.value);
}
const submitname=async()=>{
  if(text==authUser.fullName){alert("This Name is Already Saved");}
  if(text.trim().length==0){alert("A Name Can't Be Empty");}
  else{
    await updateName({name : text,id:authUser._id});
  }
 
}
const handleforward = async()=>{

}
  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5" onClick={change}>
              <div>Change Your Name</div>
              <div className="text-sm text-zinc-400 flex items-center gap-2" >
                <User className="w-4 h-4" />
                
                <input type="text" className="px-4 py-2.5 bg-base-200 rounded-lg border" onChange={namechange} ></input>
                <button className="btn btn-outline btn-secondary" onClick={submitname}>Submit</button>
              </div>
              
            </div>

          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>UserName</span>
                <span>{authUser.fullName}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
              <Link to="/team" className=" link-primary">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700" onClick={handleforward}>
                <span>Team Name</span>
                <span>{authUser.TeamName?authUser.TeamName:"No team finalised"}</span>
              </div>
              </Link>
              
              
          
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;