package com.mizule.mizule.adapters.zules

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
import com.mizule.mizule.dataClass.zulespotDataClass.Zulespot
import com.mizule.mizule.screens.zules.ZulesActivity
import com.mizule.mizule.screens.zulespot.ZulespotZulesActivity

class ZuleSuggestionSliderAdapter(
    private val zules: MutableList<Zule>,
    private val zulespot: Zulespot?,
    private var context: Context
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
            val intent = if (zulespot != null) {
                Intent(context, ZulespotZulesActivity::class.java)
                    .putExtra("zules", Gson().toJson(zules))
                    .putExtra("zulespot", Gson().toJson(zulespot))
                    .putExtra("position", position)
            } else {
                Intent(context, ZulesActivity::class.java).putExtra(
                    "zule", Gson().toJson(zules[position])
                )

            }
            context.startActivity(intent)
        }
    }

    override fun getItemCount(): Int = zules.size
}