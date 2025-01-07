import { useState } from "react";
import { useauthStore } from "../store/useAuthStore";
import { Camera, User } from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile ,updateName,updateTeam} = useauthStore();
  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

        <div><img src={authUser.profilePic ? authUser.profilePic : "https://res.cloudinary.com/dfdvyif4v/image/upload/v1735373510/50350404_vkjcoc.jpg"}></img></div>

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
              <div className="flex items-center justify-between py-2 border-b border-zinc-700" >
                <span>Team Name</span>
                <span>{authUser.TeamName?authUser.TeamName:"No team finalised"}</span>
              </div>
              </Link>
              {authUser && (
              <div className="flex h-full rounded-lg overflow-hidden pb-8">
                
                <Link
                  to="/team"
                  className="link link-primary"
                  style={{ marginLeft: "10px" }}
                >
                  <button className="btn btn-accent btn-outline">All Team</button>
                </Link>
              </div>
              
            )}
             {authUser && (
              <div className="flex h-full rounded-lg overflow-hidden pb-8">
                
                <Link
                  to="http://localhost:5173/ticket"
                  className="link link-primary"
                  style={{ marginLeft: "10px" }}
                >
                  <button className="btn btn-accent btn-outline">Generate Ticket</button>
                </Link>
              </div>
              
            )}
              
              
          
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;