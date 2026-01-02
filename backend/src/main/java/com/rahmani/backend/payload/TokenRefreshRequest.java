package com.rahmani.backend.payload;

import lombok.Data;

@Data
public class TokenRefreshRequest {
    private String refreshToken;
}
