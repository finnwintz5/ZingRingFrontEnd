import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
  datetime: "",
   tiredness: "",
   heartbeet: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params._id.toString();
     const response = await fetch(`http://localhost:5000/record/${params._id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params._id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
    datetime: form.datetime,
     tiredness: form.tiredness,
     heartbeet: form.heartbeet,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/update/${params._id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Heartbeat: </label>
         <input
           type="text"
           className="form-control"
           id="name"
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
             id="positionTired"
             value="Tired"
             checked={form.tiredness === "Tired"}
             onChange={(e) => updateForm({ tiredness: e.target.value })}
           />
           <label htmlFor="positionIntern" className="form-check-label">Tired</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionNotTired"
             value="Not Tired"
             checked={form.tiredness === "Not Tired"}
             onChange={(e) => updateForm({ tiredness: e.target.value })}
           />
           <label htmlFor="positionJunior" className="form-check-label">Not Tired</label>
         </div>
       </div>
       <br />
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}