<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Chargement des fichiers de la librairie (Assurez-vous que le dossier PHPMailer est au même niveau)
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

// --- GESTION CORS (Indispensable pour que Next.js puisse parler au PHP) ---
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Réponse immédiate pour les requêtes "Preflight" du navigateur
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Récupération des données JSON envoyées par Next.js
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

// Vérification des champs (basée sur votre formulaire React)
if (empty($_POST['identifiant']) || empty($_POST['email'])) {
    echo json_encode(["sent" => false, "message" => "Signal incomplet (Données manquantes)"]);
    exit();
}

$mail = new PHPMailer(true);

try {
    // --- CONFIGURATION DU SERVEUR ---
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'lenversdudecorsainedecrime@gmail.com'; 
        $mail->Password   = 'xawz upun siuw yrdw'; // Votre mot de passe d'application
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8'; // Important pour les accents

    // --- EXPÉDITEUR ---
    $mail->setFrom('lenversdudecorsainedecrime@gmail.com', 'Console Transmission');
    
    // --- DESTINATAIRE (Vous) ---
    $mail->addAddress('lenversdudecorsainedecrime@gmail.com'); 
    
    // Répondre directement à "La Fréquence de Retour" du visiteur
    $mail->addReplyTo($_POST['email'], $_POST['identifiant']);

    // --- CONTENU DU MAIL (Style Rapport) ---
    $mail->isHTML(false); // Format Texte Brut (plus "Terminal")
    
    $sujet = "/// TRANSMISSION ENTRANTE : " . strtoupper($_POST['identifiant']);
    $mail->Subject = $sujet;
    
    $body = "=== RAPPORT DE RÉCEPTION ===\n";
    $body .= "DATE: " . date('d/m/Y H:i:s') . "\n";
    $body .= "SOURCE (Identifiant): " . $_POST['identifiant'] . "\n";
    $body .= "FREQUENCE (Email): " . $_POST['email'] . "\n";
    $body .= "----------------------------------\n";
    $body .= "DÉCRYPTAGE DES DONNÉES:\n\n";
    $body .= $_POST['message'] . "\n\n";
    $body .= "=== FIN DE TRANSMISSION ===";
    
    $mail->Body = $body;

    $mail->send();
    echo json_encode(["sent" => true, "message" => "Transmission réussie."]);

} catch (Exception $e) {
    // Erreur technique
    echo json_encode(["sent" => false, "message" => "Erreur Uplink: " . $mail->ErrorInfo]);
}
?>