/**
 * @author: Sakhr Al-absi
 * @Gruppe: 6
 * @Matrikelnummer: s0562218
 */
 import React, { useState, useEffect } from "react";
 import Layout from "./Layout";
 import Card from "./Card";
 import { getCategories, getFilteredProducts } from "./apiCore";
 import Checkbox from "./Checkbox";
 import RadioBox from "./RadioBox";
 import { prices } from "./fixedPrices";
 
 /**
  * 
  * @returns a div element with different div containers: category filter, price filter and list of products
  */
 const Shop = () => {
     const [myFilters, setMyFilters] = useState({
         filters: { category: [], price: [] }
     });
     const [categories, setCategories] = useState([]);
     const [error, setError] = useState(false);
     const [limit, setLimit] = useState(6);
     const [skip, setSkip] = useState(0);
     const [size, setSize] = useState(0);
     const [filteredResults, setFilteredResults] = useState([]);
 
     const init = () => {
         getCategories().then(data => {
             if (data.error) {
                 setError(data.error);
             } else {
                 setCategories(data);
             }
         });
     };
     
     /**
      * Will get the filted results accordingly
      * @param {*} newFilters 
      */
     const loadFilteredResults = newFilters => {
         // console.log(newFilters);
         getFilteredProducts(skip, limit, newFilters).then(data => {
             if (data.error) {
                 setError(data.error);
             } else {
                 setFilteredResults(data.data);
                 setSize(data.size);
                 setSkip(0);
             }
         });
     };
     
     /**
      * If there are more products shown than the limit than
      * one has the possibility to load more
      */
     const loadMore = () => {
         let toSkip = skip + limit;
         // console.log(newFilters);
         getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
             if (data.error) {
                 setError(data.error);
             } else {
                 setFilteredResults([...filteredResults, ...data.data]);
                 setSize(data.size);
                 setSkip(toSkip);
             }
         });
     };
     
     /**
      * 
      * @returns the button to show more items which one filters out using the method above
      */
     const loadMoreButton = () => {
         return (
             size > 0 &&
             size >= limit && (
                 <button onClick={loadMore} className="btn btn-warning mb-5">
                     Mehr zeigen...
                 </button>
             )
         );
     };
 
     useEffect(() => {
         init();
         loadFilteredResults(skip, limit, myFilters.filters);
     }, []);
     
     /**
      * handles filters according to their price or category
      * if the price === the price chosen in handlePrice then return 
      * new values of the filtered result
      * @param {*} filters 
      * @param {*} filterBy 
      */
     const handleFilters = (filters, filterBy) => {
         // console.log("SHOP", filters, filterBy);
         const newFilters = { ...myFilters };
         newFilters.filters[filterBy] = filters;
 
         if (filterBy === "price") {
             let priceValues = handlePrice(filters);
             newFilters.filters[filterBy] = priceValues;
         }
         loadFilteredResults(myFilters.filters);
         setMyFilters(newFilters);
     };
     
     /**
      * @param {*} value 
      * @returns 
      */
     const handlePrice = value => {
         const data = prices;
         let array = [];
 
         for (let key in data) {
             if (data[key]._id === parseInt(value)) {
                 array = data[key].array;
             }
         }
         return array;
     };
 
     return (
         <Layout
             title="Shop Seite"
             description="Suchen Sie und finden Sie Ihr lieblings Produkt"
             className="container-fluid"
         >
             <div className="row">
                 <div className="col-4">
                     <h4>Mit Kategorien filtern</h4>
                     <ul>
                         <Checkbox
                             categories={categories}
                             handleFilters={filters =>
                                 handleFilters(filters, "category")
                             }
                         />
                     </ul>
 
                     <h4>Mit Preispanne filtern</h4>
                     <div>
                         <RadioBox
                             prices={prices}
                             handleFilters={filters =>
                                 handleFilters(filters, "price")
                             }
                         />
                     </div>
                 </div>
 
                 <div className="col-8">
                     <h2 className="mb-4">Produkte</h2>
                     <div className="row">
                         {filteredResults.map((product, i) => (
                             <div key={i} className="col-4 mb-3">
                                 <Card product={product} />
                             </div>
                         ))}
                     </div>
                     <hr />
                     {loadMoreButton()}
                 </div>
             </div>
         </Layout>
     );
 };
 
 export default Shop;
 