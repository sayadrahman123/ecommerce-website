package com.rahmani.backend.service;


import com.rahmani.backend.model.Product;
import com.rahmani.backend.model.Review;
import com.rahmani.backend.model.User;
import com.rahmani.backend.repository.OrderRepository;
import com.rahmani.backend.repository.ProductRepository;
import com.rahmani.backend.repository.ReviewRepository;
import com.rahmani.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;


    public List<Review> getProductReviews(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return reviewRepository.findByProduct(product);
    }

    public ResponseEntity<?> addReview(Map<String, Object> payload) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Long productId = Long.valueOf(payload.get("productId").toString());
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        boolean hasPurchased = orderRepository.existsByUserAndProduct(user, product);

        if (!hasPurchased) {
            return ResponseEntity.status(403).body("You can only review products you have purchased.");
        }

        Review review = new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setRating(Integer.parseInt(payload.get("rating").toString()));
        review.setComment(payload.get("comment").toString());
        review.setCreatedAt(LocalDateTime.now());

        reviewRepository.save(review);

        updateProductRating(product);

        return ResponseEntity.ok("Review added successfully.");

    }

    private void updateProductRating(Product product) {
        List<Review> reviews = reviewRepository.findByProduct(product);
        double average = reviews.stream().mapToInt(Review::getRating).average().orElse(0.0);
        product.setRating(average);
        productRepository.save(product);
    }
}
