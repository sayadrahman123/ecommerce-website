package com.rahmani.backend.payload;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class CartItemDto {
    private Long id;
    private Long productId;
    private String productName;
    private String productImage;
    private BigDecimal price;
    private int quantity;
}