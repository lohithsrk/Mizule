package com.mizule.mizule.retrofit.zulesApi

import com.mizule.mizule.dataClass.zulesDataClass.Zules
import retrofit2.Call
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Query

interface FetchZulesApi {
    @GET("zules/random")
    fun getRandomZules(@Query("offset") offset : Int) :Call<Zules>
}