package com.mizule.server.controllers;

import com.mizule.server.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/v1/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody Map<String, String> cred){
        return authService.signin(cred);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> cred){
        return authService.signup(cred);
    }

    @PostMapping("/login-with-google")
    public ResponseEntity<?> loginWithGoogle(@RequestBody Map<String, String> cred){
        return authService.loginWithGoogle(cred);
    }
}