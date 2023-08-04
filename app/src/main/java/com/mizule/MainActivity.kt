package com.mizule

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.navigation
import androidx.navigation.compose.rememberNavController
import com.mizule.ui.theme.MizuleTheme
import com.mizule.viewmodel.AuthViewModel
import com.mizule.views.screens.authScreens.SignUpScreen
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MizuleTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = Color.Black,
                ) {
                    val navController = rememberNavController()
                    val authViewModel = hiltViewModel<AuthViewModel>()
                    NavHost(navController = navController, startDestination = "auth") {
                        navigation(
                            startDestination = "signup",
                            route = "auth"
                        ) {
                            composable("signup") {
                                SignUpScreen(navController,authViewModel::signup)
                            }
                            composable("signin") {
                                SignUpScreen(navController,authViewModel::signup)
                            }
                        }
                    }
                }
            }
        }
    }
}
