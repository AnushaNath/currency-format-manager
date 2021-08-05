# `currency-format-manager`

This application is built to format, add, edit and delete currencies of different locales

Configured a custom json file to retrieve currencies and locales.
To add, edit and delete the currencies, created a local js file to perform CRUD operations. If the backend (database) is setup, the same can be achieved through APIs.
Created a table with sorting and exporting the settings to excel.

## Getting Started

Clone the `currency-format-manager` repository using git:

```
git clone https://github.com/angular/angular-seed.git
cd currency-format-manager
```

### Prerequisites

We must have Node.js and its package manager (npm) installed. You can get them from [here][node].

### Install Dependencies

To download the application dependencies

Preconfigured `npm` to automatically copy the downloaded AngularJS files to `app/lib` so we
can simply do:

```
npm install
```

Behind the scenes this will also call `npm run copy-libs`, which copies the AngularJS files and
other front end dependencies. After that, you should find out that you have two new directories in
your project.

- `node_modules` - contains the npm packages for the tools we need
- `app/lib` - contains the AngularJS framework files and other front end dependencies

### Run the Application

To start the server

```
npm start
```

Now browse to the app at [`localhost:8000/index.html`][local-app-url].

## Directory Layout

```
app/                  --> all of the source files for the application
  app.css               --> default stylesheet
  core/                 --> all app specific modules
  currency/                --> all currency related modules
    add-currencies.html            --> Add currencies template
    add-currencies.js              --> the controller logic
    display-currencies.html        --> Display curencies template
    display-currencies.js          --> the controller logic
    country-currency.js            --> the controller logic for currency format
    currency-format.json           --> Different currencies loaded in the app
    locale.json                    --> Different locales loaded in the app
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
package.json          --> Node.js specific metadata, including development tools dependencies
package-lock.json     --> Npm specific metadata, including versions of installed development tools dependencies
```

### Running the App during Development

This project comes preconfigured with a local development web server. It is a Node.js
tool called [http-server][http-server]. You can start this web server with `npm start`, but you may
choose to install the tool globally:

```
npm install -g http-server
```

Then you can start your own development web server to serve static files from any folder by running:

```
http-server -a localhost -p 8000
```

Alternatively, you can choose to configure your own web server, such as Apache or Nginx. Just
configure your server to serve the files under the `app/` directory.
