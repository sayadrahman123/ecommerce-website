package com.rahmani.backend.payload;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class CartDto {
    private Long id;
    private BigDecimal totalPrice;
    private List<CartItemDto> items;
}