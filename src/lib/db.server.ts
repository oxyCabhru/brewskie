import { building, dev } from "$app/environment";

import KeyvMysql from "@keyv/mysql";
import Keyv from "keyv";
let db: KeyvMysql<any> | Keyv;

if (!building && !dev) {
    db = new KeyvMysql("mysql://brewskie:brewskie@mysql-cluster:3306/brewskie");
} else {
    db = new Keyv();
}



export default db;