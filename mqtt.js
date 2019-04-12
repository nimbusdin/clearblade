function mqtt(req, resp) {
  var val = req.params.lscpu;
  ClearBlade.init({request:req});
  var collection = ClearBlade.Collection({collectionName:"mqtt"});
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
  collection.create(newRow);
  resp.success(JSON.stringify(newRow));
}
