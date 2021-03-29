/**
 * @author: Sakhr Al-absi
 * @Gruppe: 6
 * @Matrikelnummer: s0562218
 */
 import React from "react";
 import Layout from "../core/Layout";
 import { isAuthenticated } from "../auth";
 import { Link } from "react-router-dom";
 
 /**
  * Will have user links, user info, and purchase history
  * @returns the <div> containing the userLinks(), userInfo() and puchaseHistory()
  */
 const Dashboard = () => {
     const {
         user: { _id, name, email, role }
     } = isAuthenticated();
 
     const userLinks = () => {
         return (
             <div className="card">
                 <h4 className="card-header">Benutzer Links</h4>
                 <ul className="list-group">
                     <li className="list-group-item">
                         <Link className="nav-link" to="/cart">
                             Mein Einkaufswagen
                         </Link>
                     </li>
                     <li className="list-group-item">
                         <Link className="nav-link" to="/profile/update">
                             Profil bearbeiten
                         </Link>
                     </li>
                 </ul>
             </div>
         );
     };
 
     const userInfo = () => {
         return (
             <div className="card mb-5">
                 <h3 className="card-header">Benutzerinformationen</h3>
                 <ul className="list-group">
                     <li className="list-group-item">{name}</li>
                     <li className="list-group-item">{email}</li>
                     <li className="list-group-item">
                         {role === 1 ? "Admin" : "Registered User"}
                     </li>
                 </ul>
             </div>
         );
     };
 
     const purchaseHistory = () => {
         return (
             <div className="card mb-5">
                 <h3 className="card-header">Einkaufsverlauf</h3>
                 <ul className="list-group">
                     <li className="list-group-item">verlauf</li>
                 </ul>
             </div>
         );
     };
 
     return (
         <Layout
             title="Dashboard"
             description={`Guten Tag ${name}!`}
             className="container-fluid"
         >
             <div className="row">
                 <div className="col-3">{userLinks()}</div>
                 <div className="col-9">
                     {userInfo()}
                     {purchaseHistory()}
                 </div>
             </div>
         </Layout>
     );
 };
 
 export default Dashboard;
 