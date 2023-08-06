package com.mizule.data.datasources.local.auth

import com.mizule.data.dataclasses.userDataClass.User
import kotlinx.coroutines.flow.Flow

interface AuthLocalDataSource {
    fun getCurrentUser():Flow<User>
    suspend fun loginUser(user: User)
//    suspend fun updateUser(user:User):User
//    suspend fun logoutUser(id:String):Boolean
}