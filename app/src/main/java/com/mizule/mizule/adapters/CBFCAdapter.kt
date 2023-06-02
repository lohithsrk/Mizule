package com.mizule.mizule.adapters

import android.annotation.SuppressLint
import android.graphics.Color
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.RelativeLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.mizule.mizule.R

class CBFCAdapter(private var tags:List<String>) :RecyclerView.Adapter<CBFCAdapter.CBFCHolder>() {

    var selectedCbfcRating:String="U/A"

        class CBFCHolder(itemView: ViewGroup) : RecyclerView.ViewHolder(itemView) {
            val tag: TextView = itemView.findViewById(R.id.tag);
            val container:RelativeLayout = itemView.findViewById(R.id.container)


        }

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CBFCHolder {
            val view: ViewGroup =
                LayoutInflater.from(parent.context).inflate(R.layout.custom_tags, parent, false) as ViewGroup
            return CBFCHolder(view)
        }

        @SuppressLint("ResourceAsColor", "NotifyDataSetChanged")
        override fun onBindViewHolder(holder: CBFCHolder, position: Int) {

            holder.tag.text = tags[position]

            if(tags[position]==selectedCbfcRating){
                holder.container.setBackgroundResource(R.drawable.white_bg_tag)
                holder.tag.setTextColor(Color.BLACK)
            } else{
                holder.container.setBackgroundResource(R.drawable.black_bg_tag)
                holder.tag.setTextColor(Color.WHITE)
            }

            holder.container.setOnClickListener {
                selectedCbfcRating=tags[position]
                notifyDataSetChanged()
            }

        }
        override fun getItemCount(): Int = tags.size
}