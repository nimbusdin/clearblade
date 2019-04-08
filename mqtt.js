function mqtt(req, resp) {
  var val = req.params.lscpu;
  ClearBlade.init({request:req});
  var collection = ClearBlade.Collection({collectionName:"DeviceInfo"});
  var specs = [];
  for (i = 0; i < 25; i++) {
    specs.push(val[i]["data"]);
  }
  var newRow = {
    architecture: specs[0],
    cpu_op_mode: specs[1],
    byte_order: specs[2],
    address_sizes: specs[3],
    cpus: specs[4],
    online_cpu_list: specs[5],
    threads_per_core: specs[6],
    cores_per_socket: specs[7],
    sockets: specs[8],
    numa_modes: specs[9],
    vendor_id: specs[10],
    cpu_family: specs[11],
    model: specs[12],
    model_name: specs[13],
    stepping: specs[14],
    cpu_mhz: specs[15],
    cpu_max_mhz: specs[16],
    cpu_min_mhz: specs[17],
    bogomips: specs[18],
    virtualization: specs[19],
    l1d_cache: specs[20],
    l1i_cache: specs[21],
    l2_cache: specs[22],
    numa_mode_cpus: specs[23],
    flags: specs[24],
  };
  collection.create(newRow);
  resp.success(JSON.stringify(newRow));
}

