import { Pool } from 'pg';
import { currentTime } from '../../utils'
import config from '../../config'

let pg_config = config.pg_main;

class pgEngine {
    pool = null;
    queue = [];
    queue_running = 0
    queue_limit = 20

    ExecuteQ(q) {
        return new Promise((cb, reject)=>{
            this.queue.push({
                state: 0,
                options: q,
                callback: cb,
                create_time: currentTime()
            });
            this._eat_req();
        })
    }

    _processReq(q) {
        this._executeQueryObj(q.options, (res) => {
            if (q.callback) 
                q.callback(res);
            q.state = 2;
        });
    }

    async _executeQueryObj(q, callback) {
        if (!q || q.q.length == 0) {
            callback({err: {
                code: 140,
                msg: 'query is not defined'
            }, res: null});
            return;
        }
        if (!this.pool){
            callback({err: {
                code: 120,
                msg: 'Pg pool is not defined'
            }, res: null});
            return;
        }
        let result = null;
        let _res = {err: null, res: null}
        try{
            const client = await this.pool.connect()
            try {
                result = await client.query(q.q, q.param)
            } catch(err) {
                _res.err = {
                    code: 160,
                    msg: String(err.message)
                }
            }
            client.release()
        } catch(err) {
            _res.err = {
                code: 150,
                msg: String(err.message)
            }
        }
        if (result && !_res.err){
            if (result.command === "INSERT" || result.command === "UPDATE" || result.command === "DELETE") {
                if (result.rowCount && result.rowCount >= 0) {
                    if (result.rowCount == 0) {
                        _res.res = 0;
                    } else {
                        _res.res = Number(result.rowCount);
                    }
                } else {
                    _res.res = null
                    _res.err = {
                        code: 170,
                        msg: 'Nothing committed'
                    }
                }
            } else {
                _res.res = result.rows;
            }
        }
        callback(_res)
    };

    _eat_req() {
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].state == 1 && this.queue[i].create_time + 60000 < currentTime()) {
                let cb = this.queue[i].callback
                if (cb){
                    cb({err: {
                        code: 130,
                        msg: 'timeout'
                    }, res: null});
                }
                this.queue[i].state = 2;
            }
        }

        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].state == 2) {
                this.queue_running--;
                this.queue.splice(i, 1);
                i--;
            }
        }

        for (let i = 0; i < this.queue.length && this.queue_running < this.queue_limit && this.pool; i++) {
            if (this.queue[i].state == 0) {
                this.queue_running++;
                this.queue[i].state = 1;
                this._processReq(this.queue[i]);
            }
        }
    }

    Init(pg_config) {
        this.pool = new Pool(pg_config);
        this.pool.on("error", function(err, client) {
            console.error("==== nsPostgresQ: idle client error", err.message, err.stack);
        });
        console.log("==== nsPostgresQ: Pool started");
        this.heartbeatCycle()
    }

    heartbeatCycle() {
        setTimeout(() => {
            this._eat_req();
            this.heartbeatCycle();
        }, 1000);
    }
}

let pe = new pgEngine();
pe.Init(pg_config);

export default pe;