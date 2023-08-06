package com.mizule.data.datasources.local.auth

import com.mizule.data.dataclasses.userDataClass.User
import com.mizule.data.datasources.local.UserDao
import kotlinx.coroutines.flow.Flow

class AuthLocalDataSourceImpl(private val userDao: UserDao) : AuthLocalDataSource {
    override fun getCurrentUser(): Flow<User> = userDao.getCurrentUser()

    override suspend fun loginUser(user: User) = userDao.addUser(user)

//    override suspend fun updateUser(user: User): User {
//    }
//    override suspend fun logoutUser(id: String): Boolean {
//    }
}