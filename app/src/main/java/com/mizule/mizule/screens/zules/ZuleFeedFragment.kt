package com.mizule.mizule.screens.zules

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
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

class ZuleFeedFragment : Fragment() {

    lateinit var user:User
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val sharedPreferences = context?.getSharedPreferences("USER", AppCompatActivity.MODE_PRIVATE)
        val userJSON= sharedPreferences?.getString("USER",null)
        user = Gson().fromJson(userJSON, User::class.java)

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view =inflater.inflate(R.layout.fragment_zule_feed, container, false)
        val viewPager2 = view.findViewById<ViewPager2>(R.id.viewPager2)
        val retService = RetrofitInstance.getRetrofitInstance().create(FetchZulesApi::class.java)
        val handler = Handler(Looper.myLooper()!!)

        var offset=0

        val call :Call<List<Zule>> = retService.getRandomZules(offset,50)

        call.enqueue(object: Callback<List<Zule>> {
            override fun onResponse(call: Call<List<Zule>>, response: Response<List<Zule>>) {
                viewPager2.adapter = response.body()?.let {
                    context?.let { it1 -> ZuleSliderAdapter(it,user, it1) }
                }
            }
            override fun onFailure(call: Call<List<Zule>>, t: Throwable) {
                Log.i("ERRORR",t.toString())
            }
        })

        viewPager2.offscreenPageLimit = 3
        viewPager2.clipToPadding = false
        viewPager2.clipChildren = false
        viewPager2.getChildAt(0).overScrollMode = RecyclerView.OVER_SCROLL_NEVER
        setUpTransformer(viewPager2)
        return view
    }
    private fun setUpTransformer(viewPager2:ViewPager2){
        val transformer = CompositePageTransformer()
        transformer.addTransformer(MarginPageTransformer(40))
        transformer.addTransformer { page, position ->
            val r = 1 - abs(position)
            page.scaleY = 0.85f + r * 0.14f
        }

        viewPager2.setPageTransformer(transformer)
    }
}