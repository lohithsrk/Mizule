package com.mizule.server.utils;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
public class History {
    private List<String> teasers;
    private List<String> zules;

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
