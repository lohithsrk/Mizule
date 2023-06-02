package com.mizule.mizule

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.flexbox.AlignItems
import com.google.android.flexbox.FlexWrap
import com.google.android.flexbox.FlexboxLayoutManager
import com.google.android.flexbox.JustifyContent
import com.mizule.mizule.adapters.CBFCAdapter
import com.mizule.mizule.adapters.GenreAdapter
import com.mizule.mizule.adapters.KeywordsAdapter
import com.mizule.mizule.databinding.ActivityCreateZuleBinding

class CreateZule : AppCompatActivity() {
//    lateinit var selectedCbfcRating:String
    lateinit var selectedGenre:MutableList<String>
    lateinit var keywords:MutableList<String>
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivityCreateZuleBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val cbfc_tags = listOf("U/A", "U", "A", "R")

        val cbfcLayoutManager = LinearLayoutManager(this)
        cbfcLayoutManager.orientation = LinearLayoutManager.HORIZONTAL
        binding.cbfcTags.layoutManager=cbfcLayoutManager
        binding.cbfcTags.adapter=CBFCAdapter(cbfc_tags)

//        val genres = listOf(
//            "Action",
//            "Animation",
//            "Comedy",
//            "Crime",
//            "Drama",
//            "Fantasy",
//            "Historical",
//            "Horror",
//            "Romance",
//            "Thriller")
//
//        val genreLayoutManager = FlexboxLayoutManager(this)
//        genreLayoutManager.flexWrap = FlexWrap.WRAP
//        genreLayoutManager.justifyContent = JustifyContent.FLEX_START
//        genreLayoutManager.alignItems = AlignItems.FLEX_START
//        binding.genreTags.layoutManager=genreLayoutManager
//        binding.genreTags.adapter=GenreAdapter(genres)
//
//
//        val keywordsLayoutManager = FlexboxLayoutManager(this)
//        keywordsLayoutManager.flexWrap = FlexWrap.WRAP
//        keywordsLayoutManager.justifyContent = JustifyContent.FLEX_START
//        keywordsLayoutManager.alignItems = AlignItems.FLEX_START
//        binding.listKeywords.layoutManager=keywordsLayoutManager
//        binding.listKeywords.adapter=KeywordsAdapter(keywords)
    }
}