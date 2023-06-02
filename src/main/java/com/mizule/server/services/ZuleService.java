package com.mizule.server.services;

import com.mizule.server.models.Users;
import com.mizule.server.models.Zule;
import com.mizule.server.models.Zulespot;
import com.mizule.server.repositories.UserRepository;
import com.mizule.server.repositories.ZuleRepository;
import com.mizule.server.repositories.ZulespotRepository;
import com.mizule.server.utils.Comment;
import com.mizule.server.utils.File;
import com.mizule.server.utils.ImageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ZuleService {
    private final ZuleRepository zuleRepository;
    private final UserRepository userRepository;
    private final ZulespotRepository zulespotRepository;

    public ResponseEntity<?> getLiked(String id) {
        try {
        List<String> liked =userRepository.findById(id).get().getLiked();
        return ResponseEntity.ok(liked);
        } catch (Exception e){
        return ResponseEntity.badRequest().body("Some error occured");

        }
    }
    public ResponseEntity<?> likeZule(String id, Map<String,String> body) {
        Optional<Users> user = userRepository.findById(id);
        Optional<Zule> zule = zuleRepository.findById(body.get("zuleId"));
        if (user.isEmpty() && zule.isEmpty()){
            return ResponseEntity.badRequest().body("Invalid request.");
        }


        if(zule.get().getLikes().contains(id)){
            zule.get().setLikes(zule.get().getLikes().stream().filter(f->!f.equals(id)).toList());
        } else {
            List<String>likes=zule.get().getLikes();
            likes.add(id);
            zule.get().setLikes(likes);
        }

        zuleRepository.save(zule.get());
        return ResponseEntity.ok("ok");
    }

    public ResponseEntity<?> comment(Map<String,String> body) {
        Optional<Zule> zule = zuleRepository.findById(body.get("zuleId"));

        List<Comment> comments = zule.get().getComments();

        comments.add(new Comment(body.get("userId"),body.get("name"),body.get("comment")));
        zule.get().setComments(comments);
        zuleRepository.save(zule.get());

        return ResponseEntity.ok("ok");

    }

    public ResponseEntity<?> createZule(Map<String, String> body,
                                        MultipartFile thumbnail_16_9,
                                        MultipartFile thumbnail_9_16,
                                        MultipartFile zule,
                                        MultipartFile teaser) throws IOException {

        Optional<Users> user = userRepository.findById(body.get("userId"));
        Optional<Zulespot> zulespot = zulespotRepository.findById(body.get("zulespotId"));

        if(user.isEmpty()||zulespot.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid request");
        }

        Zule newZule = new Zule(
                body.get("title"),
                body.get("description"),
                List.of(body.get("tags").split(",")),
                List.of(body.get("genre").split(",")),
                body.get("cbfc_rating"),
                body.get("zulespotId")
        );
        File thumbnail_16_9_file = ImageUtils.fileBuilderUtil(thumbnail_16_9);
        File thumbnail_9_16_file = ImageUtils.fileBuilderUtil(thumbnail_9_16);
        File zule_file = ImageUtils.fileBuilderUtil(zule);
        File teaser_file = ImageUtils.fileBuilderUtil(teaser);

        newZule.setThumbnail_16_9(thumbnail_16_9_file);
        newZule.setThumbnail_9_16(thumbnail_9_16_file);
        newZule.setZule(zule_file);
        newZule.setTeaser(teaser_file);

        newZule=zuleRepository.save(newZule);
        List<String> zules=zulespot.get().getZules();
        zules.add(newZule.getZuleId());
        zulespot.get().setZules(zules);

        return ResponseEntity.ok("ok");

    }


}
