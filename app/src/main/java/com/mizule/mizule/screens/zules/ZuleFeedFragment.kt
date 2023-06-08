package com.mizule.mizule.screens.zules

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.children
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.ItemTouchHelper
import androidx.recyclerview.widget.RecyclerView
import androidx.viewpager2.widget.CompositePageTransformer
import androidx.viewpager2.widget.MarginPageTransformer
import androidx.viewpager2.widget.ViewPager2
import com.google.gson.Gson
import com.mizule.mizule.R
import com.mizule.mizule.adapters.ZuleSliderAdapter
import com.mizule.mizule.dataClass.userDataClass.User
import com.mizule.mizule.dataClass.zulesDataClass.Zule
import com.mizule.mizule.retrofit.RetrofitInstance
import com.mizule.mizule.retrofit.zulesApi.FetchZulesApi
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import kotlin.math.abs

class ZuleFeedFragment(private var zule:Zule?) : Fragment() {

    lateinit var user: User
    lateinit var viewPager2: ViewPager2
    lateinit var adapter: ZuleSliderAdapter
    lateinit var zules:MutableList<Zule>
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val sharedPreferences =
            context?.getSharedPreferences("USER", AppCompatActivity.MODE_PRIVATE)
        val userJSON = sharedPreferences?.getString("USER", null)
        user = Gson().fromJson(userJSON, User::class.java)

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_zule_feed, container, false)
        viewPager2 = view.findViewById<ViewPager2>(R.id.viewPager2)

        val retService = RetrofitInstance.getRetrofitInstance().create(FetchZulesApi::class.java)
        val handler = Handler(Looper.myLooper()!!)

        var offset = 0

        retService.getRandomZules(offset, 50).enqueue(object : Callback<MutableList<Zule>> {
            @RequiresApi(Build.VERSION_CODES.N)
            override fun onResponse(call: Call<MutableList<Zule>>, response: Response<MutableList<Zule>>) {

                    zules= response.body()!!
                if(zule!=null){
                    zules.removeIf { it.zuleId== zule!!.zuleId }
                    zules.add(0,zule!!)
                }

                adapter = zules.let {
                    context?.let { it1 -> ZuleSliderAdapter(it, user, it1) }
                }!!
                viewPager2.adapter = adapter
            }

            override fun onFailure(call: Call<MutableList<Zule>>, t: Throwable) {
                Log.i("ERRORR", t.toString())
            }
        })

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

                override fun getSwipeThreshold(viewHolder: RecyclerView.ViewHolder): Float {
                    return 0.3f
                }

                override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {
                    val intent = Intent(context, ZulePlayerActivity::class.java)
                    intent.putExtra("zule", Gson().toJson(zules[viewHolder.adapterPosition]))
                    intent.putExtra("user", Gson().toJson(user))
                    context?.startActivity(intent)
                    activity?.overridePendingTransition(
                        com.google.android.material.R.anim.abc_fade_in,
                        com.google.android.material.R.anim.abc_fade_out
                    )
                }

            }).attachToRecyclerView(it as RecyclerView)
        }

        return view
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