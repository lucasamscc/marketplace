<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "desafio";

// conexao com a porta
//conexao sem a porta
$conn = new PDO("mysql:host=$host;dbname=" . $dbname, $user, $pass);
