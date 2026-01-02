package com.rahmani.backend.service;

import com.rahmani.backend.model.User;
import com.rahmani.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder; // Import this
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // Inject the encoder

    // REGISTER LOGIC
    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        // HASH THE PASSWORD BEFORE SAVING
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    // LOGIN LOGIC
    public User loginUser(String email, String rawPassword) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            // COMPARE RAW PASSWORD WITH HASHED PASSWORD
            // .matches(raw, hashed) returns true if they match
            if (passwordEncoder.matches(rawPassword, user.get().getPassword())) {
                return user.get();
            }
        }
        return null;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}