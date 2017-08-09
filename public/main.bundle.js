webpackJsonp([1,4],{

/***/ 1017:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(439);


/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(167);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ValidateService = (function () {
    function ValidateService(http) {
        this.http = http;
    }
    ValidateService.prototype.validateRegister = function (user) {
        if (user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    ValidateService.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    ValidateService.prototype.checkTrainNumber = function (linePair) {
        //console.log('Bout to check');
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:3000/newcounts/lineexists/' + linePair, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ValidateService.prototype.checkCounterId = function (counter) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:3000/counters/checkid/' + counter, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ValidateService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], ValidateService);
    return ValidateService;
    var _a;
}());
//# sourceMappingURL=/Users/eviolette/WebstormProjects/TrainCount/angular-src/src/validate.service.js.map

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__(570);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import {RequestOptions} from "http";
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.isDev = false;
    }
    // User Registration Methods
    AuthService.prototype.registerUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('users/register', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.authenticateUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('users/authenticate', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getProfile = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get('users/profile', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.storeUserData = function (token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    };
    AuthService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token');
        this.authToken = token;
    };
    AuthService.prototype.loggedIn = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["tokenNotExpired"])('id_token');
    };
    AuthService.prototype.logout = function () {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    };
    // Line Registration Methods
    AuthService.prototype.registerLine = function (line) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('lines/register', line, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getLine = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.get('lines/lineInfo', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    // Count Methods
    AuthService.prototype.getDeptInfo = function (lineNum) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["URLSearchParams"]();
        params.set('line', lineNum);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]();
        options.search = params;
        return this.http.get('counts/departures/' + lineNum, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (err) {
            console.log(err);
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].throw(err);
        });
    };
    AuthService.prototype.getStationInfo = function (lineNum) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.get('counts/stations/' + lineNum, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (err) {
            console.log(err);
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].throw(err);
        });
    };
    AuthService.prototype.findTrainCoach = function (coach) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.get('newcounts/trainexists/' + coach, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getOnOffCounts = function (indexStation) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:3000/newcounts/onoffs/' + indexStation, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.updateCount = function (count) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('newcounts/updatecount', count, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    // Train Methods (For Number of Cars)
    AuthService.prototype.checkNumberOfCars = function (index) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.get('trains/getnumberofcars/' + index, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ;
    // Username Methods
    AuthService.prototype.isAdmin = function (username) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.get('usernames/isadmin/' + username, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.checkUser = function (email) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.get('usernames/approvedemail/' + email, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    // Export Methods
    AuthService.prototype.exportCounts = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        return this.http.get('newcounts/exportcount', { headers: headers });
    };
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], AuthService);
    return AuthService;
    var _a;
}());
//# sourceMappingURL=/Users/eviolette/WebstormProjects/TrainCount/angular-src/src/auth.service.js.map

/***/ }),

/***/ 438:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 438;


/***/ }),

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(569);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(556);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/eviolette/WebstormProjects/TrainCount/angular-src/src/main.js.map

/***/ }),

/***/ 555:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(739),
            styles: [__webpack_require__(727)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/Users/eviolette/WebstormProjects/TrainCount/angular-src/src/app.component.js.map

/***/ }),

/***/ 556:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_navbar_navbar_component__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__ = __webpack_require__(562);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_register_register_component__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_home_home_component__ = __webpack_require__(561);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_dashboard_dashboard_component__ = __webpack_require__(557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_profile_profile_component__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_entry_entry_component__ = __webpack_require__(559);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_validate_service__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_auth_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_export_export_component__ = __webpack_require__(560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__guards_auth_guard__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_pagenotfound_pagenotfound_component__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_dummy_dummy_component__ = __webpack_require__(558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_utilities_utilities_component__ = __webpack_require__(567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ng2_file_upload__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20_ng2_file_upload__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





















var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__["a" /* LoginComponent */] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_9__components_home_home_component__["a" /* HomeComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_16__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_8__components_register_register_component__["a" /* RegisterComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__["a" /* LoginComponent */] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_10__components_dashboard_dashboard_component__["a" /* DashboardComponent */] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_11__components_profile_profile_component__["a" /* ProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_16__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'entry/:id', component: __WEBPACK_IMPORTED_MODULE_12__components_entry_entry_component__["a" /* EntryComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_16__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'dummy/:id', component: __WEBPACK_IMPORTED_MODULE_18__components_dummy_dummy_component__["a" /* DummyComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_16__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'export', component: __WEBPACK_IMPORTED_MODULE_15__components_export_export_component__["a" /* ExportComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_16__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'utilities', component: __WEBPACK_IMPORTED_MODULE_19__components_utilities_utilities_component__["a" /* UtilitiesComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_16__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_17__components_pagenotfound_pagenotfound_component__["a" /* PagenotfoundComponent */] }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__components_navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_register_register_component__["a" /* RegisterComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_profile_profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_entry_entry_component__["a" /* EntryComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_export_export_component__["a" /* ExportComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_pagenotfound_pagenotfound_component__["a" /* PagenotfoundComponent */],
                __WEBPACK_IMPORTED_MODULE_18__components_dummy_dummy_component__["a" /* DummyComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_utilities_utilities_component__["a" /* UtilitiesComponent */],
                __WEBPACK_IMPORTED_MODULE_20_ng2_file_upload__["FileSelectDirective"]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(appRoutes)
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_13__services_validate_service__["a" /* ValidateService */], __WEBPACK_IMPORTED_MODULE_14__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_16__guards_auth_guard__["a" /* AuthGuard */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/eviolette/WebstormProjects/TrainCount/angular-src/src/app.module.js.map

/***/ }),

/***/ 557:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DashboardComponent = (function () {
    function DashboardComponent() {
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(740),
            styles: [__webpack_require__(728)]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardComponent);
    return DashboardComponent;
}());
//# sourceMappingURL=/Users/eviolette/WebstormProjects/TrainCount/angular-src/src/dashboard.component.js.map

/***/ }),

