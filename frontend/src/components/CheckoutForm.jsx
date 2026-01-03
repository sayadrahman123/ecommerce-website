import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { placeOrder } from '../services/api'; // Reuse our existing order logic
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);

        // 1. Confirm Payment with Stripe
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // We handle redirection manually after success, so we don't need a return_url for now
                // But Stripe requires it or a redirect: 'if_required'
                return_url: window.location.origin + "/orders",
            },
            redirect: "if_required", // Important: Prevents auto-redirect so we can save the order first
        });

        if (error) {
            setMessage(error.message);
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            // 2. Payment Success! Now we save the order in our Database
            try {
                await placeOrder(paymentIntent.id); // Call backend to move Cart -> Order
                alert("Payment Successful! Order Placed.");
                navigate('/orders');
            } catch (err) {
                console.error("Order save failed:", err);
                alert("Payment succeeded, but order creation failed. Contact support.");
            }
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />

            {message && <div className="text-red-500 text-sm">{message}</div>}

            <button
                disabled={isProcessing || !stripe || !elements}
                id="submit"
                className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isProcessing ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
};

export default CheckoutForm;