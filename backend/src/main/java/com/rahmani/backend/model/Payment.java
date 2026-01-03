package com.rahmani.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private String transactionId; // The Stripe Payment Intent ID (pi_...)

    private String paymentMethod; // e.g., "Stripe", "PayPal"

    private String status; // "SUCCESS", "FAILED"

    private BigDecimal amount;

    private LocalDateTime paymentDate;
}