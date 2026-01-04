package com.rahmani.backend.controller;

import com.rahmani.backend.model.Review;
import com.rahmani.backend.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/{productId}")
    public ResponseEntity<List<Review>> getProductReviews(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getProductReviews(productId));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addReview(@RequestBody Map<String, Object> payload) {
        return reviewService.addReview(payload);
    }
}
