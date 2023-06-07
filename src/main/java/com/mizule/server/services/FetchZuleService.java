package com.mizule.server.services;

import com.mizule.server.models.Users;
import com.mizule.server.models.Zule;
import com.mizule.server.models.Zulespot;
import com.mizule.server.repositories.UserRepository;
import com.mizule.server.repositories.ZuleRepository;
import com.mizule.server.repositories.ZulespotRepository;
import com.mizule.server.utils.ZuleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FetchZuleService {

    private final ZuleRepository zuleRepository;
    private final ZulespotRepository zulespotRepository;
    private final UserRepository userRepository;

    private final String FOLDER_PATH = "C:/Users/srklo/Documents/Mizule/server/src/main/java/com/mizule/server/uploads/";


    public ResponseEntity<?> randomZules(Integer offset, Integer limit) {
        List<Zule> zules = zuleRepository.findRandomZules(limit, offset);
        return ResponseEntity.ok(zules);
    }

    public ResponseEntity<?> getParticularZule(String zuleId) {
        Optional<Zule> zule = zuleRepository.findById(zuleId);
        if (zule.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid request.");
        }
        Optional<Zulespot> zulespot = zulespotRepository.findById(zule.get().getZuleId());
        if (zulespot.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid request.");
        }

        ZuleResponse zuleResponse = new ZuleResponse(zule.get(), zulespot.get());

        return ResponseEntity.ok(zuleResponse);
    }

    public ResponseEntity<?> feedZule(String zulespotId, String userId, String zuleId) throws IOException {
        Optional<Users> user = userRepository.findById(userId);
        Optional<Zule> zule = zuleRepository.findById(zuleId.split("_")[0]);
        Optional<Zulespot> zulespot = zulespotRepository.findById(zulespotId);


        if (user.isEmpty() || zulespot.isEmpty() || zule.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid request");
        }
        String filePath = FOLDER_PATH + zulespot.get().getTitle() + "/" + zule.get().getZuleId();
        switch (zuleId.split("_")[1]) {
            case "teaser.mp4" -> filePath = filePath + "/teaser.mp4";
            case "zule.mp4" -> filePath = filePath + "/zule.mp4";
            case "teaser-thumbnail.jpg" -> filePath = filePath + "/teaser-thumbnail.jpg";
            case "zule-thumbnail.jpg" -> filePath = filePath + "/zule-thumbnail.jpg";
        }

        File file = new File(filePath);

        if (!file.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        byte[] fileContent = Files.readAllBytes(Path.of(filePath));

        if (
                zuleId.split("_")[1].equals("teaser-thumbnail.jpg") ||
                        zuleId.split("_")[1].equals("zule-thumbnail.jpg")
        ) {
            return ResponseEntity.ok()
                    .contentType(MediaType.valueOf("image/jpg"))
                    .body(fileContent);
        } else {
            return ResponseEntity.ok()
                    .contentType(MediaType.valueOf("video/mp4"))
                    .body(fileContent);

        }


    }
}
