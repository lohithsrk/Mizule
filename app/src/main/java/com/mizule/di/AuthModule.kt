package com.mizule.di

import com.mizule.data.datasources.local.UserDao
import com.mizule.data.datasources.local.auth.AuthLocalDataSource
import com.mizule.data.datasources.local.auth.AuthLocalDataSourceImpl
import com.mizule.data.datasources.remote.auth.AuthRemoteDataSource
import com.mizule.data.datasources.remote.auth.AuthRemoteDataSourceImpl
import com.mizule.data.services.remote.AuthService
import com.mizule.viewmodel.repository.AuthRepo
import com.mizule.viewmodel.usecases.AuthImpl
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import retrofit2.Retrofit
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
    fun authImplProvider(authService: AuthService): AuthRemoteDataSource {
        return AuthRemoteDataSourceImpl(authService)
    }

    @Provides
    @Singleton
    fun authLocalImplProvider(userDao: UserDao): AuthLocalDataSource {
        return AuthLocalDataSourceImpl(userDao)
    }

    @Provides
    @Singleton
    fun authRepoProvider(authRemoteDataSource: AuthRemoteDataSource,authLocalDataSource: AuthLocalDataSource): AuthRepo {
        return AuthImpl(authRemoteDataSource,authLocalDataSource)
    }
}
