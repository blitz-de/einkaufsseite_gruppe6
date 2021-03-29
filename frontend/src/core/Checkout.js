/**
 * @author: Sakhr Al-absi
 * @Gruppe: 6
 * @Matrikelnummer: s0562218
 */
 import React, { useState, useEffect } from "react";
 import {
     getProducts,
     getBraintreeClientToken,
     processPayment
 } from "./apiCore";
 import { emptyCart } from "./cartHelpers";
 import Card from "./Card";
 import { isAuthenticated } from "../auth";
 import { Link } from "react-router-dom";
 import DropIn from "braintree-web-drop-in-react";
 
 const Checkout = ({ products }) => {
     const [data, setData] = useState({
         loading: false,
         success: false,
         clientToken: null,
         error: "",
         instance: {},
         address: ""
     });
 
     const userId = isAuthenticated() && isAuthenticated().user._id;
     const token = isAuthenticated() && isAuthenticated().token;
 
     const getToken = (userId, token) => {
         getBraintreeClientToken(userId, token).then(data => {
             if (data.error) {
                 setData({ ...data, error: data.error });
             } else {
                 setData({ clientToken: data.clientToken });
             }
         });
     };
 
     useEffect(() => {
         getToken(userId, token);
     }, []);
 
     const getTotal = () => {
         return products.reduce((currentValue, nextValue) => {
             return currentValue + nextValue.count * nextValue.price;
         }, 0);
     };
 
     const showCheckout = () => {
         return isAuthenticated() ? (
             <div>{showDropIn()}</div>
         ) : (
             <Link to="/signin">
                 <button className="btn btn-primary">Loggen Sie ein, um auszuchecken</button>
             </Link>
         );
     };
 
     const buy = () => {
         setData({ loading: true });
         // senden um den Serven zu noncen
         // nonce = data.instance.requestPaymentMethod()
         let nonce;
         let getNonce = data.instance
             .requestPaymentMethod()
             .then(data => {
                 // console.log(data);
                 nonce = data.nonce;
                 // sobald man nonce hat (Kartetyp, Kartenummer) nonce senden als 'paymentMethodNonce'
                 // and also total to be charged
                 const paymentData = {
                     paymentMethodNonce: nonce,
                     amount: getTotal(products)
                 };
 
                 processPayment(userId, token, paymentData)
                     .then(response => {
                         console.log(response);
                         setData({ ...data, success: response.success });
                         emptyCart(() => {
                             console.log("payment success and empty cart");
                             setData({ loading: false });
                         });
                         // Einkaufswagen entleeren
 
                     })
                     .catch(error => {
                         console.log(error);
                         setData({ loading: false });
                     });
             })
             .catch(error => {
                 // console.log("dropin error: ", error);
                 setData({ ...data, error: error.message });
             });
     };
 
     const showDropIn = () => (
         <div onBlur={() => setData({ ...data, error: "" })}>
             {data.clientToken !== null && products.length > 0 ? (
                 <div>
                     <DropIn
                         options={{
                             authorization: data.clientToken,
                             paypal: {
                                 flow: "vault"
                             }
                         }}
                         onInstance={instance => (data.instance = instance)}
                     />
                     <button onClick={buy} className="btn btn-success btn-block">
                         Zahlen
                     </button>
                 </div>
             ) : null}
         </div>
     );
 
     const showError = error => (
         <div
             className="alert alert-danger"
             style={{ display: error ? "" : "none" }}
         >
             {error}
         </div>
     );
 
     const showSuccess = success => (
         <div
             className="alert alert-info"
             style={{ display: success ? "" : "none" }}
         >
             Danke! Ihre Zahlung war erfolgreich!
         </div>
     );
 
     const showLoading = loading =>
         loading && <h2 className="text-danger">Bitte Warten...</h2>;
 
     return (
         <div>
             <h2>Summe: ${getTotal()}</h2>
             {showLoading(data.loading)}
             {showSuccess(data.success)}
             {showError(data.error)}
             {showCheckout()}
         </div>
     );
 };
 
 export default Checkout;
 