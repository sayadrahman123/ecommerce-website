package com.rahmani.backend.service;

import com.rahmani.backend.model.*;
import com.rahmani.backend.payload.OrderDto;
import com.rahmani.backend.repository.CartRepository;
import com.rahmani.backend.repository.OrderRepository;
import com.rahmani.backend.repository.PaymentRepository;
import com.rahmani.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;


    @Transactional
    // CHANGED: Now accepts transactionId
    public OrderDto placeOrder(Long userId, String transactionId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // 1. Create Order
        Order order = new Order();
        order.setUser(user);
        order.setOrderTrackingId(generateOrderTrackingId());
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PAID"); // Now we know it's paid!
        order.setTotalAmount(cart.getTotalPrice().add(new BigDecimal("15.00"))); // Ensure match with Stripe calculation

        // 2. Create OrderItems (Keep existing logic)
        List<OrderItem> orderItems = cart.getItems().stream().map(cartItem -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice());
            return orderItem;
        }).collect(Collectors.toList());

        order.setOrderItems(orderItems);
        Order savedOrder = orderRepository.save(order);

        // 3. NEW: Save Payment Record
        Payment payment = new Payment();
        payment.setOrder(savedOrder);
        payment.setTransactionId(transactionId);
        payment.setPaymentMethod("Stripe");
        payment.setStatus("SUCCESS");
        payment.setAmount(order.getTotalAmount());
        payment.setPaymentDate(LocalDateTime.now());

        paymentRepository.save(payment); // <--- Saving the proof!

        // 4. Clear Cart (Keep existing logic)
        cart.getItems().clear();
        cart.setTotalPrice(BigDecimal.ZERO);
        cartRepository.save(cart);

        return mapToDto(savedOrder);
    }

    public List<OrderDto> getUserOrders(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUserOrderByOrderDateDesc(user).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }


    private String generateOrderTrackingId() {
        // "OD" + Current Time in Milliseconds + Random 4-digit number
        // Example: OD + 1704289000000 + 5678 = OD17042890000005678
        return "OD" + System.currentTimeMillis() + (1000 + new java.util.Random().nextInt(9000));
    }


    private OrderDto mapToDto(Order order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setTrackingId(order.getOrderTrackingId());
        dto.setOrderDate(order.getOrderDate());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());

        List<OrderDto.OrderItemDto> itemDtos = order.getOrderItems().stream().map(item -> {
            OrderDto.OrderItemDto itemDto = new OrderDto.OrderItemDto();
            itemDto.setProductName(item.getProduct().getName());
            itemDto.setProductImage(item.getProduct().getImageUrl());
            itemDto.setQuantity(item.getQuantity());
            itemDto.setPrice(item.getPrice());
            return itemDto;
        }).collect(Collectors.toList());

        dto.setItems(itemDtos);
        return dto;
    }



}
