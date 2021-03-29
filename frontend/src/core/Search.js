/**
 * @author: Sakhr Al-absi
 * @Gruppe: 6
 * @Matrikelnummer: s0562218
 */
 import React, { useState, useEffect } from "react";
 import { getCategories, list } from "./apiCore";
 import Card from "./Card";
 
 /**
  * 
  * @returns die gesuchte Produkte in einem div-element
  */
 const Search = () => {
     const [data, setData] = useState({
         categories: [],
         category: "",
         search: "",
         results: [],
         searched: false
     });
     
     // instead of having to write data.search, data.category etc..
     const { categories, category, search, results, searched } = data;
     
     /**
      * get all the categories from the backend
      */
     const loadCategories = () => {
         getCategories().then(data => {
             if (data.error) {
                 console.log(data.error);
             } else {
                 setData({ ...data, categories: data });
             }
         });
     };
 
     useEffect(() => {
         loadCategories();
     }, []);
     
     const searchData = () => {
         // console.log(search, category);
         if (search) {
             list({ search: search || undefined, category: category }).then(
                 response => {
                     if (response.error) {
                         console.log(response.error);
                     } else {
                         setData({ ...data, results: response, searched: true });
                     }
                 }
             );
         }
     };
 
     const searchSubmit = e => {
         e.preventDefault();
         searchData();
     };
 
     const handleChange = name => event => {
         setData({ ...data, [name]: event.target.value, searched: false });
     };
     
     const searchMessage = (searched, results) => {
         if (searched && results.length === 1) {
             return `${results.length} Produkt wurde gefunden`
         }
         if (searched && results.length > 1) {
             return `${results.length} Produkte wurden gefunden`;
         }
         if (searched && results.length < 1) {
             return `Keine Produkte wurden gefunden`;
         }
     };
     
     /**
      * 
      * @param {*} results 
      * @returns das Ergebnis alle Produkte, die gesucht werden verknuepft
      *             mit einer Nachricht, ob proukte gefunden worden oder nicth
      */
     const searchedProducts = (results = []) => {
         return (
             <div>
                 <h2 className="mt-4 mb-4">
                     {searchMessage(searched, results)}
                 </h2>
                 <div className="row">
                     {results.map((product, i) => (
                         <Card key={i} product={product} />
                     ))}
                 </div>
             </div>
         );
     };
     
     /**
      * 
      * @returns ein Form-Element das eine Eingabe-Feld, Button zum Suchen, Select option aufzeigt
      */
     const searchForm = () => (
         <form onSubmit={searchSubmit}>
             <span className="input-group-text">
                 <div className="input-group input-group-lg">
                     <div className="input-group-prepend">
                         <select
                             className="btn mr-2"
                             onChange={handleChange("category")}
                         >
                             <option value="All">Alle</option>
                             {categories.map((c, i) => (
                                 <option key={i} value={c._id}>
                                     {c.name}
                                 </option>
                             ))}
                         </select>
                     </div>
 
                     <input
                         type="search"
                         className="form-control"
                         onChange={handleChange("search")}
                         placeholder="Search by name"
                     />
                 </div>
                 <div
                     className="btn input-group-append"
                     style={{ border: "none" }}
                 >
                     <button className="input-group-text">Suchen</button>
                 </div>
             </span>
         </form>
     );
 
     return (
         <div className="row">
             <div className="container mb-3">{searchForm()}</div>
             <div className="container-fluid mb-3">
                 {searchedProducts(results)}
             </div>
         </div>
     );
 };
 
 export default Search;
 