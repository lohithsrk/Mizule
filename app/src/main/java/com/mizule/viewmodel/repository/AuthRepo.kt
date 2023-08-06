package com.mizule.viewmodel.repository

import com.mizule.data.dataclasses.userDataClass.User
import kotlinx.coroutines.flow.Flow
import retrofit2.Response

interface AuthRepo {
    suspend fun signup(body: MutableMap<String, String>):Response<User>?
    suspend fun signin(body: MutableMap<String, String>):Response<User>?
    fun getCurrentUser():  Flow<User>
}