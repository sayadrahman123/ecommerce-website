package com.rahmani.backend.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String refreshToken;
    private Long id;
    private String username;
    private String email;
    private List<String> roles;

    public <E> JwtResponse(String jwt, String token, Long id, String name, String email, List<E> role) {
        this.token = jwt;
        this.refreshToken = token;
        this.id = id;
        this.username = name;
        this.email = email;
        this.roles = (List<String>) role;
    }
}
