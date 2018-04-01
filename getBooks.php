<?php
    require_once("DataObject.php");
    $data = array();
    $datapath = "data/";
    if (file_exists($datapath)) {
        $files = scandir($datapath);
        $c = count($files);
        for ($i = 2; $i < $c; $i++) {
            $filename = $files[$i];
            $parts = explode("_", $filename);
            $obj = new DataObject($parts[0], $parts[1]);
            array_push($data, $obj);
            if ($obj->status == "NOT FOUND") {
                header("HTTP/1.1 404 Not Found");
                exit;
            }
        }
        shuffle($data);
        echo json_encode($data);
    } else {
        header("HTTP/1.1 404 Not Found");
        exit;
    }
?>