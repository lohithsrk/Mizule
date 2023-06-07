package com.mizule.server.controllers;

import com.mizule.server.services.ZulespotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(path = "api/v1/zulespot")
@RequiredArgsConstructor
public class ZulespotController {
    private final ZulespotService zulespotService;

    @GetMapping("/{zulespotId}")
    public ResponseEntity<?> getZulespot(@PathVariable String zulespotId) {
        return zulespotService.getZulespot(zulespotId);
    }

//    @GetMapping("/user/{userId}")
//    public ResponseEntity<?> getZulespotWithUserId(@PathVariable String userId){
//        return zulespotService.getZulespotWithUserId(userId);
//    }

    @PostMapping("/create")
    public ResponseEntity<?> createZulespot(@RequestBody Map<String, String> body) {
        return zulespotService.createZulespot(body);
    }

    @PostMapping("/myzules")
    public ResponseEntity<?> myZules(@RequestBody Map<String, String> body) {
        return zulespotService.myZulesPost(body);
    }

}
