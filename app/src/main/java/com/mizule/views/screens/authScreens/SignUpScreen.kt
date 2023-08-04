package com.mizule.views.screens.authScreens

import android.util.Log
import android.widget.Toast
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.mizule.R
import com.mizule.ui.theme.MizuleTheme
import com.mizule.views.components.FormComponents

@Composable
fun SignUpScreen(navController: NavController, signup: (String, String, String) -> Boolean) {

    var email by remember {
        mutableStateOf("")
    }

    var password by remember {
        mutableStateOf("")
    }

    var confirmPassword by remember {
        mutableStateOf("")
    }

    val formComponents = FormComponents()
    val context= LocalContext.current


    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black)
            .padding(15.dp),
        verticalArrangement = Arrangement.Center
    ) {
        Image(
            painter = painterResource(R.drawable.logo),
            contentDescription = "MIZLUE",
            modifier = Modifier
                .width(150.dp)
                .padding(bottom = 10.dp)
        )
        Text(
            text = "Sign Up",
            color = Color.White,
            textAlign = TextAlign.Left,
            fontSize = 25.sp,
            modifier = Modifier.padding(bottom = 10.dp)
        )
        formComponents.CustomInput(email, "Email", onChange = { it -> email = it })
        formComponents.CustomInput(password, "Password", onChange = { it -> password = it })
        formComponents.CustomInput(
            confirmPassword,
            "Confirm Password",
            onChange = { it -> confirmPassword = it })
        formComponents.CustomButton(
            text = "SIGN UP",
            onClick = {
                val result =signup(email, password, confirmPassword)
                Log.i("asdf",result.toString())
                if(result){
                    Toast.makeText(context,"Success",Toast.LENGTH_LONG).show()
                }else{
                    Toast.makeText(context,"Failed",Toast.LENGTH_LONG).show()
                }
            }
        )

    }
}

@Preview(showBackground = true)
@Composable
fun SignUpScreenPreview() {
    MizuleTheme {
        SignUpScreen(rememberNavController()) { _, _, _ -> true }
    }
}