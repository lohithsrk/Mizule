package com.mizule.mizule.screens.zules

import android.annotation.SuppressLint
import android.media.MediaPlayer
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.google.gson.Gson
import com.mizule.mizule.R
import com.mizule.mizule.dataClass.userDataClass.History
import com.mizule.mizule.dataClass.userDataClass.User
import com.mizule.mizule.dataClass.zulesDataClass.Zule
import com.mizule.mizule.databinding.ActivityZulePlayerBinding
import com.mizule.mizule.retrofit.RetrofitInstance
import com.mizule.mizule.retrofit.userApi.UserApi
import com.mizule.mizule.retrofit.zulesApi.ZuleApi
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ZulePlayerActivity : AppCompatActivity() {

    @RequiresApi(Build.VERSION_CODES.N)
    @SuppressLint("SetTextI18n")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val userSharedPreferences = getSharedPreferences("USER", MODE_PRIVATE)
        val userEditor = userSharedPreferences.edit()

        val binding = ActivityZulePlayerBinding.inflate(layoutInflater)

        val zule: Zule = Gson().fromJson(intent.getStringExtra("zule"), Zule::class.java)
        val user: User = Gson().fromJson(intent.getStringExtra("user"), User::class.java)

        binding.videoView.setVideoPath(zule.zule)
        Glide.with(this).load(zule.thumbnail_9_16).into(binding.teaserThumbanail);
        Glide.with(this).load(zule.thumbnail_16_9).into(binding.thumbnail);
        binding.title.text = zule.title
        binding.description.text = zule.description
        binding.genreAndCbfc.text = "${zule.cbfc_rating} ${zule.genre}"
        binding.viewsCount.text = zule.views.zule.size.toString()
        binding.likeIcon.setImageResource(if (zule.likes.indexOf(user.userId) >= 0) R.drawable.baseline_thumb_up_alt_24 else R.drawable.baseline_thumb_up_off_alt_24)
        binding.likesCount.text = zule.likes.size.toString()


        var tags = ""

        zule.tags.stream().forEach {
            if (zule.tags.indexOf(it) != zule.tags.size - 1) {
                tags += "$it •"
            } else {
                tags += it
            }
        }

        binding.tags.text = tags

        binding.likeButton.setOnClickListener {

            val body: MutableMap<String, String> = HashMap()
            body["zuleId"] = zule.zuleId
            body["userId"] = user.userId

            val retService: ZuleApi =
                RetrofitInstance.getRetrofitInstance().create(ZuleApi::class.java)
            retService.likeZule(body).enqueue(object : Callback<String> {
                override fun onResponse(call: Call<String>, response: Response<String>) {
                    if (response.isSuccessful) {
                        if (zule.likes.indexOf(user.userId) >= 0) {
                            zule.likes.remove(user.userId)
                            user.liked.remove(zule.zuleId)
                            userEditor.putString("USER", Gson().toJson(user))
                            userEditor.apply()
                            binding.likeIcon.setImageResource(R.drawable.baseline_thumb_up_off_alt_24)
                            binding.likesCount.text = zule.likes.size.toString()
                        } else {
                            zule.likes.add(user.userId)
                            user.liked.add(zule.zuleId)
                            userEditor.putString("USER", Gson().toJson(user))
                            userEditor.apply()
                            binding.likeIcon.setImageResource(R.drawable.baseline_thumb_up_alt_24)
                            binding.likesCount.text = zule.likes.size.toString()
                        }
                    }
                }

                override fun onFailure(call: Call<String>, t: Throwable) {
                }
            })
        }

        binding.thumbnail.setOnClickListener {
            binding.thumbnail.visibility = View.GONE
            binding.videoView.start()
        }

        binding.videoView.setOnClickListener {
            binding.thumbnail.visibility = View.VISIBLE
            binding.videoView.pause()
        }

        binding.videoView.setOnCompletionListener {
            binding.thumbnail.visibility = View.VISIBLE
            binding.videoView.stopPlayback()

            val body: MutableMap<String, String> = HashMap()
            body["zuleId"] = zule.zuleId
            body["userId"] = user.userId
            body["type"] = "zule"

            val retService: UserApi =
                RetrofitInstance.getRetrofitInstance().create(UserApi::class.java)

            retService.postHistory(body).enqueue(
                object : Callback<History> {
                    override fun onResponse(call: Call<History>, response: Response<History>) {
                        if (response.isSuccessful) {
                            user.history = response.body()!!
                            userEditor.putString("USER", Gson().toJson(user))
                            userEditor.apply()
                            if (zule.views.zule.indexOf(user.userId) == -1) {
                                zule.views.zule.add(user.userId)
                            }
                        } else {
                            Log.i("ERRORR", response.body().toString())
                        }
                    }

                    override fun onFailure(call: Call<History>, t: Throwable) {
                        Log.i("ERRORR", t.toString())
                    }
                }
            )
        }

        binding.videoView.setOnErrorListener(MediaPlayer.OnErrorListener { mp, what, extra ->
            Toast.makeText(this, "Cannot play the Zule", Toast.LENGTH_LONG).show()
            binding.thumbnail.visibility = View.VISIBLE
            binding.videoView.pause()
            return@OnErrorListener true
        })

        var category = "Similar"

        setContentView(binding.root)
    }
}