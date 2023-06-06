package com.mizule.mizule.screens.profile

import android.content.Intent
import android.os.Bundle
import retrofit2.Call
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.google.gson.Gson
import com.mizule.mizule.dataClass.userDataClass.User
import com.mizule.mizule.dataClass.zulespotDataClass.Zulespot
import com.mizule.mizule.databinding.FragmentProfileBinding
import com.mizule.mizule.retrofit.RetrofitInstance
import com.mizule.mizule.retrofit.zulespotApi.ZulespotApi
import com.mizule.mizule.screens.zulespot.CreateZulespot
import com.mizule.mizule.screens.zulespot.ZulespotActivity
import retrofit2.Callback
import retrofit2.Response

class ProfileFragment : Fragment() {
    private lateinit var intent:Intent
    private lateinit var user:User

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val sharedPreferences = this.activity?.getSharedPreferences("USER", AppCompatActivity.MODE_PRIVATE)
        val userJSON=sharedPreferences?.getString("USER",null)
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

        val binding = FragmentProfileBinding.inflate(inflater,container,false)

        Glide.with(this).load(user.icon).into(binding.profileImg)
        binding.profileName.text=user.name

        binding.becomeZulist.setOnClickListener {
             if(user.zulespotId == null) {
                intent = Intent(activity, CreateZulespot::class.java)
                startActivity(intent)
             }else{
                 val retService: ZulespotApi = RetrofitInstance.getRetrofitInstance().create(ZulespotApi::class.java)
                 retService.getZulespot(user.zulespotId!!).enqueue(
                     object : Callback<Zulespot> {
                         override fun onResponse(
                             call: Call<Zulespot>,
                             response: Response<Zulespot>
                         ) {
                            intent =Intent(activity, ZulespotActivity::class.java)
                            intent.putExtra("zulespot",Gson().toJson(response.body()))
                            startActivity(intent)
                         }
                         override fun onFailure(call: Call<Zulespot>, t: Throwable) {
                             Toast.makeText(context,"Something went wrong",Toast.LENGTH_LONG).show()
                         }
                     }
                 )
             }
        }

        return binding.root
    }
}
