package com.mizule.views.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.IntrinsicSize
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp


class FormComponents {

    @OptIn(ExperimentalMaterial3Api::class)
    @Composable
    fun CustomInput(
        value: String,
        label: String,
        onChange: (String) -> Unit,
        modifier: Modifier = Modifier,
        singleLine: Boolean = true,

        placeholder: String = "", cornerRadius: Dp = 8.dp
    ) {
        Column {
            Text(text = label, color = MaterialTheme.colorScheme.secondary)
            Spacer(Modifier.height(5.dp))

            OutlinedTextField(
                value = value,
                onValueChange = { onChange(it) },
                modifier = Modifier
                    .fillMaxWidth().height(IntrinsicSize.Min).then(modifier), shape = RoundedCornerShape(cornerRadius),
                singleLine = singleLine,
                placeholder = { Text(text = placeholder) },
                colors = TextFieldDefaults.textFieldColors(
                    focusedIndicatorColor = MaterialTheme.colorScheme.secondary,
                    unfocusedIndicatorColor = Color.Gray,
                    containerColor = Color.Transparent,
                    placeholderColor = Color.Gray
                )
            )
            Spacer(Modifier.height(15.dp))

        }
    }

    @Composable
    fun CustomButton(
        text: String,
        onClick: () -> Unit, modifier: Modifier = Modifier,
        backgroundColor: Color = MaterialTheme.colorScheme.secondary,
        textColor: Color = MaterialTheme.colorScheme.primary, cornerRadius: Dp = 8.dp,borderColor: Color= MaterialTheme.colorScheme.secondary,borderStroke: Dp=2.dp
    ) {
        Button(
            onClick = onClick,
            modifier = Modifier
                .fillMaxWidth()
                .height(IntrinsicSize.Max)
                .clip(RoundedCornerShape(cornerRadius))
                .border(
                    BorderStroke(borderStroke, borderColor),
                    RoundedCornerShape(cornerRadius)
                )
                .then(modifier),
            colors = ButtonDefaults.buttonColors(backgroundColor),
            shape = RectangleShape
        ) {
            Text(text = text, color = textColor, fontWeight = FontWeight.ExtraBold)
        }
    }
}

