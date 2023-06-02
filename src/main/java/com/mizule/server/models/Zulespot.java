package com.mizule.server.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;

import java.util.List;

@Entity
@Table
@AllArgsConstructor
public class Zulespot {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String zulespotId;

    @Column(unique = true)
    private String title;

    @Value("https://img.icons8.com/fluency/48/000000/guest-male.png")
    private String icon;
    private String owner;
    private List<String> followers_id;
    private List<String> zules;


    public Zulespot(){
        this.followers_id=List.of();
        this.zules=List.of();
    }

    public String getzulespotId() {
        return zulespotId;
    }

    public void setzulespotId(String zulespotId) {
        this.zulespotId = zulespotId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public List<String> getFollowers_id() {
        return followers_id;
    }

    public void setFollowers_id(List<String> followers_id) {
        this.followers_id = followers_id;
    }

    public List<String> getZules() {
        return zules;
    }

    public void setZules(List<String> zules) {
        this.zules = zules;
    }

    @Override
    public String toString() {
        return "Zulespot{" +
                "zulespotId='" + zulespotId + '\'' +
                ", title='" + title + '\'' +
                ", icon='" + icon + '\'' +
                ", owner='" + owner + '\'' +
                ", followers_id=" + followers_id +
                ", zules=" + zules +
                '}';
    }
}
