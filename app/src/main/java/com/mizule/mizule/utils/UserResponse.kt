package com.mizule.mizule.utils

import com.mizule.mizule.dataClass.zulespotDataClass.Zulespot
import com.mizule.mizule.dataClass.userDataClass.User

data class UserResponse(var user:User,
                   var zulespot:Zulespot) {
}