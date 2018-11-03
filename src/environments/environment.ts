// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // My firebase credentials
  firebase: {
    apiKey: 'AIzaSyB0uA78TrBJw37iH8dnXMWziYyK7zCpzDg',
    authDomain: 'product-management-c31f2.firebaseapp.com',
    databaseURL: 'https://product-management-c31f2.firebaseio.com',
    projectId: 'product-management-c31f2',
    storageBucket: 'product-management-c31f2.appspot.com',
    messagingSenderId: '656559457760'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
