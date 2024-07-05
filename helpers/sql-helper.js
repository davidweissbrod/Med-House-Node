import config from "../configs/dbconfig.js";

export default class SQLQuery{
    async SQLQuery(query, values = undefined){
        let ret = null;
        const client = new Client(config);
        try{
            await client.connect(); 
            const result = await client.query(query, values);
            ret = result;
        }
        catch(error){
            console.log(error);
        }
        finally{
            await client.end();
            return ret;
        }
    }
}