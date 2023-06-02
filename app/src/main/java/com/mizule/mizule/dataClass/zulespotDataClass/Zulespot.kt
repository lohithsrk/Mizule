package com.mizule.mizule.dataClass.zulespotDataClass

//import kotlinx.parcelize.Parcelize

//@Parcelize
 data class Zulespot(
    var zulespotId: String,
    var title: String,
    var icon: String,
    var owner: String,
    var followers_id: MutableList<String>,
    var zules: MutableList<String>
)
//    :Parcelable
{

}