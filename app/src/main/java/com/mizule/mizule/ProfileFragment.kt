package com.mizule.mizule

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.google.gson.Gson
import com.mizule.mizule.dataClass.userDataClass.User
import com.mizule.mizule.databinding.FragmentProfileBinding

class ProfileFragment : Fragment() {
    private lateinit var intent:Intent
    private lateinit var user:User

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val sharedPreferences = this.activity?.getSharedPreferences("USER", AppCompatActivity.MODE_PRIVATE)
        val userJSON=sharedPreferences?.getString("USER",null)
        user = Gson().fromJson(userJSON, User::class.java)
    }

    override fun onResume() {
        super.onResume()
        val sharedPreferences = this.activity?.getSharedPreferences("USER", AppCompatActivity.MODE_PRIVATE)
        val userJSON=sharedPreferences?.getString("USER",null)
        user = Gson().fromJson(userJSON, User::class.java)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        val binding = FragmentProfileBinding.inflate(inflater,container,false)

        Glide.with(this).load(user.icon).into(binding.profileImg)
        binding.profileName.text=user.name

        binding.becomeZulist.setOnClickListener {
             intent = if(user.zulespotId == "Not a Zulist") {
                 Intent(activity, CreateZulespot::class.java)
             }else{
                 Intent(activity, CreateZule::class.java)

             }
            startActivity(intent)
        }

        return binding.root
    }
}