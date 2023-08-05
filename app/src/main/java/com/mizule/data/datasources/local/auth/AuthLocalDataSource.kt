package com.mizule.data.datasources.local.auth

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update
import com.mizule.data.dataclasses.userDataClass.User
import java.util.concurrent.Flow

interface AuthLocalDataSource {
//    suspend fun getUser(id:String):User
    suspend fun loginUser(user:User)
//    suspend fun updateUser(user:User):User
//    suspend fun logoutUser(id:String):Boolean
}