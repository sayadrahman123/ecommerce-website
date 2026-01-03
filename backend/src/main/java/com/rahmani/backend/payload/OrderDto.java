package com.rahmani.backend.payload;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDto {
    private Long id;
    private LocalDateTime orderDate;
    private BigDecimal totalAmount;
    private String status;
    private List<OrderItemDto> items;


    @Data
    public static class OrderItemDto {
        private Long id;
        private String productName;
        private String productImage;
        private int quantity;
        private BigDecimal price;
    }
}
