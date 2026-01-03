package com.rahmani.backend.service;

import com.rahmani.backend.model.Cart;
import com.rahmani.backend.model.User;
import com.rahmani.backend.repository.CartRepository;
import com.rahmani.backend.repository.UserRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    // Initialize Stripe with your Secret Key when the app starts
    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    @Transactional
    public String createPaymentIntent(Long userId) throws StripeException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // Calculate Total (Add shipping logic here if needed, e.g. + 15)
        BigDecimal totalAmount = cart.getTotalPrice().add(new BigDecimal("15.00")); // Adding $15 delivery fee

        // Stripe expects amount in CENTS (e.g., $10.00 -> 1000)
        long amountInCents = totalAmount.multiply(new BigDecimal("100")).longValue();

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency("usd")
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build()
                )
                .build();

        // Call Stripe API
        PaymentIntent paymentIntent = PaymentIntent.create(params);

        // Return the "Client Secret" (The frontend needs this to open the payment form)
        return paymentIntent.getClientSecret();
    }
}