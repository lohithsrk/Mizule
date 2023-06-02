package com.mizule.server.utils;

import com.mizule.server.models.Zule;
import com.mizule.server.models.Zulespot;

public class ZuleResponse {
    private Zule zule;
    private Zulespot zulespot;

    public ZuleResponse(Zule zule, Zulespot zulespot) {
        this.zule = zule;
        this.zulespot = zulespot;
    }

    public Zule getZule() {
        return zule;
    }

    public void setZule(Zule zule) {
        this.zule = zule;
    }

    public Zulespot getZulespot() {
        return zulespot;
    }

    public void setZulespot(Zulespot zulespot) {
        this.zulespot = zulespot;
    }
}
