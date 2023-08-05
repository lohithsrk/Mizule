package com.mizule.views.screens.authScreens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.mizule.R
import com.mizule.views.components.FormComponents

@Composable
fun WelcomeScreen(navController: NavController) {
    val formComponents = FormComponents()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black)
            .padding(15.dp),
        verticalArrangement = Arrangement.Center, horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Image(
            painter = painterResource(R.drawable.logo),
            contentDescription = "MIZLUE",
            modifier = Modifier
                .width(175.dp)
                .padding(bottom = 10.dp)
        )
        Spacer(Modifier.height(10.dp))
        formComponents.CustomButton(
            text = "SIGN IN",
            onClick = {
                navController.navigate("signin") {
                    launchSingleTop = true
                }
            }
        )
        Spacer(Modifier.height(15.dp))
        formComponents.CustomButton(
            text = "SIGN UP",
            onClick = {
                navController.navigate("signup") {
                    launchSingleTop = true
                }
            },
            backgroundColor = Color.Transparent,
            textColor = Color.White
        )
    }
}