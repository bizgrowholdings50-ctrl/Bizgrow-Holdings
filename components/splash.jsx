<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Ethan Vale — I See Through the Wild</title>
<meta name="description" content="Wildlife photography archive by Ethan Vale. Field notes from natural encounters, captured without intervention.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root{
  --bg:#000;
  --ink:#f4f2ef;
  --dim:#8c8783;
  --line:rgba(244,242,239,.28);
  --pad:clamp(14px, 2.6vw, 34px);
  --ease:cubic-bezier(.22,.61,.36,1);
  --hw:min(56vw, 640px);
  --persp:1150px;
  --safe-top:env(safe-area-inset-top,0px);
  --safe-right:env(safe-area-inset-right,0px);
  --safe-bottom:env(safe-area-inset-bottom,0px);
  --safe-left:env(safe-area-inset-left,0px);
  --tap:44px;
  --serif:"Playfair Display","Times New Roman",serif;
  --sans:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;
}
*{box-sizing:border-box;}
html{background:#000;scrollbar-gutter:stable;}
body{
  margin:0;
  background:var(--bg);
  color:var(--ink);
  font-family:var(--sans);
  font-weight:300;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  overflow-x:hidden;
  min-height:100vh;
  min-height:100dvh;
  overscroll-behavior-y:none;
}
body.locked{overflow:hidden;height:100vh;height:100dvh;}
img{display:block;max-width:100%;}
button{font-family:inherit;color:inherit;background:none;border:none;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation;}
a{-webkit-tap-highlight-color:transparent;}

em{font-style:normal;}

/* scroll track */
#scrolltrack{height:116vh;pointer-events:none;}

/* stage */
#stage{
  position:fixed;inset:0;z-index:10;
  perspective:var(--persp);
  perspective-origin:50% 50%;
  overflow:hidden;
  touch-action:none;
}
@media (hover:none) and (pointer:coarse){
  #stage{touch-action:pan-y;}
}
#world{
  position:absolute; top:50%; left:50%;
  width:0; height:0;
  transform-style:preserve-3d;
  will-change:transform;
}
#orb{
  position:absolute; top:0; left:0;
  width:0; height:0;
  transform-style:preserve-3d;
  opacity:1;
  transform:none;
}
#headline{
  position:absolute; top:0; left:0;
  width:var(--hw);
  margin-left:calc(var(--hw) / -2);
  text-align:center;
  font-family:var(--serif);
  font-weight:400;
  font-size:clamp(25px, 3.7vw, 55px);
  line-height:1.06;
  letter-spacing:-.005em;
  color:#fff;
  text-shadow:0 2px 34px rgba(0,0,0,.55);
  pointer-events:none;
  user-select:none;
  -webkit-user-select:none;
}
#headline .inner{
  position:absolute; top:0; left:0;
  width:100%;
  transform:translateY(-50%);
}
#headline .inner span{
  display:inline-block;
  opacity:0;
  transform:translateY(.42em);
  filter:blur(7px);
  transition:opacity 1.05s var(--ease), transform 1.15s var(--ease), filter 1.05s var(--ease);
  transition-delay:calc(.9s + var(--i) * .085s);
}
body.revealed #headline .inner span{
  opacity:1;
  transform:none;
  filter:blur(0);
}

/* cards */
.card{
  position:absolute; top:0; left:0;
  width:var(--cw);
  margin-left:calc(var(--cw) / -2);
}
.card:not(.tall){
  height:calc(var(--cw) / 1.5);
  margin-top:calc(var(--cw) / -3);
}
.card.tall{
  height:calc(var(--cw) * 1.25);
  margin-top:calc(var(--cw) * -0.625);
}
.card figure{
  position:relative;
  margin:0;
  width:100%;height:100%;
  overflow:hidden;
  border-radius:3px;
  background:#0a0a0a;
  transition:transform .5s ease;
}
.card:hover figure{transform:scale(1.045);}
.card img{
  width:100%;height:100%;object-fit:cover;
  opacity:0;
}
.card img.in{opacity:1;}
body.revealed .card img{transition:opacity .8s ease-out;}
.card figure::after{
  content:"";
  position:absolute;inset:0;
  background:rgba(0,0,0,var(--d,0));
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.07);
  border-radius:3px;
  pointer-events:none;
}

/* vignette */
.vig{
  position:fixed;inset:0;z-index:12;pointer-events:none;
  background:radial-gradient(ellipse 88% 92% at 50% 50%, transparent 48%, rgba(0,0,0,.26) 80%, rgba(0,0,0,.72) 100%);
  transition:opacity .6s ease;
}
body.gridview .vig, body.lit .vig{opacity:0;}

/* grid */
#grid{
  position:fixed;inset:0;z-index:20;
  overflow-y:auto;
  opacity:0;
  pointer-events:none;
  transition:opacity .6s ease;
  padding:calc(var(--pad)*3.4) var(--pad) calc(var(--pad)*4);
  padding-top:calc(var(--pad)*3.4 + var(--safe-top));
  padding-right:calc(var(--pad) + var(--safe-right));
  padding-left:calc(var(--pad) + var(--safe-left));
  padding-bottom:calc(var(--pad)*4 + var(--safe-bottom));
  background:#000;
}
body.gridview #grid{opacity:1;pointer-events:auto;}
#stage{transition:opacity .6s ease, filter .6s ease;}
body.gridview #stage{opacity:0;filter:blur(14px);pointer-events:none;}
.rows{
  display:grid;
  grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));
  gap:clamp(10px, 1.4vw, 20px);
  max-width:1680px;
  margin:0 auto;
}
.rows figure{
  position:relative;margin:0;
  aspect-ratio:3/2;
  border-radius:3px;
  background:#0b0b0b;
  cursor:pointer;
  overflow:hidden;
}
.rows img{width:100%;height:100%;object-fit:cover;opacity:.82;transition:transform .8s ease, opacity .8s ease;}
.rows figure:hover img{transform:scale(1.05);opacity:1;}
.rows figcaption{
  position:absolute;left:0;right:0;bottom:0;
  font-family:var(--serif);font-size:15px;
  background:linear-gradient(to top, rgba(0,0,0,.82), transparent);
  padding:26px 14px 12px;
  opacity:0;transform:translateY(6px);
  transition:opacity .35s ease, transform .35s ease;
}
.rows figure:hover figcaption{opacity:1;transform:translateY(0);}

/* chrome fade-in */
header.chrome,.bio.chrome,.colophon.chrome,.gridbtn,.cue.chrome{
  opacity:0;
  transition:opacity 1.2s ease .15s;
}
body.revealed header.chrome,body.revealed .bio.chrome,body.revealed .colophon.chrome,body.revealed .cue.chrome{opacity:1;}
body.revealed .gridbtn{opacity:1;}

