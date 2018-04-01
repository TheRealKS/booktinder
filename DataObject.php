<?php
    class DataObject {

        protected $BASEDATAPATH = "data/";

        public $title; //STRING
        public $author; //STRING
        public $bio = null; //JSON
        public $images; //ARRAY (OR IF ONLY ONE JUST PATH) OF FILE PATHS
        public $path; //PATH TO THE DATA OF THIS BOOK
        public $status = "FETCHING"; //STATUS TO RETURN CODE

        function __construct($t, $a) {
            $this->title = $t;
            $this->author = $a;
            $this->resolveData($t, $a);
        } 

        private function resolveData($title, $author) {
            $file = $this->BASEDATAPATH . $title . "_" . $author;
            if (file_exists($file)) {
                $this->path = $file;
                $rawbio = file_get_contents($file . "/data.json");
                $b = json_decode($rawbio);
                $this->title = $b->title;
                $this->author = $b->author;
                $this->bio = $b->bio;
                $images = scandir($file . "/images");
                unset($images[0]);
                unset($images[1]);
                $images = array_values($images);
                if (count($images) == 1) {
                    $this->images = $images[0];
                } else {
                    $this->images = $images;
                }
                $this->status = "OK";
            } else {
                $this->status = "NOT FOUND";
                return;
            }
        }
    }
?>