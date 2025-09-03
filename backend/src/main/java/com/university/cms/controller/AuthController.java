package com.university.cms.controller;

import com.university.cms.dto.LoginRequest;
import com.university.cms.dto.LoginResponse;
import com.university.cms.dto.RegisterRequest;
import com.university.cms.entity.User;
import com.university.cms.entity.Role;
import com.university.cms.security.JwtUtils;
import com.university.cms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Autowired
    private com.university.cms.repository.UserRepository userRepository;
    
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateToken((UserDetails) authentication.getPrincipal());
        
        User user = userService.findByUsername(loginRequest.getUsername()).orElse(null);
        
        LoginResponse response = new LoginResponse(jwt, user.getUsername(), user.getEmail(), 
                user.getFirstName(), user.getLastName(), user.getRole());
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/register")
     public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
       try {
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(registerRequest.getPassword());
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setRole(registerRequest.getRole());

        User savedUser = userService.createUser(user);

        // Remove password from response
        savedUser.setPassword(null);
        return ResponseEntity.ok(savedUser);
      } catch (Exception e) {
        return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
      }
     }
    @GetMapping("/users/count")
    public ResponseEntity<Long> getUserCount() {
        long count = userRepository.count();
        return ResponseEntity.ok(count);
    }
}