/***/ 558:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DummyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DummyComponent = (function () {
    function DummyComponent(router, authService, route) {
        this.router = router;
        this.authService = authService;
        this.route = route;
    }
    DummyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.router.navigate(['entry', params['id']]);
        });
    };
    DummyComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dummy',
            template: __webpack_require__(741),
            styles: [__webpack_require__(729)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _c) || Object])
    ], DummyComponent);
    return DummyComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/Users/eviolette/WebstormProjects/TrainCount/angular-src/src/dummy.component.js.map

/***/ }),

/***/ 559:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntryComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EntryComponent = (function () {
    function EntryComponent(authService, router, route) {
        this.authService = authService;
        this.router = router;
        this.route = route;
        this.coachIndex = "";
        this.departures = [];
        this.stations = [];
        this.oncounts = [];
        this.offcounts = [];
        this.comments = [];
        this.netons = [];
        this.netoffs = [];
        this.stationcodes = [];
    }
    EntryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.paramHeader = params['id'];
            _this.lineHeader = "Line " + params['id'].substring(0, 2);
            _this.trainHeader = "Train Number " + params['id'].substring(3, 7);
            _this.lineNum = _this.lineNumDeformatter(params['id'].substring(3, 7));
            _this.coachIndex = params['id'].substring(8, 10);
        });
        this.authService.checkNumberOfCars(this.paramHeader.substring(0, 7)).subscribe(function (res) {
            console.log(res.numCars);
            if (res.numCars < _this.lineNumDeformatter(_this.coachIndex)) {
                alert('Warning: Number of Cars is Listed as ' + res.numCars);
            }
        });
        this.authService.getDeptInfo(this.paramHeader.substring(0, 2) + this.lineNum)
            .subscribe(function (res) {
            if (res.success) {
                _this.depart_times = res.times;
                _this.numTimes = Object.keys(_this.depart_times).length;
                for (var i in _this.depart_times) {
                    if (_this.depart_times[i] != "-")
                        _this.departures.push(_this.depart_times[i]);
                }
            }
            else {
                alert('Train Not Found');
                _this.router.navigate(['/home']);
            }
        });
        this.authService.getStationInfo(this.paramHeader.substring(0, 2) + this.lineNum)
            .subscribe(function (res) {
            if (res.success) {
                _this.station_times = res.stations;
                _this.numStations = Object.keys(_this.station_times).length;
                var _loop_1 = function(i) {
                    //if (this.depart_times && this.depart_times[i] != "-") was used before the next line
                    _this.stations.push(_this.station_times[i]);
                    _this.authService.findTrainCoach(_this.paramHeader).subscribe(function (res) {
                        if (res.success) {
                            console.log('pass');
                            if (_this.stations[i]) {
                                _this.authService.getOnOffCounts(_this.paramHeader + _this.stations[i].replace(/\//g, '%2F').replace(/,/g, '%2C')).subscribe(function (res) {
                                    if (res.success) {
                                        _this.oncounts[i] = res.onCount;
                                        //console.log(this.oncounts);
                                        _this.offcounts[i] = res.offCount;
                                        _this.comments[i] = res.comments;
                                        console.log(res.comments);
                                        _this.stationcodes[i] = res.stationCode;
                                        console.log(_this.stationcodes);
                                    }
                                });
                            }
                        }
                        else {
                            if (_this.stations[i]) {
                                _this.authService.getOnOffCounts(_this.paramHeader.substring(0, 7) + "_01" + _this.stations[i].replace(/\//g, '%2F').replace(/,/g, '%2C')).subscribe(function (res) {
                                    if (res.success) {
                                        _this.oncounts[i] = 0;
                                        console.log(_this.oncounts);
                                        _this.offcounts[i] = 0;
                                        _this.stationcodes[i] = res.stationCode;
                                        console.log(_this.stationcodes);
                                    }
                                });
                            }
                        }
                    });
                };
                for (var i in _this.station_times) {
                    _loop_1(i);
                }
                console.log(_this.station_times);
            }
        });
    };
    EntryComponent.prototype.lineNumDeformatter = function (str) {
        if (str.charAt(0) === "0")
            return +str.substring(1);
        return +str;
    };
    EntryComponent.prototype.coachIndexAdd = function (str) {
        if (str.charAt(0) === "0" && str.charAt(1) === "9") {
            return "10";
        }
        else if (str.charAt(0) === "0" && str.charAt(1) != "9") {
            var num = +str.charAt(1);
            num++;
            return "0" + num;
        }
        else {
            var num = +str;
            num++;
            return "" + num;
        }
    };
    EntryComponent.prototype.coachIndexSub = function (str) {
        if (str === "10") {
            return "09";
        }
        else if (str.charAt(0) === "0") {
            var num = +str.charAt(1);
            num--;
            return "0" + num;
        }
        else {
            var num = +str;
            num--;
            return "" + num;
        }
    };
    EntryComponent.prototype.checkNetCounts = function () {
        this.netons[0] = +this.oncounts[0];
        this.netoffs[0] = +this.offcounts[0];
        for (var i = 1; i < this.departures.length; i++) {
            this.netons[i] = +this.oncounts[i] - +this.oncounts[i - 1];
            this.netoffs[i] = +this.offcounts[i] - +this.offcounts[i - 1];
            if (this.netons[i] < 0) {
                alert('Error: Net On Count is Less than 0 at ' + this.stations[i]);
                return false;
            }
            if (this.netoffs[i] < 0) {
                alert('Error: Net Off Count is Less than 0 at ' + this.stations[i]);
                return false;
            }
            console.log('No err');
        }
        return true;
    };
    EntryComponent.prototype.getPreviousCar = function () {
        if (+this.coachIndex == 1) {
            alert("No Previous Car");
        }
        else {
            this.router.navigate(['/dummy', this.paramHeader.substring(0, 7) + "_" + this.coachIndexSub(this.coachIndex)]);
        }
    };
    EntryComponent.prototype.getNextCar = function () {
        this.router.navigate(['/dummy', this.paramHeader.substring(0, 7) + "_" + this.coachIndexAdd(this.coachIndex)]);
    };
    EntryComponent.prototype.onCountSubmit = function () {
        console.log(this.stationcodes);
        if (this.checkNetCounts()) {
            for (var i = 0; i < this.departures.length; i++) {
                var count = {
                    trainStationCoachIndex: this.paramHeader.substring(0, 7) + "_" + this.stationcodes[i] + "_" + this.paramHeader.substring(8, 10),
                    trainIndex: this.paramHeader.substring(0, 7),
                    stationCode: this.stationcodes[i],
                    stationName: this.stations[i],
                    stationTime: this.departures[i],
                    trainCoachIndex: this.paramHeader,
                    onCount: this.oncounts[i],
                    offCount: this.offcounts[i],
                    comments: this.comments[i]
                };
                console.log(count);
                if (typeof this.comments[i] == 'undefined')
                    count.comments = '';
                console.log(count.comments);
                if (!(count.stationTime == '-' || count.onCount == null || count.offCount == null)) {
                    //console.log(JSON.stringify(count));
                    this.authService.updateCount(count).subscribe();
                }
            }
        }
    };
    EntryComponent.prototype.finished = function () {
        this.router.navigate(['/home']);
    };
    EntryComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-entry',
            template: __webpack_require__(742),
            styles: [__webpack_require__(730)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _c) || Object])
    ], EntryComponent);
    return EntryComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/Users/eviolette/WebstormProjects/TrainCount/angular-src/src/entry.component.js.map

