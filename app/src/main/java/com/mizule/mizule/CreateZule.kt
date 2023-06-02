package com.mizule.mizule

import android.annotation.SuppressLint
import android.content.Intent
import android.graphics.Color
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.util.Log
import android.widget.Toast
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.flexbox.AlignItems
import com.google.android.flexbox.FlexWrap
import com.google.android.flexbox.FlexboxLayoutManager
import com.google.android.flexbox.JustifyContent
import com.google.gson.Gson
import com.mizule.mizule.adapters.CBFCAdapter
import com.mizule.mizule.adapters.GenreAdapter
import com.mizule.mizule.adapters.KeywordsAdapter
import com.mizule.mizule.dataClass.userDataClass.User
import com.mizule.mizule.dataClass.zulespotDataClass.Zulespot
import com.mizule.mizule.databinding.ActivityCreateZuleBinding
import com.mizule.mizule.retrofit.RetrofitInstance
import com.mizule.mizule.retrofit.authApi.AuthApi
import com.mizule.mizule.retrofit.zulesApi.ZulesApi
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.File


class CreateZule : AppCompatActivity() {
    private var keywords= mutableListOf<String>()
    private var teaserPath: String? = null
    private var zulePath: String? = null
    private var thumbnail_16_9_path: String? = null
    private var thumbnail_9_16_path: String? = null

        @SuppressLint("NotifyDataSetChanged")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivityCreateZuleBinding.inflate(layoutInflater)
        setContentView(binding.root)



        val cbfc_tags = listOf("U/A", "U", "A", "R")

        val cbfcLayoutManager = LinearLayoutManager(this)
        cbfcLayoutManager.orientation = LinearLayoutManager.HORIZONTAL
        binding.cbfcTags.layoutManager=cbfcLayoutManager
        val cbfc_adapter=CBFCAdapter(cbfc_tags)
        binding.cbfcTags.adapter=cbfc_adapter


        val genres = listOf(
            "Action",
            "Animation",
            "Comedy",
            "Crime",
            "Drama",
            "Fantasy",
            "Historical",
            "Horror",
            "Romance",
            "Thriller")

        val genreLayoutManager = FlexboxLayoutManager(this)
        genreLayoutManager.flexWrap = FlexWrap.WRAP
        genreLayoutManager.justifyContent = JustifyContent.FLEX_START
        genreLayoutManager.alignItems = AlignItems.FLEX_START
        binding.genreTags.layoutManager=genreLayoutManager
        val genre_adapter =GenreAdapter(genres)
        binding.genreTags.adapter=genre_adapter

        val keywordsLayoutManager = FlexboxLayoutManager(this)
        keywordsLayoutManager.flexWrap = FlexWrap.WRAP
        keywordsLayoutManager.justifyContent = JustifyContent.FLEX_START
        keywordsLayoutManager.alignItems = AlignItems.FLEX_START
        binding.listKeywords.layoutManager=keywordsLayoutManager
        val keywordAdapter=KeywordsAdapter(keywords)
        binding.listKeywords.adapter=keywordAdapter

        binding.addKeyword.setOnClickListener {
            keywords.add(binding.keywords.text.toString())
            keywordAdapter.notifyDataSetChanged()
            binding.keywords.setText("")
        }

        val thumbnail169PickMedia = registerForActivityResult(ActivityResultContracts.PickVisualMedia()) { uri ->
            if (uri != null) {
                thumbnail_16_9_path= uri.toString()
            }
            if(thumbnail_16_9_path!=null){
                binding.thumbnail169.setBackgroundResource(R.drawable.custom_button_light)
                binding.thumbnail169Text.setTextColor(Color.BLACK)
            }
        }

