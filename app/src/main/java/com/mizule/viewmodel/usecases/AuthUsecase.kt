package com.mizule.viewmodel.usecases

import android.util.Log
import com.mizule.data.dataclasses.userDataClass.User
import com.mizule.data.datasources.local.auth.AuthLocalDataSource
import com.mizule.data.datasources.remote.auth.AuthRemoteDataSource
import com.mizule.viewmodel.repository.AuthRepo
import kotlinx.coroutines.flow.Flow
import retrofit2.Response

class AuthImpl(
    private val authRemoteDataSource: AuthRemoteDataSource,
    private val authLocalDataSource: AuthLocalDataSource
) : AuthRepo {
    override suspend fun signup(body: MutableMap<String, String>): Response<User>? {
        try {
            val userResponse = authRemoteDataSource.signup(body)
            if (userResponse.isSuccessful) {
                try {
                    authLocalDataSource.loginUser(userResponse.body()!!)
                    return userResponse
                } catch (exception: Exception) {
                    Log.e("error-m", exception.toString())
                }
            }
        }catch (exception:Exception){
            Log.e("error-m",exception.toString())
        }
        return null
    }
    override suspend fun signin(body: MutableMap<String, String>): Response<User>? {
        try {
            val userResponse = authRemoteDataSource.signin(body)
            if (userResponse.isSuccessful) {
                try {
                    authLocalDataSource.loginUser(userResponse.body()!!)
                    return userResponse
                } catch (exception: Exception) {
                    Log.e("error-m", exception.toString())
                }
            }
        }catch (exception:Exception){
            Log.e("error-m",exception.toString())
        }
        return null
    }

    override fun getCurrentUser():Flow<User> = authLocalDataSource.getCurrentUser()
}