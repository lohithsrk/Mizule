package com.mizule.mizule.dataClass.zulesDataClass

import com.mizule.mizule.utils.Constants
//import kotlinx.parcelize.Parcelize

//@Parcelize
data class Zule(
    var zuleId: String,
    var title: String,
    var description: String,
    var zulespotId: String,
    var tags: MutableList<String>,
    var genre: MutableList<String>,
    var views: ZuleViews,
    var cbfc_rating: String,
    var likes: MutableList<String>,
    var comments:MutableList<Comment>,
    var zule:File,
    var teaser:File,
    var thumbnail_16_9:File,
    var thumbnail_9_16:File
)
//    : Parcelable
{
    fun getZuleTeaser(userId:String) :String = "${Constants().baseUrl}zules/${this.zulespotId}/${userId}/${this.zuleId}-teaser.mp4"
    fun getFullZule(userId:String) :String = "${Constants().baseUrl}zules/${this.zulespotId}/${userId}/${this.zuleId}-zule.mp4"
    fun getTeaserThumbnail(userId:String) :String = "${Constants().baseUrl}zules/${this.zulespotId}/${userId}/${this.zuleId}-zule-thumbnail.jpg"
    fun getZuleThumbnail(userId:String) :String = "${Constants().baseUrl}zules/${this.zulespotId}/${userId}/${this.zuleId}-teaser-thumbnail.jpg"
}