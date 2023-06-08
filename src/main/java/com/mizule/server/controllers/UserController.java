package com.mizule.server.controllers;

import com.mizule.server.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(path = "api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}/liked")
    public ResponseEntity<?> getLikes(@PathVariable("id") String id) {
        return userService.getLiked(id);
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<?> getHistory(@PathVariable("id") String id) {
        return userService.getHistory(id);
    }

    @PostMapping("/history")
    public ResponseEntity<?> history(@RequestBody Map<String, String> body) {
        return userService.postHistory(body);
    }

}
