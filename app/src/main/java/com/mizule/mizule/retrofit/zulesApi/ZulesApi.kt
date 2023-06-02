package com.mizule.mizule.retrofit.zulesApi

import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.Call

interface ZulesApi {
    @POST("zules/{userId}/like")
    fun likeZule(@Path("userId") userId : String, @Body body:MutableMap<String,String>):Call<String>
}