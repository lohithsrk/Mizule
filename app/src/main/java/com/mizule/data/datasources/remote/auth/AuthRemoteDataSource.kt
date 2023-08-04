package com.mizule.data.datasources.remote.auth

import com.mizule.data.dataclasses.userDataClass.User
import retrofit2.Response

interface AuthRemoteDataSource {
    suspend fun signup(body: MutableMap<String, String>):Response<User>
}