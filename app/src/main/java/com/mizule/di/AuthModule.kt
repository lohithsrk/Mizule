package com.mizule.di

import com.mizule.data.datasources.remote.auth.AuthRemoteDataSource
import com.mizule.data.datasources.remote.auth.AuthRemoteDataSourceImpl
import com.mizule.data.services.remote.AuthService
import com.mizule.viewmodel.repository.AuthRepo
import com.mizule.viewmodel.usecases.AuthImpl
import com.mizule.viewmodel.utilities.Constants
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.create
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
class AuthModule {
    @Provides
    @Singleton
    fun authServiceProvider(retrofit: Retrofit): AuthService {
        return retrofit.create(AuthService::class.java)
    }

    @Provides
    @Singleton
    fun authImplProvider(authService: AuthService):AuthRemoteDataSource{
        return AuthRemoteDataSourceImpl(authService)
    }

    @Provides
    @Singleton
    fun authRepoProvider(authRemoteDataSource: AuthRemoteDataSource):AuthRepo{
        return AuthImpl(authRemoteDataSource)
    }
}
