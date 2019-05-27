import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([

      {
        route: ['', 'locations'],
        name: 'locations',
        moduleId: PLATFORM.moduleName('views/locations'),
        nav: true,
        title: 'Locations'
      },

      {
        route: 'photos',
        name: 'photos',
        moduleId: PLATFORM.moduleName('views/photos'),
        nav: false,
        title: 'Photos'
      },
      {
        route: 'users',
        name: 'users',
        moduleId: PLATFORM.moduleName('views/users'),
        nav: true,
        title: 'Users'
      },
      {
        route: 'logout',
        name: 'logout',
        moduleId: PLATFORM.moduleName('views/logout'),
        nav: true,
        title: 'Logout'
      }
    ]);
    this.router = router;
  }
}
