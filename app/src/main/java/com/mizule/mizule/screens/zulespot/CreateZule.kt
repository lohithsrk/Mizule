package com.mizule.mizule.screens.zulespot

import android.annotation.SuppressLint
import android.graphics.Color
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.util.Log
import android.widget.Toast
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts.*
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.flexbox.AlignItems
import com.google.android.flexbox.FlexWrap
import com.google.android.flexbox.FlexboxLayoutManager
import com.google.android.flexbox.JustifyContent
import com.google.gson.Gson
import com.mizule.mizule.R
import com.mizule.mizule.adapters.CBFCAdapter
import com.mizule.mizule.adapters.GenreAdapter
import com.mizule.mizule.adapters.KeywordsAdapter
import com.mizule.mizule.dataClass.zulesDataClass.Zule
import com.mizule.mizule.dataClass.zulespotDataClass.Zulespot
import com.mizule.mizule.databinding.ActivityCreateZuleBinding
import com.mizule.mizule.retrofit.RetrofitInstance
import com.mizule.mizule.retrofit.zulesApi.ZuleApi
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.File


class CreateZule : AppCompatActivity() {
    private var keywords= mutableListOf<String>()
    private lateinit var teaserPath: String
    private lateinit var zulePath: String
    private lateinit var thumbnail_16_9_path: String
    private lateinit var thumbnail_9_16_path: String
    lateinit var currentZule: Zule


    @SuppressLint("NotifyDataSetChanged")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivityCreateZuleBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val cbfcTags = listOf("U/A", "U", "A", "R")

        val cbfcLayoutManager = LinearLayoutManager(this)
        cbfcLayoutManager.orientation = LinearLayoutManager.HORIZONTAL
        binding.cbfcTags.layoutManager=cbfcLayoutManager
        val cbfcAdapter=CBFCAdapter(cbfcTags)
        binding.cbfcTags.adapter=cbfcAdapter


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
        val zulespot:Zulespot = Gson().fromJson(intent.getStringExtra("zulespot"),Zulespot::class.java)

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

        val thumbnail_16_9_Picker = registerForActivityResult<PickVisualMediaRequest, Uri>(PickVisualMedia()) { uri: Uri? ->
            if (uri != null) {
                thumbnail_16_9_path =uriToFilePath(Uri.parse(uri.toString())).toString()
                if(thumbnail_16_9_path.isBlank()){
                    binding.thumbnail169.setBackgroundResource(R.drawable.custom_button_dark)
                    binding.thumbnail169Text.setTextColor(Color.WHITE)
                } else {
                    binding.thumbnail169.setBackgroundResource(R.drawable.custom_button_light)
                    binding.thumbnail169Text.setTextColor(Color.BLACK)

                }
            }
        }

        binding.thumbnail169.setOnClickListener {
            thumbnail_16_9_Picker.launch(
                PickVisualMediaRequest.Builder().setMediaType(PickVisualMedia.ImageOnly).build()
            )
        }

        val thumbnail_9_16_Picker = registerForActivityResult<PickVisualMediaRequest, Uri>(PickVisualMedia()) { uri: Uri? ->
            if (uri != null) {
                thumbnail_9_16_path =uriToFilePath(Uri.parse(uri.toString())).toString()
                if(thumbnail_9_16_path.isBlank()){
                    binding.thumbnail916.setBackgroundResource(R.drawable.custom_button_dark)
                    binding.thumbnail916Text.setTextColor(Color.WHITE)
                } else {
                    binding.thumbnail916.setBackgroundResource(R.drawable.custom_button_light)
                    binding.thumbnail916Text.setTextColor(Color.BLACK)

                }
            }
        }

        binding.thumbnail916.setOnClickListener {
            thumbnail_9_16_Picker.launch(
                PickVisualMediaRequest.Builder().setMediaType(PickVisualMedia.ImageOnly).build()
            )
        }

        val zuleVidPicker = registerForActivityResult<PickVisualMediaRequest, Uri>(PickVisualMedia()) { uri: Uri? ->
            if (uri != null) {
                zulePath =uriToFilePath(Uri.parse(uri.toString())).toString()
                if(zulePath.isBlank()){
                    binding.zuleVid.setBackgroundResource(R.drawable.custom_button_dark)
                    binding.zuleText.setTextColor(Color.WHITE)
                } else {
                    binding.zuleVid.setBackgroundResource(R.drawable.custom_button_light)
                    binding.zuleText.setTextColor(Color.BLACK)

                }
            }
        }

