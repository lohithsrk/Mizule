package com.mizule.mizule.adapters

import android.annotation.SuppressLint
import android.graphics.Color
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.RelativeLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.mizule.mizule.R

class GenreAdapter(private var tags :List<String>) :RecyclerView.Adapter<GenreAdapter.GenreHolder>() {


    var selectedGenre:String=""
    class GenreHolder(itemView: ViewGroup) : RecyclerView.ViewHolder(itemView) {
        val tag: TextView = itemView.findViewById(R.id.tag);
        val container: RelativeLayout = itemView.findViewById(R.id.container)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GenreHolder {
        val view: ViewGroup =
            LayoutInflater.from(parent.context).inflate(R.layout.custom_tags, parent, false) as ViewGroup
        return GenreHolder(view)
    }

    @SuppressLint("NotifyDataSetChanged")
    override fun onBindViewHolder(holder: GenreHolder, @SuppressLint("RecyclerView") position: Int) {

        holder.tag.text = tags[position]

        if(tags[position]==selectedGenre){
            holder.container.setBackgroundResource(R.drawable.white_bg_tag)
            holder.tag.setTextColor(Color.BLACK)
        } else{
            holder.container.setBackgroundResource(R.drawable.black_bg_tag)
            holder.tag.setTextColor(Color.WHITE)
        }

        holder.container.setOnClickListener {
            selectedGenre=tags[position]
            notifyDataSetChanged()
        }

    }

    override fun getItemCount(): Int = tags.size
}