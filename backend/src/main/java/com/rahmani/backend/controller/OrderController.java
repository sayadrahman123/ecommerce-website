package com.rahmani.backend.controller;

import com.rahmani.backend.model.User;
import com.rahmani.backend.payload.OrderDto;
import com.rahmani.backend.service.OrderService;
import com.rahmani.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userService.findByEmail(email);
        return user.getId();
    }

    @PostMapping("/checkout")
    public ResponseEntity<OrderDto> placeOrder() {
        return ResponseEntity.ok(orderService.placeOrder(getCurrentUserId()));
    }

    @GetMapping
    public ResponseEntity<OrderDto> getMyOrders() {
        return ResponseEntity.ok(orderService.placeOrder(getCurrentUserId()));
    }
}