/***/ }),

/***/ 560:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExportComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ExportComponent = (function () {
    function ExportComponent(authService) {
        this.authService = authService;
    }
    ExportComponent.prototype.ngOnInit = function () {
    };
    ExportComponent.prototype.exportCounts = function () {
        this.authService.exportCounts().subscribe(function (data) {
            console.log(data);
        });
    };
    ExportComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-export',
            template: __webpack_require__(743),
            styles: [__webpack_require__(731)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object])
    ], ExportComponent);
    return ExportComponent;
    var _a;
}());
//# sourceMappingURL=/Users/eviolette/WebstormProjects/TrainCount/angular-src/src/export.component.js.map

/***/ }),

/***/ 561:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_validate_service__ = __webpack_require__(247);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomeComponent = (function () {
    function HomeComponent(router, authService, validateService) {
        this.router = router;
        this.authService = authService;
        this.validateService = validateService;
        this.idStr = "";
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.onLineSubmit = function () {
        var _this = this;
        var line = {
            date: this.date,
            counter_name: this.counter_name,
            counter_id: this.counter_id,
            assigned_car: this.assigned_car,
            serial_num: this.serial_num,
            train_line: this.train_line,
            train_num: this.trainNumFormatter(this.train_num),
            num_cars: this.num_cars,
            dept_time: this.dept_time,
            arrival_time: this.arrival_time
        };
        this.idStr = line.train_line + "_" + line.train_num + "_" + this.assignedCarFormatter(line.assigned_car);
        this.linePair = line.train_line + "_" + line.train_num;
        this.validateService.checkCounterId(line.counter_id + "_" + line.counter_name).subscribe(function (res) {
            if (!res.success) {
                alert(res.msg);
            }
        });
        if (this.validateLine(line)) {
            //console.log("pass");
            this.validateService.checkTrainNumber(this.linePair).subscribe(function (data) {
                if (!data.success) {
                    alert('Train Line and Train Number Combination Not Found');
                }
                else {
                    //alert('returning true');
                    _this.authService.registerLine(line).subscribe(function (data) {
                        if (data.success) {
                            //alert('Line is now registered.');
                            _this.router.navigate(['/entry', _this.idStr]);
                        }
                        else {
                            alert('Line Validation failed');
                        }
                    });
                }
            });
        }
    };
    HomeComponent.prototype.trainNumFormatter = function (trainnum) {
        if (trainnum.length == 3) {
            return "0" + trainnum;
        }
        else if (trainnum.length == 2) {
            return "00" + trainnum;
        }
        else if (trainnum.length == 1) {
            return "000" + trainnum;
        }
        else {
            return trainnum + "";
        }
    };
    HomeComponent.prototype.assignedCarFormatter = function (car) {
        if (car < 10)
            return "0" + car;
        return car;
    };
    HomeComponent.prototype.validateLine = function (line) {
        var linePair = line.train_line + "_" + line.train_num;
        if (line.train_num.length > 4) {
            alert('Train Number is too long');
            return false;
        }
        if (typeof line.date == "undefined") {
            alert('Enter a Date');
            return false;
        }
        if (typeof line.counter_id != "number") {
            alert('Use a valid number for the Counter Id');
            return false;
        }
        if (typeof line.serial_num != 'number') {
            alert('Use a valid number for the Car Serial Number');
            return false;
        }
        if (typeof line.dept_time == "undefined") {
            alert('Enter a Departure Time');
            return false;
        }
        if (typeof line.arrival_time == "undefined") {
            alert('Enter an Arrival Time');
            return false;
        }
        if (typeof line.assigned_car != 'number' || line.assigned_car < 1 || line.assigned_car > 13) {
            alert('Assigned Car must be a number, between 1 and 13');
            return false;
        }
        return true;
    };
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(744),
            styles: [__webpack_require__(732)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_validate_service__["a" /* ValidateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_validate_service__["a" /* ValidateService */]) === 'function' && _c) || Object])
    ], HomeComponent);
    return HomeComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/Users/eviolette/WebstormProjects/TrainCount/angular-src/src/home.component.js.map

