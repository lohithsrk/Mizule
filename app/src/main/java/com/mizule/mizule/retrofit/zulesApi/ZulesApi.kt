package com.mizule.mizule.retrofit.zulesApi

import com.mizule.mizule.dataClass.zulesDataClass.Zules
import okhttp3.MultipartBody
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.Call
import retrofit2.http.Multipart
import retrofit2.http.Part

interface ZulesApi {
    @POST("zules/{userId}/like")
    fun likeZule(@Path("userId") userId : String, @Body body:MutableMap<String,String>):Call<String>

    @Multipart
    @POST("zules/create")
    fun create(
        @Part thumbnail_9_16_part: MultipartBody.Part,
        @Part thumbnail_16_9_part: MultipartBody.Part,
        @Part zule: MultipartBody.Part,
        @Part teaser: MultipartBody.Part,
        @Part body: MultipartBody.Part
    ): Call<String>

}