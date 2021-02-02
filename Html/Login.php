<?php 
  session_start();
  include('../php/config.php');
  if (isset($_POST['login'])) {
      $username = $_POST['username'];
      $password = $_POST['psw'];
      $query = $connection->prepare("SELECT * FROM users WHERE username=:username");
      $query->bindParam("username", $username, PDO::PARAM_STR);
      $query->execute();
      $result = $query->fetch(PDO::FETCH_ASSOC);
      if (!$result) {
          echo '<p class="error">Username password combination is wrong!</p>';
      } else {
          if (password_verify($password, $result['password'])) {
              $_SESSION['username'] = $result['username'];
              echo '<p class="success">Congratulations, you are logged in!</p>';
              header('Location: index.php');
          } else {
              echo '<p class="error">Username password combination is wrong!</p>';
          }
      }
  }

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="../Style/login-style.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital@1&display=swap" rel="stylesheet">
</head>

<body>
    <div class="container-flex">

        <form class="form" method="post" name="login-form">
            <?php include('../Php/errors.php');?>
            <div class="imgcontainer">
                <img src="../Resource/batman_hero_avatar_comics-512.png" alt="Avatar" class="avatar">
            </div>
            <div class="form__group">
                <input type="text" name="username" placeholder="Username" class="form__input" />
            </div>
            <div class="form__group">
                <input id="psw" type="password" placeholder="Enter Password" class="form__input" name="psw" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    required>
            </div>
            <span id="message">
                <p id="letter" class="invalid">A <strong>lowercase</strong> letter</p>
                <p id="capital" class="invalid">A <strong>capital (uppercase)</strong> letter</p>
                <p id="number" class="invalid">A <strong>number</strong></p>
                <p id="length" class="invalid">Minimum <strong>8 characters</strong></p>
                </span>

            <button class="btn" id="btn" name="login" type="submit" type="button">Login</button>
            <span class="remember">
                <label>
                <input type="checkbox" checked="checked" name="remember"> Remember me
                  </label>
                </span>
            <div class="register">
                <a href="../Html/Register.php">
                Not a member? Sign Up.</a>
            </div>
        </form>
    </div>
</body>
<script src="../js/LoginValidation.js"></script>

</html>