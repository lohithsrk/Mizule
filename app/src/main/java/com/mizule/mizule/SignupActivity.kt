package com.mizule.mizule

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import com.google.android.material.textfield.TextInputEditText
import com.google.gson.Gson
import com.mizule.mizule.dataClass.userDataClass.User
import com.mizule.mizule.databinding.ActivitySignupBinding
import com.mizule.mizule.retrofit.RetrofitInstance
import com.mizule.mizule.retrofit.authApi.AuthApi
import com.mizule.mizule.utils.UserResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SignupActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val binding : ActivitySignupBinding = DataBindingUtil.setContentView(this,R.layout.activity_signup)

        binding.signupPost.setOnClickListener {
            val email = binding.email.text.toString()
            val password = binding.password.text.toString()
            val confirmPassword = binding.confirmPassword.text.toString()

            if(email.length<=0 || password.length<8 || confirmPassword.length<8){
                 Toast.makeText(this@SignupActivity, "Invalid Email or Password", Toast.LENGTH_LONG).show()
            } else if(password != confirmPassword){
                 Toast.makeText(this@SignupActivity, "Passwords does not match", Toast.LENGTH_LONG).show()
            } else {
                val retService: AuthApi = RetrofitInstance.getRetrofitInstance().create(AuthApi::class.java)
                val body: MutableMap<String, String> = HashMap()
                body["email"] = email
                body["password"] = password
                body["confirmPassword"] = confirmPassword

                retService.signup(body).enqueue(
                    object : Callback<User> {
                        override fun onResponse(call: Call<User>, response: Response<User>) {
                            if(response.isSuccessful) {
                                Log.i("LOKI",response.body().toString())
                                val user: User?=response.body()
//                                val user: User? = userResponse?.user
//                                user?.zulespot= userResponse?.zulespot!!


                                val sharedPreferences=getSharedPreferences("USER", MODE_PRIVATE)
                                val myEditor = sharedPreferences.edit()
                                myEditor.putString("USER",Gson().toJson(user))
                                myEditor.apply()
                                val intent = Intent(this@SignupActivity, MainActivity::class.java)
                                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK)
                                startActivity(intent)
                            }else{
                                Toast.makeText(this@SignupActivity, "User with this email already found", Toast.LENGTH_LONG).show()
                            }
                        }

                        override fun onFailure(call: Call<User>, t: Throwable) {
                            Toast.makeText(this@SignupActivity, "Something went wrong", Toast.LENGTH_LONG).show()
                        }
                    }
                )

            }

        }
        binding.signinRedirect.setOnClickListener {
            val intent = Intent(this@SignupActivity, SigninActivity::class.java)
            startActivity(intent)
        }

    }

}