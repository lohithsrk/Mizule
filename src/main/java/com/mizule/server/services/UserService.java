package com.mizule.server.services;

import com.mizule.server.models.Users;
import com.mizule.server.models.Zule;
import com.mizule.server.repositories.UserRepository;
import com.mizule.server.repositories.ZuleRepository;
import com.mizule.server.utils.History;
import com.mizule.server.utils.Views;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ZuleRepository zuleRepository;

    public ResponseEntity<?> getHistory(String id) {
        History history =userRepository.findById(id).get().getHistory();
        return ResponseEntity.ok(history);
    }
    public ResponseEntity<?> postHistory(Map<String,String> body) {
        Optional<Users> user = userRepository.findById(body.get("userId"));
        Optional<Zule> zule = zuleRepository.findById(body.get("zuleId"));

        if (user.isEmpty() && zule.isEmpty()){
            return ResponseEntity.badRequest().body("Invalid request.");
        }

        if(body.get("type").equals("teaser")) {
            if (!zule.get().getViews().getTeaser().contains(body.get("userId"))) {
                Views views = zule.get().getViews();
                views.getTeaser().add(body.get("userId"));
                views.setTeaser(views.getTeaser());
                zule.get().setViews(views);
            } else{
                Views views = zule.get().getViews();
                views.getTeaser().remove(body.get("userId"));
                views.getTeaser().add(0,body.get("userId"));
                views.setTeaser(views.getTeaser());
                zule.get().setViews(views);
            }
            if (!user.get().getHistory().getTeasers().contains(body.get("zuleId"))) {
                History history = user.get().getHistory();
                history.getTeasers().add(body.get("zuleId"));
                history.setTeasers(history.getTeasers());
                user.get().setHistory(history);
            } else {
                History history = user.get().getHistory();
                history.getTeasers().remove(body.get("zuleId"));
                history.getTeasers().add(0,body.get("zuleId"));
                history.setTeasers(history.getTeasers());
                user.get().setHistory(history);
            }
        }else{
            if (!zule.get().getViews().getZule().contains(body.get("userId"))) {
                Views views = zule.get().getViews();
                views.getZule().add(body.get("userId"));
                views.setTeaser(views.getZule());
                zule.get().setViews(views);
            } else{
                Views views = zule.get().getViews();
                views.getZule().remove(body.get("userId"));
                views.getZule().add(0,body.get("userId"));
                views.setTeaser(views.getZule());
                zule.get().setViews(views);
            }
            if (!user.get().getHistory().getZules().contains(body.get("zuleId"))) {
                History history = user.get().getHistory();
                history.getZules().add(body.get("zuleId"));
                history.setTeasers(history.getZules());
                user.get().setHistory(history);
            } else {
                History history = user.get().getHistory();
                history.getZules().remove(body.get("zuleId"));
                history.getZules().add(0,body.get("zuleId"));
                history.setTeasers(history.getZules());
                user.get().setHistory(history);
            }
        }

        userRepository.save(user.get());
        zuleRepository.save(zule.get());

        return ResponseEntity.ok(user.get().getHistory());
    }
}
