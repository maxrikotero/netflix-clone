import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import "./PlansScreen.css";

const PlansScreen = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [state, setState] = useState([
    {
      productId: 1,
      productData: { name: "Premium", description: "4K + HDR" },
    },
    { productId: 2, productData: { name: "Basic", description: "720p" } },
    {
      productId: 3,
      productData: { name: "Standard", description: "1800p" },
    },
  ]);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        let products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);
  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_utl: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error has occured: ${error.message}`);
      }
      if (sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe

        // Here is gonna be the stripe key to redirect to stripe payment
        const stripe = await loadStripe("testKey");
      }
    });
  };
  return (
    <div className="plansScreen">
      {/* {Object.entries.map(products).map(([productId, productData])) } */}
      {state.map(({ productId, productData }) => {
        return (
          <div className="plansScreen__plan">
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            {/* <button onClick={() => loadCheckout(productData.prices.priceId)}>Subscribe</button> */}
            <button onClick={() => loadCheckout()}>Subscribe</button>
          </div>
        );
      })}
    </div>
  );
};

export default PlansScreen;
