package com.mizule.server.utils;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String commentID;
    private String userId;
    private String name;
    private String comment;

    public Comment(String userId, String name, String comment) {
        this.commentID = commentID;
        this.userId = userId;
        this.name = name;
        this.comment = comment;
    }

    public String getCommentId() {
        return commentID;
    }

    public void setCommentId(String commentId) {
        this.commentID = commentId;
    }

    public String getuserId() {
        return userId;
    }

    public void setuserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
