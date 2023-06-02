package com.mizule.server.utils;

import com.mizule.server.models.Users;
import com.mizule.server.models.Zulespot;

public class UserResponse {
    private Users user;
    private Zulespot zulespot;

    public UserResponse(Users user, Zulespot zulespot) {
        this.user = user;
        this.zulespot = zulespot;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Zulespot getZulespot() {
        return zulespot;
    }

    public void setZulespot(Zulespot zulespot) {
        this.zulespot = zulespot;
    }
}
