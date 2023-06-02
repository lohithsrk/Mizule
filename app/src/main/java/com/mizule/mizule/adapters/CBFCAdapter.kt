package com.mizule.mizule.adapters

import android.annotation.SuppressLint
import android.graphics.drawable.Drawable
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.card.MaterialCardView
import com.mizule.mizule.R

class CBFCAdapter(private var tags :List<String>) :RecyclerView.Adapter<CBFCAdapter.CBFCHolder>() {

    var selectedCbfcRating:String="U/A"

        class CBFCHolder(itemView: ViewGroup) : RecyclerView.ViewHolder(itemView) {
            val tag: TextView = itemView.findViewById(R.id.tag);

        }

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CBFCHolder {
            val view: ViewGroup =
                LayoutInflater.from(parent.context).inflate(R.layout.custom_tags, parent, false) as ViewGroup
            return CBFCHolder(view)
        }

        @SuppressLint("ResourceAsColor")
        override fun onBindViewHolder(holder: CBFCHolder, position: Int) {

            holder.tag.text = tags[position]


            holder.tag.setOnClickListener {
                selectedCbfcRating=tags[position]

                if(selectedCbfcRating==tags[position]){
                holder.tag.setTextColor(R.color.black)
//                    holder.tag.setTextColor(R.color.white)
                }
            }

        }

        override fun getItemCount(): Int = tags.size
}