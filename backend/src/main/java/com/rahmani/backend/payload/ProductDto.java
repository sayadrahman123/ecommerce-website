package com.rahmani.backend.payload;


import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String imageUrl;
    private String category;
    private List<String> colors;
    private List<String> sizes;
}
