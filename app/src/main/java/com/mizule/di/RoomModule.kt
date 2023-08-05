package com.mizule.di

import android.app.Application
import androidx.room.Room
import com.mizule.data.datasources.local.MizuleDB
import com.mizule.data.datasources.local.UserDao
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
class RoomModule {
    @Provides
    @Singleton
    fun provideRoomDB(context: Application): MizuleDB {
        return Room.databaseBuilder(
            context.applicationContext,
            MizuleDB::class.java,
            "mizule"
        )
            .build()
    }

    @Provides
    @Singleton
    fun userDaoProvider(mizuleDB: MizuleDB): UserDao {
        return mizuleDB.userDao()
    }
}