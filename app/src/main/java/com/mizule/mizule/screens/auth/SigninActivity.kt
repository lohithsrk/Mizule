package com.mizule.mizule.screens.auth

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.gson.Gson
import com.mizule.mizule.dataClass.userDataClass.User
import com.mizule.mizule.databinding.ActivitySigninBinding
import com.mizule.mizule.retrofit.RetrofitInstance
import com.mizule.mizule.retrofit.authApi.AuthApi
import com.mizule.mizule.screens.zules.ZulesActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SigninActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val binding: ActivitySigninBinding = ActivitySigninBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.signinPost.setOnClickListener {
            val email = binding.email.text.toString()
            val password = binding.password.text.toString()

            if (email.isEmpty() || password.isEmpty()) {
                Toast.makeText(this@SigninActivity, "Invalid Email or Password", Toast.LENGTH_LONG)
                    .show()
            } else {
                val retService: AuthApi =
                    RetrofitInstance.getRetrofitInstance().create(AuthApi::class.java)
                val body: MutableMap<String, String> = HashMap()
                body["email"] = email
                body["password"] = password

                retService.signin(body).enqueue(
                    object : Callback<User> {
                        override fun onResponse(call: Call<User>, response: Response<User>) {
                            if (response.isSuccessful) {
                                val user: User? = response.body()
                                val sharedPreferences = getSharedPreferences("USER", MODE_PRIVATE)
                                val myEditor = sharedPreferences.edit()
                                myEditor.putString("USER", Gson().toJson(user))
                                myEditor.apply()
                                val intent = Intent(this@SigninActivity, ZulesActivity::class.java)
                                startActivity(intent)
                                finish()
                            } else {
                                Toast.makeText(
                                    this@SigninActivity,
                                    "Invalid Email or Password",
                                    Toast.LENGTH_LONG
                                ).show()
                            }
                        }

                        override fun onFailure(call: Call<User>, t: Throwable) {
                            Toast.makeText(
                                this@SigninActivity,
                                "Something went wrong",
                                Toast.LENGTH_LONG
                            ).show()
                        }
                    }
                )
            }
        }

        binding.signupRedirect.setOnClickListener {
            val intent = Intent(this@SigninActivity, SignupActivity::class.java)
            startActivity(intent)
        }
    }

}