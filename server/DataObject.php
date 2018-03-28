<?php
    class DataObject {

        private static $BASEDATAPATH = "../data/";

        protected $server;

        protected $title; //STRING
        protected $author; //STRING
        protected $bio; //JSON
        protected $images; //ARRAY (OR IF ONLY ONE JUST PATH) OF FILE PATHS

        function __constructor($t, $a, $s) {
            $this->server = $s;
            $this->title = $t;
            $this->author = $a;
            $this->resolveData();
        } 

        private function resolveData($title, $author) {
            $file = $BASEDATAPATH . $title . "_" . $author;
            if (file_exists($file)) {
                $rawbio = file_get_contents($file . "/data.json");
                $b = json_decode($rawbio);
                $this->author = $b->author;
                $this->bio = $b->bio;
                $images = scandir($file . "/images");
                unset($images[0]);
                unset($images[1]);
                $images = array_search($images);
                if (count($images) == 1) {
                    $this->images = $images[0];
                } else {
                    $this->images = $images;
                }
            } else {
                $s->stderr("Data could not be resolved for object: " . $title . "; " . $author);
                return;
            }
        }
    }
?>