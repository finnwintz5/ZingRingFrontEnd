import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   tiredness: "",
   heartbeet: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ tiredness: "", heartbeet: ""});
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="position">Heartbeat</label>
         <input
           type="text"
           className="form-control"
           id="position"
           value={form.heartbeet}
           onChange={(e) => updateForm({ heartbeet: e.target.value })}
         />
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionNotTired"
             value="0"
             checked={form.tiredness === "0"}
             onChange={(e) => updateForm({ tiredness: e.target.value })}
           />
           <label htmlFor="positionNotTired" className="form-check-label">Tired</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionTired"
             value="1"
             checked={form.tiredness === "1"}
             onChange={(e) => updateForm({ tiredness: e.target.value })}
           />
           <label htmlFor="positionTired" className="form-check-label">Not Tired</label>
         </div>
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create log entry"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}