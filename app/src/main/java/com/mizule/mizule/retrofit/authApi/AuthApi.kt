package com.mizule.mizule.retrofit.authApi

import com.mizule.mizule.dataClass.userDataClass.User
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthApi {
    @POST("auth/signup")
    fun signup(@Body body:MutableMap<String,String>) :Call<User>

    @POST("auth/signin")
    fun signin(@Body body:MutableMap<String,String>) :Call<User>
}
