package com.mizule.server.utils;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
public class Views {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String viewsId;
    private List<String> teaser=List.of();
    private List<String> zule=List.of();

    public Views(List<String> teaser, List<String> zule){
        this.teaser=teaser;
        this.zule=zule;
    }

    public String getViewsId() {
        return viewsId;
    }

    public void setViewsId(String viewsId) {
        this.viewsId = viewsId;
    }

    public List<String> getTeaser() {
        return teaser;
    }

    public void setTeaser(List<String> teaser) {
        this.teaser = teaser;
    }

    public List<String> getZule() {
        return zule;
    }

    public void setZule(List<String> zule) {
        this.zule = zule;
    }
}
