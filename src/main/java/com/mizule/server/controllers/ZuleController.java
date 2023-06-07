package com.mizule.server.controllers;

import com.mizule.server.services.ZuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping(path = "api/v1/zule")
@RequiredArgsConstructor
public class ZuleController {
    private final ZuleService zuleService;

    @PostMapping("/like")
    public ResponseEntity<?> liked(@RequestBody Map<String, String> body) {
        return zuleService.likeZule(body);
    }

    @PostMapping("/comment")
    public ResponseEntity<?> comment(@RequestBody Map<String, String> body) {
        return zuleService.comment(body);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createZule(
            @RequestParam Map<String, String> body,
            @RequestParam("thumbnail_16_9") MultipartFile thumbnail_16_9,
            @RequestParam("thumbnail_9_16") MultipartFile thumbnail_9_16,
            @RequestParam("zule") MultipartFile zule,
            @RequestParam("teaser") MultipartFile teaser
    ) throws IOException {
        return zuleService.createZule(body, thumbnail_16_9, thumbnail_9_16, zule, teaser);
    }
}
