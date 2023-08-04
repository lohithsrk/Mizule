package com.mizule.views.components

import android.graphics.drawable.Icon
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp


class FormComponents {

    @Composable
    @OptIn(ExperimentalMaterial3Api::class)
    fun CustomInput(
        value: String,
        label: String,
        onChange: (String) -> Unit,
        singleLine: Boolean = true, trailingIcon: Unit? = null
    ) {

        OutlinedTextField(
            value = value,
            onValueChange = { onChange(it) },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 10.dp),
            label = {
                Text(text = label)
            },
            singleLine = singleLine,
            trailingIcon = { trailingIcon }
        )
    }

    @Composable
    fun CustomButton(text: String, onClick: () -> Unit) {
        Button(
            onClick =  onClick ,
            modifier = Modifier
                .fillMaxWidth()
                .background(Color.White),
            colors = ButtonDefaults.buttonColors(Color.Transparent),
            shape = RoundedCornerShape(15.dp)
        ) {
            Text(text = text, color = Color.Black, fontWeight = FontWeight.Bold)
        }
    }

}