import * as THREE from './vendor/three.module.js';

export async function startSpace({journey,onFailure}) {
  const canvas=document.querySelector('#universe');
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
  renderer.setClearColor(0x050610);renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<701?1.25:1.65));renderer.setSize(innerWidth,innerHeight);
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;
  const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x050610,.004);
  const camera=new THREE.PerspectiveCamera(48,innerWidth/innerHeight,.1,500);
  const target=new THREE.Vector3(),wanted=new THREE.Vector3(),look=new THREE.Vector3();
  const ambient=new THREE.AmbientLight(0xaaa0ff,2);scene.add(ambient);
  const light=new THREE.DirectionalLight(0xa6c4ff,5);light.position.set(0,8,12);scene.add(light);
  const rim=new THREE.DirectionalLight(0xee9dfb,3);rim.position.set(20,-3,-40);scene.add(rim);
  let seed=1618;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
  const V=(x,y,z)=>new THREE.Vector3(x,y,z);
  function glowTexture(){const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d'),g=ctx.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.09,'rgba(230,230,255,.95)');g.addColorStop(.24,'rgba(185,185,255,.35)');g.addColorStop(.52,'rgba(120,120,255,.08)');g.addColorStop(1,'rgba(100,100,255,0)');ctx.fillStyle=g;ctx.fillRect(0,0,128,128);return new THREE.CanvasTexture(c);}
  const glowMap=glowTexture();
  const positions=[],colors=[];const palette=[new THREE.Color('#b4baff'),new THREE.Color('#ffffff'),new THREE.Color('#efc7a2')];
  for(let i=0;i<(innerWidth<701?1800:3600);i++){positions.push((random()-.5)*230,(random()-.5)*150,(random()-.5)*250-45);const c=palette[Math.floor(random()*3)].clone().multiplyScalar(.35+random()*.65);colors.push(c.r,c.g,c.b);}
  const starGeo=new THREE.BufferGeometry();starGeo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));starGeo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
  const starField=new THREE.Points(starGeo,new THREE.PointsMaterial({size:.17,map:glowMap,vertexColors:true,transparent:true,opacity:.9,depthWrite:false,blending:THREE.AdditiveBlending}));scene.add(starField);
  // A volumetric-looking backdrop lives behind the navigable scene, rather than on the page.
  const nebulaMat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{uTime:{value:0}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:`varying vec2 vUv;uniform float uTime;
    float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);}
    float fbm(vec2 p){float n=0.,a=.5;for(int i=0;i<5;i++){n+=a*noise(p);p=p*2.07+vec2(4.3,8.1);a*=.5;}return n;}
    void main(){vec2 uv=vUv;vec2 p=uv*6.;float q=fbm(p+uTime*.004);float n=fbm(p+q*3.);float band=exp(-pow((uv.y-.52+sin(uv.x*5.)*.13)*3.2,2.));vec3 col=mix(vec3(.07,.09,.28),vec3(.34,.10,.48),n);float cloud=smoothstep(.25,.78,n)*band;gl_FragColor=vec4(col*cloud,.65*band);}`});
  const nebula=new THREE.Mesh(new THREE.PlaneGeometry(360,200),nebulaMat);nebula.position.set(5,0,-145);scene.add(nebula);
  const gemini=new THREE.Group();gemini.position.set(6,0,0);gemini.rotation.set(.09,-.18,-.12);scene.add(gemini);
  const points=[[-2.6,4.5,0],[-2.4,2.4,.2],[-3.2,-.3,.7],[-4.3,-3.6,0],[-1.8,-3.9,.9],[-4.5,1.7,-.2],[-5.7,2.4,-1],[2.1,4,-.7],[2,2.2,-.3],[.6,.8,1],[.3,-1.4,.5],[1.8,-4.1,-.4],[-.8,-3.5,-.5],[3.8,1.1,-.7],[4.8,1.7,-1.5]];
  const connections=[[0,1],[1,2],[2,3],[2,4],[1,5],[5,6],[1,9],[7,8],[8,9],[9,10],[10,11],[10,12],[8,13],[13,14]];
  const lineMaterial=new THREE.MeshBasicMaterial({color:0x9f91ff,transparent:true,opacity:.52});
  for(const [a,b]of connections){const curve=new THREE.LineCurve3(V(...points[a]),V(...points[b]));gemini.add(new THREE.Mesh(new THREE.TubeGeometry(curve,1,.014,5,false),lineMaterial));}
  const suns=[];
  const sunVertex='varying vec3 vNormal;varying vec3 vPos;void main(){vNormal=normal;vPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}';
  const sunFrag=`uniform vec3 uColor;uniform float uTime;varying vec3 vNormal;varying vec3 vPos;void main(){float f=sin(vPos.x*21.+uTime*.7)*sin(vPos.y*27.-uTime*.4)*sin(vPos.z*18.+uTime*.5);float rim=pow(1.-abs(vNormal.z),2.);vec3 col=mix(uColor,vec3(1.),.4+f*.15);gl_FragColor=vec4(col*(1.35+rim),1.);}`;
  points.forEach((p,i)=>{const major=i===0||i===7;const color=i===7?0xffb973:major?0x9fceff:0xc2b4ff;const radius=major?.46:.055;
    const mat=major?new THREE.ShaderMaterial({uniforms:{uColor:{value:new THREE.Color(color)},uTime:{value:0}},vertexShader:sunVertex,fragmentShader:sunFrag}):new THREE.MeshBasicMaterial({color});
    const core=new THREE.Mesh(new THREE.SphereGeometry(radius,major?32:8,major?24:6),mat);core.position.set(...p);gemini.add(core);
    const halo=new THREE.Sprite(new THREE.SpriteMaterial({map:glowMap,color,transparent:true,opacity:major?.85:.7,depthWrite:false,blending:THREE.AdditiveBlending}));halo.position.copy(core.position);halo.scale.setScalar(major?5.5:.65);gemini.add(halo);if(major)suns.push({core,halo});
  });
  function orbit(parent,radius,color,rotation,opacity=.22){const verts=[];for(let i=0;i<=160;i++){const t=i/160*Math.PI*2;verts.push(V(Math.cos(t)*radius,Math.sin(t)*radius,0));}const g=new THREE.BufferGeometry().setFromPoints(verts);const line=new THREE.Line(g,new THREE.LineBasicMaterial({color,transparent:true,opacity}));line.rotation.set(...rotation);parent.add(line);return line;}
  orbit(gemini,6.1,0xa9a1fc,[1.12,.3,.1],.25);orbit(gemini,6.8,0x889fea,[.45,-.6,.1],.10);orbit(gemini,5.8,0xc79eeb,[0,0,0],.12);
  const particlePositions=[];for(let i=0;i<1100;i++){const a=random()*Math.PI*2,r=5.8+(random()-.5)*1.35;particlePositions.push(Math.cos(a)*r,(random()-.5)*.55,Math.sin(a)*r);}
  const dustGeo=new THREE.BufferGeometry();dustGeo.setAttribute('position',new THREE.Float32BufferAttribute(particlePositions,3));const dust=new THREE.Points(dustGeo,new THREE.PointsMaterial({map:glowMap,color:0xa999ff,size:.095,transparent:true,opacity:.55,depthWrite:false,blending:THREE.AdditiveBlending}));dust.rotation.x=.18;gemini.add(dust);
  function textSprite(text,color='#c7b9f4',width=3.2){const c=document.createElement('canvas');c.width=768;c.height=96;const ctx=c.getContext('2d');ctx.font='500 38px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=color;ctx.fillText(text,384,48);const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true,depthWrite:false,opacity:.9}));sprite.scale.set(width,width/8,1);return sprite;}
  const skillOrbit=new THREE.Group();skillOrbit.position.set(6,-.5,0);scene.add(skillOrbit);const skillLabels=[];
  ['React','Next.js','C#','ASP.NET','Node.js','SQL','n8n','Git'].forEach((s,i)=>{const label=textSprite(s,'#c5c0ff',2.1);const a=i/8*Math.PI*2;label.position.set(Math.cos(a)*5,Math.sin(a)*3,Math.sin(a+.5)*2);skillOrbit.add(label);skillLabels.push(label);});
  const loader=new THREE.TextureLoader();const screenPositions={devdes:[10,-5,-13],loopix:[-5,1,-35],sense:[13,5,-59]};const screens={};
  for(const [i,id]of ['devdes','loopix','sense'].entries()){
    const group=new THREE.Group();group.position.set(...screenPositions[id]);group.rotation.set(.025,i===1?.15:-.14,i===1?-.025:.025);scene.add(group);
    const back=new THREE.Mesh(new THREE.BoxGeometry(8.1,5.95,.2),new THREE.MeshStandardMaterial({color:0x191329,metalness:.7,roughness:.3}));group.add(back);
    const edge=new THREE.LineSegments(new THREE.EdgesGeometry(back.geometry),new THREE.LineBasicMaterial({color:i===1?0x83cabb:0xa28dec,transparent:true,opacity:.75}));group.add(edge);
    const imageMat=new THREE.MeshBasicMaterial({color:0xffffff});const image=new THREE.Mesh(new THREE.PlaneGeometry(7.7,5.347),imageMat);image.position.set(0,-.1,.115);group.add(image);
    loader.load(`/assets/${id}.webp`,texture=>{texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());imageMat.map=texture;imageMat.needsUpdate=true;wake();},undefined,()=>{imageMat.color.set(0x302041);});
    const title=textSprite(`${String(i+1).padStart(2,'0')}   /   ${['DEVDES','LOOPIX STUDIO','SENSE & SCENE'][i]}`,'#c1b5e6',4.5);title.position.set(0,2.79,.13);group.add(title);
    for(let j=0;j<3;j++){const dot=new THREE.Mesh(new THREE.SphereGeometry(.035,8,6),new THREE.MeshBasicMaterial({color:[0xe3a8b4,0xd3bd8d,0x98c9b7][j]}));dot.position.set(-3.65+j*.16,2.76,.13);group.add(dot);}
    const aura=new THREE.Sprite(new THREE.SpriteMaterial({map:glowMap,color:i===1?0x477d93:0x8053b8,transparent:true,opacity:.2,depthWrite:false,blending:THREE.AdditiveBlending}));aura.position.z=-.5;aura.scale.set(16,13,1);group.add(aura);
    const ring=orbit(group,5.7,i===1?0x8eb5c6:0xa58bd8,[.6,.3,.2],.14);ring.position.z=-1.4;
    screens[id]={group,edge,ring,position:group.position.clone()};
    const button=document.createElement('button');button.className='screen-action';button.dataset.project=id;button.textContent='Ouvrir';button.textContent='Khám phá dự án  ✦';button.setAttribute('aria-label',`Mở dự án ${id==='sense'?'Sense & Scene':id==='loopix'?'Loopix':'DevDes'}`);document.querySelector('#world-labels').append(button);screens[id].button=button;
  }
  // Keep the route physically tied to the constellation: the first two stops are
  // Castor and Pollux, followed by each project world and the return to origin.
  const trailPoints=[
    V(6,0,0),gemini.localToWorld(V(...points[0])).clone(),gemini.localToWorld(V(...points[7])).clone(),
    V(...screenPositions.devdes),V(...screenPositions.loopix),V(...screenPositions.sense),V(16,0,-6),V(6,0,0)
  ];
  const trailCurve=new THREE.CatmullRomCurve3(trailPoints);
  const trail=new THREE.Line(new THREE.BufferGeometry().setFromPoints(trailCurve.getPoints(320)),new THREE.LineDashedMaterial({color:0xb9a7ff,dashSize:.2,gapSize:.22,transparent:true,opacity:.48}));
  trail.computeLineDistances();scene.add(trail);
  const routeMarker=new THREE.Mesh(new THREE.SphereGeometry(.12,16,12),new THREE.MeshBasicMaterial({color:0xffffff}));
  const routeGlow=new THREE.Sprite(new THREE.SpriteMaterial({map:glowMap,color:0xb8a5ff,transparent:true,opacity:.9,depthWrite:false,blending:THREE.AdditiveBlending}));
  routeGlow.scale.set(2.2,2.2,1);routeMarker.add(routeGlow);scene.add(routeMarker);
  const labels=[...document.querySelectorAll('[data-world]')];const temp=new THREE.Vector3();
  const castor=trailPoints[1],pollux=trailPoints[2];
  const desktop=[{p:[0,3,24],t:[0,0,0]},{p:[castor.x,castor.y,20],t:castor.toArray()},{p:[pollux.x,pollux.y,21],t:pollux.toArray()},...['devdes','loopix','sense'].map((id,i)=>{const [x,y,z]=screenPositions[id],side=i===1?3.7:-3.7;return{p:[x+side,y+.8,z+12.5],t:[x,y,z]};}),{p:[23,13,30],t:[16,0,-6]},{p:[6,-4,26],t:[6,0,0]}];
  const mobile=[{p:[6,-6,32],t:[6,-6,0]},{p:[castor.x,castor.y-7,25],t:[castor.x,castor.y-7,0]},{p:[pollux.x,pollux.y-7,26],t:[pollux.x,pollux.y-7,0]},...['devdes','loopix','sense'].map(id=>{const[x,y,z]=screenPositions[id];return{p:[x,y-6.1,z+26],t:[x,y-6.1,z]};}),{p:[9,-4,36],t:[9,-4,-5]},{p:[6,-8,35],t:[6,-8,0]}];
  let pointerX=0,pointerY=0,frame=0,last=0,clock=0,initialized=false,disposed=false,hovered=null;
  function wake(){if(!frame&&!document.hidden&&!disposed)frame=requestAnimationFrame(render);}
  function project(point){temp.copy(point).project(camera);return{x:(temp.x*.5+.5)*innerWidth,y:(-.5*temp.y+.5)*innerHeight,visible:temp.z<1&&temp.z>-1};}
  function render(time){frame=0;const dt=Math.min((time-last)/1000||.016,.05);last=time;const state=journey(),poses=state.mobile?mobile:desktop;const a=poses[state.index],b=poses[Math.min(7,state.index+1)],blend=state.reduced?0:state.blend;
    wanted.fromArray(a.p).lerp(V(...b.p),blend);look.fromArray(a.t).lerp(V(...b.t),blend);
    if(!state.reduced){clock+=dt;wanted.x+=pointerX*.65;wanted.y+=pointerY*.38;}
    const damp=initialized&&!state.reduced?1-Math.exp(-dt*5.5):1;camera.position.lerp(wanted,damp);target.lerp(look,damp);camera.lookAt(target);initialized=true;
    gemini.rotation.y=-.18+(state.reduced?0:Math.sin(clock*.12)*.12);dust.rotation.y=clock*.022;starField.rotation.z=Math.sin(clock*.018)*.012;nebulaMat.uniforms.uTime.value=clock;
    suns.forEach((s,i)=>{s.core.material.uniforms.uTime.value=clock;s.halo.material.opacity=.77+Math.sin(clock*.65+i)*.08;});
    skillOrbit.visible=state.index===2||(state.index===1&&blend>.5);skillOrbit.rotation.y=state.reduced?0:Math.sin(clock*.12)*.16;
    routeMarker.position.copy(trailCurve.getPoint(Math.min(.999,(state.index+blend)/(poses.length-1))));
    Object.entries(screens).forEach(([id,s],i)=>{s.group.position.y=s.position.y+(state.reduced?0:Math.sin(clock*.55+i)*.08);s.edge.material.opacity=hovered===id?1:.75;s.ring.rotation.z=clock*.025;});
    scene.updateMatrixWorld();camera.updateMatrixWorld();
    labels.forEach(el=>{const id=el.dataset.world;let point;if(id==='castor'||id==='pollux'){point=gemini.localToWorld(V(...points[id==='castor'?0:7]));point.y+=.8;}else{const idx={devdes:2,loopix:3,sense:11}[id];point=gemini.localToWorld(V(...points[idx]));point.y-=.45;}
      const p=project(point),visible=state.index===0&&state.blend<.5&&p.visible&&p.x>20&&p.x<innerWidth-20&&p.y>75&&p.y<innerHeight*.91;el.style.left=`${p.x}px`;el.style.top=`${p.y}px`;el.style.opacity=visible?String(1-state.blend*2):'0';el.style.visibility=visible?'visible':'hidden';
    });
    Object.entries(screens).forEach(([id,s],i)=>{const p=project(s.group.localToWorld(V(0,-3.65,.2)));const visible=state.index===i+3&&state.blend<.55&&p.visible;s.button.style.left=`${p.x}px`;s.button.style.top=`${p.y}px`;s.button.style.opacity=visible?'1':'0';s.button.style.visibility=visible?'visible':'hidden';});
    renderer.render(scene,camera);canvas.dataset.chapter=String(state.index);canvas.dataset.camera=camera.position.toArray().map(v=>v.toFixed(2)).join(',');
    if(!state.reduced&&!document.hidden)wake();
  }
  window.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;pointerX=(e.clientX/innerWidth-.5)*2;pointerY=-(e.clientY/innerHeight-.5)*2;},{passive:true});
  window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<701?1.25:1.65));renderer.setSize(innerWidth,innerHeight);initialized=false;wake();},{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else{last=performance.now();wake();}});
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();disposed=true;cancelAnimationFrame(frame);onFailure(new Error('WebGL context lost'));});
  canvas.addEventListener('webglcontextrestored',()=>location.reload());
  document.querySelectorAll('.screen-action').forEach(b=>{b.addEventListener('pointerenter',()=>{hovered=b.dataset.project;wake();});b.addEventListener('pointerleave',()=>{hovered=null;wake();});});
  wake();return{wake};
}
