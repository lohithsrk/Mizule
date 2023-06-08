package com.mizule.mizule.screens.profile

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.bumptech.glide.Glide
import com.google.android.flexbox.AlignItems
import com.google.android.flexbox.FlexWrap
import com.google.android.flexbox.FlexboxLayoutManager
import com.google.android.flexbox.JustifyContent
import com.google.gson.Gson
import com.mizule.mizule.R
import com.mizule.mizule.adapters.LikesAdapter
import com.mizule.mizule.adapters.ZuleSuggestionSliderAdapter
import com.mizule.mizule.dataClass.userDataClass.User
import com.mizule.mizule.dataClass.zulesDataClass.Zule
import com.mizule.mizule.dataClass.zulespotDataClass.Zulespot
import com.mizule.mizule.databinding.FragmentProfileBinding
import com.mizule.mizule.retrofit.RetrofitInstance
import com.mizule.mizule.retrofit.userApi.UserApi
import com.mizule.mizule.retrofit.zulesApi.FetchZulesApi
import com.mizule.mizule.retrofit.zulespotApi.ZulespotApi
import com.mizule.mizule.screens.zulespot.CreateZulespot
import com.mizule.mizule.screens.zulespot.ZulespotActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ProfileFragment : Fragment() {
    private lateinit var intent: Intent
    private lateinit var user: User
    private lateinit var binding:FragmentProfileBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val sharedPreferences =
            this.activity?.getSharedPreferences("USER", AppCompatActivity.MODE_PRIVATE)
        val userJSON = sharedPreferences?.getString("USER", null)
        user = Gson().fromJson(userJSON, User::class.java)
    }

//    override fun onResume() {
//        super.onResume()
//        val sharedPreferences = this.activity?.getSharedPreferences("USER", AppCompatActivity.MODE_PRIVATE)
//        val userJSON=sharedPreferences?.getString("USER",null)
//        user = Gson().fromJson(userJSON, User::class.java)
//    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        binding = FragmentProfileBinding.inflate(inflater, container, false)

        Glide.with(this).load(user.icon).into(binding.profileImg)
        binding.profileName.text = user.name
        binding.becomeZulist.text = if(user.zulespotId?.isNotEmpty() == true)"Visit Zulespot" else "Become a Zulist?"

        binding.becomeZulist.setOnClickListener {
            if (user.zulespotId == null) {
                intent = Intent(activity, CreateZulespot::class.java)
                startActivity(intent)
            } else {
                val retService: ZulespotApi =
                    RetrofitInstance.getRetrofitInstance().create(ZulespotApi::class.java)
                retService.getZulespot(user.zulespotId!!).enqueue(
                    object : Callback<Zulespot> {
                        override fun onResponse(
                            call: Call<Zulespot>,
                            response: Response<Zulespot>
                        ) {
                            intent = Intent(activity, ZulespotActivity::class.java)
                            intent.putExtra("zulespot", Gson().toJson(response.body()))
                            startActivity(intent)
                        }

                        override fun onFailure(call: Call<Zulespot>, t: Throwable) {
                            Toast.makeText(context, "Something went wrong", Toast.LENGTH_LONG)
                                .show()
                        }
                    }
                )
            }
        }

        selectTab("liked")

        binding.likedTV.setOnClickListener {
            selectTab("liked")
        }
        binding.historyTV.setOnClickListener {
            Log.i("SDF","nnkn")
            selectTab("history")

        }


        val retService: UserApi =
            RetrofitInstance.getRetrofitInstance().create(UserApi::class.java)

        retService.getLiked(user.userId).enqueue(
            object : Callback<MutableList<Zule>> {
                override fun onResponse(
                    call: Call<MutableList<Zule>>,
                    response: Response<MutableList<Zule>>
                ) {
                    if (response.isSuccessful) {

                        val likesLayoutManager = FlexboxLayoutManager(context)
                        likesLayoutManager.flexWrap = FlexWrap.WRAP
                        likesLayoutManager.justifyContent = JustifyContent.FLEX_START
                        likesLayoutManager.alignItems = AlignItems.FLEX_START
                        binding.likes.layoutManager = likesLayoutManager
                        val liked_adapter =
                            context?.let { LikesAdapter(response.body()!!, it) }
                        binding.likes.adapter = liked_adapter

                    } else {
                        Log.i("ERRORR", response.body().toString())
                    }
                }

                override fun onFailure(call: Call<MutableList<Zule>>, t: Throwable) {
                    Log.i("ERRORR", t.toString())
                }
            }
        )

        retService.getHistory(user.userId).enqueue(
            object : Callback<MutableList<Zule>> {
                override fun onResponse(
                    call: Call<MutableList<Zule>>,
                    response: Response<MutableList<Zule>>
                ) {
                    if (response.isSuccessful) {

                        val historyLayoutManager = FlexboxLayoutManager(context)
                        historyLayoutManager.flexWrap = FlexWrap.WRAP
                        historyLayoutManager.justifyContent = JustifyContent.FLEX_START
                        historyLayoutManager.alignItems = AlignItems.FLEX_START
                        binding.history.layoutManager = historyLayoutManager
                        val historyadapter =
                            context?.let { LikesAdapter(response.body()!!, it) }
                        binding.history.adapter = historyadapter

                    } else {
                        Log.i("ERRORR", response.body().toString())
                    }
                }

                override fun onFailure(call: Call<MutableList<Zule>>, t: Throwable) {
                    Log.i("ERRORR", t.toString())
                }
            }
        )

        return binding.root
    }

    private fun selectTab(tab:String){
        if(tab=="liked"){
            binding.likes.visibility=View.VISIBLE
            binding.history.visibility=View.GONE
            binding.likedTV.setBackgroundResource(R.drawable.tab_selected)
            binding.likedTV.setTextColor(Color.BLACK)
            binding.historyTV.setBackgroundResource(R.drawable.teaser_player_container)
            binding.historyTV.setTextColor(Color.WHITE)

        }else{
            binding.likes.visibility=View.GONE
            binding.history.visibility=View.VISIBLE
            binding.historyTV.setBackgroundResource(R.drawable.tab_selected)
            binding.historyTV.setTextColor(Color.BLACK)
            binding.likedTV.setBackgroundResource(R.drawable.teaser_player_container)
            binding.likedTV.setTextColor(Color.WHITE)
        }
    }
}