/* header */
header.chrome{
  position:fixed;top:0;left:0;right:0;z-index:60;
  display:flex;justify-content:space-between;align-items:flex-start;
  padding-top:calc(var(--pad) * .8 + var(--safe-top));
  padding-right:calc(var(--pad) + var(--safe-right));
  padding-bottom:calc(var(--pad) * .35);
  padding-left:calc(var(--pad) + var(--safe-left));
  mix-blend-mode:difference;
}
body.menuopen header.chrome{z-index:90;mix-blend-mode:normal;}
body.menuopen header.chrome .wordmark,
body.menuopen header.chrome .bars i{color:#f4f2ef;background:#f4f2ef;}

a.wordmark{
  font-family:var(--serif);
  font-size:clamp(19px, 2.1vw, 27px);
  letter-spacing:.005em;
  line-height:1;
  color:#fff;
  text-decoration:none;
  white-space:nowrap;
}
.menu-btn{
  display:flex;flex-direction:column;align-items:flex-end;gap:5px;
  min-width:44px;min-height:44px;
  padding:8px 0 4px;
}
.menu-label{
  font-size:clamp(12px, 1.25vw, 15px);
  letter-spacing:.01em;
  color:#fff;
  transition:opacity .35s ease;
}
body.menuopen .menu-label{opacity:0;}
.bars{
  position:relative;
  width:clamp(42px, 4.4vw, 62px);
  height:clamp(16px, 2vw, 22px);
}
.bars i{
  position:absolute;left:0;right:0;top:50%;height:1px;
  background:#fff;
  transition:transform .4s var(--ease), width .4s var(--ease);
}
.bars i.b1{transform:translateY(-5px);}
.bars i.b2{width:clamp(34px, 3.6vw, 50px);transform:translateY(5px);margin-left:auto;}
.menu-btn:hover .bars i.b2{transform:translateY(5px) translateX(-8px);}
body.menuopen .bars i{width:100%;}
body.menuopen .bars i.b1{transform:translateY(0) rotate(45deg);}
body.menuopen .bars i.b2{transform:translateY(0) rotate(-45deg);margin-left:0;}

/* bio card */
.bio.chrome{
  position:fixed;
  left:calc(var(--pad) + var(--safe-left));
  bottom:calc(var(--pad) + var(--safe-bottom));
  z-index:55;
  max-width:min(320px, 46vw);
  transition:opacity 1.2s ease .15s, transform .4s ease;
}
body.deep .bio.chrome, body.gridview .bio.chrome, body.lit .bio.chrome{
  opacity:0 !important; transform:translateY(10px); pointer-events:none;
}
.bio .who{display:flex;align-items:center;gap:14px;margin-bottom:14px;}
.bio img#avatar{width:52px;height:52px;border-radius:3px;object-fit:cover;filter:grayscale(.15);}
.bio b{font-family:var(--serif);font-weight:400;font-size:19px;letter-spacing:.01em;}
.bio p{font-size:12.5px;line-height:1.62;color:rgba(244,242,239,.72);margin:0;}

/* colophon */
.colophon.chrome{
  position:fixed;
  right:calc(var(--pad) + var(--safe-right));
  bottom:calc(var(--pad) + var(--safe-bottom));
  z-index:55;
  font-size:12.5px;
  color:rgba(244,242,239,.72);
}
body.gridview .colophon.chrome, body.lit .colophon.chrome{opacity:0 !important;}

/* grid button */
.gridbtn{
  position:fixed;
  left:calc(var(--pad) + var(--safe-left));
  bottom:calc(var(--pad) + var(--safe-bottom));
  z-index:56;
  width:44px;height:44px;padding:5px;
  display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:4px;
  opacity:0;transform:translateY(8px);pointer-events:none;
  transition:opacity 1.2s ease .15s, transform .4s ease;
}
body.deep .gridbtn, body.gridview .gridbtn{opacity:1;pointer-events:auto;transform:translateY(0);}
.gridbtn b{
  background:#f4f2ef;border-radius:2px;transition:transform .35s ease, background .2s ease, scale .2s ease;
}
.gridbtn:hover b{background:#fff;scale:.86;}
body.gridview .gridbtn b:nth-child(1){transform:translate(3px,3px);}
body.gridview .gridbtn b:nth-child(4){transform:translate(-3px,-3px);}

/* scroll cue */
.cue.chrome{
  position:fixed;left:50%;bottom:calc(var(--pad) + var(--safe-bottom) + 4px);
  transform:translateX(-50%);
  z-index:54;
  display:flex;align-items:center;gap:10px;
  font-size:10px;text-transform:uppercase;letter-spacing:.24em;
  color:rgba(244,242,239,.42);white-space:nowrap;
}
body.deep .cue.chrome, body.gridview .cue.chrome, body.lit .cue.chrome{opacity:0 !important;}
.cue s{
  display:block;width:44px;height:1px;background:rgba(244,242,239,.28);
  position:relative;overflow:hidden;text-decoration:none;
}
.cue s::after{
  content:"";position:absolute;top:0;left:0;width:100%;height:100%;
  background:#f4f2ef;
  transform:translateX(-100%);
  animation:sweep 2.6s ease infinite;
}
@keyframes sweep{
  0%{transform:translateX(-100%);}
  55%{transform:translateX(0);}
  100%{transform:translateX(100%);}
}

/* splash */
#splash{
  position:fixed;inset:0;z-index:250;background:#000;
  display:grid;place-items:center;align-content:center;gap:26px;
  transition:opacity .6s ease;
}
#splash.out{opacity:0;pointer-events:none;}
.mark{
  font-family:var(--serif);font-size:clamp(28px, 4.4vw, 52px);letter-spacing:.005em;color:#f4f2ef;
  opacity:0;animation:riseIn 1.25s ease .15s forwards;
}
.bar{width:clamp(120px, 17vw, 210px);height:1px;background:rgba(244,242,239,.16);}
.bar s{display:block;width:100%;height:100%;background:#f4f2ef;transform:scaleX(0);transform-origin:left;transition:transform .55s ease;text-decoration:none;}
.tag{
  font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:rgba(244,242,239,.38);
  opacity:0;animation:riseIn .9s ease .7s forwards;
}
@keyframes riseIn{from{opacity:0;transform:translateY(9px);}to{opacity:1;transform:none;}}

/* intro */
#intro{
  position:fixed;inset:0;z-index:200;background:#000;
  display:grid;place-items:center;overflow:hidden;
}
#intro video{width:100%;height:100%;object-fit:cover;}
#intro .veil{position:absolute;inset:0;background:#000;opacity:0;transition:opacity 1.15s ease;}
#intro.closing .veil{opacity:1;}
#intro.gone{opacity:0;pointer-events:none;transition:opacity .5s linear;}
button.skip{
  position:absolute;
  right:calc(var(--pad) + var(--safe-right));
  bottom:calc(var(--pad) + var(--safe-bottom));
  font-size:11px;letter-spacing:.18em;text-transform:uppercase;
  color:rgba(244,242,239,.6);
  min-height:44px;padding:10px 18px;
  border:1px solid rgba(244,242,239,.25);
  border-radius:999px;
  backdrop-filter:blur(6px);
  transition:opacity .3s ease, color .2s ease, border-color .2s ease;
}
button.skip:hover{color:#fff;border-color:rgba(255,255,255,.7);}
#intro.closing button.skip{opacity:0;}
.fallback{
  position:absolute;inset:0;
  background:radial-gradient(circle at 50% 46%, #14301a 0%, #060c07 42%, #000 72%);
  opacity:0;transition:opacity .5s ease;
}
#intro.novideo .fallback{opacity:1;}

/* menu */
#menu{
  position:fixed;inset:0;z-index:80;background:#050505;
  display:grid;place-items:center;
  clip-path:inset(0 0 100% 0);
  transition:clip-path .85s ease;
  pointer-events:none;
}
body.menuopen #menu{clip-path:inset(0);pointer-events:auto;}
#menu nav{display:flex;flex-direction:column;gap:clamp(4px, 1vw, 10px);text-align:center;}
#menu a{
  font-family:var(--serif);font-size:clamp(34px, 7.6vw, 78px);line-height:1.08;
  color:#f4f2ef;text-decoration:none;opacity:.55;
  transition:opacity .3s ease, letter-spacing .3s ease;
}
#menu a:hover{opacity:1;letter-spacing:.012em;}
.addr{
  position:absolute;
  left:calc(var(--pad) + var(--safe-left));
  right:calc(var(--pad) + var(--safe-right));
  bottom:calc(var(--pad) + var(--safe-bottom));
  font-size:12.5px;color:var(--dim);line-height:1.7;
}

/* lightbox */
#lit{
  position:fixed;inset:0;z-index:90;
  display:grid;place-items:center;
  padding:clamp(56px, 8vh, 84px) var(--pad);
  opacity:0;pointer-events:none;
  transition:opacity .4s ease;
}
body.lit #lit{opacity:1;pointer-events:auto;}
.scrim{position:absolute;inset:0;}
.plate{
  position:relative;
  width:min(72vw, 860px, (100vh - 230px) * 1.5);
  transition:transform .62s ease, opacity .42s ease;
}
.shot{
  position:relative;width:100%;aspect-ratio:3/2;border-radius:2px;background:#0b0b0b;
  box-shadow:0 30px 90px rgba(0,0,0,.75);
}
.shot img{width:100%;height:100%;object-fit:cover;border-radius:2px;}
[data-close]{
  position:absolute;top:12px;right:14px;
  font-size:12.5px;min-width:44px;min-height:44px;padding:10px 14px;
  border:1px solid rgba(244,242,239,.78);border-radius:6px;
  background:rgba(0,0,0,.35);color:#f4f2ef;
  transition:border-color .2s ease, background .2s ease;
}
[data-close]:hover{border-color:#fff;background:rgba(0,0,0,.55);}
.meta{
  display:grid;grid-template-columns:minmax(0,.78fr) minmax(0,1.22fr);
  gap:clamp(22px, 3.2vw, 48px);
  padding-top:16px;
}
#litTitle{font-family:var(--serif);font-weight:400;font-size:clamp(22px, 2.15vw, 32px);line-height:1.08;letter-spacing:-.01em;margin:0 0 6px;}
.where#litWhere{font-size:13px;color:rgba(244,242,239,.62);}
.note#litNote{font-size:13.5px;line-height:1.55;color:rgba(244,242,239,.92);margin:8px 0 0;}

/* cursor */
#dot{
  position:fixed;top:0;left:0;
  width:19px;height:19px;margin:-9.5px;
  border-radius:50%;
  background:rgba(214,212,209,.9);
  mix-blend-mode:difference;
  border:1px solid transparent;
  pointer-events:none;z-index:300;
  transition:width .35s ease, height .35s ease, margin .35s ease, background .35s ease, border-color .35s ease;
  will-change:transform;
}
#dot.wide{width:52px;height:52px;margin:-26px;background:rgba(244,242,239,.14);border-color:rgba(244,242,239,.75);}
@media (hover:none), (pointer:coarse){#dot{display:none;}}

/* responsive */
@media (max-width:900px){
  .bio.chrome{max-width:min(420px, calc(100vw - var(--pad)*2 - var(--safe-left) - var(--safe-right)));}
  .bio p{font-size:12px;}
  .colophon.chrome{font-size:11px;}
  .meta{grid-template-columns:1fr;gap:10px;padding-top:14px;}
  .plate{width:min(92vw, (100dvh - 220px) * 1.5);}
  .rows{grid-template-columns:repeat(auto-fill, minmax(150px, 1fr));}
  #grid{padding-top:calc(var(--pad) * 2.8 + var(--safe-top));}
}
@media (max-width:768px){
  .colophon.chrome{display:none;}
  .bio.chrome{max-width:calc(100vw - var(--pad)*2 - var(--safe-left) - var(--safe-right));}
  #headline{font-size:clamp(22px, 6.4vw, 34px);}
  #menu a{font-size:clamp(28px, 9vw, 54px);}
  .addr{font-size:11.5px;}
}
@media (max-width:640px){
  :root{--hw:min(84vw, 360px);--pad:clamp(12px, 4vw, 18px);}
  .bio img#avatar{width:42px;height:42px;}
  .bio b{font-size:17px;}
  .bio p{font-size:11.5px;line-height:1.55;}
  .cue.chrome{display:none;}
  #lit{display:block;overflow-y:auto;padding:calc(52px + var(--safe-top)) calc(var(--pad) + var(--safe-right)) calc(var(--pad) + var(--safe-bottom)) calc(var(--pad) + var(--safe-left));}
  .plate{width:100%;max-width:560px;margin:0 auto;}
  #litTitle{font-size:clamp(20px, 5.6vw, 26px);}
  .note#litNote{font-size:12.5px;line-height:1.58;}
  [data-close]{top:8px;right:8px;}
  .rows{grid-template-columns:1fr 1fr;gap:8px;}
  .rows figcaption{opacity:1;transform:none;font-size:13px;}
  #grid{padding-top:calc(var(--pad)*2.8 + var(--safe-top));padding-bottom:calc(var(--pad)*4 + var(--safe-bottom));padding-left:calc(var(--pad) + var(--safe-left));padding-right:calc(var(--pad) + var(--safe-right));}
}
@media (max-width:380px){
  :root{--hw:min(88vw, 320px);}
  .bio .who{gap:10px;margin-bottom:10px;}
  .bio p{display:none;}
  .rows{grid-template-columns:1fr;}
  #menu nav{gap:2px;}
  #menu a{font-size:clamp(24px, 10vw, 40px);}
}
@media (max-height:520px) and (orientation:landscape){
  .bio.chrome,.colophon.chrome,.cue.chrome{display:none;}
  #headline{font-size:clamp(18px, 4.8vh, 28px);}
  #lit{padding-top:calc(36px + var(--safe-top));}
  .meta{padding-top:10px;}
  .plate{width:min(58vw, (100dvh - 80px) * 1.5);}
  header.chrome{padding-top:calc(8px + var(--safe-top));}
}
@media (prefers-reduced-motion:reduce){
  *{animation-duration:.01ms !important;transition-duration:.14s !important;}
}
</style>
</head>
<body class="locked">

<div id="scrolltrack"></div>

<div id="stage">
  <div id="world">
    <div id="orb"></div>
    <h1 id="headline"><span class="inner"></span></h1>
  </div>
</div>

<div class="vig"></div>

<div id="grid"><div class="rows" id="gridRows"></div></div>

<header class="chrome">
  <a class="wordmark" href="#" aria-label="Ethan Vale">Ethan<em>Vale</em></a>
  <button id="menuBtn" class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Open menu">
    <span class="menu-label">Menu</span>
    <span class="bars"><i class="b1"></i><i class="b2"></i></span>
  </button>
</header>

<div class="bio chrome">
  <div class="who">
    <img id="avatar" alt="Ethan Vale">
    <b>Ethan Vale</b>
  </div>
  <p>Wildlife photography is less about taking pictures and more about learning when not to move. Every frame in this archive was captured in natural conditions without intervention.</p>
</div>

<div class="colophon chrome">Field Notes 2026</div>

<button id="gridBtn" class="gridbtn" aria-label="Toggle grid view">
  <b></b><b></b><b></b><b></b>
</button>

<div class="cue chrome"><s></s><span>Drag to rotate</span></div>

<div id="menu">
  <nav>
    <a href="#" data-grid>The Archive</a>
    <a href="#">Field Notes</a>
    <a href="#">Studio</a>
    <a href="#" data-close-menu>Contact</a>
  </nav>
  <div class="addr">Nairobi · Cape Town · Reykjavík<br>studio@ethanvale.photo</div>
</div>

<div id="lit">
  <div class="scrim" data-close></div>
  <div class="plate">
    <div class="shot">
      <img id="litImg" alt="">
      <button data-close>Close</button>
    </div>
    <div class="meta">
      <div>
        <h2 id="litTitle"></h2>
        <div class="where" id="litWhere"></div>
      </div>
      <p class="note" id="litNote"></p>
    </div>
  </div>
</div>

<div id="intro">
  <video id="film" muted playsinline autoplay preload="auto" disablepictureinpicture
    src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260922_195107_ed3f055a-3a13-4a71-b743-e10310454246.mp4"></video>
  <div class="fallback"></div>
  <div class="veil"></div>
  <button class="skip" id="skip">Skip</button>
</div>

<div id="splash">
  <div class="mark">Ethan<em>Vale</em></div>
  <div class="bar"><s id="bar"></s></div>
  <div class="tag">Field Notes 2026</div>
</div>

<div id="dot"></div>

<script>
(function(){
"use strict";

var CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/";
var AVATAR_ID = "hf_20260922_194417_a455843c-d8db-461c-8ef6-74a325d2472c";

var SHOTS = [
  ["hf_20260922_194349_26ffdbfd-ac5e-49e9-a07d-c06d3f7cb4cb","Before the Dust Settled","South Africa · Limpopo Province","Wildlife photography is rarely about pressing the shutter. Most of the work happens earlier — waiting, staying still, and accepting that nature decides if the frame exists. This encounter lasted less than a minute."],
  ["hf_20260922_194350_5546ea3d-6336-42c7-a59f-06165c5802be","The Long Walk Home","Kenya · Maasai Mara","A matriarch leading her herd across open grass at the end of the day. I stayed low and let them close the distance on their own terms."],
  ["hf_20260922_194349_b4533691-cb49-41d4-b56c-51f0fdcbe250","Something Understood","Botswana · Okavango Delta","He held the look for about four seconds. Long enough to be certain neither of us intended to move first."],
  ["hf_20260922_194349_e588abd3-1bfa-4918-894f-05632cc51ccc","Nine Hours of Nothing","Finland · Lapland","A full day in a hide for a single turn of the head. That ratio is normal and I have stopped resenting it."],
  ["hf_20260922_194350_28d92c80-de66-41cb-911e-b3b44aebe1f5","Borrowed Trust","Scotland · Cairngorms","She had learned the shape of a person and decided it was uninteresting. That indifference is the rarest thing in this work."],
  ["hf_20260922_194349_04e89718-4214-4aff-bac5-490462bbfe2f","Small Weather","Costa Rica · Osa Peninsula","Rain had just stopped. Everything on that branch was the size of a thumbnail and lit like a stage."],
  ["hf_20260922_194417_2c031e22-2fad-4c81-a544-83cd6bba1c33","Against the Weather","Alaska · Chilkat Valley","Shot at a thousandth of a second into a rising storm. The light lasted eleven minutes."],
  ["hf_20260922_194349_a39c3226-7848-4b15-b840-98ad8aec467b","The Pale Edge","India · Bandhavgarh","Almost entirely hidden. I only found the frame because the foliage stopped moving in the wrong place."],
  ["hf_20260922_194417_555e4d90-f35f-4a1a-8c75-def1e8b71988","Perfect Arithmetic","Indonesia · Raja Ampat","Coiled with a precision that looks designed. Nothing about it is — it is just the cheapest way to hold heat."],
  ["hf_20260922_194417_e525a243-03c8-454b-83b4-60f541baf70a","Shallow Water","French Polynesia · Fakarava","Three metres down on a single breath. It passed close enough that I stopped composing and simply held the camera still."],
  ["hf_20260922_194349_ec830e6f-b8e6-4569-8540-ee7f33902c53","Two of Nine","India · Ranthambore","Siblings resting out the afternoon heat. The second one never opened its eyes."],
  ["hf_20260922_194417_35a9af5f-bd07-45a7-bb73-08b47d19d530","Low Ground","Nepal · Chitwan","Flat on the ground at her eye level, which is the only honest angle for an animal that hunts from there."],
  ["hf_20260922_194416_30e307a9-1265-45c3-a1a0-5c6fa5bb9f8d","Everything at Once","Iceland · Southern Coast","Free horses on a black beach at dusk. I panned and accepted whatever the frame gave back."],
  ["hf_20260922_194417_ff5cb9f8-8eed-4bfb-bb08-11256da92eae","White on White","Canada · Ellesmere Island","Snow removes every reference for exposure. The only reliable meter left is the eyes."],
  ["hf_20260922_194418_1d9bff4a-4971-4944-9e49-d72e755ceeb0","Census","Namibia · Etosha","Two of roughly sixteen thousand left. The number is the reason the frame exists."],
  ["hf_20260922_194349_75e53821-0807-4ebc-992d-34bae0ec2ce6","The Whole Field","France · Provence","Four millimetres of animal. At this magnification a breath of wind is an earthquake."],
  ["hf_20260922_194417_5a227847-3796-4438-805d-7e66e9538205","First Season","Germany · Bavarian Forest","Days old and already still enough to disappear. Stillness is the first thing anything here learns."],
  ["hf_20260922_194350_b49aa67e-0401-4029-af4f-f6ac3ee83398","Listening Posture","Tanzania · Serengeti","Ears forward, weight on the back legs. She heard something I never did."],
  ["hf_20260922_194349_89b82779-3a46-4c55-b7c5-f4a0fd955874","A Line of Red","Spain · Fuente de Piedra","Underexposed by two stops until only the shape survived."],
  ["hf_20260922_194416_47e18c62-253a-42e1-97a9-9e5f6a6b8d59","Left Behind","Studio · Reykjavík","Found beneath a roost at first light. The only frame in this archive an animal agreed to in advance.", true],
  ["hf_20260922_194417_a455843c-d8db-461c-8ef6-74a325d2472c","The Other Side","Uganda · Kibale Forest","Taken by a colleague between two long waits. Proof, mostly, that someone is holding the camera."]
];

var N = SHOTS.length;
var GA = Math.PI * (3 - Math.sqrt(5));

var world = document.getElementById("world");
var orb = document.getElementById("orb");
var stage = document.getElementById("stage");
var headline = document.getElementById("headline");
var headlineInner = headline.querySelector(".inner");
var gridRows = document.getElementById("gridRows");
var dot = document.getElementById("dot");

/* build headline words */
var WORDS = ["I","See","Through","the","Wild"];
WORDS.forEach(function(w, i){
  var span = document.createElement("span");
  span.style.setProperty("--i", i);
  span.textContent = w;
  headlineInner.appendChild(span);
  if(i < WORDS.length - 1){
    headlineInner.appendChild(document.createTextNode(" "));
  }
});

/* build cards */
var cards = [];
SHOTS.forEach(function(rec, i){
  var id = rec[0], title = rec[1], place = rec[2], note = rec[3], tall = !!rec[4];

  var y = 1 - (i / (N - 1)) * 2;
  var rad = Math.sqrt(Math.max(0, 1 - y*y));
  var theta = i * GA;
  var x = Math.cos(theta) * rad;
  var z = Math.sin(theta) * rad;

  var card = document.createElement("div");
  card.className = "card" + (tall ? " tall" : "");
  card.dataset.idx = i;

  var figure = document.createElement("figure");
  var img = document.createElement("img");
  img.alt = title;
  img.dataset.thumb = CDN + id + "_min.webp";
  img.dataset.full = CDN + id + ".png";
  figure.appendChild(img);
  card.appendChild(figure);
  orb.appendChild(card);

  cards.push({
    el: card, img: img, id: id, title: title, place: place, note: note, tall: tall,
    vec: {x:x, y:y, z:z}
  });

  /* grid entry */
  var gfig = document.createElement("figure");
  gfig.dataset.idx = i;
  var gimg = document.createElement("img");
  gimg.alt = title;
  gimg.dataset.thumb = CDN + id + "_min.webp";
  gfig.appendChild(gimg);
  var cap = document.createElement("figcaption");
  cap.textContent = title;
  gfig.appendChild(cap);
  gridRows.appendChild(gfig);
  cards[i].gridImg = gimg;
  cards[i].gridFig = gfig;
});

document.getElementById("avatar").dataset.thumb = CDN + AVATAR_ID + "_min.webp";

/* ---------- image decode / downscale pipeline ---------- */
var decodeCache = {};
function cardDecodeMax(){
  var w = window.innerWidth;
  if(w<=380) return 420;
  if(w<=640) return 520;
  if(w<=900) return 640;
  return 760;
}
function downscale(url, maxDim){
  if(decodeCache[url+"|"+maxDim]) return decodeCache[url+"|"+maxDim];
  var p = new Promise(function(resolve){
    var probe = new Image();
    probe.crossOrigin = "anonymous";
    probe.onload = function(){
      try{
        if(probe.naturalWidth <= maxDim){
          resolve(url);
          return;
        }
        var scale = maxDim / probe.naturalWidth;
        var w = Math.round(probe.naturalWidth * scale);
        var h = Math.round(probe.naturalHeight * scale);
        var canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(probe, 0, 0, w, h);
        canvas.toBlob(function(blob){
          if(!blob){ resolve(url); return; }
          resolve(URL.createObjectURL(blob));
        }, "image/webp", 0.88);
      }catch(e){
        resolve(url);
      }
    };
    probe.onerror = function(){ resolve(url); };
    probe.src = url;
  });
  decodeCache[url+"|"+maxDim] = p;
  return p;
}

var loadedCount = 0;
var totalToLoad = N + 1; /* stills + film */
function reportLoaded(){
  loadedCount++;
  var frac = Math.min(1, loadedCount / totalToLoad);
  bar.style.transform = "scaleX(" + frac + ")";
}

var avatarEl = document.getElementById("avatar");
downscale(avatarEl.dataset.thumb, 160).then(function(u){ avatarEl.src = u; });

cards.forEach(function(c){
  downscale(c.img.dataset.thumb, cardDecodeMax()).then(function(u){
    c.img.src = u;
    c.img.classList.add("in");
    c.decodedUrl = u;
    reportLoaded();
  });
  c.gridImg.src = c.img.dataset.thumb;
});

/* ---------- splash ---------- */
var splash = document.getElementById("splash");
var bar = document.getElementById("bar");
var splashBorn = Date.now();

function endSplash(){
  splash.classList.add("out");
  setTimeout(function(){
    if(splash.parentNode) splash.parentNode.removeChild(splash);
  }, 950);
  startFilm();
}

var filmReady = false;
function checkSplashDone(){
  var elapsed = Date.now() - splashBorn;
  if(loadedCount >= totalToLoad - (filmReady?0:1) && elapsed >= 1150){
    /* good enough: wait for stills, film readiness handled separately */
  }
}

setTimeout(function(){ endSplash(); }, 9000); /* backstop */

var splashMinTimer = setTimeout(function(){
  maybeFinishSplash();
}, 1150);

var splashFinished = false;
function maybeFinishSplash(){
  if(splashFinished) return;
  var elapsed = Date.now() - splashBorn;
  if(elapsed < 1150) return;
  if(loadedCount < N) return;
  splashFinished = true;
  bar.style.transform = "scaleX(1)";
  setTimeout(endSplash, 120);
}

/* poll for still-load completion driving splash exit */
var pollSplash = setInterval(function(){
  if(splashFinished){ clearInterval(pollSplash); return; }
  maybeFinishSplash();
}, 120);

/* ---------- intro film ---------- */
var intro = document.getElementById("intro");
var film = document.getElementById("film");
var skipBtn = document.getElementById("skip");
var revealed = false;
var revealTimer = null;
var filmStarted = false;

function startFilm(){
  if(filmStarted) return;
  filmStarted = true;
  try{
    film.muted = true;
    film.defaultMuted = true;
    film.playsInline = true;
    film.setAttribute("webkit-playsinline", "true");
  }catch(e){}

  var p = film.play();
  if(p && p.catch){
    p.catch(function(){ /* autoplay blocked; wait for interaction */ });
  }

  var kick = function(){
    film.play().catch(function(){});
    window.removeEventListener("pointerdown", kick);
    window.removeEventListener("keydown", kick);
    window.removeEventListener("touchstart", kick);
  };
  window.addEventListener("pointerdown", kick);
  window.addEventListener("keydown", kick);
  window.addEventListener("touchstart", kick);

  setTimeout(function(){
    if(film.paused && !revealed) reveal();
  }, 2600);

  setTimeout(function(){
    if(!revealed) reveal();
  }, 14000);
}

film.addEventListener("playing", function(){
  film.playbackRate = 2;
  if(film.currentTime > 0.05) film.currentTime = 0;
  scheduleReveal();
});
function scheduleReveal(){
  if(revealTimer || revealed) return;
  var dur = film.duration;
  if(!dur || !isFinite(dur)){
    revealTimer = setTimeout(function(){ reveal(); }, 4000);
    return;
  }
  var t = (dur - film.currentTime - 0.45) / 2;
  t = Math.max(0.3, t) * 1000;
  revealTimer = setTimeout(function(){ reveal(); }, t);
}
film.addEventListener("ended", function(){ reveal(); });
film.addEventListener("error", function(){
  intro.classList.add("novideo");
  setTimeout(function(){ reveal(); }, splashFinished ? 1300 : 1300);
});

skipBtn.addEventListener("click", function(){ reveal(); });

function reveal(){
  if(revealed) return;
  revealed = true;
  if(revealTimer) clearTimeout(revealTimer);

  intro.classList.add("closing");

  setTimeout(function(){
    document.body.classList.remove("locked");
    document.documentElement.style.overflow = "";

    layout(); requestAnimationFrame(function(){
      layout();
      requestAnimationFrame(function(){});
    });

    setTimeout(function(){
      layout();
      document.body.classList.add("revealed");
      intro.classList.add("gone");
      setTimeout(function(){
        if(intro.parentNode) intro.parentNode.removeChild(intro);
      }, 700);
    }, 1000);
  }, 0);
}

/* film contributes to splash progress too */
film.addEventListener("loadeddata", function(){ filmReady = true; reportLoaded(); });
film.addEventListener("error", function(){ if(!filmReady){ filmReady = true; reportLoaded(); } });
setTimeout(function(){ if(!filmReady){ filmReady = true; reportLoaded(); } }, 4000);

/* ---------- responsive layout ---------- */
var R = 300, CW = 140;
var lastW = window.innerWidth, lastH = window.innerHeight;

function computeParams(){
  var w = window.innerWidth, h = window.innerHeight;
  var hr = w<=380 ? 0.38 : (w<=640 ? 0.42 : 0.46);
  var wr = w<=380 ? 0.48 : (w<=640 ? 0.52 : 0.58);
  var floor = w<=380 ? 108 : (w<=640 ? 120 : 155);
  R = Math.max(floor, Math.min(480, h*hr, w*wr));

  var scale = w<=380 ? 0.44 : (w<=640 ? 0.46 : 0.47);
  CW = Math.round(Math.max(72, R*scale));

  var persp = w<=380 ? 620 : (w<=640 ? 760 : (w<=900 ? 920 : 1150));
  document.documentElement.style.setProperty("--persp", persp + "px");

  var hw;
  if(w<=380) hw = Math.min(0.88*w, 320);
  else if(w<=640) hw = Math.min(0.84*w, 360);
  else hw = Math.min(0.56*w, 640);
  document.documentElement.style.setProperty("--hw", hw + "px");

  document.documentElement.style.setProperty("--cw", CW + "px");
}

function layout(){
  computeParams();
  cards.forEach(function(c){
    var v = c.vec;
    var lat = Math.asin(v.y) * 180/Math.PI;
    var lon = Math.atan2(v.x, v.z) * 180/Math.PI;
    var tx = v.x * R, ty = -v.y * R, tz = v.z * R;
    c.el.style.transform = "translate3d(" + tx.toFixed(2) + "px," + ty.toFixed(2) + "px," + tz.toFixed(2) + "px) rotateY(" + lon.toFixed(2) + "deg) rotateX(" + lat.toFixed(2) + "deg)";
  });
  lastW = window.innerWidth; lastH = window.innerHeight;
}
layout();

var resizeTimer = null;
function onResize(){
  var w = window.innerWidth, h = window.innerHeight;
  if(Math.abs(w-lastW) < 20 && Math.abs(h-lastH) < 20) return;
  layout();
}
window.addEventListener("resize", onResize);
window.addEventListener("orientationchange", function(){
  setTimeout(layout, 220);
});
if(window.visualViewport){
  window.visualViewport.addEventListener("resize", onResize);
  window.visualViewport.addEventListener("scroll", onResize);
}

/* ---------- camera loop ---------- */
var spin = 0, tilt = -4, camZ = 0;
var dragX = 0, dragY = 0, velX = 0, velY = 0;
var pitchLimit = 32;
var focused = -1;
var isDragging = false;
var isLit = false;
var lastOpacity = {}, lastD = {};

function scrollProgress(){
  var p = window.scrollY / (window.innerHeight * 0.16);
  return Math.max(0, Math.min(1, p));
}

function tick(){
  if(!isDragging && !isLit){
    dragX += velX;
    dragY += velY;
    velX *= 0.94; velY *= 0.94;
    if(Math.abs(velX) < 0.002) velX = 0;
    if(Math.abs(velY) < 0.002) velY = 0;
  }
  var maxPitch = pitchLimit;
  if(tilt + dragY > maxPitch) dragY = maxPitch - tilt;
  if(tilt + dragY < -maxPitch) dragY = -maxPitch - tilt;

  var p = scrollProgress();
  var camZTarget = isLit ? camZ : p * Math.min(64, R*0.12);
  camZ += (camZTarget - camZ) * 0.075;

  var sx = tilt + dragY;
  var sy = spin + dragX;

  world.style.transform = "translateZ(" + camZ.toFixed(2) + "px) rotateY(" + sy.toFixed(3) + "deg) rotateX(" + sx.toFixed(3) + "deg)";

  var hOpacity = Math.max(0, 1 - p*0.55);
  headline.style.transform = "rotateX(" + (-sx).toFixed(3) + "deg) rotateY(" + (-sy).toFixed(3) + "deg) translateZ(" + (R*0.62).toFixed(2) + "px)";
  headline.style.opacity = hOpacity;

  var radSY = sy * Math.PI/180, radSX = sx * Math.PI/180;
  var cosY = Math.cos(radSY), sinY = Math.sin(radSY);
  var cosX = Math.cos(radSX), sinX = Math.sin(radSX);
  var shade = 1 - Math.min(1, p*1.6);
  var near = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--persp')) || 1150) * 0.66;

  cards.forEach(function(c, i){
    var v = c.vec;
    /* rotate around Y then X to get world-space depth (matches CSS rotateY then rotateX order roughly) */
    var x1 = v.x*cosY + v.z*sinY;
    var z1 = -v.x*sinY + v.z*cosY;
    var y1 = v.y;
    var y2 = y1*cosX - z1*sinX;
    var z2 = y1*sinX + z1*cosX;
    var zf = z2;

    var base = 0.14 + 0.86 * Math.pow((zf+1)/2, 0.85);
    var dim = shade * (1 - base);
    var absZ = Math.abs(zf*R + camZ);
    var fade = 1;
    if((zf*R + camZ) > near){
      fade = Math.max(0, 1 - (absZ - near) / 190);
    }
    if(isLit){
      dim = Math.min(1, dim + 0.78);
      if(i === focused) fade = 0;
    }
    if(lastD[i] !== dim){
      c.el.style.setProperty("--d", dim.toFixed(3));
      lastD[i] = dim;
    }
    if(lastOpacity[i] !== fade){
      c.el.style.opacity = fade;
      lastOpacity[i] = fade;
    }
  });

  requestAnimationFrame(tick);
}
tick();

/* clamp scroll to 16vh */
window.addEventListener("scroll", function(){
  var max = window.innerHeight * 0.16;
  if(window.scrollY > max){
    window.scrollTo(0, max);
  }
}, {passive:true});

/* ---------- drag ---------- */
var pdX=0, pdY=0, pdSpin=0, pdTilt=0, dragging=false, captured=false, pointerId=null;
var lastMoveX=0, lastMoveY=0, lastMoveT=0;
var clickCandidate = null;
var moveDist = 0;
var gestureDecided = false, gestureIsDrag = false;

stage.addEventListener("pointerdown", function(e){
  if(isLit) return;
  var cardEl = e.target.closest ? e.target.closest(".card") : null;
  clickCandidate = cardEl;
  pdX = e.clientX; pdY = e.clientY;
  lastMoveX = e.clientX; lastMoveY = e.clientY; lastMoveT = performance.now();
  moveDist = 0;
  velX = 0; velY = 0;

  if(e.pointerType === "touch"){
    gestureDecided = false;
    gestureIsDrag = false;
    dragging = false;
  }else{
    dragging = true;
    captured = true;
    pointerId = e.pointerId;
    try{ stage.setPointerCapture(pointerId); }catch(err){}
    pdSpin = dragX; pdTilt = dragY;
  }
});

stage.addEventListener("pointermove", function(e){
  if(isLit) return;
  if(e.pointerType === "touch" && !gestureDecided){
    var dx = e.clientX - pdX, dy = e.clientY - pdY;
    if(Math.abs(dx) + Math.abs(dy) > 10){
      gestureDecided = true;
      if(Math.abs(dy) > Math.abs(dx) * 1.15){
        gestureIsDrag = false;
        return;
      }else{
        gestureIsDrag = true;
        dragging = true;
        captured = true;
        pointerId = e.pointerId;
        try{ stage.setPointerCapture(pointerId); }catch(err){}
        pdSpin = dragX; pdTilt = dragY;
        pdX = e.clientX; pdY = e.clientY;
      }
    }else{
      return;
    }
  }
  if(e.pointerType === "touch" && gestureDecided && !gestureIsDrag) return;
  if(!dragging) return;

  var now = performance.now();
  var mx = e.clientX - pdX, my = e.clientY - pdY;
  moveDist = Math.max(moveDist, Math.abs(mx), Math.abs(my));

  isDragging = true;
  dragX = pdSpin + mx * 0.13;
  dragY = pdTilt - my * 0.13;

  var dt = Math.max(1, now - lastMoveT);
  velX = (e.clientX - lastMoveX) * 0.13 * (16/dt);
  velY = -(e.clientY - lastMoveY) * 0.13 * (16/dt);
  lastMoveX = e.clientX; lastMoveY = e.clientY; lastMoveT = now;
});

function endDrag(e){
  if(dragging){
    isDragging = false;
    if(captured && pointerId != null){
      try{ stage.releasePointerCapture(pointerId); }catch(err){}
    }
  }
  var slop = (e && e.pointerType === "touch") ? 14 : 6;
  if(clickCandidate && moveDist < slop && (!e || e.pointerType !== "touch" || gestureIsDrag === false)){
    var idx = parseInt(clickCandidate.dataset.idx, 10);
    openLightbox(idx, clickCandidate);
  }
  dragging = false; captured = false; pointerId = null; clickCandidate = null;
  gestureDecided = false; gestureIsDrag = false;
}
stage.addEventListener("pointerup", endDrag);
stage.addEventListener("pointercancel", endDrag);

/* ---------- custom cursor ---------- */
var cx=0, cy=0, dx=0, dy=0;
window.addEventListener("pointermove", function(e){
  cx = e.clientX; cy = e.clientY;
  var t = e.target;
  var wide = t.closest && t.closest(".card, a, button, #grid figure");
  dot.classList.toggle("wide", !!wide);
});
function cursorTick(){
  dx += (cx-dx) * 0.2;
  dy += (cy-dy) * 0.2;
  dot.style.transform = "translate3d(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px,0)";
  requestAnimationFrame(cursorTick);
}
cursorTick();

/* ---------- grid toggle ---------- */
var gridBtn = document.getElementById("gridBtn");
function setGrid(on){
  document.body.classList.toggle("gridview", on);
}
gridBtn.addEventListener("click", function(){
  setGrid(!document.body.classList.contains("gridview"));
});
gridRows.addEventListener("click", function(e){
  var fig = e.target.closest("figure");
  if(!fig) return;
  var idx = parseInt(fig.dataset.idx, 10);
  openLightbox(idx, fig);
});

/* ---------- lightbox ---------- */
var lit = document.getElementById("lit");
var litImg = document.getElementById("litImg");
var litTitle = document.getElementById("litTitle");
var litWhere = document.getElementById("litWhere");
var litNote = document.getElementById("litNote");
var plate = document.querySelector(".plate");
var openToken = 0;

function openLightbox(idx, sourceEl){
  var c = cards[idx];
  if(!c) return;
  focused = idx;
  isLit = true;
  openToken++;
  var myToken = openToken;

  litImg.src = c.decodedUrl || c.img.dataset.thumb;
  litTitle.textContent = c.title;
  litWhere.textContent = c.place;
  litNote.textContent = c.note;

  var full = new Image();
  full.onload = function(){
    if(myToken !== openToken) return;
    litImg.src = c.id ? (CDN + c.id + ".png") : litImg.src;
  };
  full.src = CDN + c.id + ".png";

  document.body.classList.add("lit");
  document.body.classList.add("locked");

  requestAnimationFrame(function(){
    var srcRect = sourceEl.getBoundingClientRect();
    var plateRect = plate.getBoundingClientRect();
    var scx = srcRect.left + srcRect.width/2;
    var scy = srcRect.top + srcRect.height/2;
    var pcx = plateRect.left + plateRect.width/2;
    var pcy = plateRect.top + plateRect.height/2;
    var dx0 = scx - pcx, dy0 = scy - pcy;
    var scale = Math.max(0.04, srcRect.width / plateRect.width);

    plate.style.transition = "none";
    plate.style.transform = "translate(" + dx0.toFixed(1) + "px," + dy0.toFixed(1) + "px) scale(" + scale.toFixed(4) + ")";
    plate.style.opacity = "0";
    plate.offsetHeight; /* reflow */
    plate.style.transition = "";
    plate.style.transform = "";
    plate.style.opacity = "";
  });
}

var lastSourceEl = null;
function closeLightbox(){
  if(!isLit) return;
  var idx = focused;
  var c = cards[idx];
  focused = -1;

  var sourceEl = document.body.classList.contains("gridview") && c ? c.gridFig : (c ? c.el : null);

  document.body.classList.remove("lit");
  document.body.classList.remove("locked");
  isLit = false;

  if(sourceEl && plate){
    var srcRect = sourceEl.getBoundingClientRect();
    var plateRect = plate.getBoundingClientRect();
    var scx = srcRect.left + srcRect.width/2;
    var scy = srcRect.top + srcRect.height/2;
    var pcx = plateRect.left + plateRect.width/2;
    var pcy = plateRect.top + plateRect.height/2;
    var dx0 = scx - pcx, dy0 = scy - pcy;
    var scale = Math.max(0.04, srcRect.width / plateRect.width);

    plate.style.transform = "translate(" + dx0.toFixed(1) + "px," + dy0.toFixed(1) + "px) scale(" + scale.toFixed(4) + ")";
    plate.style.opacity = "0";

    setTimeout(function(){
      plate.style.transition = "none";
      plate.style.transform = "";
      plate.style.opacity = "";
      plate.offsetHeight;
      plate.style.transition = "";
    }, 640);
  }
}

document.querySelectorAll("[data-close]").forEach(function(el){
  el.addEventListener("click", closeLightbox);
});

/* ---------- menu ---------- */
var menuBtn = document.getElementById("menuBtn");
var menu = document.getElementById("menu");
function openMenu(){
  document.body.classList.add("menuopen");
  menuBtn.setAttribute("aria-expanded", "true");
  menuBtn.setAttribute("aria-label", "Close menu");
}
function closeMenu(){
  document.body.classList.remove("menuopen");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Open menu");
}
menuBtn.addEventListener("click", function(){
  if(document.body.classList.contains("menuopen")) closeMenu();
  else openMenu();
});
menu.querySelectorAll("a").forEach(function(a){
  a.addEventListener("click", function(e){
    e.preventDefault();
    if(a.hasAttribute("data-grid")){
      setGrid(true);
    }
    closeMenu();
  });
});

/* ---------- escape key ---------- */
window.addEventListener("keydown", function(e){
  if(e.key !== "Escape") return;
  if(isLit){ closeLightbox(); return; }
  if(document.body.classList.contains("menuopen")){ closeMenu(); return; }
  if(document.body.classList.contains("gridview")){ setGrid(false); return; }
});

})();
</script>
</body>
</html>


# Build: "Planet Jumping" — single-page immersive space portal experience

Create a SINGLE self-contained HTML file (inline <style> and <script>, no build step,
no external JS/CSS libraries). It must render a full-viewport cinematic landing
experience with a canvas-driven 3D "portal" and a video preloader sequence.

====================================================================
1. REMOTE ASSETS — use these EXACT URLs (do not substitute)
====================================================================
BASE = https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P

MARS_BG   (video) = BASE/3c83091e-4046-4fd6-adbb-2edb728be79a.mp4
TO_EARTH  (video) = BASE/fc3ded42-e845-41f3-a830-5cab512d79cd.mp4
TO_VENUS  (video) = BASE/b30f64d9-1637-477a-83df-d0fc6461a422.mp4
TO_MARS   (video) = BASE/5fc5651c-3b5d-4171-b507-87f7e635d1b4.mp4
MERCURY   (image) = BASE/d6fb8b6b-c15e-4aaa-9cf7-45bbb5e33372.jpg
LOGO      (svg)   = BASE/eb7e0f53-50cd-4af5-abc4-8b9a52cdc01b.svg

All <video> tags: muted, playsinline, preload="auto". No controls, no autoplay
attribute (playback is driven by JS).

====================================================================
2. FONTS
====================================================================
Declare four @font-face rules (load from local files if present, otherwise the
fallback stacks below must still produce the correct layout):
  - "SF Pro"      weight 400  -> fallback: Arial, sans-serif
  - "SF Pro"      weight 700
  - "SF Pro Thin" weight 100  -> fallback: 'SF Pro', Arial, sans-serif
  - "Aalto"       weight 400  -> fallback: 'Arial Narrow', sans-serif
                                 (a tall condensed display face; used ONLY for the
                                  giant planet title)
:root { font-family:'SF Pro',Arial,sans-serif; color:#fff; background:#090807;
        font-synthesis:none }

====================================================================
3. DOM STRUCTURE (exact ids/classes — the JS depends on them)
====================================================================
<main class="experience" data-planet="mars">
  <div class="backgrounds" aria-hidden="true">
    <video id="mars-background"  class="background is-visible" src=MARS_BG>
    <video id="earth-background" class="background"            src=TO_EARTH>
    <video id="venus-background" class="background"            src=TO_VENUS>
  </div>
  <div class="preloader" id="preloader" aria-label="Loading Mars">
    <video id="preloader-video" src=TO_MARS>
    <div class="preloader-shade"></div>
  </div>
  <img class="floating-logo" id="floating-logo" src=LOGO alt="Ubernatural">
  <div class="preloader-count" id="preloader-count" aria-live="polite">
    <span id="preloader-value">0</span><span class="percent">%</span>
  </div>
  <canvas id="scene-canvas" class="scene-canvas" aria-hidden="true"></canvas>
  <div class="shade" aria-hidden="true"></div>

  <header class="header chrome">
    <div class="header-actions">
      <nav class="nav" aria-label="Primary navigation">
        <a class="active" href="#about">About</a><a href="#explore">Explore</a><a href="#planets">Planets</a>
      </nav>
      <button class="menu" type="button">Menu</button>
    </div>
  </header>

  <aside class="planet-list chrome" aria-label="Planets"></aside>   <!-- JS-filled -->

  <canvas id="portal-canvas" class="portal-canvas" aria-hidden="true"></canvas>
  <section class="portal-wrap chrome" aria-label="Next destination">
    <div class="portal-heading">
      <span>Next:</span>
      <span><span id="next-number">[03]</span> <strong id="next-name">Earth</strong></span>
    </div>
    <button class="portal" id="portal" type="button" aria-label="Travel to Earth">
      <video id="portal-video" src=TO_EARTH>
      <img id="portal-image" src=MERCURY alt="Mercury">
    </button>
  </section>

  <section class="planet-content chrome" aria-live="polite">
    <h1 id="planet-title">MARS</h1>
    <dl id="facts"></dl>                                           <!-- JS-filled -->
  </section>

  <div class="transition-layer" aria-hidden="true"><video id="transition-video"></video></div>
  <div class="loading" aria-hidden="true">Preparing orbit…</div>
  <div class="custom-cursor" aria-hidden="true">
    <span class="cursor-orbit"></span><span class="cursor-dot"></span><span class="cursor-label">Enter</span>
  </div>
</main>

====================================================================
4. DATA MODEL
====================================================================
planets = ['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune']

states = {
 mars:  { name:'Mars',  next:'Earth',   number:'[03]', portal:TO_EARTH,  background:'mars-background',
   facts:[['Distance:','About 228 million km (1.5 astronomical units).'],
          ['Year:','One Martian year is equal to 687 Earth days.'],
          ['Temperature:','Around -60 °C, dropping to -125 °C at the poles in winter.'],
          ['Atmosphere:','Very thin, consisting of 95% carbon dioxide, with frequent dust storms.']] },
 earth: { name:'Earth', next:'Venus',   number:'[02]', portal:TO_VENUS,  background:'earth-background',
   facts:[['Distance:','149.6 million km from the Sun.'],
          ['Year:','365.25 Earth days.'],
          ['Temperature:','Average surface temperature around 15 °C.'],
          ['Atmosphere:','Mostly nitrogen and oxygen, supporting life and liquid water.']] },
 venus: { name:'Venus', next:'Mercury', number:'[06]', image:MERCURY,    background:'venus-background',
   facts:[['Distance:','108.2 million km from the Sun.'],
          ['Year:','225 Earth days.'],
          ['Temperature:','Around 465 °C — the hottest planet in the Solar System.'],
          ['Atmosphere:','Extremely dense, mostly carbon dioxide, with clouds of sulfuric acid.']] }
}
Start state: 'mars'. Chain: mars -> earth -> venus (terminal; clicking at venus does nothing).

render() must: set data-planet; set #planet-title to name.toUpperCase(); set #next-name
and #next-number; set portal aria-label to `Travel to ${next}`; build #facts as
<div class="fact"><dt>KEY</dt><dd>VALUE</dd></div>; build .planet-list as
<span class="planet-item [active]">Name</span> for all 8 planets (active = current);
on every re-render after the first, retrigger .is-switching on .planet-list (remove
class, force reflow via offsetWidth, re-add); toggle .is-visible on the matching
.background video; show #portal-image / hide #portal-video when the state has `image`,
otherwise the inverse, swapping #portal-video.src to state.portal when it differs.

====================================================================
5. LAYOUT CSS (exact values)
====================================================================
*{box-sizing:border-box} html,body{margin:0;width:100%;height:100%;overflow:hidden}
.experience{position:relative;width:100%;height:100%;min-height:540px;overflow:hidden;background:#0a0908}
.backgrounds,.background,.shade,.transition-layer,.transition-layer video{position:absolute;inset:0;width:100%;height:100%}
.background{object-fit:cover;opacity:0;transition:opacity .8s ease} .background.is-visible{opacity:1}
.shade{z-index:1;background:linear-gradient(to bottom,transparent 52%,rgba(0,0,0,.88) 100%);pointer-events:none}
.chrome{position:absolute;z-index:4;transition:opacity .45s ease,filter .45s ease}
.experience.is-transitioning .chrome{opacity:0;filter:blur(8px);pointer-events:none}

HEADER  .header{left/right:clamp(18px,1.95vw,28px);top:clamp(18px,3.1vh,28px);display:flex;justify-content:space-between;align-items:center}
        .header-actions{margin-left:auto;display:flex;align-items:center}
        .nav{display:flex;align-items:center;height:42px;padding:4px 5px;border:1px solid rgba(255,255,255,.45);
             background:rgba(255,255,255,.1);backdrop-filter:blur(12px);border-radius:999px}
        .nav a{color:#fff;text-decoration:none;padding:8px 19px;border-radius:999px;line-height:1}
        .nav a.active{background:#fff;color:#000}
        .menu{height:42px;padding:0 20px;border:0;border-radius:999px;background:#fff;color:#000;cursor:pointer}

SIDEBAR .planet-list{left:clamp(18px,1.95vw,28px);top:50%;transform:translateY(-43%);display:flex;flex-direction:column;gap:6px;font-size:16px}
        .planet-item{display:flex;align-items:center;min-height:20px}
        .planet-item.active{font-size:18px;font-weight:700;gap:8px}
        .planet-item.active:before{content:'';width:16px;height:16px;border-radius:50%;background:#fff}

PORTAL  .portal-wrap{left:50%;top:50%;width:min(320px,31vw);transform:translate(-50%,-54%);perspective:none}
        .portal-heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;font-size:16px;opacity:0}
        .portal-heading strong{font-size:18px;margin-left:8px}
        .portal{position:relative;display:block;width:100%;aspect-ratio:320/350;padding:0;overflow:visible;border:0;
                border-radius:90px;background:transparent;cursor:pointer;box-shadow:none;transform:none!important}
        .portal video,.portal img{visibility:hidden;position:absolute;width:1px;height:1px;pointer-events:none}
        .portal-canvas{position:fixed;inset:0;z-index:3;width:100%;height:100%;pointer-events:none}
        (The real media elements are INVISIBLE — they exist only as pixel sources the canvas samples.)

CONTENT .planet-content{left:clamp(28px,4vw,58px);right:clamp(28px,3vw,44px);bottom:clamp(24px,3vh,30px);
                        display:flex;justify-content:space-between;align-items:flex-end;gap:40px}
        .planet-content h1{font-family:Aalto,'Arial Narrow',sans-serif;font-size:clamp(128px,21.8vw,314px);
          font-weight:400;line-height:.72;margin:0 0 -.04em;letter-spacing:0;transform:translateX(-32px);opacity:0}
        .planet-content dl{width:min(447px,34vw);margin:0;font-size:16px}
        .fact{display:grid;grid-template-columns:138px 1fr;gap:18px;padding:8px 0;
              border-bottom:1px solid rgba(255,255,255,.48);opacity:0}
        .fact:last-child{border-bottom:0} .fact dt{font-weight:700} .fact dd{margin:0}

MISC    .transition-layer{display:none} .scene-canvas{display:none}
        .loading{position:absolute;z-index:12;left:50%;bottom:30px;transform:translateX(-50%);opacity:0;
                 font-size:12px;letter-spacing:.14em;text-transform:uppercase;transition:opacity .2s}
        .experience.is-loading .loading{opacity:.8}
        .experience.is-transitioning .header,.experience.is-transitioning .planet-list{opacity:1;filter:none;pointer-events:auto}
        .experience.is-transitioning .shade{opacity:1}
        .experience.is-committing .background{transition:none!important}

====================================================================
6. PRELOADER (the first ~3 seconds)
====================================================================
.preloader{position:absolute;inset:0;z-index:20;background:#000;overflow:hidden}
.preloader video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.preloader-shade{position:absolute;inset:auto 0 0;height:35%;background:linear-gradient(to bottom,transparent,#000)}
.preloader.is-background{z-index:0} .preloader.is-background .preloader-shade{opacity:0}
.floating-logo{position:fixed;z-index:22;left:50%;top:50%;width:59px;height:58px;transform:translate(-50%,-50%);
  will-change:left,top,width,height,transform;
  transition:left 2s cubic-bezier(.16,1,.3,1),top 2s ...,width 2s ...,height 2s ...,transform 2s ...}
.floating-logo.is-docked{left:clamp(18px,1.95vw,28px);top:clamp(18px,3.1vh,28px);width:37px;height:36px;transform:none}
.floating-logo.is-settled{z-index:5}
.preloader-count{position:fixed;z-index:22;left:50%;bottom:clamp(22px,3.1vh,28px);display:flex;align-items:flex-end;
  gap:4px;transform:translateX(-50%);font-family:'SF Pro',Arial,sans-serif;line-height:1}
.preloader-count>span:first-child{font-family:'SF Pro Thin','SF Pro',Arial,sans-serif;font-size:64px;font-weight:100}
.preloader-count .percent{font-size:24px;padding-bottom:4px}
.preloader-count.is-leaving{animation:preload-count-out .75s cubic-bezier(.22,1,.36,1) both}
@keyframes preload-count-out{to{opacity:0;filter:blur(7px);transform:translate(-50%,-34px)}}
body:not(.preload-complete) .custom-cursor{opacity:0!important}

Behaviour: once #preloader-video metadata is ready, set
  video.playbackRate = Math.max(.25, video.duration / 3)      // sequence lasts ~3s
then play(). On each rAF write Math.round(currentTime/duration*100) into
#preloader-value. On 'ended' (or if play() rejects) run finish() ONCE:
  value = '100'; add .is-leaving to #preloader-count; add .is-docked to the logo
  (it flies from screen centre to the header slot over 2s); add .is-background to
  #preloader; add .preload-complete to body; call startExperience();
  remove the counter after 750ms; add .is-settled to the logo after 2000ms.

startExperience(): await the current portal media being loadable -> await
revealMask() -> add .intro-ready to body -> after 850ms call revealPlanetContent().

====================================================================
7. THE PORTAL — canvas mask with fake 3D (core mechanic, be precise)
====================================================================
A fixed full-screen canvas (#portal-canvas) paints a rounded-rectangle "window"
through which the portal media is visible. The media is drawn SCREEN-LOCKED in
cover mode, so the shape moves over a stationary image (parallax window, NOT a
textured card).

resizeCanvas(): d = Math.min(devicePixelRatio||1, 2); canvas.width = innerWidth*d;
canvas.height = innerHeight*d; CSS size = innerWidth/innerHeight px;
ctx.setTransform(d,0,0,d,0,0). Mirror the same for #scene-canvas unless a frozen
frame is being held. Re-run on resize.

drawCover(media): mw/mh = videoWidth||naturalWidth etc; scale = Math.max(innerWidth/mw,
innerHeight/mh); draw centered at ((innerWidth-w)/2,(innerHeight-h)/2,w,h).

Pointer tilt (skipped while busy):
  targetY = (clientX/innerWidth - .5) * 37.4
  targetX = (clientY/innerHeight - .5) * -33
  on pointerleave -> both 0
Per frame (dt clamped to 40ms):
  rotX += (targetX-rotX) * Math.min(1, dt*.009)   // same for rotY

Rounded-rect point sampling: for each of the 4 corners walk the arc in 10 steps,
producing ~44 points of a w×h rect with corner radius r (r clamped to w/2,h/2),
in local coords centred on origin. Corner arc ranges:
  [ w/2-r, -h/2+r, -PI/2, 0 ] [ w/2-r, h/2-r, 0, PI/2 ]
  [-w/2+r,  h/2-r,  PI/2, PI ] [-w/2+r,-h/2+r, PI, PI*1.5 ]

Projection (fake perspective, focal 850):
  ax = rx*PI/180; ay = ry*PI/180
  xx = x*cos(ay); yy = y*cos(ax); z = x*sin(ay) - y*sin(ax); p = 850/(850+z)
  screen = [ cx + xx*p, cy + yy*p ]

Frame loop:
  clear; if a frozen scene exists, blit #scene-canvas full-screen then drawShade()
  rect = #portal.getBoundingClientRect(); e = expansion (0..1)
  cx = rectCx + (innerWidth/2  - rectCx)*e
  cy = rectCy + (innerHeight/2 - rectCy)*e
  baseW = rect.width  + (innerWidth  - rect.width )*e
  baseH = rect.height + (innerHeight - rect.height)*e
  scale = e ? 1 : maskScale;  w = baseW*scale; h = baseH*scale
  r  = 90*(1-e)*scale;  rx = rotX*(1-e);  ry = rotY*(1-e)
  if (w>1 && h>1): build the projected path, ctx.save(), globalAlpha = canvasOpacity,
    clip(), fill '#030303' over the viewport, drawCover(transitionActive ? transitionVideo
    : (state.image ? portalImage : portalVideo)), if transitionActive drawShade(), restore()
So at e=0 you see a tilting rounded window; as e->1 it grows to fill the screen and
the corner radius and tilt both relax to 0.

drawShade(ctx): linear gradient from y=innerHeight*.52 (rgba(0,0,0,0)) to
y=innerHeight (rgba(0,0,0,.88)), filled over the bottom 48% of the viewport.

====================================================================
8. TRAVEL TRANSITION (click the portal)
====================================================================
Easing used everywhere in JS: t<.5 ? 4t³ : 1 - Math.pow(-2t+2,3)/2   (easeInOutCubic)
animateValue(setter, duration) drives a value 0->1 over rAF with that easing.

travel():
  guard: return if busy or current === 'venus'; set busy, zero the tilt targets
  next = current === 'mars' ? 'earth' : 'venus'
  #transition-video.src = states[current].portal; load(); add .is-loading
  await canplaythrough (or 'error', or a 1600ms timeout — whichever first)
  remove .is-loading/.content-revealing/.mask-revealing; add .is-transitioning
  currentTime=0; playbackRate = 1.3; canvasOpacity=1; transitionActive=true; await play()
  await animateValue(v => expansion = v, 1100)      // window swallows the screen
  await the video's 'ended'
  freeze its final frame into #scene-canvas (clear, drawCover into that context)
  current = next; add .is-committing; render(); await two rAFs
  transitionActive=false; expansion=0; maskScale=0; canvasOpacity=1
  remove .is-transitioning/.is-committing
  maskReveal = revealMask(); after 100ms revealPlanetContent(); await maskReveal
  after 450ms: drop the transition src, load(), busy=false
  On any throw: reset transitionActive=false, expansion=0, maskScale=1, canvasOpacity=1,
  strip the three state classes, busy=false.

revealMask(): retrigger .mask-revealing on .experience (remove -> offsetWidth -> add),
maskScale=0, then animateValue(v => maskScale = v, 1050).
revealPlanetContent(): retrigger .content-revealing the same way.

====================================================================
9. CUSTOM CURSOR
====================================================================
html,body,button,a,.portal{cursor:none!important}
.custom-cursor{display:block;position:fixed;left:0;top:0;z-index:100;width:1px;height:1px;
  pointer-events:none;opacity:0;transition:opacity .2s ease}
.custom-cursor.is-visible{opacity:1}
.cursor-dot,.cursor-orbit{position:absolute;left:0;top:0;border-radius:50%;transform:translate(-50%,-50%)}
.cursor-dot{width:12px;height:12px;background:#fff}
.cursor-orbit{width:36px;height:36px;border:1px solid #fff;background:rgba(255,255,255,.4);
  transition:transform .3s cubic-bezier(.22,1,.36,1)}
.custom-cursor.is-enter .cursor-orbit{transform:translate(-50%,-50%) scale(1.16)}
.cursor-label{position:absolute;top:26px;left:0;transform:translateX(-50%) translateY(-4px);
  font:16px/1.2 'SF Pro',Arial,sans-serif;white-space:nowrap;opacity:0;
  transition:opacity .2s ease,transform .3s cubic-bezier(.22,1,.36,1)}
.custom-cursor.is-enter .cursor-label{opacity:1;transform:translateX(-50%) translateY(0)}
JS: track pointer, lerp orbit position by 0.2 per frame, apply via
translate3d(x,y,0); add .is-visible on first move, remove on document mouseleave;
add/remove .is-enter on portal pointerenter/pointerleave.

====================================================================
10. ENTRANCE / SWITCH ANIMATIONS
====================================================================
body:not(.intro-ready) .header,.planet-list,.planet-content h1,.planet-content .fact{opacity:0}
.intro-ready .header       { animation:reveal-down .9s cubic-bezier(.22,1,.36,1) .1s both }
.intro-ready .planet-list  { animation:reveal-side .9s cubic-bezier(.22,1,.36,1) .65s both }
.content-revealing h1      { animation:title-rise 1.05s cubic-bezier(.16,1,.3,1) both }
.content-revealing .fact   { animation:fact-rise .72s cubic-bezier(.22,1,.36,1) both }
   .fact delays: 1)=.52s 2)=.68s 3)=.84s 4)=1s
.mask-revealing .portal-heading { animation:portal-caption .85s cubic-bezier(.22,1,.36,1) both }
.planet-list.is-switching .planet-item { animation:menu-row .58s cubic-bezier(.22,1,.36,1) both }
   item delays: .02 .05 .08 .11 .14 .17 .2 .23s
.planet-list.is-switching .planet-item.active:before { animation:active-dot .55s cubic-bezier(.22,1,.36,1) .18s both }

@keyframes reveal-down   {from{opacity:0;filter:blur(8px);transform:translateY(-18px)}      to{opacity:1;filter:blur(0);transform:translateY(0)}}
@keyframes reveal-side   {from{opacity:0;filter:blur(8px);transform:translate(-20px,-43%)}  to{opacity:1;filter:blur(0);transform:translate(0,-43%)}}
@keyframes title-rise    {from{opacity:0;filter:blur(12px);transform:translate(-32px,42px)} to{opacity:1;filter:blur(0);transform:translate(-32px,0)}}
@keyframes fact-rise     {from{opacity:0;filter:blur(7px);transform:translateY(18px)}       to{opacity:1;filter:blur(0);transform:translateY(0)}}
@keyframes portal-caption{from{opacity:0;filter:blur(7px);transform:translateY(22px)}       to{opacity:1;filter:blur(0);transform:translateY(0)}}
@keyframes menu-row      {from{opacity:.35;transform:translateX(-8px)}                      to{opacity:1;transform:translateX(0)}}
@keyframes active-dot    {from{opacity:0;transform:scale(0)}                                to{opacity:1;transform:scale(1)}}

====================================================================
11. RESPONSIVE
====================================================================
@media(max-width:900px){
  .nav{display:none}
  .portal-wrap{width:min(300px,48vw)}
  .planet-content h1{font-size:clamp(105px,24vw,190px)}
  .planet-content dl{width:43vw}
  .fact{grid-template-columns:110px 1fr}
  .planet-list{font-size:14px} .planet-item.active{font-size:16px}
}
@media(max-width:640px){
  .experience{min-height:600px}
  .planet-list{display:none}
  .portal-wrap{top:44%;width:min(260px,66vw)}
  .planet-content{left:18px;right:18px;bottom:18px;display:block}
  .planet-content h1{font-size:clamp(98px,30vw,160px);margin-bottom:20px}
  .planet-content dl{width:100%;font-size:13px}
  .fact{grid-template-columns:92px 1fr;padding:5px 0}
  .portal-heading{font-size:14px} .portal-heading strong{font-size:16px}
  .menu{height:38px} .portal{border-radius:70px}
}
@media(prefers-reduced-motion:reduce){*{transition-duration:.01ms!important}.portal{transform:none!important}}
On touch devices the tilt simply stays at 0 (no pointermove); tapping the portal
must still trigger the full travel sequence, and the canvas mask must still be
sized from the portal's live bounding rect so it lines up at every breakpoint.

====================================================================
12. BOOT ORDER (last lines of the script)
====================================================================
pause + rewind every .background video; resizeCanvas(); render();
requestAnimationFrame(draw); requestAnimationFrame(cursorLoop); runPreloader();

====================================================================
13. ACCEPTANCE CHECKLIST
====================================================================
[ ] Black screen -> Mars approach video plays for ~3s with a thin 0–100% counter
    bottom-centre and the logo floating dead-centre.
[ ] At 100% the counter blurs upward away, the logo glides to the top-left header
    slot over 2s, header fades down, planet list slides in from the left.
[ ] A rounded-rectangle window (radius 90px) grows open in the centre revealing the
    Earth-approach footage; the window tilts toward the pointer (max ~±18.7°/16.5°)
    with smooth easing while the footage behind it stays screen-locked.
[ ] "MARS" renders huge in the condensed display face bottom-left; four fact rows
    rise in with a stagger; "Next: [03] Earth" sits above the portal.
[ ] Clicking the portal blurs out the chrome, plays the transition at 1.3× while the
    window expands to fill the viewport, freezes the last frame, commits to Earth
    ("Next: [02] Venus"), and re-opens the mask on the new state.
[ ] Earth -> Venus works the same; at Venus the portal shows the Mercury still image
    and further clicks are ignored.
[ ] Custom cursor (12px dot + 36px translucent ring) follows with easing everywhere;
    ring scales 1.16× and the word "Enter" fades in over the portal.
[ ] No scrollbars at any size; layout holds at 375px, 768px and 1440px wide.
[ ] Zero console errors; no external libraries.