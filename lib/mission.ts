export type Reading={id:string;lat:number;lon:number;alt:number;density:number;orbit:string;mission:string;time:string;quality:string};
export const missions=['IONIS-01','IONIS-02','Pathfinder'];
export function orbitPosition(t:number,o:number){const inc=(67+o%3*9)*Math.PI/180;return {lat:Math.asin(Math.sin(t)*Math.sin(inc))*180/Math.PI,lon:((Math.atan2(Math.sin(t)*Math.cos(inc),Math.cos(t))+o*40*Math.PI/180)*180/Math.PI+540)%360-180};}

export function distance(a:{lat:number;lon:number},b:{lat:number;lon:number}){const r=Math.PI/180,h=Math.sin((b.lat-a.lat)*r/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin((b.lon-a.lon)*r/2)**2;return 6371*2*Math.asin(Math.sqrt(Math.min(1,h)));}
export function pathDistance(p:{lat:number;lon:number},a:typeof p,b:typeof p){const r=Math.PI/180;const bearing=(x:typeof a,y:typeof a)=>Math.atan2(Math.sin((y.lon-x.lon)*r)*Math.cos(y.lat*r),Math.cos(x.lat*r)*Math.sin(y.lat*r)-Math.sin(x.lat*r)*Math.cos(y.lat*r)*Math.cos((y.lon-x.lon)*r));const d=distance(a,p)/6371,delta=bearing(a,p)-bearing(a,b),xt=Math.asin(Math.sin(d)*Math.sin(delta)),at=Math.atan2(Math.sin(d)*Math.cos(delta),Math.cos(d));return at<0?distance(p,a):at>distance(a,b)/6371?distance(p,b):Math.abs(xt)*6371;}
export function densityColor(n:number){return n<300000?'#6869fa':n<600000?'#399cff':n<900000?'#38dfed':n<1100000?'#a1efd6':'#f4d58a';}

