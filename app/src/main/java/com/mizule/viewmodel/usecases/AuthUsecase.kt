package com.mizule.viewmodel.usecases

import android.util.Log
import com.mizule.data.dataclasses.userDataClass.User
import com.mizule.data.datasources.remote.auth.AuthRemoteDataSource
import com.mizule.viewmodel.repository.AuthRepo
import retrofit2.Response

class AuthImpl(private val authRemoteDataSource: AuthRemoteDataSource): AuthRepo {
    override suspend fun signup(body: MutableMap<String, String>): Response<User>? {
        try {
        val userResponse = authRemoteDataSource.signup(body)
            if(userResponse.isSuccessful){

            }
        return userResponse
        }catch (exception:Exception){
            Log.e("error-m",exception.toString())
        }
        return null
    }
    override suspend fun signin(body: MutableMap<String, String>): Response<User> = authRemoteDataSource.signin(body)
}