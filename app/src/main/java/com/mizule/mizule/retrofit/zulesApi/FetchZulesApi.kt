package com.mizule.mizule.retrofit.zulesApi

import com.mizule.mizule.dataClass.zulesDataClass.Zule
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Query

interface FetchZulesApi {
    @GET("fetch/random")
    fun getRandomZules(@Query("offset") offset: Int, @Query("limit") limit: Int): Call<List<Zule>>
}