function mqtt(req, resp) {
  var val = req.params.lscpu;
  ClearBlade.init({request:req});
  var collection = ClearBlade.Collection({collectionName:"mqtt"});
  var callback = function (err, data) {
    if (err) {
      resp.error("error creating new row: " + JSON.stringify(data));
    } else {
      resp.success(data);
    }
  }
  //resp.success(val.length);
  specs = {};
  for (i = 0; i < val.length; i++) {
    col_name = val[i]["field"];
    col_name = col_name.replace(/ /g, '_');
    col_name = col_name.replace(/[()-:]/g, '');
    collection.addColumn(col_name);
    col_value = val[i]["data"];
    specs[col_name] = col_value
  }
  var newRow = {
    lscpu: JSON.stringify(specs)
  };
  collection.create(newRow, callback);
}
