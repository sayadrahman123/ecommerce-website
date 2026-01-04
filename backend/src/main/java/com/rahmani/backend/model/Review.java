package com.rahmani.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int rating; // 1 to 5
    private String comment;
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"password", "roles", "orders"}) // Don't send sensitive user info
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnoreProperties("reviews") // Prevent infinite loops
    private Product product;
}