/***/ }),

/***/ 562:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(46);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onLoginSubmit = function () {
        var _this = this;
        var user = {
            username: this.username,
            password: this.password
        };
        this.authService.authenticateUser(user).subscribe(function (data) {
            if (data.success) {
                _this.authService.storeUserData(data.token, data.user);
                //alert('Logged in');
                _this.router.navigate(['/home']);
            }
            else {
                alert('Incorrect Password');
                _this.router.navigate(['/login']);
            }
        });
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(745),
            styles: [__webpack_require__(733)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/eviolette/WebstormProjects/TrainCount/angular-src/src/login.component.js.map

/***/ }),

/***/ 563:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(46);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NavbarComponent = (function () {
    function NavbarComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.onLogoutClick = function () {
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
    };
    NavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(746),
            styles: [__webpack_require__(734)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], NavbarComponent);
    return NavbarComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/eviolette/WebstormProjects/TrainCount/angular-src/src/navbar.component.js.map

/***/ }),

/***/ 564:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PagenotfoundComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PagenotfoundComponent = (function () {
    function PagenotfoundComponent() {
    }
    PagenotfoundComponent.prototype.ngOnInit = function () {
    };
    PagenotfoundComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-pagenotfound',
            template: __webpack_require__(747),
            styles: [__webpack_require__(735)]
        }), 
        __metadata('design:paramtypes', [])
    ], PagenotfoundComponent);
    return PagenotfoundComponent;
}());
//# sourceMappingURL=/Users/eviolette/WebstormProjects/TrainCount/angular-src/src/pagenotfound.component.js.map

/***/ }),

/***/ 565:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(46);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProfileComponent = (function () {
    function ProfileComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getProfile().subscribe(function (profile) {
            _this.user = profile.user;
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    ProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(748),
            styles: [__webpack_require__(736)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], ProfileComponent);
    return ProfileComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/eviolette/WebstormProjects/TrainCount/angular-src/src/profile.component.js.map

/***/ }),

/***/ 566:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(46);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterComponent = (function () {
    function RegisterComponent(validateService, authService, router) {
        this.validateService = validateService;
        this.authService = authService;
        this.router = router;
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        var user = {
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password
        };
        if (!this.validateService.validateRegister(user)) {
            alert('Please Fill in All Fields');
            return false;
        }
        if (!this.validateService.validateEmail(user.email)) {
            alert('Please Use a Valid Email');
            return false;
        }
        this.authService.checkUser(user.email).subscribe(function (data) {
            if (data.success) {
                _this.authService.registerUser(user).subscribe(function (data) {
                    if (data.success) {
                        alert('You are now registered.');
                        //window.location.replace('/login');
                        _this.router.navigate(['/login']);
                    }
                    else {
                        alert('Registration failed');
                        _this.router.navigate(['/register']);
                    }
                });
            }
            else {
                alert('Email not on the approved list.');
            }
        });
    };
    RegisterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(749),
            styles: [__webpack_require__(737)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === 'function' && _c) || Object])
    ], RegisterComponent);
    return RegisterComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/Users/eviolette/WebstormProjects/TrainCount/angular-src/src/register.component.js.map

/***/ }),

/***/ 567:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload_ng2_file_upload__ = __webpack_require__(725);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_file_upload_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(46);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilitiesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var URLTrainRaw = 'http://localhost:3000/trains/uploadtrainraw';
var URLCounters = 'http://localhost:3000/counters/uploadcounters';
var URLUsers = 'http://localhost:3000/usernames/uploadusers';


