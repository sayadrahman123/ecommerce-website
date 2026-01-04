package com.rahmani.backend.repository;

import com.rahmani.backend.model.Product;
import com.rahmani.backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProduct(Product product);
}