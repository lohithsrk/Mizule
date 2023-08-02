package com.mizule.data.services.remote

import com.mizule.data.dataclasses.userDataClass.User
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthService {
    @POST("auth/signup")
    fun signup(@Body body: MutableMap<String, String>): Response<User>

    @POST("auth/signin")
    fun signin(@Body body: MutableMap<String, String>): Response<User>
}
