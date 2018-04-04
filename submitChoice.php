<?php
    if (isset($_GET['data'])) {
        $data = $_GET['data'];
        $data = json_decode($data);
        if (file_exists("results.json")) {
            $contents = file_get_contents("results.json");
            $contents = json_decode($contents);
            var_dump($contents);
            $found = false;
            foreach ($contents as $key => $value) {
                if ($value->title == $data->book) {
                    if ($data->choice) {
                        $value->score++;
                    } else {
                        $value->dislike++;
                    }
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                //Book doesn't exists yet
                $o = [
                    "title" => $data->book,
                    "score" => 0,
                    "dislike" => 0
                ];
                if ($data->choice) {
                    $o["score"]++;
                } else {
                    $o["dislike"]++;
                }
                array_push($contents, $o);
            }
            file_put_contents("results.json", json_encode($contents));
        }
    }
?>