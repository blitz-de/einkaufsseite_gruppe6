/**
 * @author: Sakhr Al-absi
 * @Gruppe: 6
 * @Matrikelnummer: s0562218
 */
 import React, { useState } from "react";
 import { Link, Redirect } from "react-router-dom";
 import ShowImage from "./ShowImage";
 import moment from "moment";
 import { addItem, updateItem, removeItem } from "./cartHelpers";
 
 /**
  * @param {*} param0 
  * @returns the quantity of products, the viewButton , the add to card option
  *           the remove option, and eventually an option to update the cart
  */
 const Card = ({
     product,
     showViewProductButton = true,
     showAddToCartButton = true,
     cartUpdate = false,
     showRemoveProductButton = false
 }) => {
     const [redirect, setRedirect] = useState(false);
     const [count, setCount] = useState(product.count);
 
     /**
      * Zeigt das "Produkt anzeigen" Button auf und leitet nach dem Klich auf das Produkt weiter
      * @param {*} showViewProductButton 
      * @returns das bttn mit dem zugewiesen Link nach einem klick
      */
     const showViewButton = showViewProductButton => {
         return (
             showViewProductButton && (
                 <Link to={`/product/${product._id}`} className="mr-2">
                     <button className="btn btn-outline-primary mt-2 mb-2">
                         Produkt anzeigen
                     </button>
                 </Link>
             )
         );
     };
     
     /**
      * when a product is added it will be redirected to /cart
      */
     const addToCart = () => {
         addItem(product, () => {
             setRedirect(true);
         });
     };
     
     /**
      * 
      * @param {*} redirect 
      * @returns 
      */
     const shouldRedirect = redirect => {
         if (redirect) {
             return <Redirect to="/cart" />;
         }
     };
     
     /**
      * 
      * @param {*} showAddToCartButton 
      * @returns button which adds the item (product) when clicked
      */
     const showAddToCart = showAddToCartButton => {
         return (
             showAddToCartButton && (
                 <button
                     onClick={addToCart}
                     className="btn btn-outline-warning mt-2 mb-2"
                 >
                     zum Einkaufswagen hinzufügen
                 </button>
             )
         );
     };
     
     /**
      * 
      * @param {*} showRemoveProductButton 
      * @returns button which removes the item, when clicked
      */
     const showRemoveButton = showRemoveProductButton => {
         return (
             showRemoveProductButton && (
                 <button
                     onClick={() => removeItem(product._id)}
                     className="btn btn-outline-danger mt-2 mb-2"
                 >
                     Produkt entfernen
                 </button>
             )
         );
     };
     
     /**
      * 
      * @param {*} quantity 
      * @returns if stock ain't empty show what we have, else there is nothing
      */
     const showStock = quantity => {
         return quantity > 0 ? (
             <span className="badge badge-primary badge-pill">Im Lager</span>
         ) : (
             <span className="badge badge-primary badge-pill">Nicht im Lager</span>
         );
     };
     
     /**
      * an event handler which will update the items, when 
      * there's at least one item
      * @param {} productId 
      * @returns 
      */
     const handleChange = productId => event => {
         setCount(event.target.value < 1 ? 1 : event.target.value);
         if (event.target.value >= 1) {
             updateItem(productId, event.target.value);
         }
     };
 
     /**
      * a div-element which will show the update options and also
      * shows an input field where the count can be entered
      * @param {*} cartUpdate 
      * @returns 
      */
     const showCartUpdateOptions = cartUpdate => {
         return (
             cartUpdate && (
                 <div>
                     <div className="input-group mb-3">
                         <div className="input-group-prepend">
                             <span className="input-group-text">
                                 Quantität bearbeiten
                             </span>
                         </div>
                         <input
                             type="number"
                             className="form-control"
                             value={count}
                             onChange={handleChange(product._id)}
                         />
                     </div>
                 </div>
             )
         );
     };
 
     return (
         <div className="card">
             <div className="card-header name">{product.name}</div>
             <div className="card-body">
                 {shouldRedirect(redirect)}
                 <ShowImage item={product} url="product" />
                 <p className="lead mt-2">
                     {product.description.substring(0, 100)}
                 </p>
                 <p className="black-10">{product.price} €</p>
                 <p className="black-9">
                     Kategorie: {product.category && product.category.name}
                 </p>
                 <p className="black-8">
                     Hinzugefügt vor {moment.locale("de"), moment(product.createdAt).fromNow()}
                 </p>
 
                 {showStock(product.quantity)}
                 <br />
 
                 {showViewButton(showViewProductButton)}
 
                 {showAddToCart(showAddToCartButton)}
 
                 {showRemoveButton(showRemoveProductButton)}
 
                 {showCartUpdateOptions(cartUpdate)}
             </div>
         </div>
     );
 };
 
 export default Card;
 