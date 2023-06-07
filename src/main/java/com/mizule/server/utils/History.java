package com.mizule.server.utils;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String historyId;
    private List<String> teasers;
    private List<String> zules;

    public History(List<String> teasers, List<String> zules) {
        this.teasers = teasers;
        this.zules = zules;
    }

    public String getHistoryId() {
        return historyId;
    }

    public void setHistoryId(String historyId) {
        this.historyId = historyId;
    }

    public List<String> getTeasers() {
        return teasers;
    }

    public void setTeasers(List<String> teasers) {
        this.teasers = teasers;
    }

    public List<String> getZules() {
        return zules;
    }

    public void setZules(List<String> zules) {
        this.zules = zules;
    }

    @Override
    public String toString() {
        return "History{" +
                "teasers=" + teasers +
                ", zules=" + zules +
                '}';
    }
}
