package com.mizule.mizule.components

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.mizule.mizule.databinding.FragmentZuleSuggestionSliderBinding

class ZuleSuggestionSliderFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val binding = FragmentZuleSuggestionSliderBinding.inflate(inflater, container, false)
        Log.i("binding.category", binding.category)


        return binding.root
    }
}