package com.mizule.mizule.screens.zulespot

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.children
import androidx.recyclerview.widget.ItemTouchHelper
import androidx.recyclerview.widget.RecyclerView
import androidx.viewpager2.widget.CompositePageTransformer
import androidx.viewpager2.widget.MarginPageTransformer
import androidx.viewpager2.widget.ViewPager2
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.mizule.mizule.adapters.zules.ZuleSliderAdapter
import com.mizule.mizule.dataClass.userDataClass.User
import com.mizule.mizule.dataClass.zulesDataClass.Zule
import com.mizule.mizule.dataClass.zulespotDataClass.Zulespot
import com.mizule.mizule.databinding.ActivityZulesBinding
import com.mizule.mizule.screens.zules.ZulePlayerActivity
import kotlin.math.abs

class ZulespotZulesActivity : AppCompatActivity() {
    lateinit var user: User
    private lateinit var viewPager2: ViewPager2
    lateinit var adapter: ZuleSliderAdapter
    var zulespot: Zulespot? = null


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivityZulesBinding.inflate(layoutInflater)
        setContentView(binding.root)
        val sharedPreferences =
            getSharedPreferences("USER", MODE_PRIVATE)
        val userJSON = sharedPreferences?.getString("USER", null)
        user = Gson().fromJson(userJSON, User::class.java)

        val zules = Gson().fromJson<MutableList<Zule>>(intent.getStringExtra("zules"),
            object : TypeToken<MutableList<Zule>>() {}.type
        )
        val zulespotString: String? = intent.getStringExtra("zulespot")
        if (zulespotString != null) {
            zulespot = Gson().fromJson(zulespotString, Zulespot::class.java)
        }

        val position: Int = intent.getIntExtra("position",0)
        viewPager2 = binding.viewPager2
        viewPager2.currentItem = position

        viewPager2.adapter =
            ZuleSliderAdapter(zules, user, zulespot, this@ZulespotZulesActivity)

        viewPager2.offscreenPageLimit = 3
        viewPager2.clipToPadding = false
        viewPager2.clipChildren = false
        viewPager2.getChildAt(0).overScrollMode = RecyclerView.OVER_SCROLL_NEVER
        setUpTransformer(viewPager2)

        viewPager2.children.find { it is RecyclerView }?.let {
            ItemTouchHelper(object : ItemTouchHelper.SimpleCallback(0, ItemTouchHelper.UP) {
                override fun onMove(
                    recyclerView: RecyclerView,
                    viewHolder: RecyclerView.ViewHolder,
                    target: RecyclerView.ViewHolder
                ): Boolean {
                    return false
                }

                //TODO subscribe and card

                override fun getSwipeThreshold(viewHolder: RecyclerView.ViewHolder): Float {
                    return 0.3f
                }

                override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {
                    val intent = Intent(this@ZulespotZulesActivity, ZulePlayerActivity::class.java)
                    intent.putExtra("zule", Gson().toJson(zules[viewHolder.adapterPosition]))
                    intent.putExtra("user", Gson().toJson(user))
                    intent.putExtra("zulespot", Gson().toJson(zulespot))
                    overridePendingTransition(
                        com.google.android.material.R.anim.abc_fade_in,
                        com.google.android.material.R.anim.abc_fade_out
                    )
                    startActivity(intent)
                }

            }).attachToRecyclerView(it as RecyclerView)
        }
    }


    private fun setUpTransformer(viewPager2: ViewPager2) {
        val transformer = CompositePageTransformer()
        transformer.addTransformer(MarginPageTransformer(40))
        transformer.addTransformer { page, position ->
            val r = 1 - abs(position)
            page.scaleY = 0.85f + r * 0.14f
        }

        viewPager2.setPageTransformer(transformer)
    }

    @SuppressLint("NotifyDataSetChanged")
    override fun onResume() {
        super.onResume()
        viewPager2.adapter?.notifyDataSetChanged()
    }
}