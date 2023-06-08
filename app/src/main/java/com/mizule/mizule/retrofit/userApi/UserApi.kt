package com.mizule.mizule.retrofit.userApi

import com.mizule.mizule.dataClass.userDataClass.History
import com.mizule.mizule.dataClass.zulesDataClass.Zule
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface UserApi {
    @GET("user/{userId}/liked")
    fun getLiked(@Path("userId") id: String): Call<MutableList<Zule>>

    @GET("user/{userId}/history")
    fun getHistory(@Path("userId") id: String): Call<MutableList<Zule>>

    @POST("user/history")
    fun postHistory(@Body body: MutableMap<String, String>): Call<History>
}