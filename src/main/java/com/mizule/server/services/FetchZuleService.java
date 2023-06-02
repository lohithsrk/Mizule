package com.mizule.server.services;

import com.mizule.server.models.Users;
import com.mizule.server.models.Zule;
import com.mizule.server.models.Zulespot;
import com.mizule.server.repositories.UserRepository;
import com.mizule.server.repositories.ZuleRepository;
import com.mizule.server.repositories.ZulespotRepository;
import com.mizule.server.utils.ImageUtils;
import com.mizule.server.utils.ZuleResponse;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FetchZuleService {

    private final ZuleRepository zuleRepository;
    private final ZulespotRepository zulespotRepository;
    private final UserRepository userRepository;
//    private EntityManager entityManager;

//    public ResponseEntity<?> randomZules(Integer offset) {
//        List<Zule> zules =  entityManager.createQuery("SELECT * FROM zule ORDER BY RANDOM() OFFSET "+offset).setMaxResults(50).getResultList();
//        if(zules.size()<=0){
//            return ResponseEntity.ok(List.of());
//        }
//
//
//
//    }

    public ResponseEntity<?> getParticularZule(String zuleId) {
        Optional<Zule> zule = zuleRepository.findById(zuleId);
        if(zule.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid request.");
        }
        Optional<Zulespot> zulespot = zulespotRepository.findById(zule.get().getZuleId());
        if(zulespot.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid request.");
        }

        ZuleResponse zuleResponse = new ZuleResponse(zule.get(),zulespot.get());

        return ResponseEntity.ok(zuleResponse);
    }

    public ResponseEntity<?> feedZule(String zulespotId,String userId,String zuleId) {
        Optional<Users> user = userRepository.findById(userId);
        Optional<Zule> zule = zuleRepository.findById(zuleId);
        Optional<Zulespot> zulespot = zulespotRepository.findById(zulespotId);

        if(user.isEmpty()||zulespot.isEmpty()||zule.isEmpty()){
            return ResponseEntity.badRequest().body("Invalid request");
        }

        return ResponseEntity.ok("ok");

    }
}
