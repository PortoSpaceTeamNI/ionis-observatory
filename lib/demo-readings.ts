import {orbitPosition,missions} from './mission';
import type {Reading} from './mission';
export const readings:Reading[]=Array.from({length:2160},(_,i)=>{const o=Math.floor(i/240),s=i%240,p=orbitPosition(s/240*Math.PI*2,o);return {id:`IP-${String(i+1).padStart(5,'0')}`,...p,alt:Math.round(480+28*Math.sin(s/34+o)),density:Math.round(Math.max(.08,1.5+8*Math.cos(p.lat*Math.PI/180)**2+2*Math.sin(s/12+o))*100000),orbit:`ORB-${1420+o}`,mission:missions[o%3],time:new Date(Date.UTC(2026,8,14+Math.floor(o/3),Math.floor((o%3)*7+s/40),s%60)).toISOString(),quality:i%13===0?'Provisional':'Validated'};});
