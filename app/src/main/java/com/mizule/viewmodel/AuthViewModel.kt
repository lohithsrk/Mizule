package com.mizule.viewmodel

import androidx.lifecycle.ViewModel
import com.mizule.data.dataclasses.userDataClass.User
import com.mizule.viewmodel.repository.AuthRepo

class AuthViewModel(private val authRepo: AuthRepo):ViewModel() {

    fun signup(email:String,password:String,confirmPassword:String):Boolean{
        val body: MutableMap<String, String> = HashMap()
        body["email"] = email
        body["password"] = password
        body["confirmPassword"] = confirmPassword
        val userResponse = authRepo.signup(body)
        return userResponse.isSuccessful && userResponse.body()!=null
    }
}