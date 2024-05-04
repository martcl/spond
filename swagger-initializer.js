window.onload = function() {
  //<editor-fold desc="Changeable Configuration Block">
  let hostname = location.hostname; 

  let path = "/@typespec/openapi3/openapi.yaml";

  if (hostname === "martcl.github.io") {
    path = "/spond" + path;
  }
  // the following lines will be replaced by docker/configurator, when it runs in a docker-container
  window.ui = SwaggerUIBundle({
    url: path,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  });

  //</editor-fold>
};
