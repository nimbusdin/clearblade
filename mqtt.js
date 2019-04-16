function mqtt(req, resp) {
  ClearBlade.init({request: req});
  var collection = ClearBlade.Collection({collectionName:"mqtt"});
  var collection_ID = ClearBlade.Collection({collectionID:"b4c0d5ca0bdcdea0b2fa90848c5c"})
  var val = req.params.body;
  val = JSON.parse(val);
  val = val["lscpu"];
  var callback = function (err, data) {
    if (err) {
      resp.error("error creating new row: " + JSON.stringify(data));
    } else {
      resp.success(data);
    }
  }
  specs = {};
  for (i = 0; i < val.length; i++) {
    col_name = val[i]["field"];
    col_name = col_name.replace(/ /g, '_');
    col_name = col_name.replace(/[()-:]/g, '');
    col_value = val[i]["data"];
    specs[col_name] = col_value
  }
  var new_row = {
      "lscpu": JSON.stringify(specs)
  }
  collection.create(new_row, callback);
}
