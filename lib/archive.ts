import {distance,pathDistance} from './mission';
import type {Reading} from './mission';

export type Marker = Reading & {count?:number;minimum?:number;maximum?:number;cellSize?:number};
export type ArchiveFilter = {missions:string[];orbit:string;day:string;minDensity:number;query:string;page:number;view:'auto'|'aggregate';cellSize:5|10;region:null|{type:string;a:{lat:number;lon:number};b:{lat:number;lon:number};radius:number}};
export function matches(r:Reading,f:ArchiveFilter){return f.missions.includes(r.mission)&&(f.orbit==='All orbits'||r.orbit===f.orbit)&&(f.day==='All dates'||r.time.startsWith(f.day))&&r.density>=f.minDensity&&(!f.region||(f.region.type==='Coordinates'?distance(r,f.region.a):pathDistance(r,f.region.a,f.region.b))<=f.region.radius);}
export function summarize(source:Iterable<Reading>,f:ArchiveFilter){
  const cells=new Map<string,{count:number;sum:number;min:number;max:number;alt:number;lat:number;lon:number}>();
  const markers:Marker[]=[],rows:Reading[]=[],orbits=new Set<string>(),missions=new Set<string>();
  const histogram=Array<number>(24).fill(0);let total=0,matched=0,min=Infinity,max=-Infinity;
  for(const r of source){if(!matches(r,f))continue;total++;min=Math.min(min,r.density);max=Math.max(max,r.density);orbits.add(r.orbit);missions.add(r.mission);
    const bucket=Math.floor((r.alt-452)/2.4);if(bucket>=0&&bucket<24)histogram[bucket]++;
    if(markers.length<2000)markers.push(r);
    const y=Math.min(180/f.cellSize-1,Math.floor((r.lat+90)/f.cellSize));
    const x=Math.floor((((r.lon+180)%360+360)%360)/f.cellSize),key=`${y}:${x}`;
    let c=cells.get(key);if(!c){c={count:0,sum:0,min:Infinity,max:-Infinity,alt:0,lat:-90+(y+.5)*f.cellSize,lon:-180+(x+.5)*f.cellSize};cells.set(key,c);}
    c.count++;c.sum+=r.density;c.alt+=r.alt;c.min=Math.min(c.min,r.density);c.max=Math.max(c.max,r.density);
    if(`${r.id} ${r.mission} ${r.orbit}`.toLowerCase().includes(f.query.toLowerCase())){if(matched>=f.page*10&&rows.length<10)rows.push(r);matched++;}
  }
  const aggregated=f.view==='aggregate'||total>2000;
  const display:Marker[]=aggregated?Array.from(cells,([id,c])=>({id:`CELL-${id}`,lat:c.lat,lon:c.lon,alt:c.alt/c.count,density:c.sum/c.count,count:c.count,minimum:c.min,maximum:c.max,cellSize:f.cellSize,mission:'Combined selection',orbit:'',time:'',quality:'Spatial mean'})):markers;
  return {markers:display,rows,total,matched,min:total?min:0,max:total?max:0,orbits:[...orbits],missions:[...missions],histogram,aggregated};
}
export type ArchiveResult=ReturnType<typeof summarize>;
