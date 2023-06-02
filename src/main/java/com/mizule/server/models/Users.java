package com.mizule.server.models;

import com.mizule.server.utils.History;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String userId;
    private String name;
    private String email;
    private String password;
    private String icon;
    private List<String> followed_zulespots;
    private List<String> watchlater;
    private String subscription;
    private List<String> liked;
    private String zulespotId;

    @Embedded
    private History history;

    public Users(String email, String password) {
        this.email = email;
        this.password = password;
    }

    @PrePersist
    void preInsert() {
        if (this.icon == null)
            this.icon = "https://img.icons8.com/fluency/48/000000/guest-male.png";

        if (this.zulespotId == null)
            this.zulespotId = "Not a Zulist";
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getZulespotId() {
        return zulespotId;
    }

    public void setZulespotId(String zulespotId) {
        this.zulespotId = zulespotId;
    }

    public List<String> getFollowed_zulespots() {
        return followed_zulespots;
    }

    public void setFollowed_zulespots(List<String> followed_zulespots) {
        this.followed_zulespots = followed_zulespots;
    }

    public List<String> getWatchlater() {
        return watchlater;
    }

    public void setWatchlater(List<String> watchlater) {
        this.watchlater = watchlater;
    }

    public String getSubscription() {
        return subscription;
    }

    public void setSubscription(String subscription) {
        this.subscription = subscription;
    }

    public History getHistory() {
        return history;
    }

    public void setHistory(History history) {
        this.history = history;
    }

    public List<String> getLiked() {
        return liked;
    }

    public void setLiked(List<String> liked) {
        this.liked = liked;
    }

    @Override
    public String toString() {
        return "Users{" +
                "id='" + userId + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", icon='" + icon + '\'' +
                ", zulespot='" + zulespotId + '\'' +
                ", followed_zulespots=" + followed_zulespots +
                ", watchlater=" + watchlater +
                ", subscription='" + subscription + '\'' +
                ", history=" + history +
                ", liked=" + liked +
                '}';
    }
}
