package com.mizule.views.screens.authScreens

import android.widget.Toast
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
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
                .width(175.dp)
                .padding(bottom = 10.dp)
        )
        Text(
            text = "Sign Up",
            color = Color.White,
            textAlign = TextAlign.Left,
            fontSize = 30.sp,
            modifier = Modifier.padding(bottom = 10.dp), fontWeight = FontWeight.Bold
        )
        formComponents.CustomInput(
            email,
            "Email",
            onChange = { email = it },
            placeholder = "peter@mizule.com"
        )
        formComponents.CustomInput(
            password,
            "Password",
            onChange = { password = it },
            placeholder = "Enter password"
        )
        formComponents.CustomInput(
            confirmPassword,
            "Confirm Password",
            onChange = { it -> confirmPassword = it }, placeholder = "Enter password again"
        )
        formComponents.CustomButton(
            text = "SIGN UP",
            onClick = {
                val result = signup(email, password, confirmPassword)
                if (result) {
                    Toast.makeText(context, "Success", Toast.LENGTH_LONG).show()
                } else {
                    Toast.makeText(context, "Failed", Toast.LENGTH_LONG).show()
                }
            }
        )
        Spacer(Modifier.height(10.dp))
        Row {
            Text(text = "Already have an account? ", color = Color.White)
            Text(
                text = "Sign In",
                modifier = Modifier.clickable {
                    navController.navigate("signin") {
                        popUpTo("welcome")
                    }
                },
                color = Color.White,
                fontWeight = FontWeight.Bold
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
fun SignUpScreenPreview() {
    MizuleTheme {
        SignUpScreen(rememberNavController()) { _, _, _ -> true }
    }
}