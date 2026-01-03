package com.rahmani.backend.controller;

import com.rahmani.backend.model.RefreshToken;
import com.rahmani.backend.model.User;
import com.rahmani.backend.payload.JwtResponse;
import com.rahmani.backend.payload.TokenRefreshRequest;
import com.rahmani.backend.security.JwtUtils;
import com.rahmani.backend.service.RefreshTokenService;
import com.rahmani.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(registeredUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> loginData) {

        // 1. Authenticate using Spring Security Manager
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginData.get("email"), loginData.get("password")));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 2. Generate JWT
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwt = jwtUtils.generateTokenFromUsername(userDetails.getUsername());

        // 3. Generate Refresh Token
        // Need to fetch the User entity ID
        User user = userService.findByEmail(userDetails.getUsername());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

        // 4. Return Response
        return ResponseEntity.ok(new JwtResponse(
                jwt,
                refreshToken.getToken(),
                user.getId(),
                user.getName(),
                user.getEmail(),
                List.of(user.getRole()) // Single role in list for now
        ));
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(@RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtUtils.generateTokenFromUsername(user.getEmail());
                    return ResponseEntity.ok(Map.of(
                            "accessToken", token,
                            "refreshToken", requestRefreshToken
                    ));
                })
                .orElseThrow(() -> new RuntimeException("Refresh token is not in database!"));
    }
}