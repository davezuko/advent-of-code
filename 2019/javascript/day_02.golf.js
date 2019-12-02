const [fs,path,assert]=["fs","path","assert"].map(require)
const [head,,,...tail]=fs.readFileSync("2019/inputs/day_02.txt","utf8").split(",").map(s=>parseInt(s))

const input=(noun,verb)=>[head,noun,verb,...tail]
const star_01=_=>run(input(12,2))
const star_02=(i=j=0,TARGET=19690720)=>{
  while(i++<=99){j=0;while(j++<=99){if(run(input(i,j))==TARGET)return i*100+j}}
}
const run=(p,i=0,ops=" +*",o,a,b,d)=>{
  while([o,a,b,d]=p.slice(i+=4),o!=99){p[d]=eval(p[a]+ops[o]+p[b])};return p[0]
}
assert.equal(star_01(),3166704)
assert.equal(star_02(),8018)
