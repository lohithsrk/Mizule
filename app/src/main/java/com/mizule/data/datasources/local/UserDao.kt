package com.mizule.data.datasources.local

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import com.mizule.data.dataclasses.userDataClass.User
import kotlinx.coroutines.flow.Flow

@Dao
interface UserDao {

    @Query("SELECT * FROM _user LIMIT 1")
    fun getCurrentUser(): Flow<User>
    @Insert
    suspend fun addUser(user: User)

    @Delete
    suspend fun logoutUser(userId:String)
}