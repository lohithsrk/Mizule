package com.mizule

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.navigation
import androidx.navigation.compose.rememberNavController
import com.mizule.ui.theme.MizuleTheme
import com.mizule.viewmodel.AuthViewModel
import com.mizule.views.screens.authScreens.SignInScreen
import com.mizule.views.screens.authScreens.SignUpScreen
import com.mizule.views.screens.authScreens.WelcomeScreen
import com.mizule.views.screens.zulespotScreens.CreateZuleScreen
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MizuleTheme {

                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background,
                ) {
                    val navController = rememberNavController()
                    val authViewModel = hiltViewModel<AuthViewModel>()

                    NavHost(
                        navController = navController,
                        startDestination = if (authViewModel.user != null) "user" else "welcome"
                    ) {
                        navigation(
                            startDestination = "welcome",
                            route = "auth"
                        ) {
                            composable("welcome") {
                                WelcomeScreen(navController)
                            }
                            composable("signup") {
                                SignUpScreen(navController, authViewModel::signup)
                            }
                            composable("signin") {
                                SignInScreen(navController, authViewModel::signin)
                            }
                        }
                        navigation(
                            startDestination = "zules",
                            route = "user"
                        ) {
                            composable("zules") {
                                CreateZuleScreen()
                            }

                        }
                        navigation(
                            startDestination = "createzule",
                            route = "zulespot"
                        ) {
                            composable("createzule") {
                                CreateZuleScreen()
                            }

                        }
                    }
                }
            }
        }
    }
}
