package com.mizule.viewmodel.usecases

import com.mizule.data.dataclasses.userDataClass.User
import com.mizule.data.datasources.remote.auth.AuthRemoteDataSource
import com.mizule.viewmodel.repository.AuthRepo
import retrofit2.Response

class AuthImpl(private val authRemoteDataSource: AuthRemoteDataSource): AuthRepo {
    override suspend fun signup(body: MutableMap<String, String>): Response<User> = authRemoteDataSource.signup(body)
}