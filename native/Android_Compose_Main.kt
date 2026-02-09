
package com.shegoes.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            SheGoesTheme {
                MainScreen()
            }
        }
    }
}

@Composable
fun MainScreen() {
    var selectedTab by remember { mutableStateOf("home") }

    Scaffold(
        backgroundColor = Color(0xFFFFF9FA),
        bottomBar = {
            FloatingTabBar(selectedTab) { selectedTab = it }
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .padding(padding)
                .fillMaxSize()
                .padding(16.dp)
        ) {
            Header()
            Spacer(modifier = Modifier.height(24.dp))
            StreakCard()
            Spacer(modifier = Modifier.height(24.dp))
            DailyActionCard()
        }
    }
}

@Composable
fun Header() {
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            modifier = Modifier
                .size(48.dp)
                .clip(CircleShape)
                .background(Color.LightGray)
        )
        Spacer(modifier = Modifier.width(12.dp))
        Column {
            Text("Good morning,", fontSize = 12.sp, color = Color.Gray)
            Text("Dreamer", fontSize = 18.sp, fontWeight = FontWeight.Bold)
        }
        Spacer(modifier = Modifier.weight(1f))
        IconButton(onClick = { /* Notifications */ }) {
            Icon(Icons.Default.Notifications, contentDescription = null, tint = Color.Gray)
        }
        IconButton(onClick = { /* Settings */ }) {
            Icon(Icons.Default.Settings, contentDescription = null, tint = Color.Gray)
        }
    }
}

@Composable
fun StreakCard() {
    Card(
        shape = RoundedCornerShape(32.dp),
        backgroundColor = Color(0xFFFCE7F3),
        elevation = 0.dp
    ) {
        Row(
            modifier = Modifier
                .padding(24.dp)
                .fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    "MOMENTUM",
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFFF472B6)
                )
                Text("12 days streak", fontSize = 20.sp, fontWeight = FontWeight.Bold)
            }
            Spacer(modifier = Modifier.weight(1f))
            Icon(
                Icons.Default.Whatshot,
                contentDescription = null,
                tint = Color(0xFFFB923C),
                modifier = Modifier.size(32.dp)
            )
        }
    }
}

@Composable
fun DailyActionCard() {
    Card(
        shape = RoundedCornerShape(40.dp),
        backgroundColor = Color.White,
        elevation = 4.dp
    ) {
        Column(modifier = Modifier.padding(32.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.Stars, contentDescription = null, tint = Color(0xFFF472B6))
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    "DAILY MICRO-ACTION",
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.Gray
                )
            }
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                "Reach out to one person who inspires you in your career.",
                fontSize = 22.sp,
                fontWeight = FontWeight.Bold,
                lineHeight = 28.sp
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                "\"Connection is the currency of growth.\"",
                fontSize = 14.sp,
                color = Color.Gray,
                fontStyle = androidx.compose.ui.text.font.FontStyle.Italic
            )
            Spacer(modifier = Modifier.height(32.dp))
            Button(
                onClick = { /* Logic */ },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(56.dp),
                shape = RoundedCornerShape(20.dp),
                colors = ButtonDefaults.buttonColors(backgroundColor = Color(0xFFF472B6))
            ) {
                Text("Mark as Done", color = Color.White, fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
fun FloatingTabBar(selectedTab: String, onTabSelected: (String) -> Unit) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(bottom = 32.dp, start = 24.dp, end = 24.dp)
            .height(72.dp)
            .clip(RoundedCornerShape(36.dp))
            .background(Color.White.copy(alpha = 0.8f))
            .padding(horizontal = 8.dp),
        contentAlignment = Alignment.Center
    ) {
        Row(
            modifier = Modifier.fillMaxSize(),
            horizontalArrangement = Arrangement.SpaceAround,
            verticalAlignment = Alignment.CenterVertically
        ) {
            TabItem(Icons.Default.Home, selectedTab == "home") { onTabSelected("home") }
            TabItem(Icons.Default.List, selectedTab == "tasks") { onTabSelected("tasks") }
            
            // FAB
            FloatingActionButton(
                onClick = { onTabSelected("create") },
                backgroundColor = Color(0xFFF472B6),
                shape = RoundedCornerShape(20.dp),
                modifier = Modifier.offset(y = (-20).dp)
            ) {
                Icon(Icons.Default.Add, contentDescription = null, tint = Color.White)
            }
            
            TabItem(Icons.Default.TrendingUp, selectedTab == "stats") { onTabSelected("stats") }
            TabItem(Icons.Default.Person, selectedTab == "profile") { onTabSelected("profile") }
        }
    }
}

@Composable
fun TabItem(icon: ImageVector, isSelected: Boolean, onClick: () -> Unit) {
    IconButton(onClick = onClick) {
        Icon(
            icon,
            contentDescription = null,
            tint = if (isSelected) Color(0xFFF472B6) else Color.LightGray
        )
    }
}

@Composable
fun SheGoesTheme(content: @Composable () -> Unit) {
    MaterialTheme(content = content)
}
