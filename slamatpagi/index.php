<?
$ch = curl_init();
$domain = $_SERVER["HTTP_HOST"];
curl_setopt($ch, CURLOPT_URL, "http://www.vodien.com/placeholder/index.php");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, "domain=$domain");
curl_setopt($ch, CURLOPT_HEADER, 0);
$output = curl_exec($ch);
curl_close($ch); ?>
