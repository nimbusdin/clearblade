function mqtt(req, resp) {
  var val = req.params.lscpu;
  ClearBlade.init({request:req});
  var collection = ClearBlade.Collection({collectionName:"mqtt"});
  var newRow = {
    lscpu: JSON.stringify(val)
  };
  collection.create(newRow);
  resp.success(JSON.stringify(newRow));
}
