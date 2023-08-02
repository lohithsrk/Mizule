package com.mizule.data.dataclasses.userDataClass

import com.mizule.data.dataclasses.userDataClass.History

data class User(
    var userId: String,
    var name: String,
    var email: String,
    var password: String,
    var zulespotId: String? = null,
    var followed_zulespots: MutableList<String>,
    var watchLater: MutableList<String>,
    var subscription: String,
    var history: History,
    var liked: MutableList<String>,
    var icon: String = "https://img.icons8.com/fluency/48/000000/guest-male.png",
)