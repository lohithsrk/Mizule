package com.mizule.di

import com.mizule.viewmodel.utilities.Utilities
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import retrofit2.Retrofit
import javax.inject.Singleton
import retrofit2.converter.gson.GsonConverterFactory



@Module
@InstallIn(SingletonComponent::class)
class RetrofitModule {
    @Provides
    @Singleton
    fun retrofitProvider():Retrofit{
        return Retrofit.Builder()
            .baseUrl(Utilities.BASE_URL)
            .addConverterFactory(GsonConverterFactory.create()
            )
            .build()
    }
}