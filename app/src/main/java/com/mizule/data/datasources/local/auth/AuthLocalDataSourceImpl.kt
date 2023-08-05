package com.mizule.data.datasources.local.auth

import com.mizule.data.dataclasses.userDataClass.User
import com.mizule.data.datasources.local.UserDao

class AuthLocalDataSourceImpl(private val userDao: UserDao) : AuthLocalDataSource {
//    override suspend fun getUser(id: String) {
//    }

    override suspend fun loginUser(user: User) = userDao.addUser(user)

//    override suspend fun updateUser(user: User): User {
//        TODO("Not yet implemented")
//    }
//
//    override suspend fun logoutUser(id: String): Boolean {
//        TODO("Not yet implemented")
//    }
}