var UtilitiesComponent = (function () {
    function UtilitiesComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload_ng2_file_upload__["FileUploader"]({ url: URLTrainRaw, itemAlias: 'trainraw' });
        this.uploader2 = new __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload_ng2_file_upload__["FileUploader"]({ url: URLCounters, itemAlias: 'counters' });
        this.uploader3 = new __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload_ng2_file_upload__["FileUploader"]({ url: URLUsers, itemAlias: 'userlist' });
        this.show = false;
    }
    UtilitiesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getProfile().subscribe(function (profile) {
            _this.authService.isAdmin(profile.user.username).subscribe(function (res) {
                console.log(res);
                if (res.success) {
                    _this.show = true;
                }
                else {
                    _this.show = false;
                }
            });
        }, function (err) {
            console.log(err);
            return false;
        });
        //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
        this.uploader.onAfterAddingFile = function (file) { file.withCredentials = false; };
        this.uploader2.onAfterAddingFile = function (file) { file.withCredentials = false; };
        this.uploader3.onAfterAddingFile = function (file) { file.withCredentials = false; };
        //overide the onCompleteItem property of the uploader so we are
        //able to deal with the server response.
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            console.log("ImageUpload:uploaded:", item, status, response);
        };
        this.uploader2.onCompleteItem = function (item, response, status, headers) {
            console.log("ImageUpload2:uploaded:", item, status, response);
        };
        this.uploader3.onCompleteItem = function (item, response, status, headers) {
            console.log("ImageUpload3:uploaded:", item, status, response);
        };
    };
    UtilitiesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-utilities',
            template: __webpack_require__(750),
            styles: [__webpack_require__(738)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], UtilitiesComponent);
    return UtilitiesComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/eviolette/WebstormProjects/TrainCount/angular-src/src/utilities.component.js.map

/***/ }),

/***/ 568:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (this.authService.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate['/login'];
            //alert('NAH BOI');
            return false;
        }
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a, _b;
}());
//# sourceMappingURL=/Users/eviolette/WebstormProjects/TrainCount/angular-src/src/auth.guard.js.map

/***/ }),

/***/ 569:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/Users/eviolette/WebstormProjects/TrainCount/angular-src/src/environment.js.map

/***/ }),

/***/ 727:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 728:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 729:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 730:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 731:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 732:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 733:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 734:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 735:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 736:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 737:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 738:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 739:
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<div class=\"container\">\n  <router-outlet></router-outlet>\n</div>\n\n"

/***/ }),

/***/ 740:
/***/ (function(module, exports) {

module.exports = "<p>\n  dashboard works!\n</p>\n"

/***/ }),

/***/ 741:
/***/ (function(module, exports) {

module.exports = "<p>\n  dummy works!\n</p>\n"

/***/ }),

