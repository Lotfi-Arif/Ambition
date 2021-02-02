<?php
session_start();
include('../Php/config.php');
if (isset($_POST['register'])) {
    $username = $_POST['username'];
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $password = $_POST['psw'];
    $address = $_POST['address'];
    $phoneNo = $_POST['phone-no'];
    $password_hash = password_hash($password, PASSWORD_BCRYPT);
    $query = $connection->prepare("SELECT * FROM users WHERE email=:email");
    $query->bindParam("email", $email, PDO::PARAM_STR);
    $query->execute();
    if ($query->rowCount() > 0) {
        echo '<p class="error">The email address is already registered!</p>';
    }
    if ($query->rowCount() == 0) {
        $query = $connection->prepare("INSERT INTO users(username,fullname,password,email,address,phone_no) VALUES (:username,:fullname,:password_hash,:email,:address,:phoneNo)");
        $query->bindParam("username", $username, PDO::PARAM_STR);
        $query->bindParam("fullname", $fullname, PDO::PARAM_STR);
        $query->bindParam("password_hash", $password_hash, PDO::PARAM_STR);
        $query->bindParam("email", $email, PDO::PARAM_STR);
        $query->bindParam("address", $address, PDO::PARAM_STR);
        $query->bindParam("phoneNo", $phoneNo, PDO::PARAM_STR);
        $result = $query->execute();
        if ($result) {
            echo'<p class="success">Your registration was successful!</p>';
            header('Location: index.php');
        } else {
            echo '<p class="error">Something went wrong!</p>';
        }
    }
}



?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="../Style/Register-style.css">
</head>

<body>
    <div class="container-flex">
        <form class="form" method="post" name="signin-form">
            <div class="imgcontainer">
                <img src="../Resource/batman_hero_avatar_comics-512.png" alt="Avatar" class="avatar">
            </div>
            <div class="form__group">
                <input type="text"  name="username" placeholder="Username" class="form__input" />
            </div>
            <div class="form__group">
                <input type="text"  name="fullname" placeholder="Full Name" class="form__input" />
            </div>
            <div class="form__group">
                <input name="email" type="email" placeholder="Email" class="form__input" />
            </div>
            <div class="form__group">
                <input id="psw" type="password" placeholder="Enter Password" class="form__input" name="psw" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>
            </div>
            <div class="form__group">
                <input type="text"  name="address" placeholder="Address" class="form__input" />
            </div>
            <div class="form__group">
                <input type="text"  name="phone-no" placeholder="Phone number" class="form__input" />
            </div>
            <span id="message">
                <p id="letter" class="invalid">A <strong>lowercase</strong> letter</p>
                <p id="capital" class="invalid">A <strong>capital (uppercase)</strong> letter</p>
                <p id="number" class="invalid">A <strong>number</strong></p>
                <p id="length" class="invalid">Minimum <strong>8 characters</strong></p>
            </span>

            <button class="btn" value="register" type="submit" name="register" type="button">Register</button>
            <span class="remember">
                <label>
                    <input type="checkbox" checked="checked" name="remember"> Remember me
                </label>
            </span>
            <div class="login">
            <a href="../Html/Login.php">Already a member? Login here.</a>
            </div>
        </form>
    </div>
    <script src="../js/RegisterValidation.js"></script>
</body>

</html>