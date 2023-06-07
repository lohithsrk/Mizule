package com.mizule.server.controllers;

import com.mizule.server.services.FetchZuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/v1/fetch")
public class FetchZuleController {

    private final FetchZuleService fetchZuleService;

    @GetMapping("/random")
    public ResponseEntity<?> randomZules(@RequestParam Integer offset, @RequestParam Integer limit) {
        return fetchZuleService.randomZules(offset, limit);
    }

    @GetMapping("/particular/{zuleId}")
    public ResponseEntity<?> getParticularZule(@PathVariable String zuleId) {
        return fetchZuleService.getParticularZule(zuleId);
    }

    @GetMapping("/{zulespotId}/{userId}/{zuleId}")
    public ResponseEntity<?> getParticularZule(@PathVariable String zulespotId, @PathVariable String userId, @PathVariable String zuleId) throws IOException {
        return fetchZuleService.feedZule(zulespotId, userId, zuleId);
    }
}
