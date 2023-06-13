package com.mizule.mizule.screens.auth

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.mizule.mizule.dataClass.userDataClass.User
import com.mizule.mizule.databinding.ActivityWelcomeBinding
import com.mizule.mizule.screens.zules.ZulesActivity

class WelcomeActivity : AppCompatActivity() {
    lateinit var user: User
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivityWelcomeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val sharedPreferences = getSharedPreferences("USER", MODE_PRIVATE)
        val userJSON = sharedPreferences.getString("USER", null)
        if (userJSON != null) {
            val intent = Intent(this@WelcomeActivity, ZulesActivity::class.java)
            startActivity(intent)
            finish()
        }

        binding.signinButton.setOnClickListener {
            val intent = Intent(this@WelcomeActivity, SigninActivity::class.java)
            startActivity(intent)
        }

        binding.signupButton.setOnClickListener {
            val intent = Intent(this@WelcomeActivity, SignupActivity::class.java)
            startActivity(intent)
        }
    }
}