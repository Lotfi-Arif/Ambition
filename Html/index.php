<?php
session_start();
if (!isset($_SESSION['username'])) {
    header('Location: Login.php');
    exit;
} else {
    // Show users the page!
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>れもん - Lemon</title>
    <link rel="stylesheet" href="../Style/style.css">
    <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"> -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital@1&display=swap" rel="stylesheet">

</head>

<body>
    <div class="loader-wrapper">
        <span class="loader"><span class="loader-inner"></span></span>
    </div>
    <div class="page">
  <nav class="page__menu menu">
    <ul class="menu__list r-list">
      <li class="menu__group"><a href="#0" class="menu__link r-link text-underlined">Home</a></li>
      <li class="menu__group"><a href="#0" class="menu__link r-link text-underlined">Categories</a></li>
      <li class="menu__group"><a href="#0" class="menu__link r-link text-underlined">Contact</a></li>
    </ul>
  </nav>
    <div class="container-flex">
        <div class="main-info">
            <h1 style="color: #299BBF;">$699</h1>
            <br>
            <h1>IPhone 12</h1>
            <p id="paragraph">iPhone 12. Beautifully bright 6.1-inch Super Retina XDR display. Cinema-grade Dolby Vision video recording, editing and playback. Powerful A14 Bionic chip. And new MagSafe accessories for easy attachment and faster wireless charging.
            </p>
            <br>
            <button class="button"><span>Order Now</span></button>
        </div>
        <div class="slider">
            <img src="../Resource/Apple-iPhone-12-PNG.png" alt="">
        </div>
    </div>




    <script src="../js/app.js">

    </script>
</body>

</html>