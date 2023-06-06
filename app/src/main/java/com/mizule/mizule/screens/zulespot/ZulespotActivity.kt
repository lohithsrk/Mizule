package com.mizule.mizule.screens.zulespot

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import com.google.gson.Gson
import com.mizule.mizule.dataClass.zulespotDataClass.Zulespot
import com.mizule.mizule.databinding.ActivityZulespotBinding

class ZulespotActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivityZulespotBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val zulespot:Zulespot = Gson().fromJson(intent.getStringExtra("zulespot"),Zulespot::class.java)

        binding.createZule.setOnClickListener {
            val intent = Intent(this, CreateZule::class.java)
            intent.putExtra("zulespot",Gson().toJson(zulespot))
            startActivity(intent)
        }
    }
}