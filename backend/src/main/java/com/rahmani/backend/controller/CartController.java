package com.rahmani.backend.controller;


import com.rahmani.backend.payload.AddToCartRequest;
import com.rahmani.backend.model.User;
import com.rahmani.backend.payload.CartDto;
import com.rahmani.backend.repository.UserRepository;
import com.rahmani.backend.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final UserRepository userRepository;
    private final CartService cartService;

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        return user.getId();
    }

    @GetMapping
    public ResponseEntity<CartDto> getCart() {
        return ResponseEntity.ok(cartService.getCartByUser(getCurrentUserId()));
    }

    @PostMapping("/add")
    public ResponseEntity<CartDto> addToCart(@RequestBody AddToCartRequest request) {
        return ResponseEntity.ok(cartService.addToCart(getCurrentUserId(), request.getProductId(), request.getQuantity()));
    }

    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<CartDto> removeFromCart(@PathVariable Long itemId) {
        return ResponseEntity.ok(cartService.removeFromCart(getCurrentUserId(), itemId));
    }
}
