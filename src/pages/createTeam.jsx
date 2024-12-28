import React, { useState, useEffect } from "react";
import { Loader2, User,Camera } from "lucide-react";
import { useTeam } from "../store/useTeam";
import { useauthStore } from "../store/useAuthStore";
import Team from "./Team";

const CreateTeam = () => {
  const { createTeam, team, visibleupdate, setvisibleupdate, updateTeam, 
    deleteTeam, getallTeam ,isUpdateppt,pptSubmission} = useTeam();
  const {authUser}=useauthStore();
  const [selectedppt, setSelectedppt] = useState(null);
  const [formdata, setFormdata] = useState({
    teamName: "",
    deadline: "",
    project: "",
    teamStrength:0,
    participants: [],
  });
  const [form, setForm] = useState({
    teamName: "",
    deadline: "",
    project: "",
    teamStrength: 0,
    participants: [],
  });
  
  const handleParticipantChange = (index, value) => {
    setFormdata((prevData) => {
      const updatedParticipants = [...prevData.participants];
      updatedParticipants[index] = value;
      return { ...prevData, participants: updatedParticipants };
    });
  };
  const handleTeamStrengthChange = (e) => {
    const teamStrength = parseInt(e.target.value, 10) || 0;
    setFormdata((prevData) => ({
      ...prevData,
      teamStrength,
      participants: Array(teamStrength).fill(""),
    }));
  };
  const handleParticipantChange1 = (index, value) => {
    setForm((prevData) => {
      const updatedParticipants = [...prevData.participants];
      updatedParticipants[index] = value;
      return { ...prevData, participants: updatedParticipants };
    });
  };
  const handleTeamStrengthChange1 = (e) => {
    const teamStrength = parseInt(e.target.value, 10) || 0;
    setForm((prevData) => ({
      ...prevData,
      teamStrength,
      participants: Array(teamStrength).fill(""),
    }));
  };


  const [submit, setSubmit] = useState(false);
  const [update,setUpdate]=useState(false)

  // Fetch all teams when the component mounts
  useEffect(() => {
    getallTeam();
  },[]);
 
  
  const validateForm = () => {
    if (formdata.teamName.trim().length === 0) {
      alert("Please provide a team name");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e, msg, t ) => {
    e.preventDefault();
    if(authUser.fullName!='#CCARND'){alert("Only Admin Can Change Team Info");return;}
      if (msg === "update") {

        if(form.teamName==''){form.teamName = t.teamName;}
        if(form.deadline=''){form.deadline = t.deadLine;}
        if(form.project==''){form.project=t.projectName;}
        console.log(form)
      setUpdate(true);
      await updateTeam(form,t._id);
      setForm({ teamName: "", deadline: "", project: "" ,teamStrength:0,participants:[]})
      setUpdate(false);
    } else if (msg === "create") {
      const isValid = validateForm();
      if (isValid) {
        setSubmit(true);
        await createTeam(formdata);
        setFormdata({ teamName: "", deadline: "", project: "",teamStrength:0,participants:[] }); 
        setSubmit(false);// Reset form
      }
     
    }
    
  };

  const handleUpdate = async (id) => {
   await setvisibleupdate(id);
  };

  const handleDelete = async (id) => {
    await deleteTeam(id);
    getallTeam(); // Refresh the list
  };

  const handlePPTUpload = async (e,_id) => {
    const file = e.target.files[0];
    if (!file) return;
   console.log("id is :- ",_id)
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64ppt = reader.result;
      console.log(base64ppt);
      setSelectedppt(base64ppt);
      await pptSubmission(_id,{ppt :base64ppt});
    };
    
  };

  let absent=()=>{
    setvisibleupdate("");
  }

  return (
    <div style={{ marginTop: "80px" }}>
      {authUser.fullName=='#CCARND'?<>
        <form onSubmit={(e) => handleSubmit(e, "create")} className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Team Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter Team Name"
            value={formdata.teamName}
            onChange={(e) => setFormdata({ ...formdata, teamName: e.target.value })}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Project Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter Project Name"
            value={formdata.project}
            onChange={(e) => setFormdata({ ...formdata, project: e.target.value })}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Deadline</span>
          </label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={formdata.deadline}
            onChange={(e) => setFormdata({ ...formdata, deadline: e.target.value })}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Team Strength</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            placeholder="Enter Team Strength"
            value={formdata.teamStrength}
            onChange={handleTeamStrengthChange}
          />
        </div>

        {formdata.participants.map((participant, index) => (
          <div key={index} className="form-control">
            <label className="label">
              <span className="label-text">Participant {index + 1}</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder={`Enter Participant ${index + 1} name`}
              value={participant}
              onChange={(e) => handleParticipantChange(index, e.target.value)}
            />
          </div>
        ))}

        <button type="submit" className="btn btn-primary w-full" disabled={submit}>
          {submit ? (
            <>
              <Loader2 className="animate-spin" />
              Creating...
            </>
          ) : (
            "Create Team"
          )}
        </button>
      </form></>:<></>}
    
      <p className="mt-6" style={{textAlign:"center"}}>{authUser.fullName=='#CCARND'?<span>All teams:</span>:<span>Your Team</span>}</p>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
       
        {team.map((t) => (
          (authUser.fullName!='#CCARND'&&authUser.TeamName!=t.teamName)?<></>:
        <div key={t._id}>
          <Team t ={t}/>
            {visibleupdate.includes(t._id) ? (
              <form onSubmit={(e) => handleSubmit(e, "update", t)} className="space-y-6">
                <div style={{display:'flex',justifyContent:'flex-end',paddingTop:'15px'}}>
                  <img src = "https://res.cloudinary.com/dfdvyif4v/image/upload/v1735308065/cross_kuaabd.jpg"
                  style={{height:'20px',width:'30px'}} onClick={()=>{absent()}}>
                  </img></div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Team Name</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="size-5 text-base-content/40" />
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full pl-10"
                      placeholder="Enter Team Name"
                      value={form.teamName}
                      onChange={(e) => setForm({ ...form, teamName: e.target.value })}
                    />
                  </div>
                </div>
                
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Project Name</span>
          </label>
          <div className="relative">
            <input
              type="text"
              className="input input-bordered w-full pl-10"
              placeholder="Enter Project Name"
              value={form.project}
              onChange={(e) => setForm({ ...form, project: e.target.value })}
            />
          </div>
        </div>
        


        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Team Strength</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            placeholder="Enter Team Strength"
            value={form.teamStrength}
            onChange={handleTeamStrengthChange1}
          />
        </div>

        {form.participants.map((participant, index) => (
          <div key={index} className="form-control">
            <label className="label">
              <span className="label-text">Participant {index + 1}</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder={`Enter Participant ${index + 1} name`}
              value={participant}
              onChange={(e) => handleParticipantChange1(index, e.target.value)}
            />
          </div>
        ))}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Deadline</span>
          </label>
          <div className="relative">
            <input
              type="date"
              className="input input-bordered w-full pl-10"
              placeholder="Enter Deadline"
              value={form.deadline}
              onChange={(e) => setForm({ ...form,deadline: e.target.value })}
            />
          </div>
        </div>
        
        <div className="form-control">
        <label>
          <span>Upload PPT</span>
        </label>
        <input
                  type="file"
                  id="avatar-upload"
                  accept=".pdf"
                  onChange={(e)=>{handlePPTUpload(e,t._id)}}
                  disabled={isUpdateppt}
                />
            <p className="text-sm text-zinc-400">
              {isUpdateppt ? "UploadingPDF..." : "Click the camera icon to update your photo"}
            </p>
        </div>
        
      
                <button type="submit" className="btn btn-primary w-full" disabled={update}>
                  {update ? "Updating..." : "Update Team Info"}
                </button>
              </form>
            ) : (
              <>
                
                <button className="btn btn-outline btn-primary" onClick={() => handleUpdate(t._id)} style={{margin:'10px'}}>Update</button>
                <button className="btn btn-outline btn-accent" onClick={() => handleDelete(t._id)}>Delete</button>
              </>
            )}
          </div>

        ))}
      </div>
    </div>
  );
};

export default CreateTeam;
