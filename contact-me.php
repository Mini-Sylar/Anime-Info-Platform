
<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (isset($_POST['name'],$_POST['email'],$_POST['message'])){

    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $from = 'From: ' . $_POST['email']; 
    $to  = 'minisylar3@mail.com' . ', '; 
    $to .= $_POST['email'];
    $subject = 'Uw vraag op www.aledvertising.be';
    $human = $_POST['human'];

    $body = "From: $name\n E-Mail: $email\nMessage:\n $message";
    if ($name != '' && $email != '' && $message != '') {
        if ($human == '4') {                 
            if (mail ($to, $subject, $body, $from)) { 
            echo '<p class="green">Uw bericht is succesvol verzonden.</p>';
        } else { 
            echo '<p>Er iets misgelopen, probeer opnieuw aub.</p>'; 
        } 
    } else if ($_POST['submit'] && $human != '4') {
        echo '<p>2+2 is niet gelijk aan het getal dat u hebt ingevoerd.</p>';
    }
    } else {
        echo '<p>Alle velden met een * zijn verplicht in te vullen.</p>';
    }
}
?>