/***/ 742:
/***/ (function(module, exports) {

module.exports = "<h2>Input Count Data</h2>\n<h4>{{lineHeader}}</h4>\n<h5>{{trainHeader}}</h5>\n<body>\n<!--\n  <div *ngIf=\"!depart_times\" class=\"container\">\n    Car Number Not Found\n  </div>\n  -->\n  <div class=\"container\">\n    <form (submit)=\"onCountSubmit()\">\n      <table class=\".table-hover\">\n        <thead>\n          <tr>\n            <th>Departure Time</th>\n            <th>Station Name</th>\n            <th>On Count</th>\n            <th>Off Count</th>\n            <th>Comments</th>\n            <th>Net On</th>\n            <th>Net Off</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngIf=\"departures[0]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[0]\" name=\"time1\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[0]\" name=\"station1\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[0]\" name=\"on1\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[0]\" name=\"off1\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[0]\" name=\"comments1\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[0]\" name=\"netons1\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[0]\" name=\"netoffs1\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[1]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[1]\" name=\"time2\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[1]\" name=\"station2\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[1]\" name=\"on2\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[1]\" name=\"off2\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[1]\" name=\"comments2\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[1]\" name=\"netons2\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[1]\" name=\"netoffs2\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[2]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[2]\" name=\"time3\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[2]\" name=\"station3\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[2]\" name=\"on3\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[2]\" name=\"off3\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[2]\" name=\"comments3\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[2]\" name=\"netons3\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[2]\" name=\"netoffs3\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[3]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[3]\" name=\"time4\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[3]\" name=\"station4\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[3]\" name=\"on4\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[3]\" name=\"off4\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[3]\" name=\"comments4\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[3]\" name=\"netons4\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[3]\" name=\"netoffs4\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[4]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[4]\" name=\"time5\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[4]\" name=\"station5\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[4]\" name=\"on5\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[4]\" name=\"off5\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[4]\" name=\"comments5\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[4]\" name=\"netons5\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[4]\" name=\"netoffs5\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[5]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[5]\" name=\"time6\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[5]\" name=\"station6\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[5]\" name=\"on6\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[5]\" name=\"off6\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[5]\" name=\"comments6\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[5]\" name=\"netons6\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[5]\" name=\"netoffs6\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[6]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[6]\" name=\"time7\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[6]\" name=\"station7\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[6]\" name=\"on7\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[6]\" name=\"off7\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[6]\" name=\"comments7\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[6]\" name=\"netons7\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[6]\" name=\"netoffs7\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[7]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[7]\" name=\"time8\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[7]\" name=\"station8\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[7]\" name=\"on8\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[7]\" name=\"off8\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[7]\" name=\"comments8\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[7]\" name=\"netons8\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[7]\" name=\"netoffs8\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n\n          </tr>\n          <tr *ngIf=\"departures[8]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[8]\" name=\"time9\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[8]\" name=\"station9\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[8]\" name=\"on9\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[8]\" name=\"off9\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[8]\" name=\"comments9\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[8]\" name=\"netons9\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[8]\" name=\"netoffs9\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[9]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[9]\" name=\"time10\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[9]\" name=\"station10\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[9]\" name=\"on10\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[9]\" name=\"off10\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[9]\" name=\"comments10\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[9]\" name=\"netons10\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[9]\" name=\"netoffs10\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[10]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[10]\" name=\"time11\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[10]\" name=\"station11\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[10]\" name=\"on11\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[10]\" name=\"off11\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[10]\" name=\"comments11\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[10]\" name=\"netons11\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[10]\" name=\"netoffs11\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[11]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[11]\" name=\"time12\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[11]\" name=\"station12\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[11]\" name=\"on12\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[11]\" name=\"off12\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[11]\" name=\"comments12\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[11]\" name=\"netons12\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[11]\" name=\"netoffs12\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[12]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[12]\" name=\"time13\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[12]\" name=\"station13\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[12]\" name=\"on13\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[12]\" name=\"off13\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[12]\" name=\"comments13\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[12]\" name=\"netons13\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[12]\" name=\"netoffs13\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[13]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[13]\" name=\"time14\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[13]\" name=\"station14\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[13]\" name=\"on14\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[13]\" name=\"off14\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[13]\" name=\"comments14\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[13]\" name=\"netons14\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[13]\" name=\"netoffs14\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[14]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[14]\" name=\"time15\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[14]\" name=\"station15\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[14]\" name=\"on15\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[14]\" name=\"off15\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[14]\" name=\"comments15\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[14]\" name=\"netons15\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[14]\" name=\"netoffs15\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[15]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[15]\" name=\"time16\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[15]\" name=\"station16\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[15]\" name=\"on16\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[15]\" name=\"off16\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[15]\" name=\"comments16\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[15]\" name=\"netons16\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[15]\" name=\"netoffs16\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[16]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[16]\" name=\"time17\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[16]\" name=\"station17\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[16]\" name=\"on17\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[16]\" name=\"off17\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[16]\" name=\"comments17\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[16]\" name=\"netons17\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[16]\" name=\"netoffs17\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[17]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[17]\" name=\"time18\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[17]\" name=\"station18\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[17]\" name=\"on18\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[17]\" name=\"off18\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[17]\" name=\"comments18\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[17]\" name=\"netons18\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[17]\" name=\"netoffs18\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[18]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[18]\" name=\"time19\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[18]\" name=\"station19\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[18]\" name=\"on19\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[18]\" name=\"off19\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[18]\" name=\"comments19\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[18]\" name=\"netons19\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[18]\" name=\"netoffs19\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[19]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[19]\" name=\"time20\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[19]\" name=\"station20\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[19]\" name=\"on20\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[19]\" name=\"off20\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[19]\" name=\"comments20\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[19]\" name=\"netons20\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[19]\" name=\"netoffs20\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[20]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[20]\" name=\"time21\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[20]\" name=\"station21\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[20]\" name=\"on21\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[20]\" name=\"off21\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[20]\" name=\"comments21\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[20]\" name=\"netons21\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[20]\" name=\"netoffs21\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[21]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[21]\" name=\"time22\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[21]\" name=\"station22\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[21]\" name=\"on22\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[21]\" name=\"off22\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[21]\" name=\"comments22\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[21]\" name=\"netons22\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[21]\" name=\"netoffs22\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[22]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[22]\" name=\"time23\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[22]\" name=\"station23\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[22]\" name=\"on23\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[22]\" name=\"off23\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[22]\" name=\"comments23\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[22]\" name=\"netons23\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[22]\" name=\"netoffs23\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[23]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[23]\" name=\"time24\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[23]\" name=\"station24\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[23]\" name=\"on24\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[23]\" name=\"off24\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[23]\" name=\"comments24\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[23]\" name=\"netons24\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[23]\" name=\"netoffs24\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[24]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[24]\" name=\"time25\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[24]\" name=\"station25\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[24]\" name=\"on25\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[24]\" name=\"off25\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[24]\" name=\"comments25\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[24]\" name=\"netons25\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[24]\" name=\"netoffs25\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[25]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[25]\" name=\"time26\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[25]\" name=\"station26\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[25]\" name=\"on26\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[25]\" name=\"off26\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[25]\" name=\"comments26\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[25]\" name=\"netons26\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[25]\" name=\"netoffs26\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[26]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[26]\" name=\"time27\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[26]\" name=\"station27\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[26]\" name=\"on27\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[26]\" name=\"off27\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[26]\" name=\"comments27\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[26]\" name=\"netons27\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[26]\" name=\"netoffs27\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[27]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[27]\" name=\"time28\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[27]\" name=\"station28\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[27]\" name=\"on28\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[27]\" name=\"off28\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[27]\" name=\"comments28\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[27]\" name=\"netons28\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[27]\" name=\"netoffs28\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[28]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[28]\" name=\"time29\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[28]\" name=\"station29\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[28]\" name=\"on29\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[28]\" name=\"off29\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[28]\" name=\"comments29\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[28]\" name=\"netons29\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[28]\" name=\"netoffs29\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[29]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[29]\" name=\"time30\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[29]\" name=\"station30\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[29]\" name=\"on30\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[29]\" name=\"off30\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[29]\" name=\"comments30\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[29]\" name=\"netons30\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[29]\" name=\"netoffs30\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[30]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[30]\" name=\"time31\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[30]\" name=\"station31\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[30]\" name=\"on31\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[30]\" name=\"off31\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[30]\" name=\"comments31\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[30]\" name=\"netons31\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[30]\" name=\"netoffs31\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[31]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[31]\" name=\"time32\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[31]\" name=\"station32\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[31]\" name=\"on32\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[31]\" name=\"off32\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[31]\" name=\"comments32\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[31]\" name=\"netons32\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[31]\" name=\"netoffs32\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[32]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[32]\" name=\"time33\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[32]\" name=\"station33\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[32]\" name=\"on33\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[32]\" name=\"off33\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[32]\" name=\"comments33\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[32]\" name=\"netons33\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[32]\" name=\"netoffs33\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[33]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[33]\" name=\"time34\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[33]\" name=\"station34\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[33]\" name=\"on34\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[33]\" name=\"off34\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[33]\" name=\"comments34\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[33]\" name=\"netons34\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[33]\" name=\"netoffs34\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n          <tr *ngIf=\"departures[34]\">\n            <td><input type=\"text\" [(ngModel)]=\"departures[34]\" name=\"time35\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"stations[34]\" name=\"station35\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"oncounts[34]\" name=\"on35\"  class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"offcounts[34]\" name=\"off35\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"comments[34]\" name=\"comments35\" class=\"form-control text-center\" placeholder=\"-\"/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netons[34]\" name=\"netons35\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n            <td><input type=\"text\" [(ngModel)]=\"netoffs[34]\" name=\"netoffs35\" class=\"form-control text-center\" placeholder=\"-\" readonly/></td>\n          </tr>\n        </tbody>\n      </table>\n      <input type=\"submit\" class=\"btn btn-primary\" name=\"Submit\" value=\"Submit\">\n    </form>\n    <form (submit)=\"getPreviousCar()\">\n      <input type=\"submit\" class=\"btn btn-primary\" name=\"PrevCar\" value=\"Previous Car\">\n    </form>\n    <form (submit)=\"getNextCar()\">\n      <input type=\"submit\" class=\"btn btn-primary\" name=\"NextCar\" value=\"Next Car\">\n    </form>\n    <form (submit)=\"finished()\">\n      <input type=\"submit\" class=\"btn btn-primary\" name=\"Finished\" value=\"Finished\">\n    </form>\n  </div>\n</body>\n"

/***/ }),

