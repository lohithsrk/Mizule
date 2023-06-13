package com.mizule.mizule.retrofit.zulespotApi

import com.mizule.mizule.dataClass.zulesDataClass.Zule
import com.mizule.mizule.dataClass.zulespotDataClass.Zulespot
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface ZulespotApi {
    @GET("zulespot/{zulespotId}")
    fun getZulespot(@Path("zulespotId") zulespotId: String): Call<Zulespot>

    @GET("zulespot/{zulespotId}/zules")
    fun getZules(@Path("zulespotId") zulespotId: String): Call<MutableList<Zule>>

    @POST("zulespot/create")
    fun create(@Body body: MutableMap<String, String>): Call<Zulespot>
}