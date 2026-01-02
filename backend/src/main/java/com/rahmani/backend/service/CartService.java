package com.rahmani.backend.service;

import com.rahmani.backend.model.Cart;
import com.rahmani.backend.model.CartItem;
import com.rahmani.backend.model.Product;
import com.rahmani.backend.model.User;
import com.rahmani.backend.payload.CartDto;      // Import DTO
import com.rahmani.backend.payload.CartItemDto;  // Import DTO
import com.rahmani.backend.repository.CartItemRepository;
import com.rahmani.backend.repository.CartRepository;
import com.rahmani.backend.repository.ProductRepository;
import com.rahmani.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public CartDto getCartByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        return mapToDto(cart);
    }

    @Transactional
    public CartDto addToCart(Long userId, Long productId, int quantity) {
        // ... (Same logic as before to find user/cart) ...
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = cartRepository.findByUser(user).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUser(user);
            return cartRepository.save(newCart);
        });

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(quantity);
            newItem.setPrice(product.getPrice());
            cart.getItems().add(newItem);
        }

        updateCartTotal(cart);
        Cart savedCart = cartRepository.save(cart);
        return mapToDto(savedCart); // Return DTO
    }

    @Transactional
    public CartDto removeFromCart(Long userId, Long cartItemId) {
        // ... (Same logic as before) ...
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = cartRepository.findByUser(user).orElseThrow();

        cart.getItems().removeIf(item -> item.getId().equals(cartItemId));

        updateCartTotal(cart);
        Cart savedCart = cartRepository.save(cart);
        return mapToDto(savedCart); // Return DTO
    }

    private void updateCartTotal(Cart cart) {
        BigDecimal total = cart.getItems().stream()
                .map(item -> item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        cart.setTotalPrice(total);
    }

    // --- NEW MAPPING METHOD ---
    private CartDto mapToDto(Cart cart) {
        CartDto dto = new CartDto();
        dto.setId(cart.getId());
        dto.setTotalPrice(cart.getTotalPrice());

        List<CartItemDto> itemDtos = cart.getItems().stream().map(item -> {
            CartItemDto itemDto = new CartItemDto();
            itemDto.setId(item.getId());
            itemDto.setQuantity(item.getQuantity());
            itemDto.setPrice(item.getProduct().getPrice());
            itemDto.setProductId(item.getProduct().getId());
            itemDto.setProductName(item.getProduct().getName());
            itemDto.setProductImage(item.getProduct().getImageUrl());
            return itemDto;
        }).collect(Collectors.toList());

        dto.setItems(itemDtos);
        return dto;
    }
}