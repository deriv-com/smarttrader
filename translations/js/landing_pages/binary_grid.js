fetch('https://grid.binary.me/version.json').then(function(response){return response.json()}).then(function(app){$('.download').attr('href','https://grid.binary.me/download/'+app.name)});window.onload=function(){commonOnload()};
//# sourceMappingURL=binary_grid.js.map