/***/ 743:
/***/ (function(module, exports) {

module.exports = "<h1>Export Count Data</h1>\n<body>\n  <div class=\"container\">\n    <a href=\"http://localhost:3000/newcounts/exportcount\" class=\"btn btn-primary\">Export</a>\n    <!--\n    <form (submit)=\"exportCounts()\" >\n      <input type=\"submit\" class=\"btn btn-primary\" value=\"Export\">\n    </form>\n    -->\n  </div>\n</body>\n"

/***/ }),

/***/ 744:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\">Home</h2>\n<head>\n  <link rel=\"stylesheet\" href=\"https://rawgit.com/g00fy-/angular-datepicker/master/dist/angular-datepicker.css\">\n</head>\n<body>Basic Information\n  <form (submit)=\"onLineSubmit()\">\n    <div class=\"form-group\">\n      <label>Train Line: </label>\n      <select [(ngModel)] = \"train_line\" name=\"train-line\" class=\"form-control\">\n        <option value=\"01\">Elec - SC</option>\n        <option value=\"04\">Elec - BI</option>\n        <option value=\"05\">Elec - ML</option>\n        <option value=\"06\">RI</option>\n        <option value=\"08\">SWS</option>\n        <option value=\"09\">HER</option>\n        <option value=\"10\">BNSF</option>\n        <option value=\"11\">UPW</option>\n        <option value=\"12\">MDW</option>\n        <option value=\"13\">UPNW</option>\n        <option value=\"15\">MDN</option>\n        <option value=\"16\">NCS</option>\n        <option value=\"17\">UPN</option>\n      </select>\n    </div>\n    <div class=\"form-group\">\n      <label>Train Number: </label>\n      <input type=\"text\" [(ngModel)] = \"train_num\" name=\"train-num\" class=\"form-control\" maxlength=\"10\"/>\n    </div>\n    <div class=\"form-group\">\n      <label>Date: </label>\n      <input type=\"date\" [(ngModel)]=\"date\"  name=\"date\"  class=\"form-control\">\n    </div>\n    <div class=\"form-group\">\n      <label>Counter Id: </label>\n      <input type=\"number\" [(ngModel)] = \"counter_id\" name=\"counter-id\" class=\"form-control\" maxlength=\"5\"/>\n    </div>\n    <div class=\"form-group\">\n      <label>Counter Name: </label>\n      <input type=\"text\" [(ngModel)] = \"counter_name\" name=\"counter-name\" class=\"form-control\" maxlength=\"40\"/>\n    </div>\n    <div class=\"form-group\">\n      <label>Assigned Car: </label>\n      <input type=\"number\" [(ngModel)] = \"assigned_car\" name=\"assigned-car\" class=\"form-control\" maxlength=\"20\"/>\n    </div>\n    <div class=\"form-group\">\n      <label>Train Car Serial Number: </label>\n      <input type=\"number\" [(ngModel)] = \"serial_num\" name=\"serial-num\" class=\"form-control\" maxlength=\"5\"/>\n    </div>\n    <!--\n    <div class=\"form-group\">\n      <label>Number of Train Cars: </label>\n      <input type=\"number\" [(ngModel)] = \"num_cars\" name=\"num-cars\" class=\"form-control\" maxlength=\"5\"/>\n    </div>\n    -->\n    <div class=\"form-group\">\n      <label>Actual Departure Time</label>\n      <input type=\"time\" [(ngModel)] = \"dept_time\" name=\"dept-time\" class=\"form-control\" maxlength=\"5\"/>\n    </div>\n    <div class=\"form-group\">\n      <label>Actual Arrival Time</label>\n      <input type=\"time\" [(ngModel)] = \"arrival_time\" name=\"arrival-time\" class=\"form-control\" maxlength=\"5\"/>\n    </div>\n    <input type=\"submit\" class=\"btn btn-primary\" value=\"Submit\">\n  </form>\n</body>\n\n"

