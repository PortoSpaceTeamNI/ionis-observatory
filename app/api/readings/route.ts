import {z} from 'zod';
import {missions} from '@/lib/mission';
import {readings} from '@/lib/demo-readings';
import {matches,summarize} from '@/lib/archive';
export const dynamic='force-dynamic';
const coordinate=z.object({lat:z.number().min(-90).max(90),lon:z.number().min(-180).max(180)});
const schema=z.object({missions:z.array(z.enum(['IONIS-01','IONIS-02','Pathfinder'])).max(3),orbit:z.string().max(30),day:z.string().max(20),minDensity:z.number().min(0).max(1e15),query:z.string().max(100),page:z.number().int().min(0).max(10000000),view:z.enum(['auto','aggregate']),cellSize:z.union([z.literal(5),z.literal(10)]),region:z.object({type:z.enum(['Coordinates','Path']),a:coordinate,b:coordinate,radius:z.number().min(1).max(20000)}).nullable()});
export async function GET(request:Request){
  const params=new URL(request.url).searchParams;let raw;try{raw=JSON.parse(params.get('filter')||'null')}catch{return Response.json({error:'Invalid filter'},{status:400})}
  const parsed=schema.safeParse(raw||{missions,orbit:'All orbits',day:'All dates',minDensity:0,query:'',page:0,view:'auto',cellSize:10,region:null});
  if(!parsed.success)return Response.json({error:'Invalid filter values'},{status:400});
  const f=parsed.data,format=params.get('format');
  if(!format)return Response.json(summarize(readings,f));
  if(format!=='csv'&&format!=='json')return Response.json({error:'Unsupported export format'},{status:400});
  // Pull-based streaming keeps exports out of browser memory and honours backpressure.
  function* chunks(){
    yield format==='csv'?'id,timestamp_utc,latitude_deg,longitude_deg,altitude_km,electron_density_m3,mission,orbit,quality,source\n':'{"source":"synthetic_demo","units":{"density":"m^-3","altitude":"km"},"readings":[';
    let first=true;for(const r of readings){if(!matches(r,f))continue;yield format==='csv'?[r.id,r.time,r.lat,r.lon,r.alt,r.density,r.mission,r.orbit,r.quality,'synthetic_demo'].join(',')+'\n':(first?'':',')+JSON.stringify(r);first=false;}if(format==='json')yield ']}';
  }
  const iterator=chunks(),encoder=new TextEncoder();
  return new Response(new ReadableStream({pull(controller){const next=iterator.next();if(next.done)controller.close();else controller.enqueue(encoder.encode(next.value));},cancel(){iterator.return();}}),{headers:{'Content-Type':format==='csv'?'text/csv; charset=utf-8':'application/json','Content-Disposition':`attachment; filename="icarus-ionis-selection.${format}"`,'Cache-Control':'no-store'}});
}
