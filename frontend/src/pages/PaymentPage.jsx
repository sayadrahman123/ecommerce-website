import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { createPaymentIntent } from '../services/api';

// REPLACE THIS with your actual Publishable Key from Stripe Dashboard
const stripePromise = loadStripe("pk_test_51SlVkHJKgeFxQp9bdeXIGQsEsVdYxzdTzTUEktkuGPjlGn7nvMG6VEEibEQUGxA72CtdQMjMA3WFuB7CGJ0IcuwR00vIQskpmN");

const PaymentPage = () => {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // 1. Ask Backend to create a Payment Intent when page loads
        const getSecret = async () => {
            try {
                const data = await createPaymentIntent();
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error("Failed to initialize payment:", error);
                alert("Could not load checkout. Is your cart empty?");
            }
        };
        getSecret();
    }, []);

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe', // 'stripe' or 'night' or 'flat'
        },
    };

    return (
        <div className="container mx-auto px-6 py-12 max-w-lg">
            <h1 className="text-3xl font-display font-bold mb-8 text-center">Secure Checkout</h1>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                {clientSecret ? (
                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm />
                    </Elements>
                ) : (
                    <div className="text-center py-10">Loading Payment Gateway...</div>
                )}
            </div>
        </div>
    );
};

export default PaymentPage;