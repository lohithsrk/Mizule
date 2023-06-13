package com.mizule.mizule.adapters.zules

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.media.MediaPlayer
import android.os.Build
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import android.widget.VideoView
import androidx.activity.ComponentActivity
import androidx.activity.result.ActivityResultCallback
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.google.gson.Gson
import com.mizule.mizule.R
import com.mizule.mizule.dataClass.userDataClass.History
import com.mizule.mizule.dataClass.userDataClass.User
import com.mizule.mizule.dataClass.zulesDataClass.Zule
import com.mizule.mizule.dataClass.zulespotDataClass.Zulespot
import com.mizule.mizule.retrofit.RetrofitInstance
import com.mizule.mizule.retrofit.userApi.UserApi
import com.mizule.mizule.retrofit.zulesApi.ZuleApi
import com.mizule.mizule.screens.discover.DiscoverActivity
import com.mizule.mizule.screens.profile.ProfileActivity
import com.mizule.mizule.screens.zulespot.UpdateZuleActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class ZuleSliderAdapter(
    private val zules: MutableList<Zule>,
    private val user: User,
    private val zulespot: Zulespot?,
    private var context: Context
) :
    RecyclerView.Adapter<ZuleSliderAdapter.ZuleSliderHolder>() {
    lateinit var addActivityResultLauncher: ActivityResultLauncher<Intent>

    val userSharedPreferences = context.getSharedPreferences("USER", AppCompatActivity.MODE_PRIVATE)
    val userEditor = userSharedPreferences.edit()

    class ZuleSliderHolder(itemView: ViewGroup) : RecyclerView.ViewHolder(itemView) {
        val thumbnail: ImageView = itemView.findViewById(R.id.thumbnail);
        val teaser: VideoView = itemView.findViewById(R.id.teaser)
        val title: TextView = itemView.findViewById(R.id.zule_title);

        val views: TextView = itemView.findViewById(R.id.viewsCount);

        val likeButton: ImageView = itemView.findViewById(R.id.like_button);
        val likesCount: TextView = itemView.findViewById(R.id.likesCount);
        val discover: ImageView = itemView.findViewById(R.id.discover);
        val profile: ImageView = itemView.findViewById(R.id.profile);
        val menu: ConstraintLayout = itemView.findViewById(R.id.menu);
        val zulespotMenu: ConstraintLayout = itemView.findViewById(R.id.zulespotMenu);
        val editZule: ImageView = itemView.findViewById(R.id.edit)
        val deleteZule: ImageView = itemView.findViewById(R.id.delete)

        //        val commentButton: ImageView = itemView.findViewById(R.id.comment_button);

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ZuleSliderHolder {
        val view: ViewGroup =
            LayoutInflater.from(parent.context)
                .inflate(R.layout.fragment_each_zule, parent, false) as ViewGroup
        return ZuleSliderHolder(view)
    }

    @SuppressLint("ClickableViewAccessibility")
    override fun onBindViewHolder(
        holder: ZuleSliderHolder,
        @SuppressLint("RecyclerView") position: Int
    ) {

        registerActivityResultLauncher(position)
        holder.title.text = zules[position].title
//        holder.description.text = zules[position].description
        holder.views.text = zules[position].views.teaser.size.toString()
        holder.likesCount.text = zules[position].likes.size.toString()
        holder.likeButton.setImageResource(if (zules[position].likes.indexOf(user.userId) >= 0) R.drawable.baseline_thumb_up_alt_24 else R.drawable.baseline_thumb_up_off_alt_24)
        Glide.with(holder.thumbnail.context).load(zules[position].thumbnail_9_16)
            .into(holder.thumbnail);
        holder.teaser.setVideoPath(zules[position].teaser)

        holder.teaser.pause()

        holder.likeButton.setOnClickListener {

            val body: MutableMap<String, String> = HashMap()
            body["zuleId"] = zules[position].zuleId
            body["userId"] = user.userId

            val retService: ZuleApi =
                RetrofitInstance.getRetrofitInstance().create(ZuleApi::class.java)
            retService.likeZule(body).enqueue(object : Callback<String> {
                override fun onResponse(call: Call<String>, response: Response<String>) {
                    if (response.isSuccessful) {
                        if (zules[position].likes.indexOf(user.userId) >= 0) {
                            zules[position].likes.remove(user.userId)
                            user.liked.remove(zules[position].zuleId)
                            userEditor.putString("USER", Gson().toJson(user))
                            userEditor.apply()
                            holder.likeButton.setImageResource(R.drawable.baseline_thumb_up_off_alt_24)
                        } else {
                            zules[position].likes.add(user.userId)
                            user.liked.add(zules[position].zuleId)
                            userEditor.putString("USER", Gson().toJson(user))
                            userEditor.apply()
                            holder.likeButton.setImageResource(R.drawable.baseline_thumb_up_alt_24)
                        }
                    }
                }

                override fun onFailure(call: Call<String>, t: Throwable) {
                }
            })
        }

        holder.thumbnail.setOnClickListener {
            holder.thumbnail.visibility = View.GONE
            holder.teaser.start()
        }

        holder.teaser.setOnClickListener {
            holder.thumbnail.visibility = View.VISIBLE
            holder.teaser.pause()
        }

        holder.teaser.setOnCompletionListener {
            holder.thumbnail.visibility = View.VISIBLE
            holder.teaser.stopPlayback()

            val body: MutableMap<String, String> = HashMap()
            body["zuleId"] = zules[position].zuleId
            body["userId"] = user.userId
            body["type"] = "teaser"

            val retService: UserApi =
                RetrofitInstance.getRetrofitInstance().create(UserApi::class.java)

            retService.postHistory(body).enqueue(
                object : Callback<History> {
                    @SuppressLint("NotifyDataSetChanged")
                    override fun onResponse(call: Call<History>, response: Response<History>) {
                        if (response.isSuccessful) {
                            user.history = response.body()!!
                            userEditor.putString("USER", Gson().toJson(user))
                            userEditor.apply()
                            if (zules[position].views.teaser.indexOf(user.userId) == -1) {
                                zules[position].views.teaser.add(user.userId)
                                notifyDataSetChanged()
                            }
                        } else {
                            Toast.makeText(context, "Something went wrong", Toast.LENGTH_LONG)
                                .show()
                        }
                    }

                    override fun onFailure(call: Call<History>, t: Throwable) {
                        Log.i("ERRORR", t.toString())
                        Toast.makeText(context, "Something went wrong", Toast.LENGTH_LONG).show()
                    }
                }
            )
        }

        holder.teaser.setOnErrorListener(MediaPlayer.OnErrorListener { _, _, _ ->
            Toast.makeText(context, "Cannot play the teaser", Toast.LENGTH_LONG).show()
            holder.thumbnail.visibility = View.VISIBLE
            holder.teaser.stopPlayback()
            return@OnErrorListener true
        })

        holder.discover.setOnClickListener {
            val intent = Intent(context, DiscoverActivity::class.java)
            context.startActivity(intent)
        }
        holder.profile.setOnClickListener {
            val intent = Intent(context, ProfileActivity::class.java)
            context.startActivity(intent)
        }

        if (zulespot != null) {
            holder.menu.visibility = View.GONE
            holder.zulespotMenu.visibility = View.VISIBLE
        }

        holder.editZule.setOnClickListener {
            val intent = Intent(context, UpdateZuleActivity::class.java)
            intent.putExtra("zule", Gson().toJson(zules[position]))
            intent.putExtra("zulespot", Gson().toJson(zulespot))
            addActivityResultLauncher.launch(intent)
        }


        holder.deleteZule.setOnClickListener {
            //TODO alert
            val retService: ZuleApi =
                RetrofitInstance.getRetrofitInstance().create(ZuleApi::class.java)
            retService.delete(zules[position].zuleId).enqueue(object : Callback<String> {
                @SuppressLint("NotifyDataSetChanged")
                @RequiresApi(Build.VERSION_CODES.N)
                override fun onResponse(call: Call<String>, response: Response<String>) {
                    if (response.isSuccessful) {
                        zules.removeIf { it.zuleId == zules[position].zuleId }
                        notifyDataSetChanged()
                    } else {
                        Toast.makeText(context, "Something went wrong", Toast.LENGTH_LONG).show()

                    }
                }

                override fun onFailure(call: Call<String>, t: Throwable) {
                    Log.i("ERRORR", t.toString())
                    Toast.makeText(context, "Something went wrong", Toast.LENGTH_LONG).show()
                }
            })
        }
    }

    fun registerActivityResultLauncher(position: Int) {
        addActivityResultLauncher =
            (context as ComponentActivity).registerForActivityResult(ActivityResultContracts.StartActivityForResult(),
                ActivityResultCallback { resultActivity ->
                    val resultCode = resultActivity.resultCode
                    val data = resultActivity.data

                    if (resultCode == android.app.Activity.RESULT_OK && data != null) {
                        zules[position] =
                            Gson().fromJson(data.getStringExtra("zule"), Zule::class.java)
                    }
                })
    }

    override fun getItemCount(): Int = zules.size
}