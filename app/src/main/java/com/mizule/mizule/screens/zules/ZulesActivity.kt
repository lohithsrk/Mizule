package com.mizule.mizule.screens.zules

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.children
import androidx.recyclerview.widget.ItemTouchHelper
import androidx.recyclerview.widget.RecyclerView
import androidx.viewpager2.widget.CompositePageTransformer
import androidx.viewpager2.widget.MarginPageTransformer
import androidx.viewpager2.widget.ViewPager2
import com.google.gson.Gson
import com.mizule.mizule.adapters.zules.ZuleSliderAdapter
import com.mizule.mizule.dataClass.userDataClass.User
import com.mizule.mizule.dataClass.zulesDataClass.Zule
import com.mizule.mizule.dataClass.zulespotDataClass.Zulespot
import com.mizule.mizule.databinding.ActivityZulesBinding
import com.mizule.mizule.retrofit.RetrofitInstance
import com.mizule.mizule.retrofit.zulesApi.FetchZulesApi
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import kotlin.math.abs

class ZulesActivity : AppCompatActivity() {
    lateinit var user: User
    lateinit var viewPager2: ViewPager2
    lateinit var adapter: ZuleSliderAdapter
    lateinit var zules: MutableList<Zule>
    var zulespot: Zulespot? = null


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivityZulesBinding.inflate(layoutInflater)
        setContentView(binding.root)
        val sharedPreferences =
            getSharedPreferences("USER", MODE_PRIVATE)
        val userJSON = sharedPreferences?.getString("USER", null)
        user = Gson().fromJson(userJSON, User::class.java)

        val zulespotString: String? = intent.getStringExtra("zulespot")
        if (zulespotString != null) {
            zulespot = Gson().fromJson(zulespotString, Zulespot::class.java)
        }

        viewPager2 = binding.viewPager2

        val retService = RetrofitInstance.getRetrofitInstance().create(FetchZulesApi::class.java)

        var offset = 0
//TODO offset
        retService.getRandomZules(offset, 50).enqueue(object : Callback<MutableList<Zule>> {
            @RequiresApi(Build.VERSION_CODES.N)
            override fun onResponse(
                call: Call<MutableList<Zule>>,
                response: Response<MutableList<Zule>>
            ) {

                zules = response.body()!!
                viewPager2.adapter = ZuleSliderAdapter(zules, user, zulespot, this@ZulesActivity)
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
                    val intent = Intent(this@ZulesActivity, ZulePlayerActivity::class.java)
                    intent.putExtra("zule", Gson().toJson(zules[viewHolder.adapterPosition]))
                    intent.putExtra("user", Gson().toJson(user))
                    overridePendingTransition(
                        com.google.android.material.R.anim.abc_fade_in,
                        com.google.android.material.R.anim.abc_fade_out
                    )
                    startActivity(intent)
                }

            }).attachToRecyclerView(it as RecyclerView)
        }


//        val sharedPreferences = getSharedPreferences("USER", MODE_PRIVATE)
//        val userJSON = sharedPreferences.getString("USER", null)
//        val user: User = Gson().fromJson(userJSON, User::class.java)
//        if (user.equals(null)) {
//            val intent = Intent(this@ZulesActivity, WelcomeActivity::class.java)
//            startActivity(intent)
//        }
//        replaceFragment(ZuleFeedFragment(zule))

//        binding.bottomNavigationView.setOnItemSelectedListener {
//            when (it.itemId) {
//                R.id.zules -> replaceFragment(ZuleFeedFragment(zule))
////                R.id.discover -> replaceFragment(DiscoverFragment())
//                R.id.profile -> replaceFragment(ProfileFragment())
//            }
//            true
//        }

    }

//    private fun replaceFragment(fragment: Fragment) {
//        val fragmentManager = supportFragmentManager
//        val fragmentTransaction = fragmentManager.beginTransaction()
//        fragmentTransaction.replace(R.id.frame_layout, fragment)
//        fragmentTransaction.commit()
//    }

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

    override fun onBackPressed() {
    } //TODO
}