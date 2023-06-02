package com.mizule.server.services;

import com.mizule.server.models.Users;
import com.mizule.server.models.Zulespot;
import com.mizule.server.repositories.UserRepository;
import com.mizule.server.repositories.ZuleRepository;
import com.mizule.server.repositories.ZulespotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ZulespotService {
    private final ZulespotRepository zulespotRepository;
    private final UserRepository userRepository;
    private final ZuleRepository zuleRepository;

    public ResponseEntity<?> createZulespot(Map<String,String> body) {
        Optional<Users> user = userRepository.findById(body.get("userId"));
        Optional<Zulespot> zulespot = zulespotRepository.findByTitle(body.get("title"));

        if(user.isEmpty()||zulespot.isPresent()){
            return ResponseEntity.ok("Try with a different Zulespot title");
        }

        Zulespot newZulespot = new Zulespot();
        newZulespot.setTitle(body.get("title"));
        newZulespot.setOwner(body.get("userId"));
        newZulespot=zulespotRepository.save(newZulespot);

        user.get().setZulespotId(newZulespot.getzulespotId());
        userRepository.save(user.get());
        return ResponseEntity.ok(newZulespot);
    }

    public ResponseEntity<?> myZulesPost(Map<String,String> body) {
        Optional<Users> user = userRepository.findById(body.get("userId"));
        Optional<Zulespot> zulespot = zulespotRepository.findById(body.get("zulespotId"));

        if(user.isEmpty()||zulespot.isEmpty()){
            ResponseEntity.ok("Invalid request.");
        }
        return ResponseEntity.ok(zuleRepository.findByZulespotId(body.get("zulespotId")).get());
    }
}
