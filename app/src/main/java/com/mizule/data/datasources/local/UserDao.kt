package com.mizule.data.datasources.local

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import com.mizule.data.dataclasses.userDataClass.User

@Dao
interface UserDao {
    @Insert
    suspend fun addUser(user: User)

    @Delete
    suspend fun logoutUser(userId:String)
}