        binding.thumbnail169.setOnClickListener {
            thumbnail169PickMedia.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly))
        }

        val thumbnail916PickMedia = registerForActivityResult(ActivityResultContracts.PickVisualMedia()) { uri ->
            if (uri != null) {
                thumbnail_9_16_path = uri.toString()
            }
            if(thumbnail_9_16_path!=null) {
                binding.thumbnail916.setBackgroundResource(R.drawable.custom_button_light)
                binding.thumbnail916Text.setTextColor(Color.BLACK)
            }
        }

        binding.thumbnail916.setOnClickListener {
            thumbnail916PickMedia.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly))
        }

        val zuleVidPickMedia = registerForActivityResult(ActivityResultContracts.PickVisualMedia()) { uri ->
            if (uri != null) {
                zulePath= uri.toString()
            }
            if (zulePath != null) {
                binding.zuleVid.setBackgroundResource(R.drawable.custom_button_light)
                binding.zuleText.setTextColor(Color.BLACK)
            }
        }
        binding.zuleVid.setOnClickListener {
            zuleVidPickMedia.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.VideoOnly))
        }

        val teaserVidPickMedia = registerForActivityResult(ActivityResultContracts.PickVisualMedia()) { uri ->
            if (uri != null) {
                teaserPath= uri.toString()
            }
            if(teaserPath!=null){
                binding.teaserVid.setBackgroundResource(R.drawable.custom_button_light)
                binding.teaserText.setTextColor(Color.BLACK)
            }
        }

        binding.teaserVid.setOnClickListener {
            teaserVidPickMedia.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.VideoOnly))
        }

        binding.createZule.setOnClickListener {
            val title = binding.title.text.toString()
            val description = binding.description.text.toString()
            val cbfc_rating = cbfc_adapter.selectedCbfcRating
            val genre = genre_adapter.selectedGenre

            val sharedPreferences1 = getSharedPreferences("USER", MODE_PRIVATE)
            val userJSON=sharedPreferences1.getString("USER",null)
            val userId:String= Gson().fromJson(userJSON,User::class.java).userId

            val sharedPreferences2 = getSharedPreferences("ZULESPOT", MODE_PRIVATE)
            val zulespotJSON=sharedPreferences2.getString("ZULESPOT",null)
            Log.i("AAAAAA",zulespotJSON.toString())
            val zulespotId= Gson().fromJson(zulespotJSON,Zulespot::class.java).zulespotId

            val body: MutableMap<String, String> = HashMap()
            body["title"] = description
            body["description"] = description
            body["cbfc_rating"] = cbfc_rating
            body["genre"] = genre
            body["userId"] = userId
            body["zulespotId"] = zulespotId

            var file = thumbnail_16_9_path?.let { it1 -> File(it1) }
            var requestFile = RequestBody.create(MediaType.parse("multipart/form-data"), file)
            val thumbnail_16_9_filePart = MultipartBody.Part.createFormData("file",
                file?.name, requestFile)

            file = thumbnail_9_16_path?.let { it1 -> File(it1) }
            requestFile = RequestBody.create(MediaType.parse("multipart/form-data"), file)
            val thumbnail_9_16_filePart = MultipartBody.Part.createFormData("file",
                file?.name, requestFile)

            file = zulePath?.let { it1 -> File(it1) }
            requestFile = RequestBody.create(MediaType.parse("multipart/form-data"), file)
            val zule_filePart = MultipartBody.Part.createFormData("file",
                file?.name, requestFile)

            file = teaserPath?.let { it1 -> File(it1) }
            requestFile = RequestBody.create(MediaType.parse("multipart/form-data"), file)
            val teaser_filePart = MultipartBody.Part.createFormData("file",
                file?.name, requestFile)


            val requestBody = RequestBody.create(MediaType.parse("application/json"), Gson().toJson(body))
            val requestBodyPart = MultipartBody.Part.createFormData("request_body", "request_body.txt", requestBody)


            val retService: ZulesApi = RetrofitInstance.getRetrofitInstance().create(ZulesApi::class.java)
            retService.create(thumbnail_9_16_filePart,thumbnail_16_9_filePart,zule_filePart,teaser_filePart,requestBodyPart).enqueue(
                object : Callback<String> {
                    override fun onResponse(call: Call<String>, response: Response<String>) {
                        if(response.isSuccessful) {
                            val user=response.body()
                            Log.i("ASDF",user.toString())
//                                val user: User? = userResponse?.user
//                                user?.zulespot= userResponse?.zulespot!!


//                            val intent = Intent(this@CreateZule, MainActivity::class.java)
//                            startActivity(intent)
//                            finish()
                        }else{
                            Toast.makeText(this@CreateZule, "Invalid Email or Password", Toast.LENGTH_LONG).show()
                        }
                    }
                    override fun onFailure(call: Call<String>, t: Throwable) {
                        Toast.makeText(this@CreateZule, "Something went wrong", Toast.LENGTH_LONG).show()
                    }
                }
            )
        }
    }

}

