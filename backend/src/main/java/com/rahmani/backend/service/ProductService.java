package com.rahmani.backend.service;

import com.rahmani.backend.model.Product;
import com.rahmani.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor // Lombok automatically creates constructor for dependency injection
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    // Helper method to add products (for testing later)
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }
}