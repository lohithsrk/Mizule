package com.mizule.data.dataclasses.zulesDataClass

data class Zule(
    var zuleId: String,
    var title: String,
    var description: String,
    var zulespotId: String,
    var tags: MutableList<String>,
    var genre: String,
    var views: ZuleViews,
    var cbfc_rating: String,
    var likes: MutableList<String>,
    var comments: MutableList<Comment>,
    var zule: String,
    var teaser: String,
    var thumbnail_16_9: String,
    var thumbnail_9_16: String
)