(require 'cljs.build.api)
(cljs.build.api/watch "src" {:main 'clojure-script.core :output-to "out/main.js"})