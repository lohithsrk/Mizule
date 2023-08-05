package com.mizule.views.screens.zulespotScreens

import android.content.Context
import android.net.Uri
import android.provider.MediaStore
import android.util.Log
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Divider
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.mizule.R
import com.mizule.views.components.FormComponents
import java.nio.file.WatchEvent

@OptIn(ExperimentalLayoutApi::class, ExperimentalMaterial3Api::class)
@Composable
fun CreateZuleScreen() {
    var title by remember {
        mutableStateOf("")
    }
    var description by remember {
        mutableStateOf("")
    }
    var thumbnail_9_16 by remember {
        mutableStateOf("")
    }
    var thumbnail_16_9 by remember {
        mutableStateOf("")
    }
    var teaser by remember {
        mutableStateOf("")
    }
    var zule by remember {
        mutableStateOf("")
    }
    var cbfcRating by remember {
        mutableStateOf("")
    }
    var genre by remember {
        mutableStateOf("")
    }
    var keywords by remember {
        mutableStateOf(mutableListOf("jjkn"))
    }
    var keyword by remember {
        mutableStateOf("")
    }

    val cbfcRatings = listOf("U/A", "U", "A", "R")
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
        "Thriller"
    )

    val context = LocalContext.current

    val thumbnail_9_16_picker = rememberLauncherForActivityResult(
        ActivityResultContracts.PickVisualMedia()
    ) { uri: Uri? ->
        if (uri != null) {
            thumbnail_9_16 = uriToFilePath(Uri.parse(uri.toString()), context).toString()
        }
    }
    val thumbnail_16_9_picker = rememberLauncherForActivityResult(
        ActivityResultContracts.PickVisualMedia()
    ) { uri: Uri? ->
        if (uri != null) {
            thumbnail_16_9 = uriToFilePath(Uri.parse(uri.toString()), context).toString()
        }
    }
    val teaserPicker = rememberLauncherForActivityResult(
        ActivityResultContracts.PickVisualMedia()
    ) { uri: Uri? ->
        if (uri != null) {
            teaser = uriToFilePath(Uri.parse(uri.toString()), context).toString()
        }
    }
    val zulePicker = rememberLauncherForActivityResult(
        ActivityResultContracts.PickVisualMedia()
    ) { uri: Uri? ->
        if (uri != null) {
            zule = uriToFilePath(Uri.parse(uri.toString()), context).toString()
        }
    }


    val formComponents = FormComponents()

    Column(Modifier.background(MaterialTheme.colorScheme.background)) {
        Text(
            text = "Create Zule",
            color = Color.White,
            textAlign = TextAlign.Left,
            fontSize = 25.sp,
            modifier = Modifier.padding(10.dp),
            fontWeight = FontWeight.Bold
        )
        Divider()
        Column(modifier = Modifier.padding(10.dp)) {

            formComponents.CustomInput(
                title, "Title", onChange = { title = it }, placeholder = "Enter Zule Title"
            )
            formComponents.CustomInput(
                description,
                "Description",
                onChange = { description = it },
                placeholder = "Describe about your zule"
            )
            Text(
                text = "Upload media",
                color = Color.White,
                textAlign = TextAlign.Left,
            )
            Spacer(Modifier.height(10.dp))


            Row {
                formComponents.CustomButton(
                    text = "Thumbnail (9:16)",
                    onClick = { thumbnail_9_16_picker.launch(PickVisualMediaRequest(mediaType = ActivityResultContracts.PickVisualMedia.ImageOnly)) },
                    modifier = Modifier.weight(1F),

                    backgroundColor = if (thumbnail_9_16.isNotEmpty()) Color.White else Color.DarkGray,
                    borderColor = if (thumbnail_9_16.isNotEmpty()) Color.White else Color.DarkGray,
                    textColor = if (thumbnail_9_16.isNotEmpty()) Color.Black else Color.White,
                )
                Spacer(Modifier.width(5.dp))
                formComponents.CustomButton(
                    text = "Thumbnail (16:9)",
                    onClick = {
                        thumbnail_16_9_picker.launch(PickVisualMediaRequest(mediaType = ActivityResultContracts.PickVisualMedia.ImageOnly))
                    },
                    modifier = Modifier.weight(1F),
                    backgroundColor = if (thumbnail_16_9.isNotEmpty()) Color.White else Color.DarkGray,
                    borderColor = if (thumbnail_16_9.isNotEmpty()) Color.White else Color.DarkGray,
                    textColor = if (thumbnail_16_9.isNotEmpty()) Color.Black else Color.White,
                )
            }
            Spacer(Modifier.height(5.dp))
            Row {
                formComponents.CustomButton(
                    text = "Teaser (9:16)",
                    onClick = {
                        teaserPicker.launch(PickVisualMediaRequest(mediaType = ActivityResultContracts.PickVisualMedia.ImageOnly))
                    },
                    modifier = Modifier.weight(1F),
                    backgroundColor = if (teaser.isNotEmpty()) Color.White else Color.DarkGray,
                    borderColor = if (teaser.isNotEmpty()) Color.White else Color.DarkGray,
                    textColor = if (teaser.isNotEmpty()) Color.Black else Color.White,
                )
                Spacer(Modifier.width(5.dp))
                formComponents.CustomButton(
                    text = "Zule (16:9)",
                    onClick = {
                        zulePicker.launch(PickVisualMediaRequest(mediaType = ActivityResultContracts.PickVisualMedia.ImageOnly))
                    },
                    modifier = Modifier.weight(1F),
                    backgroundColor = if (zule.isNotEmpty()) Color.White else Color.DarkGray,
                    borderColor = if (zule.isNotEmpty()) Color.White else Color.DarkGray,
                    textColor = if (zule.isNotEmpty()) Color.Black else Color.White,
                )
            }
            Spacer(Modifier.height(10.dp))
            Text(
                text = "CBFC Rating",
                color = Color.White,
                textAlign = TextAlign.Left,
            )
            Spacer(Modifier.height(5.dp))

            LazyRow {
                items(items = cbfcRatings) {
                    formComponents.CustomButton(
                        text = it,
                        onClick = { cbfcRating = it },
                        backgroundColor = if (cbfcRating == it) Color.White else Color.DarkGray,
                        borderColor = Color.Black,
                        textColor = if (cbfcRating == it) Color.Black else Color.White,
                        borderStroke = 3.dp, modifier = Modifier.padding(3.dp)
                    )
                }
            }
            Text(
                text = "Genre",
                color = Color.White,
                textAlign = TextAlign.Left,
            )
            Spacer(Modifier.height(5.dp))

            LazyRow {
                items(items = genres) {
                    formComponents.CustomButton(
                        text = it,
                        onClick = { genre = it },
                        backgroundColor = if (genre == it) Color.White else Color.DarkGray,
                        borderColor = Color.Black,
                        textColor = if (genre == it) Color.Black else Color.White,
                        borderStroke = 3.dp, modifier = Modifier.padding(3.dp)
                    )
                }
            }
            Spacer(Modifier.height(10.dp))
            Text(text = "Keyword", color = Color.White)
            Spacer(Modifier.height(5.dp))
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.Center
            ) {

                OutlinedTextField(
                    value = keyword,
                    onValueChange = { keyword = it },
                    modifier = Modifier
                        .height(IntrinsicSize.Min)
                        .weight(4F),
                    shape = RoundedCornerShape(8.dp),
                    singleLine = true,
                    placeholder = { Text(text = "Add a keyword") },
                    colors = TextFieldDefaults.textFieldColors(
                        focusedIndicatorColor = Color.White,
                        unfocusedIndicatorColor = Color.Gray,
                        containerColor = Color.Transparent,
                        placeholderColor = Color.Gray
                    )
                )
                Image(
                    painter = painterResource(R.drawable.baseline_add_box_24),
                    contentDescription = "ADD",
                    modifier = Modifier
                        .width(130.dp)
                        .height(60.dp)
                        .weight(1F)
                        .clickable {
                            keywords.add(0, keyword)
                        }
                )
            }
            Spacer(Modifier.height(5.dp))

            LazyRow {
                items(items = keywords) {
                    formComponents.CustomButton(
                        text = it,
                        onClick = { keywords.remove(it) },
                        backgroundColor = Color.White,
                        borderColor = Color.Black,
                        textColor = Color.Black,
                        borderStroke = 3.dp, modifier = Modifier.padding(3.dp)
                    )
                }
            }
            Spacer(Modifier.height(10.dp))



            formComponents.CustomButton(text = "CREATE ZULE", onClick = {
//                val result = signin(email, password)
//                if (result) {
//                    Toast.makeText(context, "Success", Toast.LENGTH_LONG).show()
//                } else {
//                    Toast.makeText(context, "Failed", Toast.LENGTH_LONG).show()
//                }
            })

        }
    }
}

fun uriToFilePath(uri: Uri, context: Context): String? {
    val projection = arrayOf(MediaStore.MediaColumns.DATA)
    val cursor = context.contentResolver.query(uri, projection, null, null, null)
    return if (cursor != null && cursor.moveToFirst()) {
        val columnIndex = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.DATA)
        val path = cursor.getString(columnIndex)
        cursor.close()
        path
    } else {
        null
    }
}

@Preview
@Composable
fun CreateZulePreview(){
    return CreateZuleScreen()
}