import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private menuCtrl: MenuController,
    private navCtrl: NavController
  ) {}

  openPage(page: string) {
    // Ferme le menu
    this.menuCtrl.close();

    // Navigue vers la page sélectionnée
    this.navCtrl.navigateForward(page);
  }
}

