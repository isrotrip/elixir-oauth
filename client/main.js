const BASE_URL = 'http://localhost:3000';

function initWebsite() {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    $('#login-navbar-button').hide();
    showFormLogin();
  } else {
    $('#not-login-navbar-button').hide();
    showHome();
  }
}

function showFormLogin() {
  $('#form').empty();
  $('#form').append(`
    <h3>Login Form</h3>
    <form id="form-login">
      <div class="form-group">
        <label for="input-login-email">Email address</label>
        <input type="email" class="form-control" id="input-login-email" aria-describedby="emailHelp">
      </div>
      <div class="form-group">
        <label for="input-login-password">Password</label>
        <input type="password" class="form-control" id="input-login-password">
      </div>
      <p id="login-error" class="red-font"></p>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  `);

  $('#form-login').on('submit', function(event) {
    let email = $('#input-login-email').val();
    let password = $('#input-login-password').val();

    $.ajax({
      url: `${BASE_URL}/login`,
      method: 'POST',
      data: {
        email,
        password
      }
    })
      .done(data => {
        let token = data.token;
        localStorage.setItem('access_token', token);

        $('#form').empty();        

        $('#input-login-email').val('');
        $('#input-login-password').val('');

        $('#login-navbar-button').show();
        $('#not-login-navbar-button').hide();
        showHome();
      })
      .fail(error => {
        $('#login-error').text(error.responseJSON.error);
      })

    event.preventDefault();
  });
}

function showFormRegister() {
  $('#form').empty();
  $('#form').append(`
    <form id="form-register">
      <h3>Register Form</h3>
      <form id="form-register">
      <div class="form-group">
        <label for="input-register-email">Email address</label>
        <input type="email" class="form-control" id="input-register-email" aria-describedby="emailHelp">
      </div>
      <div class="form-group">
        <label for="input-register-password">Password</label>
        <input type="password" class="form-control" id="input-register-password">
      </div>
      <p id="register-error" class="red-font"></p>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  `);

  $('#form-register').on('submit', function(event) {
    let email = $('#input-register-email').val();
    let password = $('#input-register-password').val();

    $.ajax({
      url: `${BASE_URL}/register`,
      method: 'POST',
      data: {
        email,
        password
      }
    })
      .done(data => {
        let token = data.token;
        localStorage.setItem('access_token', token);
        showHome();
      })
      .fail(error => {
        $('#register-error').text(error.responseJSON.error);
      });
    
    event.preventDefault();
  });
}

function showHome() {
  let access_token = localStorage.getItem('access_token');

  $('#main').empty();

  $.ajax({
    url: `${BASE_URL}/bands`,
    method: 'GET',
    headers: {
      access_token
    }
  })
    .done(data => {
      $('#main').append(`
        <img class="full-screen" src="${data.image_url}">
      `);
    })
    .fail(error => {
      $('#home-error').text(error.responseJSON.error);
    });
}

function initNavbarButton() {
  $('#button-home').on('click', function(event) {
    showHome();
    event.preventDefault();
  });
  $('#button-login').on('click', function(event) {
    showFormLogin();
    event.preventDefault();
  });
  $('#button-register').on('click', function(event) {
    showFormRegister();
    event.preventDefault();
  });
  $('#button-logout').on('click', function(event) {
    logout();
    event.preventDefault();
  });
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    url: `${BASE_URL}/google-login`,
    method: 'POST',
    headers: {
      google_token: id_token
    }
  })
    .done(data => {
      localStorage.setItem('access_token', data.token);
      $('#login-navbar-button').show();
      $('#not-login-navbar-button').hide();
      showHome();
    })
    .fail(err => {
      console.log(err);
    })
}

function logout() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    localStorage.removeItem('access_token');
    $('#main').empty();
    $('#login-navbar-button').hide();
    $('#not-login-navbar-button').show();
    showFormLogin();
  });
}

$(document).ready(function() {
  initWebsite();
  initNavbarButton();
})