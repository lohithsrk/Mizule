package com.mizule.server.services;

import com.mizule.server.models.Users;
import com.mizule.server.repositories.UserRepository;
import com.mizule.server.utils.History;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public ResponseEntity<?> getHistory(String id) {
        History history =userRepository.findById(id).get().getHistory();
        return ResponseEntity.ok(history);
    }
}
