(ns clojure-script.core
  (:require [clojure.browser.repl :as repl]))
(defonce conn
  (repl/connect"http://localhost:9000/repl"))
(js/alert "Hello world!")
