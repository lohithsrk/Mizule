package com.mizule.mizule.retrofit.userApi

import com.mizule.mizule.dataClass.userDataClass.History
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface UserApi {
    @POST("user/history")
    fun postHistory(@Body body:MutableMap<String,String>) : Call<History>
}