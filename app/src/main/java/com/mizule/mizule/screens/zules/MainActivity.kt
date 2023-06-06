package com.mizule.mizule.screens.zules

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.google.gson.Gson
import com.mizule.mizule.screens.discover.DiscoverFragment
import com.mizule.mizule.R
import com.mizule.mizule.dataClass.userDataClass.User
import com.mizule.mizule.databinding.ActivityMainBinding
import com.mizule.mizule.screens.auth.WelcomeActivity
import com.mizule.mizule.screens.profile.ProfileFragment

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val sharedPreferences = getSharedPreferences("USER", MODE_PRIVATE)
        val userJSON=sharedPreferences.getString("USER",null)
        val user:User= Gson().fromJson(userJSON,User::class.java)
        if(user.equals(null)){
            val intent = Intent(this@MainActivity, WelcomeActivity::class.java)
            startActivity(intent)
        }
        replaceFragment(ZuleFeedFragment())

        binding.bottomNavigationView.setOnItemSelectedListener {
            when(it.itemId) {
                R.id.zules -> replaceFragment(ZuleFeedFragment())
                R.id.discover -> replaceFragment(DiscoverFragment())
                R.id.profile -> replaceFragment(ProfileFragment())
            }
            true
        }

    }
    private fun replaceFragment(fragment: Fragment) {
        val fragmentManager = supportFragmentManager
        val fragmentTransaction = fragmentManager.beginTransaction()
        fragmentTransaction.replace(R.id.frame_layout,fragment)
        fragmentTransaction.commit()
    }

    override fun onBackPressed() {
    } //TODO
}