package com.mizule.mizule.adapters

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.mizule.mizule.R

class GenreAdapter(private var tags :List<String>) :RecyclerView.Adapter<GenreAdapter.GenreHolder>() {



    class GenreHolder(itemView: ViewGroup) : RecyclerView.ViewHolder(itemView) {
        val tag: TextView = itemView.findViewById(R.id.tag);

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GenreHolder {
        val view: ViewGroup =
            LayoutInflater.from(parent.context).inflate(R.layout.custom_tags, parent, false) as ViewGroup
        return GenreHolder(view)
    }

    override fun onBindViewHolder(holder: GenreHolder, @SuppressLint("RecyclerView") position: Int) {

        holder.tag.text = tags[position]

    }

    override fun getItemCount(): Int = tags.size
}