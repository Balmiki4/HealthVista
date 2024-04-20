import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    "pk_test_51P7RZFCUIRJhmuXG0JS7L77N6TEJcxZjzAkZeGnswlardQNfrbftOkI99lNy9mKNrC8HunsKLTKYcuxb2ppsak2D00AxDtz6PB"
  );
  
export const handlePayment = async (selectedPlan, customerId, history) => {
    try {
      const response = await fetch("http://localhost:5000/get-stripe-price-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedPlan }),
      });
      const { priceId } = await response.json();
  
      const sessionResponse = await fetch(
        "http://localhost:5000/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priceId, customerId, selectedPlan }),
        }
      );
      const { sessionId } = await sessionResponse.json();
  
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });
  
      if (error) {
        console.error("Error:", error);
        // Display error message to the user here
      } else {
        history.push("/success");
      }
    } catch (error) {
      console.error("Error in payment process:", error);
      // Display error message to the user here
    }
  };