/***/ }),

/***/ 745:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\">Login</h2>\n<form (submit)=\"onLoginSubmit()\">\n  <div class=\"form-group\">\n    <label>Username</label>\n    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"username\" name=\"username\">\n  </div>\n  <div class=\"form-group\">\n    <label>Password</label>\n    <input type=\"password\" class=\"form-control\" [(ngModel)]=\"password\" name=\"password\">\n  </div>\n  <input type=\"submit\" class=\"btn btn-primary\" value=\"Login\">\n</form>\n"

/***/ }),

/***/ 746:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\">Train Counting</a>\n    </div>\n    <div id=\"navbar\" class=\"navbar-collapse collapse\">\n      <ul class=\"nav navbar-nav navbar-left\">\n        <li *ngIf=\"authService.loggedIn()\" [routerLinkActive] = \"['active']\"><a [routerLink]=\"['/home']\"> Home</a></li>\n      </ul>\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/utilities']\">Utilities</a></li>\n        <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/profile']\">Profile</a></li>\n        <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/export']\">Export</a></li>\n        <li *ngIf=\"!authService.loggedIn()\" [routerLinkActive] = \"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink] = \"['/login']\">Login</a></li>\n        <li *ngIf=\"!authService.loggedIn()\"  [routerLinkActive] = \"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink] = \"['/register']\">Register</a></li>\n        <li *ngIf=\"authService.loggedIn()\" class=\"active\" ><a (click)=\"onLogoutClick()\" href=\"#\">Logout</a></li>\n      </ul>\n    </div>\n  </div>\n</nav>\n"

/***/ }),

/***/ 747:
/***/ (function(module, exports) {

module.exports = "<h1>Page Not Found</h1>\n<h2>Are you lost?</h2>\n"

/***/ }),

/***/ 748:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"user\">\n  <h2 class=\"page-header\">{{user.name}}</h2>\n  <ul class=\"list-group\">\n    <li class=\"list-group-item\">Username: {{user.username}}</li>\n    <li class=\"list-group-item\">Email: {{user.email}}</li>\n  </ul>\n</div>\n"

/***/ }),

/***/ 749:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\"> Register</h2>\n<form (submit)=\"onRegisterSubmit()\">\n  <div class=\"form-group\">\n    <label>Name</label>\n    <input type=\"text\" [(ngModel)]=\"name\"  name=\"name\" class=\"form-control\">\n  </div>\n  <div class=\"form-group\">\n    <label>Username</label>\n    <input type=\"text\" [(ngModel)]=\"username\"  name=\"username\" class=\"form-control\">\n  </div>\n  <div class=\"form-group\">\n    <label>Email</label>\n    <input type=\"text\" [(ngModel)]=\"email\"  name=\"email\" class=\"form-control\">\n  </div>\n  <div class=\"form-group\">\n    <label>Password</label>\n    <input type=\"password\" [(ngModel)]=\"password\"  name=\"password\" class=\"form-control\">\n  </div>\n  <input type=\"submit\" class=\"btn btn-primary\" value=\"Submit\">\n</form>\n"

/***/ }),

/***/ 750:
/***/ (function(module, exports) {

module.exports = "<h1>\n  Utilities\n</h1>\n<body *ngIf=show>\n\n<!-- File input for the file-upload plugin, with special ng2-file-upload directive called ng2FileSelect -->\n<input type=\"file\" accept=\".csv\" name=\"trainraw\" ng2FileSelect [uploader]=\"uploader\" />\n<!-- button to trigger the file upload when submitted -->\n<button type=\"button\" class=\"btn btn-success btn-s\" (click)=\"uploader.uploadAll()\" [disabled]=\"!uploader.getNotUploadedItems().length\">\n  Upload Raw Train Data CSV File\n</button>\n\n\n<input type=\"file\" accept =\".csv\" name=\"counters\" ng2FileSelect [uploader]=\"uploader2\" />\n<!-- button to trigger the file upload when submitted -->\n\n<button type=\"button\" class=\"btn btn-success btn-s\" (click)=\"uploader2.uploadAll()\" [disabled]=\"!uploader2.getNotUploadedItems().length\">\n  Upload Counter Information CSV File\n</button>\n\n<input type=\"file\" accept =\".csv\" name=\"userlist\" ng2FileSelect [uploader]=\"uploader3\" />\n<!-- button to trigger the file upload when submitted -->\n\n<button type=\"button\" class=\"btn btn-success btn-s\" (click)=\"uploader3.uploadAll()\" [disabled]=\"!uploader3.getNotUploadedItems().length\">\n  Upload List Of Accepted Users CSV File\n</button>\n\n</body>\n"

/***/ })

},[1017]);
//# sourceMappingURL=main.bundle.map