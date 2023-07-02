package com.mizule.mizule.screens.discover

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.mizule.mizule.R
import com.mizule.mizule.databinding.ActivityDiscoverBinding

class DiscoverActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding  = ActivityDiscoverBinding.inflate(layoutInflater)
        binding.search.setOnKeyListener { _, _, _ ->
            true
        }
        //TODO SHARE
        setContentView(binding.root)
    }
}