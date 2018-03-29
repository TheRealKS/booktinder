<?php
    require_once("websocket/websockets.php");
    
    class Server extends WebSocketServer {

        public $users = [];
        public $data = [];
        
        protected function process($user, $message) {
            $json = json_decode($message);
            switch ($json->type) {
                case 'handshake':
                    //Process any handshake data here
                    break;
                case 'choice':
                    //User made a choice
                    
                    break;
                default:
                    //Nothing...
                    break;
            }
        }

        protected function connected($user) {
            $this->stdout("Connection id: " . $user->id);
            //Register the new user
            if (!array_key_exists($user->id, $this->users)) {
                $this->users[$user->id] = $user;
            }
        }

        protected function closed($user) {
            //Remove the user from the system; save their data
            
        }

        protected function started() {
            //List all available data (books)
            $datapath = "../data";
            if (file_exists($datapath)) {
                $files = scandir($datapath);
                $c = count($files);
                for ($i = 3; $i < $c; $i++) {
                    $filename = $files[$i];
                    $parts = explode("_", $filename);
                    $obj = new DataObject($parts[0], $parts[1], $this);
                    array_push($this->data, $obj);
                }
            } else {
                $this->stderr("Data folder not found!");
            }
            var_dump($this->data);
        }
    }

    $s = new Server("0.0.0.0", "6848");

    try {
        $s->run();
    } catch (Exception $e) {
        $s->stdout($e->getMessage());
    }
?>