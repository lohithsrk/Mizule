package com.mizule.data.datasources.local

import androidx.room.Database
import androidx.room.DatabaseConfiguration
import androidx.room.InvalidationTracker
import androidx.room.RoomDatabase
import androidx.sqlite.db.SupportSQLiteOpenHelper
import com.mizule.data.dataclasses.userDataClass.User

@Database(entities = [User::class], version = 1, exportSchema = false)
abstract class MizuleDB:RoomDatabase() {
    abstract fun userDao():UserDao
}