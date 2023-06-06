package com.mizule.server.controllers;

import com.mizule.server.models.Users;
import com.mizule.server.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}/history")
    public ResponseEntity<?> history(@PathVariable("id") String id) {
        return userService.getHistory(id);
    }

    @PostMapping("/history")
    public ResponseEntity<?> history(@RequestBody Map<String,String> body) {
        return userService.postHistory(body);
    }

}
