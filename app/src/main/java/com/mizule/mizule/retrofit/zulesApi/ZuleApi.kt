package com.mizule.mizule.retrofit.zulesApi

import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part
import retrofit2.http.PartMap

interface ZuleApi {
    @POST("zule/like")
    fun likeZule(@Body body: MutableMap<String, String>): Call<String>

    @Multipart
    @POST("zule/create")
    fun create(
        @PartMap body: Map<String, @JvmSuppressWildcards RequestBody>,
        @Part thumbnail_9_16: MultipartBody.Part,
        @Part thumbnail_16_9: MultipartBody.Part,
        @Part zule: MultipartBody.Part,
        @Part teaser: MultipartBody.Part
    ): Call<String>

}