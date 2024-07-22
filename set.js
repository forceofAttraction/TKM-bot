const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiME9ES2UzOG95OXVBaVpTSXpZSFNQZ0ltbXFtT0haeE5lNW1CUkZkcDBrbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRHVIWG95SGxORGphQkwrMDFmUTFaRXBQbjdoM2l0cWQxaWJMb3d2M0kxST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzUDNXM2R1N3Roa2R2Uyt2ajlUOGw0V21DMWxIdFNtbktoZDRmTENocm1rPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoNThoTVQyWFZSMDQ3ZFN6WFB4Mkh1aGdCcGNCM3VnNDk5MlprMXZ3am1NPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBQQjVJRWI1Q1UzSG9ORnVhbDFhYVBWMTI5MUZuRGwrQTdlYXNPclY1bWM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxuU0o0U2UrcG1Yd1BUMXVzSFRtaFdEbGhUZVVycWdPTDhEc1lZUHJoSFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY1B4b1RBTFlxMEQxenBEZU5IbzJSTXczNC85cy9DenhvaC8vN2gzTGFsND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWExvQkZsYWxZWXNnc2NaUGI4RDVZYkRCWlMvaENZa0ovM1BpUnBnckhIMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJJNTl2RmdIM08wV3ZUUUM1RWE3a3pVRHFOYitiVTFnbjNVSDAwR2RvdENXcTlyNVNuVm1hRUVaa3RVeVFRdVBOb3hwYVpTNzQzTmNEdnl1d1NRUkRBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NSwiYWR2U2VjcmV0S2V5IjoiN01LWFFaNHRxNWlPNVBGUlRiL0JTRVVuMjhMN3c1Slp5WHR6MDNjU1M2VT0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoibUIwVWttR2FTOXVVRFViU3FzLWctZyIsInBob25lSWQiOiJmMzc1NjlhZi0wMTk4LTQ2YzMtYjA2Ny0yODNlYzNjZDIzZTUiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYWVEUThQQXdKcVF0VE1aK1VBeHpzSGJFOVY4PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFzYnFyZGMxRUxQNzNtTmo2NitQQThrTVZ0VT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJBMTlETU4zRyIsIm1lIjp7ImlkIjoiMjM0OTE1ODQ4MjMwOTo0QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPZVlrdU1IRU1DbSs3UUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIyVC9MU0xCeFRxOU9pbHZleGNmcjh3YnhYZk1ad2xKVEgxaCsrb1NIUkVBPSIsImFjY291bnRTaWduYXR1cmUiOiJaN3pzSTZSR2g5L2dpbHpWY3pGTkQxdSs5ME5ZalhJYVMwRFduYTZvWGMrc2VuWmN1dnI3SXhzejF6QUtNcmgwT1VUUE9BbnY0T2l4RHBMSmVpNjRCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoicDhxWi81SVBMUW5uN1FiQ01lRG5ZRlV4VElwUUxvUjljSm9VdFhoRDJ1REIvZFUzdEdGU1pkdW9TNjBLdlpkU0pONzdzVjhvMVF5YzEyTlBRSmg5Q3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTU4NDgyMzA5OjRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZGsveTBpd2NVNnZUb3BiM3NYSDYvTUc4VjN6R2NKU1V4OVlmdnFFaDBSQSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTY4NDgxMn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
