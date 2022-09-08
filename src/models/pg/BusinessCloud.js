import pe from "./PgQ";

export async function getBusinessCloud(business_id) {
  let q = {
    q: `select
        _cloud_id as cloud_id,
        _state as state,
        _access_token as access_token,
        _platform as platform,
        _tmp_code as tmp_code
          from "BusinessCloud" 
          where 
            _state = $1 and _business_id = $2`,
    param: ["connected", business_id],
  };
  let _res = await pe.ExecuteQ(q);
  if (!_res.err && _res.res.length > 0) {
    return _res?.res[0];
  } else {
    if (_res.err)
      console.log(`Error in pgq-1/${_res.err.code} : ${_res.err.msg}`);
    return undefined;
  }
}
