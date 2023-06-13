package com.mizule.mizule.screens.zulespot

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.flexbox.AlignItems
import com.google.android.flexbox.FlexWrap
import com.google.android.flexbox.FlexboxLayoutManager
import com.google.android.flexbox.JustifyContent
import com.google.gson.Gson
import com.mizule.mizule.adapters.zulespot.CBFCAdapter
import com.mizule.mizule.adapters.zulespot.GenreAdapter
import com.mizule.mizule.adapters.zulespot.KeywordsAdapter
import com.mizule.mizule.dataClass.zulesDataClass.Zule
import com.mizule.mizule.dataClass.zulespotDataClass.Zulespot
import com.mizule.mizule.databinding.ActivityUpdateZuleBinding
import com.mizule.mizule.retrofit.RetrofitInstance
import com.mizule.mizule.retrofit.zulesApi.ZuleApi
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class UpdateZuleActivity : AppCompatActivity() {
    private var keywords = mutableListOf<String>()
    var zule: Zule? = null
    var zulespot: Zulespot? = null


    @SuppressLint("NotifyDataSetChanged", "SetTextI18n")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivityUpdateZuleBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val zuleString: String? = intent.getStringExtra("zule")
        if (zuleString != null) {
            zule = Gson().fromJson(zuleString, Zule::class.java)
        }

        binding.title.setText(zule?.title ?: "")
        binding.description.setText(zule?.description ?: "")

        val cbfcTags = listOf("U/A", "U", "A", "R")

        val cbfcLayoutManager = LinearLayoutManager(this)
        cbfcLayoutManager.orientation = LinearLayoutManager.HORIZONTAL
        binding.cbfcTags.layoutManager = cbfcLayoutManager
        val cbfcAdapter = CBFCAdapter(cbfcTags, zule?.cbfc_rating)
        binding.cbfcTags.adapter = cbfcAdapter


        val genres = listOf(
            "Action",
            "Animation",
            "Comedy",
            "Crime",
            "Drama",
            "Fantasy",
            "Historical",
            "Horror",
            "Romance",
            "Thriller"
        )
        val zulespot: Zulespot =
            Gson().fromJson(intent.getStringExtra("zulespot"), Zulespot::class.java)

        val genreLayoutManager = FlexboxLayoutManager(this)
        genreLayoutManager.flexWrap = FlexWrap.WRAP
        genreLayoutManager.justifyContent = JustifyContent.FLEX_START
        genreLayoutManager.alignItems = AlignItems.FLEX_START
        binding.genreTags.layoutManager = genreLayoutManager

        val genre_adapter = GenreAdapter(genres, zule?.genre)
        binding.genreTags.adapter = genre_adapter

        //Keywords

        keywords = zule?.tags ?: mutableListOf<String>()

        val keywordsLayoutManager = FlexboxLayoutManager(this)
        keywordsLayoutManager.flexWrap = FlexWrap.WRAP
        keywordsLayoutManager.justifyContent = JustifyContent.FLEX_START
        keywordsLayoutManager.alignItems = AlignItems.FLEX_START
        binding.listKeywords.layoutManager = keywordsLayoutManager
        val keywordAdapter = KeywordsAdapter(keywords)
        binding.listKeywords.adapter = keywordAdapter

        binding.addKeyword.setOnClickListener {
            keywords.add(binding.keywords.text.toString())
            keywordAdapter.notifyDataSetChanged()
            binding.keywords.setText("")
        }

        binding.updateZule.setOnClickListener {
            val title = binding.title.text.toString()
            val description = binding.description.text.toString()
            val cbfc_rating = cbfcAdapter.selectedCbfcRating
            val genre = genre_adapter.selectedGenre

            val body = mutableMapOf<String, RequestBody>()
            body["title"] = RequestBody.create(MultipartBody.FORM, title)
            body["description"] = RequestBody.create(MultipartBody.FORM, description)
            body["cbfc_rating"] = RequestBody.create(MultipartBody.FORM, cbfc_rating)
            body["genre"] = RequestBody.create(MultipartBody.FORM, genre)
            body["userId"] = RequestBody.create(MultipartBody.FORM, zulespot.owner)
            body["tags"] = RequestBody.create(MultipartBody.FORM, keywords.toString())
            body["zulespotId"] = RequestBody.create(MultipartBody.FORM, zulespot.zulespotId)
            body["zuleId"] = RequestBody.create(MultipartBody.FORM, zule!!.zuleId)
            body["thumbnail_16_9"] = RequestBody.create(MultipartBody.FORM, zule!!.thumbnail_16_9)
            body["thumbnail_9_16"] = RequestBody.create(MultipartBody.FORM, zule!!.thumbnail_9_16)
            body["zule"] = RequestBody.create(MultipartBody.FORM, zule!!.zule)
            body["teaser"] = RequestBody.create(MultipartBody.FORM, zule!!.teaser)
//TODO file ext validation, fields validation


            val retService: ZuleApi =
                RetrofitInstance.getRetrofitInstance().create(ZuleApi::class.java)


            retService.update(body).enqueue(
                object : Callback<Zule> {
                    override fun onResponse(call: Call<Zule>, response: Response<Zule>) {
                        if (response.isSuccessful) {
                            val intent = Intent()
                            intent.putExtra("zule",Gson().toJson(response.body()))
                            setResult(RESULT_OK,intent)
                            finish()
                        } else {
                            Toast.makeText(
                                this@UpdateZuleActivity,
                                "Something went wrong",
                                Toast.LENGTH_LONG
                            ).show()
                        }
                    }

                    override fun onFailure(call: Call<Zule>, t: Throwable) {
                        Log.i("ERRORR", t.toString())
                        Toast.makeText(
                            this@UpdateZuleActivity,
                            "Something went wrong",
                            Toast.LENGTH_LONG
                        )
                            .show()
                    }
                }
            )
        }
    }
}