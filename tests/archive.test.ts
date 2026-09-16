import assert from 'node:assert/strict';
import {summarize, matches} from '../lib/archive';
import type {ArchiveFilter} from '../lib/archive';
import {readings} from '../lib/demo-readings';
const filter:ArchiveFilter={missions:['IONIS-01','IONIS-02','Pathfinder'],orbit:'All orbits',day:'All dates',minDensity:0,query:'',page:0,view:'auto',cellSize:10,region:null};
const all=summarize(readings,filter);
assert.equal(all.total,2160);assert.equal(all.rows.length,10);assert.equal(all.aggregated,true);assert.ok(all.markers.length<=648);
assert.equal(all.markers.reduce((n,m)=>n+m.count!,0),2160);
assert.ok(Math.abs(all.markers.reduce((n,m)=>n+m.density*m.count!,0)-readings.reduce((n,r)=>n+r.density,0))<1);
const mission=summarize(readings,{...filter,missions:['IONIS-01']});assert.equal(mission.total,720);assert.equal(mission.aggregated,false);
const next=summarize(readings,{...filter,page:1});assert.equal(next.rows[0].id,readings[10].id);
const empty=summarize(readings,{...filter,missions:[]});assert.equal(empty.total,0);assert.equal(empty.markers.length,0);assert.equal(empty.min,0);
const search=summarize(readings,{...filter,query:'IP-00001'});assert.equal(search.matched,1);assert.equal(search.total,2160);
const regional={...filter,region:{type:'Coordinates',a:{lat:0,lon:0},b:{lat:0,lon:0},radius:100}};const region=summarize(readings,regional);assert.equal(region.total,readings.filter(r=>matches(r,regional)).length);assert.ok(region.total>0&&region.total<2160);
const pole=summarize([{...readings[0],lat:90,lon:180},{...readings[0],lat:90,lon:-180}],filter);assert.equal(pole.total,2);
function* million(){for(let i=0;i<1000000;i++)yield readings[i%readings.length];}
const start=performance.now();const large=summarize(million(),{...filter,cellSize:5});assert.equal(large.total,1000000);assert.ok(large.markers.length<=2592);assert.equal(large.rows.length,10);assert.equal(large.markers.reduce((n,m)=>n+m.count!,0),1000000);assert.ok(JSON.stringify(large).length<1000000);
console.log(`Passed archive tests, including 1,000,000 synthetic readings in ${Math.round(performance.now()-start)} ms; ${large.markers.length} markers, 10 rows, ${JSON.stringify(large).length} response characters.`);
