package com.rahmani.backend.controller;

import com.rahmani.backend.model.Product;
import com.rahmani.backend.payload.ProductDto;
import com.rahmani.backend.repository.ProductRepository;
import com.rahmani.backend.service.AdminProductService;
import com.rahmani.backend.service.ImageUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
public class AdminProductController {

    private final AdminProductService service;
    private final ImageUploadService imageUploadService;
    private final ProductRepository productRepository;

    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody ProductDto productDto) {
        return ResponseEntity.ok(service.addProduct(productDto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        return service.deleteProduct(id);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(service.getAllProducts());
    }

    @PostMapping(value = "/add-with-image", consumes = {"multipart/form-data"})
    public ResponseEntity<Product> addProductWithImage(
            @RequestPart("product") ProductDto productDto,
            @RequestPart("image") MultipartFile image) throws java.io.IOException {

        // 1. Upload Image to Cloudinary
        String imageUrl = imageUploadService.uploadImage(image);

        // 2. Create Product
        Product product = new Product();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setCategory(productDto.getCategory());
        product.setImageUrl(imageUrl); // <--- Use the Cloudinary URL
        product.setRating(0.0);
        product.setColors(productDto.getColors());
        product.setSizes(productDto.getSizes());

        return ResponseEntity.ok(productRepository.save(product));
    }
}