        binding.zuleVid.setOnClickListener {
            zuleVidPicker.launch(
                PickVisualMediaRequest.Builder().setMediaType(PickVisualMedia.VideoOnly).build()
            )
        }

        val teaserVidPicker = registerForActivityResult<PickVisualMediaRequest, Uri>(PickVisualMedia()) { uri: Uri? ->
            if (uri != null) {
                teaserPath =uriToFilePath(Uri.parse(uri.toString())).toString()
                if(teaserPath.isBlank()){
                    binding.teaserVid.setBackgroundResource(R.drawable.custom_button_dark)
                    binding.teaserText.setTextColor(Color.WHITE)
                } else {
                    binding.teaserVid.setBackgroundResource(R.drawable.custom_button_light)
                    binding.teaserText.setTextColor(Color.BLACK)

                }
            }
        }

        binding.teaserVid.setOnClickListener {
            teaserVidPicker.launch(
                PickVisualMediaRequest.Builder().setMediaType(PickVisualMedia.VideoOnly).build()

            //TODO file res
            )
        }

        binding.createZule.setOnClickListener {
            val title = binding.title.text.toString()
            val description = binding.description.text.toString()
            val cbfc_rating = cbfcAdapter.selectedCbfcRating
            val genre = genre_adapter.selectedGenre

            val body= mutableMapOf<String,RequestBody>()
            body.put("title", RequestBody.create(MultipartBody.FORM,title))
            body.put("description", RequestBody.create(MultipartBody.FORM,description))
            body.put("cbfc_rating", RequestBody.create(MultipartBody.FORM,cbfc_rating))
            body.put("genre", RequestBody.create(MultipartBody.FORM,genre))
            body.put("userId", RequestBody.create(MultipartBody.FORM,zulespot.owner))
            body.put("tags", RequestBody.create(MultipartBody.FORM, keywords.toString()))
            body.put("zulespotId", RequestBody.create(MultipartBody.FORM,zulespot.zulespotId))
//TODO file ext validation, fields validation
            val thumbnail_9_16_filePart=filePart(thumbnail_9_16_path,"thumbnail_9_16")
            val thumbnail_16_9_filePart=filePart(thumbnail_16_9_path,"thumbnail_16_9")
            val zule_filePart=filePart(zulePath,"zule")
            val teaser_filePart=filePart(teaserPath,"teaser")

            val retService: ZuleApi = RetrofitInstance.getRetrofitInstance().create(ZuleApi::class.java)
            retService.create(body,thumbnail_16_9_filePart, thumbnail_9_16_filePart,zule_filePart,teaser_filePart)
                .enqueue(
                object : Callback<String> {
                    override fun onResponse(call: Call<String>, response: Response<String>) {
                        if(response.isSuccessful) {
                            finish()
                        }else{
                            Toast.makeText(this@CreateZule, "Something went wrong", Toast.LENGTH_LONG).show()
                        }
                    }
                    override fun onFailure(call: Call<String>, t: Throwable) {
                            Log.i("ERRORR",t.toString())
                        Toast.makeText(this@CreateZule, "Something went wrong", Toast.LENGTH_LONG).show()
                    }
                }
            )
        }
    }



    fun filePart(path:String,partName:String):MultipartBody.Part{
        val file = File(path)
        val requestFile:RequestBody = RequestBody.create(MediaType.parse("multipart/form-data"), file)
        val filePart:MultipartBody.Part = MultipartBody.Part.createFormData(partName, file.name, requestFile)
        return filePart
    }

    fun uriToFilePath(uri: Uri): String? {
        val projection = arrayOf(MediaStore.MediaColumns.DATA)
        val cursor = this.contentResolver.query(uri, projection, null, null, null)
        return if (cursor != null && cursor.moveToFirst()) {
            val columnIndex = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.DATA)
            val path = cursor.getString(columnIndex)
            cursor.close()
            path
        } else {
            null
        }
    }

}
