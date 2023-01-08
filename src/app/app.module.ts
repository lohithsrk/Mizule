import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HeroLandingPageComponent } from './components/landing-page/hero-landing-page/hero-landing-page.component';
import { AuroraBgComponent } from './components/aurora-bg/aurora-bg.component';
import { ZuleLandingPageComponent } from './components/landing-page/zule-landing-page/zule-landing-page.component';
import { OpportunitiesLandingPageComponent } from './components/landing-page/opportunities-landing-page/opportunities-landing-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { SocialsFloatingComponent } from './components/socials-floating/socials-floating.component';
import { NavigationMobBarComponent } from './components/navigation-mob-bar/navigation-mob-bar.component';

@NgModule({
  declarations: [AppComponent, NavigationBarComponent, LandingPageComponent, HeroLandingPageComponent, AuroraBgComponent, ZuleLandingPageComponent, OpportunitiesLandingPageComponent, FooterComponent, SocialsFloatingComponent, NavigationMobBarComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
