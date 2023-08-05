package com.mizule.data.datasources.remote.auth

import com.mizule.data.dataclasses.userDataClass.User
import com.mizule.data.services.remote.AuthService
import retrofit2.Response

class AuthRemoteDataSourceImpl(private val authService: AuthService):AuthRemoteDataSource {
    override suspend fun signup(body: MutableMap<String, String>): Response<User> {
        return authService.signup(body)
    }

    override suspend fun signin(body: MutableMap<String, String>): Response<User> {
        return authService.signin(body)
    }
}