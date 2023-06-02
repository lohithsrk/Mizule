package com.mizule.mizule.adapters

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import android.widget.VideoView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.mizule.mizule.R
import com.mizule.mizule.dataClass.zulesDataClass.Zules
import com.mizule.mizule.retrofit.RetrofitInstance
import com.mizule.mizule.retrofit.zulesApi.ZulesApi
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class ZuleSliderAdapter(private val zules: Zules) :
    RecyclerView.Adapter<ZuleSliderAdapter.ZuleSliderHolder>() {


    class ZuleSliderHolder(itemView: ViewGroup) : RecyclerView.ViewHolder(itemView) {
        val thumbnail: ImageView = itemView.findViewById(R.id.thumbnail);
        val teaser : VideoView = itemView.findViewById(R.id.teaser)
        val title: TextView = itemView.findViewById(R.id.zule_title);
        val description: TextView = itemView.findViewById(R.id.zule_description);
        val views: TextView = itemView.findViewById(R.id.viewsCount);
        val likeButton: ImageView = itemView.findViewById(R.id.like_button);
        val commentButton: ImageView = itemView.findViewById(R.id.comment_button);

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ZuleSliderHolder {
        val view:ViewGroup =
            LayoutInflater.from(parent.context).inflate(R.layout.fragment_each_zule, parent, false) as ViewGroup
        return ZuleSliderHolder(view)
    }

    override fun onBindViewHolder(holder: ZuleSliderHolder, @SuppressLint("RecyclerView") position: Int) {

        holder.title.text = zules[position].title
        holder.description.text = zules[position].description
        holder.views.text = zules[position].views.zules.size.toString()
        holder.likeButton.setImageResource(if (zules[position].likes.indexOf("1nomskolfey6puc")>=0) R.drawable.baseline_thumb_up_alt_24 else R.drawable.baseline_thumb_up_off_alt_24)
        Glide.with(holder.thumbnail.context).load(zules[position].getZuleThumbnail("1nomskolfey6puc")).into(holder.thumbnail);
        holder.teaser.setVideoPath(zules[position].getZuleTeaser("1nomskolfey6puc"))

        holder.likeButton.setOnClickListener {
            val retService: ZulesApi = RetrofitInstance.getRetrofitInstance().create(ZulesApi::class.java)

            val body: MutableMap<String, String> = HashMap()
            body["id_zule"] = zules[position].zuleId

            val call = retService.likeZule("1nomskolfey6puc",body)

                call.enqueue(object : Callback<String?> {
                    override fun onResponse(call: Call<String?>, response: Response<String?>) {
                        if(response.isSuccessful) {
                            response.body().toString()
                            if (zules[position].likes.indexOf("1nomskolfey6puc")>=0){
                                zules[position].likes.remove(zules[position].zuleId)
                                holder.likeButton.setImageResource(R.drawable.baseline_thumb_up_off_alt_24)
                            } else{
                                zules[position].likes.add(zules[position].zuleId)
                                holder.likeButton.setImageResource(R.drawable.baseline_thumb_up_alt_24)
                            }
                        }
                    }

                    override fun onFailure(call: Call<String?>, t: Throwable) {
                    }
                })
        }

//        holder.thumbnail.setOnClickListener {
//            holder.thumbnail.visibility=View.GONE
//            holder.teaser.start()
//        }
//
//        holder.teaser.setOnClickListener {
//            holder.thumbnail.visibility=View.VISIBLE
//            holder.teaser.pause()
//        }

    }

    override fun getItemCount(): Int = zules.size
}