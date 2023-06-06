package com.mizule.server.services;

import com.mizule.server.models.Users;
import com.mizule.server.models.Zule;
import com.mizule.server.models.Zulespot;
import com.mizule.server.repositories.UserRepository;
import com.mizule.server.repositories.ZuleRepository;
import com.mizule.server.repositories.ZulespotRepository;
import com.mizule.server.utils.UserResponse;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final ZulespotRepository zulespotRepository;


    public ResponseEntity<?> signin(Map<String, String> cred){
        Optional<Users> user =userRepository.findByEmail(cred.get("email"));
        if(user.isEmpty() || !user.get().getPassword().equals(cred.get("password"))){
        return ResponseEntity.badRequest().body("Invalid email or password");
        }

//        Optional<Zulespot> zulespot=zulespotRepository.findByOwner(user.get().getUserId());

//        if(zulespot.isPresent()){
//            return ResponseEntity.ok(new UserResponse(user.get(), zulespot.get()));
//        }else{
            return ResponseEntity.ok(user.get());

//        }


    }

    public ResponseEntity<?> signup(Map<String, String> cred){
        Optional<Users> user =userRepository.findByEmail(cred.get("email"));


        if(user.isPresent()){
            return ResponseEntity.badRequest().body("User already exists");
        }

        //BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10, new SecureRandom());
        //String encodedPassword = bCryptPasswordEncoder.encode(cred.get("password"));

        Users newUser = new Users(cred.get("email"),cred.get("password"));
        newUser.setName(newUser.getEmail().split("@")[0]);

        newUser = userRepository.save(newUser);

        return ResponseEntity.ok(newUser);
    }

    public ResponseEntity<?> loginWithGoogle(Map<String, String> cred){
        Optional<Users> user =userRepository.findByEmail(cred.get("email"));

        if(user.isPresent()){
            return ResponseEntity.ok(user);
        } else {
            Users newUser = new Users(cred.get("email"),cred.get("email").substring(0,cred.get("email").indexOf('@')));
            userRepository.save(newUser);
            return ResponseEntity.ok(newUser);
        }
    }
}
