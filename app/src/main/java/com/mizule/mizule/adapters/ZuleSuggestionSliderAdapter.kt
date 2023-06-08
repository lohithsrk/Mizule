package com.mizule.mizule.adapters

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.ImageView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.google.gson.Gson
import com.mizule.mizule.R
import com.mizule.mizule.dataClass.zulesDataClass.Zule
import com.mizule.mizule.screens.zules.MainActivity

class ZuleSuggestionSliderAdapter(
    private val zules: MutableList<Zule>, private var context: Context
) : RecyclerView.Adapter<ZuleSuggestionSliderAdapter.ZuleSuggestionSliderHolder>() {


    class ZuleSuggestionSliderHolder(itemView: ViewGroup) : RecyclerView.ViewHolder(itemView) {
        var thumbnail: ImageView = itemView.findViewById(R.id.thumbnailItem)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ZuleSuggestionSliderHolder {
        val view: ViewGroup = LayoutInflater.from(parent.context)
            .inflate(R.layout.zule_slider_suggestion_item, parent, false) as ViewGroup
        return ZuleSuggestionSliderHolder(view)
    }

    override fun onBindViewHolder(
        holder: ZuleSuggestionSliderHolder, @SuppressLint("RecyclerView") position: Int
    ) {
        Glide.with(context).load(zules[position].thumbnail_9_16).into(holder.thumbnail)


        holder.thumbnail.setOnClickListener {
            val intent = Intent(context,MainActivity::class.java)
            intent.putExtra("zule",Gson().toJson(zules[position]))
            context.startActivity(intent)
        }
    }

    override fun getItemCount(): Int = zules.size
}