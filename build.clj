(require 'cljs.build.api)
(cljs.build.api/build "src/clojure_script" {:output-to "out/main.js"})