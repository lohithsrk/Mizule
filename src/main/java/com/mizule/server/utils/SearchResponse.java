package com.mizule.server.utils;

import com.mizule.server.models.Zule;
import com.mizule.server.models.Zulespot;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public class SearchResponse {
    List<Zule> zules;
    List<Zulespot> zulepots;

    public SearchResponse(List<Zule> zules, List<Zulespot> zulepots) {
        this.zules = zules;
        this.zulepots = zulepots;
    }

    @Override
    public String toString() {
        return "SearchResponse{" + "zules=" + zules.toString() + ", zulepots=" + zulepots.toString() + '}';
    }
}
