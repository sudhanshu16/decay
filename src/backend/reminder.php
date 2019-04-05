<?php

require_once './vendor/autoload.php';

use Morrislaptop\Firestore\Factory;
use Kreait\Firebase\ServiceAccount;

if ($_GET['secret'] !== '******************') {
    exit("unauthorized");
}

// This assumes that you have placed the Firebase credentials in the same directory
// as this PHP file.
$serviceAccount = ServiceAccount::fromJsonFile(__DIR__ . '/firebase_service_credentials.json');

$firestore = (new Factory)
    ->withServiceAccount($serviceAccount)
    ->createFirestore();

$users = $firestore->collection('users');
$expiring = array();

foreach ($users->documents() as $userDocument) {
    $user = $userDocument->data();
    $uid = $user['uid'];
    if ($user['settings']['interval'] !== (int)$_GET['interval'] || $user['settings']['sendNotifs'] !== true) {
        break;
    }
    $prior = $user['settings']['prior'];
    $articles = $firestore->collection('users/' . $uid . '/articles');
    $expiring = [];
    $message = "";
    $count = 0;
    foreach ($articles->documents() as $articleDocument) {
        $article = $articleDocument->data();
        $expiryIn = date_diff((new DateTime())->setTimestamp($article['expiry']), new DateTime('now'));
        if ($expiryIn->days < $prior) {
            $message .= $article['name'] . ', ';
            $count++;
        }
    }
    $message = substr($message, 0, strlen($message) - 2);
    $userTag = array(
        array(
            "field" => "tag",
            "key" => "user_id",
            "value" => $uid
        )
    );
    if ($count > 0) {
        if ($count == 1) {
            $message .= " is expiring soon! Consume before it goes bad";
            $heading = "1 article is going bad in your kitchen";
        } else {
            $message .= " are expiring soon! Consume before they go bad";
            $heading = $count . " articles are going bad in your kitchen";
        }
        $response = sendMessage($message, $heading, $userTag);
    }
}


function sendMessage($message, $heading, $userTag)
{
    $content = array(
        "en" => $message
    );
    $headings = array(
        "en" => $heading
    );
    $fields = array(
        'app_id' => "0a4957c5-ea92-4af0-a217-b6324cfdd9fd",
        'included_segments' => array(
            'All'
        ),
        'contents' => $content,
        'headings' => $headings,
        'tag' => $userTag
    );

    $fields = json_encode($fields);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json; charset=utf-8',
        'Authorization: Basic ******************'
    ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
}
