package com.mizule.data.dataclasses.zulespotDataClass

data class Zulespot(
    var zulespotId: String,
    var title: String,
    var icon: String,
    var owner: String,
    var followers_id: MutableList<String>,
    var zules: MutableList<String>
)