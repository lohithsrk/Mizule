package com.mizule.server.models;

import com.mizule.server.utils.Comment;
import com.mizule.server.utils.Views;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Zule {

    @Id
    private String zuleId;
    private String title;
    private String description;
    private String zulespotId;
    private List<String> tags = List.of();
    private String genre;

    @Embedded
    @OneToOne(cascade = CascadeType.ALL)
    private Views views = new Views(List.of(), List.of());

    private String cbfc_rating;

    private List<String> likes = List.of();

    @Embedded
    @OneToMany(cascade = CascadeType.ALL)
    private List<Comment> comments;
    private String zule;
    private String teaser;
    private String thumbnail_16_9;
    private String thumbnail_9_16;

    public Zule(String zuleId, String title, String description, List<String> tags, String genre, String cbfc_rating, String zulespotId) {
        this.zuleId = zuleId;
        this.title = title;
        this.description = description;
        this.tags = tags;
        this.genre = genre;
        this.cbfc_rating = cbfc_rating;
        this.zulespotId = zulespotId;
    }

    public String getZuleId() {
        return zuleId;
    }

    public void setZuleId(String zuleId) {
        this.zuleId = zuleId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getZulespotId() {
        return zulespotId;
    }

    public void setZulespotId(String zulespotId) {
        this.zulespotId = zulespotId;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Views getViews() {
        return views;
    }

    public void setViews(Views views) {
        this.views = views;
    }

    public String getCbfc_rating() {
        return cbfc_rating;
    }

    public void setCbfc_rating(String cbfc_rating) {
        this.cbfc_rating = cbfc_rating;
    }


    public List<String> getLikes() {
        return likes;
    }

    public void setLikes(List<String> likes) {
        this.likes = likes;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public String getZule() {
        return zule;
    }

    public void setZule(String zule) {
        this.zule = zule;
    }

    public String getTeaser() {
        return teaser;
    }

    public void setTeaser(String teaser) {
        this.teaser = teaser;
    }

    public String getThumbnail_16_9() {
        return thumbnail_16_9;
    }

    public void setThumbnail_16_9(String thumbnail_16_9) {
        this.thumbnail_16_9 = thumbnail_16_9;
    }

    public String getThumbnail_9_16() {
        return thumbnail_9_16;
    }

    public void setThumbnail_9_16(String thumbnail_9_16) {
        this.thumbnail_9_16 = thumbnail_9_16;
    }

    @Override
    public String toString() {
        return "Zule{" +
                "zuleId='" + zuleId + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", zulespotId='" + zulespotId + '\'' +
                ", tags=" + tags +
                ", genre='" + genre + '\'' +
                ", views=" + views +
                ", cbfc_rating='" + cbfc_rating + '\'' +
                ", likes=" + likes +
                ", comments=" + comments +
                ", zule='" + zule + '\'' +
                ", teaser='" + teaser + '\'' +
                ", thumbnail_16_9='" + thumbnail_16_9 + '\'' +
                ", thumbnail_9_16='" + thumbnail_9_16 + '\'' +
                '}';
    }
}
