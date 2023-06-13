package com.mizule.server.services;

import com.mizule.server.models.Users;
import com.mizule.server.models.Zule;
import com.mizule.server.models.Zulespot;
import com.mizule.server.repositories.UserRepository;
import com.mizule.server.repositories.ZuleRepository;
import com.mizule.server.repositories.ZulespotRepository;
import com.mizule.server.utils.Comment;
import com.mizule.server.utils.ImageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ZuleService {
    private static final String FOLDER_PATH = "C:/Users/srklo/Documents/Mizule/server/src/main/java/com/mizule/server/uploads/";
    private final ZuleRepository zuleRepository;
    private final UserRepository userRepository;
    private final ZulespotRepository zulespotRepository;
    @Value("${file.host}")
    private String host;

    public ResponseEntity<?> getLiked(String id) {
        try {
            List<String> liked = userRepository.findById(id).get().getLiked();
            return ResponseEntity.ok(liked);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Some error occured");

        }
    }

    public ResponseEntity<?> likeZule(Map<String, String> body) {
        Optional<Users> user = userRepository.findById(body.get("userId"));
        Optional<Zule> zule = zuleRepository.findById(body.get("zuleId"));
        if (user.isEmpty() && zule.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid request.");
        }

        if (zule.get().getLikes().contains(body.get("userId"))) {
            zule.get().setLikes(zule.get().getLikes().stream().filter(f -> !f.equals(body.get("userId"))).toList());
        } else {
            List<String> likes = zule.get().getLikes();
            likes.add(body.get("userId"));
            zule.get().setLikes(likes);
        }
        if (user.get().getLiked().contains(body.get("zuleId"))) {
            user.get().setLiked(user.get().getLiked().stream().filter(f -> !f.equals(body.get("zuleId"))).toList());
        } else {
            List<String> liked = user.get().getLiked();
            liked.add(body.get("zuleId"));
            user.get().setLiked(liked);
        }

        zuleRepository.save(zule.get());
        userRepository.save(user.get());
        return ResponseEntity.ok("ok");
    }

    public ResponseEntity<?> comment(Map<String, String> body) {
        Optional<Zule> zule = zuleRepository.findById(body.get("zuleId"));

        List<Comment> comments = zule.get().getComments();

        comments.add(new Comment(body.get("userId"), body.get("name"), body.get("comment")));
        zule.get().setComments(comments);
        zuleRepository.save(zule.get());

        return ResponseEntity.ok("ok");

    }

    public ResponseEntity<?> createZule(Map<String, String> body, MultipartFile thumbnail_16_9, MultipartFile thumbnail_9_16, MultipartFile zule, MultipartFile teaser) throws IOException {
        Optional<Users> user = userRepository.findById(body.get("userId"));
        Optional<Zulespot> zulespot = zulespotRepository.findById(body.get("zulespotId"));


        if (user.isEmpty() || zulespot.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid request");
        }

        String zuleId = UUID.randomUUID().toString();

        Zule newZule = new Zule(zuleId, body.get("title"), body.get("description"), Arrays.asList(body.get("tags").substring(1, body.get("tags").length() - 1).split(",")), body.get("genre"), body.get("cbfc_rating"), body.get("zulespotId"));

        java.io.File zulespotFolder = new java.io.File(FOLDER_PATH + zulespot.get().getTitle());
        java.io.File zuleFolder = new java.io.File(FOLDER_PATH + zulespot.get().getTitle() + "/" + zuleId);
        if (!zulespotFolder.exists()) {
            if (zulespotFolder.mkdirs()) {
                zuleFolder.mkdirs();
            }
        } else {
            zuleFolder.mkdirs();
        }
        if (!(ImageUtils.uploadImageToFileSystem(thumbnail_16_9, "zule-thumbnail.jpg", zuleFolder) && ImageUtils.uploadImageToFileSystem(thumbnail_9_16, "teaser-thumbnail.jpg", zuleFolder) && ImageUtils.uploadImageToFileSystem(zule, "zule.mp4", zuleFolder) && ImageUtils.uploadImageToFileSystem(teaser, "teaser.mp4", zuleFolder))) {
            if (zuleFolder.exists()) {
                zuleFolder.delete();
            }
            return ResponseEntity.badRequest().body("Something went wrong");
        }

        String thumbnail_16_9_file = host + "fetch/" + zulespot.get().getzulespotId() + "/" + user.get().getUserId() + "/" + zuleId + "_zule-thumbnail.jpg";
        String thumbnail_9_16_file = host + "fetch/" + zulespot.get().getzulespotId() + "/" + user.get().getUserId() + "/" + zuleId + "_teaser-thumbnail.jpg";
        String zule_file = host + "fetch/" + zulespot.get().getzulespotId() + "/" + user.get().getUserId() + "/" + zuleId + "_zule.mp4";
        String teaser_file = host + "fetch/" + zulespot.get().getzulespotId() + "/" + user.get().getUserId() + "/" + zuleId + "_teaser.mp4";

        newZule.setThumbnail_16_9(thumbnail_16_9_file);
        newZule.setThumbnail_9_16(thumbnail_9_16_file);
        newZule.setZule(zule_file);
        newZule.setTeaser(teaser_file);

        newZule = zuleRepository.save(newZule);
        List<String> zules = zulespot.get().getZules();
        zules.add(newZule.getZuleId());
        zulespot.get().setZules(zules);
        zulespotRepository.save(zulespot.get());

        return ResponseEntity.ok("ok");

    }

    public ResponseEntity<?> updateZule(Map<String, String> body) throws IOException {
        Optional<Users> user = userRepository.findById(body.get("userId"));
        Optional<Zulespot> zulespot = zulespotRepository.findById(body.get("zulespotId"));
        Optional<Zule> zule = zuleRepository.findById(body.get("zuleId"));

        if (user.isEmpty() || zulespot.isEmpty() || zule.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid request");
        }

        zule.get().setTitle(body.get("title"));
        zule.get().setDescription(body.get("description"));
        zule.get().setCbfc_rating(body.get("cbfc_rating"));
        zule.get().setGenre(body.get("genre"));
        zule.get().setTags(Arrays.asList(body.get("tags").substring(1, body.get("tags").length() - 1).split(",")));
        zule.get().setThumbnail_16_9(body.get("thumbnail_16_9"));
        zule.get().setThumbnail_9_16(body.get("thumbnail_9_16"));
        zule.get().setZule(body.get("zule"));
        zule.get().setTeaser(body.get("teaser"));

        zuleRepository.save(zule.get());

        return ResponseEntity.ok(zule.get());

    }

    public ResponseEntity<?> deleteZule(String zuleId) {
        Optional<Zule> zule = zuleRepository.findById(zuleId.split("\"")[1]);
        if (!zule.isPresent()) {
            return ResponseEntity.badRequest().body("Invalid request");
        }

        zuleRepository.deleteById(zuleId);

        return ResponseEntity.ok("ok");

    }


}
