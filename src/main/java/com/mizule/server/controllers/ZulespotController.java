package com.mizule.server.controllers;

import com.mizule.server.services.ZuleService;
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

    @PostMapping("/create")
    public ResponseEntity<?> createZulespot(@RequestBody Map<String,String> body){
        return zulespotService.createZulespot(body);
    }
    @PostMapping("/myzules")
    public ResponseEntity<?> myZules(@RequestBody Map<String,String> body){
        return zulespotService.myZulesPost(body);
    }

}
