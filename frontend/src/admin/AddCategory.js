/**
 * @author: Sakhr Al-absi
 * @Gruppe: 6
 * @Matrikelnummer: s0562218
 */
 import React, { useState } from "react";
 import Layout from "../core/Layout";
 import { isAuthenticated } from "../auth";
 import { Link } from "react-router-dom";
 import { createCategory } from "./apiAdmin";
 
 /**
  * 
  * @returns the categoryForm, the success and error message and the link to go back to dashboard
  */
 const AddCategory = () => {
     const [name, setName] = useState("");
     const [error, setError] = useState(false);
     const [success, setSuccess] = useState(false);
 
     //Benutzer und Token von localStorage destrukturieren
     const { user, token } = isAuthenticated();
 
     const handleChange = e => {
         setError("");
         setName(e.target.value);
     };
 
     const clickSubmit = e => {
         e.preventDefault();
         setError("");
         setSuccess(false);
         // Eine Anfrage an die API senden, um eine Kategorie zu erstellen
         createCategory(user._id, token, { name }).then(data => {
             if (data.error) {
                 setError(data.error);
             } else {
                 setError("");
                 setSuccess(true);
             }
         });
     };
 
     /**
      * 
      * @returns A form element with a name, input field and a button
      */
     const newCategoryForm = () => (
         <form onSubmit={clickSubmit}>
             <div className="form-group">
                 <label className="text-muted">Name</label>
                 <input
                     type="text"
                     className="form-control"
                     onChange={handleChange}
                     value={name}
                     autoFocus
                     required
                 />
             </div>
             <button className="btn btn-outline-primary">Kategorie erstellen</button>
         </form>
     );
 
     /**
      * 
      * @returns A message to be shown by success
      */
     const showSuccess = () => {
         if (success) {
             return <h3 className="text-success">{name} wurde erstellt</h3>;
         }
     };
 
     /**
   * 
   * @returns A message to be shown by Fehler
   */
     const showError = () => {
         if (error) {
             return <h3 className="text-danger">Kategorie soll einzigartig sein</h3>;
         }
     };
 
     /**
      * 
      * @returns A link to go back to dashboard
      */
     const goBack = () => (
         <div className="mt-5">
             <Link to="/admin/dashboard" className="text-warning">
                 Zurück zum Dashboard
             </Link>
         </div>
     );
 
     return (
         <Layout
             title="Füge eine neue Katogerie hinzu"
             description={`Guten Tag ${user.name}, sind Sie bereit eine neue Kategorie hinzufügen?`}
         >
             <div className="row">
                 <div className="col-md-8 offset-md-2">
                     {showSuccess()}
                     {showError()}
                     {newCategoryForm()}
                     {goBack()}
                 </div>
             </div>
         </Layout>
     );
 };
 
 export default AddCategory;
 