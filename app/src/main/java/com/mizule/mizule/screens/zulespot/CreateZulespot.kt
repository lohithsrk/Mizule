package com.mizule.mizule.screens.zulespot

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.gson.Gson
import com.mizule.mizule.dataClass.userDataClass.User
import com.mizule.mizule.dataClass.zulespotDataClass.Zulespot
import com.mizule.mizule.databinding.ActivityCreateZulespotBinding
import com.mizule.mizule.retrofit.RetrofitInstance
import com.mizule.mizule.retrofit.zulespotApi.ZulespotApi
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class CreateZulespot : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val binding = ActivityCreateZulespotBinding.inflate(layoutInflater)

        setContentView(binding.root)

        val userSharedPreferences = getSharedPreferences("USER", AppCompatActivity.MODE_PRIVATE)
        val userJSON = userSharedPreferences?.getString("USER", null)
        val user: User = Gson().fromJson(userJSON, User::class.java)

        val zulespotSharedPreferences =
            getSharedPreferences("ZULESPOT", AppCompatActivity.MODE_PRIVATE)

        binding.createZulespot.setOnClickListener {
            val retService: ZulespotApi =
                RetrofitInstance.getRetrofitInstance().create(ZulespotApi::class.java)
            val body: MutableMap<String, String> = HashMap()
            body["title"] = binding.zulespotTitle.text.toString()
            body["userId"] = user.userId

            retService.create(body).enqueue(
                object : Callback<Zulespot> {
                    override fun onResponse(call: Call<Zulespot>, response: Response<Zulespot>) {
                        if (response.isSuccessful) {
                            val zulespot: Zulespot = response.body()!!
                            user.zulespotId = zulespot.zulespotId

//                            val zulespotEditor = zulespotSharedPreferences.edit()
//                            zulespotEditor.putString("ZULESPOT",Gson().toJson(zulespot))
//                            zulespotEditor.apply()

                            val userEditor = userSharedPreferences.edit()
                            userEditor.putString("USER", Gson().toJson(user))
                            userEditor.apply()

                            val intent = Intent(this@CreateZulespot, ZulespotActivity::class.java)
                            intent.putExtra("zulespot", Gson().toJson(zulespot))
                            startActivity(intent)
                            finish()
                        } else {
                            Toast.makeText(
                                this@CreateZulespot,
                                "Try with different Zulespot title.",
                                Toast.LENGTH_LONG
                            ).show()
                        }
                    }

                    override fun onFailure(call: Call<Zulespot>, t: Throwable) {
                        Toast.makeText(
                            this@CreateZulespot,
                            "Something went wrong",
                            Toast.LENGTH_LONG
                        ).show()
                    }
                }
            )
        }
    }
}