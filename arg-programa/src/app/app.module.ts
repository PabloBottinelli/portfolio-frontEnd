import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { ProyectsComponent } from './components/proyects/proyects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { PageError404Component } from './components/page-error404/page-error404.component';

@NgModule({
  declarations: [
    AppComponent,
    ProyectsComponent,
    SkillsComponent,
    NavbarComponent,
    BannerComponent,
    AboutComponent,
    ExperienceComponent,
    EducationComponent,
    PageError404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
