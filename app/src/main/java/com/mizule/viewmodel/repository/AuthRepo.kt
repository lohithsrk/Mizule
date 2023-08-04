package com.mizule.viewmodel.repository

import com.mizule.data.dataclasses.userDataClass.User
import retrofit2.Response

interface AuthRepo {
    suspend fun signup(body: MutableMap<String, String>):Response<User>
}