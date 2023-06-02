package com.mizule.mizule.adapters

import android.annotation.SuppressLint
import android.graphics.Color
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.RelativeLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.mizule.mizule.R

class KeywordsAdapter(private var tags :MutableList<String>) : RecyclerView.Adapter<KeywordsAdapter.KeywordHolder>() {



    class KeywordHolder(itemView: ViewGroup) : RecyclerView.ViewHolder(itemView) {
        val tag: TextView = itemView.findViewById(R.id.tag);
        val container: RelativeLayout = itemView.findViewById(R.id.container)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): KeywordHolder {
        val view: ViewGroup =
            LayoutInflater.from(parent.context).inflate(R.layout.custom_tags, parent, false) as ViewGroup
        return KeywordHolder(view)
    }

    override fun onBindViewHolder(holder: KeywordHolder, position: Int) {

        holder.tag.text = tags[position]
                holder.container.setBackgroundResource(R.drawable.white_bg_tag)
                holder.tag.setTextColor(Color.BLACK)
        holder.container.setOnClickListener {
            tags.remove(tags[position])
            notifyDataSetChanged()
        }

    }

    override fun getItemCount(): Int = tags.size
}