<?php

$filepath = './files/1.jpg';
$filename = 'cat.jpg';

// ファイルのダウンロード、リネームを指示
header('Content-Disposition: attachment; filename="'.$filename.'"');

// ファイルを読み込みダウンロードを実行
readfile($filepath);