/**
 * @author: Sakhr Al-absi
 * @Gruppe: 6
 * @Matrikelnummer: s0562218
 */
 import React, { useState, useEffect } from "react";
 import { Link } from "react-router-dom";
 import Layout from "./Layout";
 import { getCart } from "./cartHelpers";
 import Card from "./Card";
 import Checkout from "./Checkout";
 
 /**
  * @returns 
  */
 const Cart = () => {
     const [items, setItems] = useState([]);
    /**
     * In useEffect wird  run uebergeben, sodass useEffect
     * nur die Komponent aktualisiert, wenn sich das run state ändert
     */
     useEffect(() => {
         setItems(getCart());
     }, [items]);
     
     
     const showItems = items => {
         return (
             <div>
                 <h2>Ihr Einkaufswagen hat {`${items.length}`} Artikeln</h2>
                 <hr />
                 {items.map((product, i) => (
                     <Card
                         key={i}
                         product={product}
                         showAddToCartButton={false}
                         cartUpdate={true}
                         showRemoveProductButton={true}
                     />
                 ))}
             </div>
         );
     };
 
     const noItemsMessage = () => (
         <h2>
             Ihr Einkaufswagen ist leer. <br /> <Link to="/shop">Weiter einkaufen</Link>
         </h2>
     );
 
     return (
         <Layout
             title="Einkaufswagen"
             description="Einkaufswagen-Artikeln bearbeiten. Auschecken entfernen hinzufügen oder weiter einkaufen."
             className="container-fluid"
         >
             <div className="row">
                 <div className="col-6">
                     {items.length > 0 ? showItems(items) : noItemsMessage()}
                 </div>
 
                 <div className="col-6">
                     <h2 className="mb-4">Ihr Einkaufswagen-übersicht</h2>
                     <hr />
                     <Checkout products={items} />
                 </div>
             </div>
         </Layout>
     );
 };
 
 export default Cart;
 