package com.mizule.server.services;

import com.mizule.server.models.Users;
import com.mizule.server.models.Zule;
import com.mizule.server.models.Zulespot;
import com.mizule.server.repositories.UserRepository;
import com.mizule.server.repositories.ZuleRepository;
import com.mizule.server.repositories.ZulespotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ZulespotService {
    private final ZulespotRepository zulespotRepository;
    private final UserRepository userRepository;
    private final ZuleRepository zuleRepository;

    public ResponseEntity<?> getZulespot(String zulespotId) {
        Optional<Zulespot> zulespot = zulespotRepository.findById(zulespotId);
        if (zulespot.isPresent()) {
            return ResponseEntity.ok(zulespot.get());
        } else {
            return ResponseEntity.badRequest().body("Invalid Request");
        }
    }

    public ResponseEntity<?> createZulespot(Map<String, String> body) {
        Optional<Users> user = userRepository.findById(body.get("userId"));
        Optional<Zulespot> zulespot = zulespotRepository.findByTitle(body.get("title"));

        if (user.isEmpty() || zulespot.isPresent()) {
            return ResponseEntity.badRequest().body("Try with a different Zulespot title");
        }

        Zulespot newZulespot = new Zulespot();
        newZulespot.setTitle(body.get("title"));
        newZulespot.setOwner(body.get("userId"));
        newZulespot = zulespotRepository.save(newZulespot);

        user.get().setZulespotId(newZulespot.getzulespotId());
        userRepository.save(user.get());
        return ResponseEntity.ok(newZulespot);
    }

    public ResponseEntity<?> getZules(String zulespotId) {
        Optional<Zulespot> zulespot = zulespotRepository.findById(zulespotId);

        if (zulespot.isEmpty()) {
            ResponseEntity.badRequest().body("Invalid request.");
        }

        List<Zule> zules = zuleRepository.findByIds(zulespot.get().getZules());
        return ResponseEntity.ok(zules);
    }
}
