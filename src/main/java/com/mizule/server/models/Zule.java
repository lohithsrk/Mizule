package com.mizule.server.models;

import com.mizule.server.utils.Comment;
import com.mizule.server.utils.File;
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
    @GeneratedValue(strategy = GenerationType.UUID)
    private String zuleId;
    private String title;
    private String description;
    private String zulespotId;
    private List<String> tags;
    private List<String> genre;

    @Embedded
    private Views views;

    private String cbfc_rating;

    private List<String> likes;

    @Embedded
    @OneToMany(cascade=CascadeType.ALL)
    private List<Comment> comments;

    @Lob
    @Embedded
    @Column(name = "zule", length = 1000)
    private File zule;

    @Lob
    @Embedded
    @Column(name = "teaser", length = 1000)
    private File teaser;

    @Lob
    @Embedded
    @Column(name = "thumbnail_16_9", length = 1000)
    private File thumbnail_16_9;

    @Lob
    @Embedded
    @Column(name = "thumbnail_9_16", length = 1000)
    private File thumbnail_9_16;

    public Zule(
            String title,
            String description,
            List<String> tags,
            List<String> genre,
            String cbfc_rating,
            String zulespotId
    ) {
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

    public List<String> getGenre() {
        return genre;
    }

    public void setGenre(List<String> genre) {
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

    public File getZule() {
        return zule;
    }

    public void setZule(File zule) {
        this.zule = zule;
    }

    public File getTeaser() {
        return teaser;
    }

    public void setTeaser(File teaser) {
        this.teaser = teaser;
    }

    public File getThumbnail_16_9() {
        return thumbnail_16_9;
    }

    public void setThumbnail_16_9(File thumbnail_16_9) {
        this.thumbnail_16_9 = thumbnail_16_9;
    }

    public File getThumbnail_9_16() {
        return thumbnail_9_16;
    }

    public void setThumbnail_9_16(File thumbnail_9_16) {
        this.thumbnail_9_16 = thumbnail_9_16;
    }
}
