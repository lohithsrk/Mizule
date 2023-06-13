package com.mizule.mizule.screens.zulespot

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.google.android.flexbox.AlignItems
import com.google.android.flexbox.FlexWrap
import com.google.android.flexbox.FlexboxLayoutManager
import com.google.android.flexbox.JustifyContent
import com.google.gson.Gson
import com.mizule.mizule.adapters.zules.ZuleSuggestionSliderAdapter
import com.mizule.mizule.dataClass.zulesDataClass.Zule
import com.mizule.mizule.dataClass.zulespotDataClass.Zulespot
import com.mizule.mizule.databinding.ActivityZulespotBinding
import com.mizule.mizule.retrofit.RetrofitInstance
import com.mizule.mizule.retrofit.zulespotApi.ZulespotApi
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ZulespotActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivityZulespotBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val zulespot: Zulespot =
            Gson().fromJson(intent.getStringExtra("zulespot"), Zulespot::class.java)


        val retService: ZulespotApi =
            RetrofitInstance.getRetrofitInstance().create(ZulespotApi::class.java)

        retService.getZules(zulespot.zulespotId).enqueue(
            object : Callback<MutableList<Zule>> {
                override fun onResponse(
                    call: Call<MutableList<Zule>>,
                    response: Response<MutableList<Zule>>
                ) {
                    if (response.isSuccessful) {
                        val genreLayoutManager = FlexboxLayoutManager(this@ZulespotActivity)
                        genreLayoutManager.flexWrap = FlexWrap.WRAP
                        genreLayoutManager.justifyContent = JustifyContent.FLEX_START
                        genreLayoutManager.alignItems = AlignItems.FLEX_START
                        binding.zulesRV.layoutManager = genreLayoutManager
                        binding.zulesRV.adapter =
                            ZuleSuggestionSliderAdapter(response.body()!!,zulespot, this@ZulespotActivity)
                    } else {
                        Log.i("ERRORR", response.body().toString())
                    }
                }

                override fun onFailure(call: Call<MutableList<Zule>>, t: Throwable) {
                    Log.i("ERRORR", t.toString())
                }
            }
        )

        binding.createZule.setOnClickListener {
            val intent = Intent(this, CreateZule::class.java)
            intent.putExtra("zulespot", Gson().toJson(zulespot))
            startActivity(intent)
        }
    }
}