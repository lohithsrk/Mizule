package com.mizule.viewmodel

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.mizule.data.dataclasses.userDataClass.User
import com.mizule.viewmodel.repository.AuthRepo
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import retrofit2.Response
import javax.inject.Inject

@HiltViewModel
class AuthViewModel @Inject constructor(private val authRepo: AuthRepo) : ViewModel() {

    fun signup(email: String, password: String, confirmPassword: String): Boolean {
        val body: MutableMap<String, String> = HashMap()
        body["email"] = email
        body["password"] = password
        body["confirmPassword"] = confirmPassword
        var userResponse:Response<User>? = null
        viewModelScope.launch(Dispatchers.IO) {
            userResponse=authRepo.signup(body)
            Log.i("TAG",userResponse?.body().toString())
        }
        return userResponse?.isSuccessful == true && userResponse?.body() != null
    }
}