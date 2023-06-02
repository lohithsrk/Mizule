package com.mizule.mizule.retrofit.zulespotApi

import com.mizule.mizule.dataClass.zulespotDataClass.Zulespot
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.Path

interface ZulespotApi {
    @POST("zulespot/create")
    fun create(@Body body:MutableMap<String,String>): Call<Zulespot>
}