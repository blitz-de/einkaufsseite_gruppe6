/**
 * @author: Sakhr Al-absi
 * @Gruppe: 6
 * @Matrikelnummer: s0562218
 */
 import React, { useState, useEffect } from "react";

 const RadioBox = ({ prices, handleFilters }) => {
     const [value, setValue] = useState(0);
 
     const handleChange = event => {
         handleFilters(event.target.value);
         setValue(event.target.value); 
        //  console.log(event.target)
     };
 
     return prices.map((p, i) => (
         <div key={i}>
             <input
                 onChange={handleChange}
                 value={`${p._id}`}
                 name={p}
                 type="radio"
                 className="mr-2 ml-4"
             />
             <label className="form-check-label">{p.name}</label>
         </div>
     ));
 };
 
 export default RadioBox;
 