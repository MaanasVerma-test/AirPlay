const SELECT_HTML = `
<!-- TopAppBar -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-20 bg-zinc-950/40 backdrop-blur-3xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
<div class="flex items-center gap-8">
<a href="index.html" class="text-2xl font-black tracking-tighter text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)] font-['Space_Grotesk'] hover:scale-105 transition-transform">AIRPLAY</a>
<nav class="hidden md:flex items-center gap-8 font-['Space_Grotesk'] tracking-tight">
<a class="text-zinc-400 font-medium hover:text-cyan-200 transition-all" href="features.html">Features</a>
<a class="text-zinc-400 font-medium hover:text-cyan-200 transition-all" href="pricing.html">Pricing</a>
<a class="text-cyan-400 border-b-2 border-cyan-400 pb-1" href="#">Instruments</a>
<a class="text-zinc-400 font-medium hover:text-cyan-200 transition-all" href="#" id="goToStageLink">Stage</a>
<a class="text-zinc-400 font-medium hover:text-cyan-200 transition-all" href="features.html#tutorials">Tutorials</a>
</nav>
</div>
<div class="flex items-center gap-6">
<button class="bg-cyan-400/10 text-cyan-400 px-6 py-2 rounded-full border border-cyan-400/30 font-bold hover:bg-cyan-400/20 transition-all active:scale-95 duration-150">Connect Camera</button>
<div class="flex items-center gap-4 text-zinc-400">
<span class="material-symbols-outlined cursor-pointer hover:text-cyan-400 transition-colors">settings</span>
<span class="material-symbols-outlined cursor-pointer hover:text-cyan-400 transition-colors">account_circle</span>
</div>
</div>
</header>
<!-- Main Content -->
<main class="pt-28 px-12 pb-32 min-h-screen relative">
<div class="absolute inset-0 z-0 pointer-events-none opacity-20">
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm"></div>
<div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#e5b4ff] to-transparent blur-sm"></div>
</div>
<div class="relative z-10 max-w-7xl mx-auto">
<header class="mb-12">
<h1 class="font-['Space_Grotesk'] text-[48px] font-semibold leading-[1.2] tracking-[-0.02em] text-white mb-2">SELECT YOUR <span class="text-cyan-400">VESSEL</span></h1>
<p class="text-[18px] leading-[1.6] text-zinc-400 max-w-2xl">Connect your physical movements to the digital soundscape. Choose an instrument to begin your immersive performance.</p>
</header>
<!-- Instrument Cards -->
<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
  <!-- Drums -->
  <div class="instrument-card group relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/30 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] cursor-pointer" data-mode="drums">
    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
    <img class="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 opacity-60 group-hover:opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL_-ESm41LCqQ9CGmrekAv5qnpYA5aBMs-ioKDok6TUupPHdV-IYZtSIpW7DDrz9puvYuTJFiG0MWzhErjDzD8b-RVu1L2EJ8-WL4qiioWJPHDINCIM5WYOH_nAH3yoILEQeJO5SUKrA90stwuDIhjXhiGLbIpPLIHfhYIkKvDA0iPZHP52_6ZTK5igTJ5mOkMJ67t0FE8HjeCUn5b4zD8oJ72oNwOeg5ITD_zIZgBFaGBCEeNLWSMF-nWAVAWFjdPsVlu1TrOp1c" alt="Drums"/>
    <div class="absolute bottom-0 left-0 w-full p-8 z-20">
      <div class="mb-4"><span class="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-[10px] rounded-full font-bold tracking-widest uppercase border border-cyan-400/20">Percussion</span></div>
      <h2 class="font-['Space_Grotesk'] text-[32px] font-medium text-white mb-2">Acoustic Drums</h2>
      <p class="text-zinc-400 text-sm mb-6 line-clamp-2">Hyper-responsive spatial mapping for dynamic kit performance.</p>
      <button class="select-btn w-full py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-white font-bold uppercase tracking-widest hover:bg-cyan-400 hover:text-black hover:border-cyan-400 transition-all active:scale-95">Select</button>
    </div>
  </div>
  <!-- Guitar -->
  <div class="instrument-card group relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/30 backdrop-blur-xl transition-all duration-500 hover:border-[#e5b4ff]/50 hover:shadow-[0_0_30px_rgba(229,180,255,0.2)] cursor-pointer" data-mode="guitar">
    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
    <img class="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 opacity-60 group-hover:opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7R8kQQo_uvclSNDPsXOS3vh15nOCAbZw53Al-SwpdWHrcPCsuEx0bPM_UnRUetpxFeAe8Ok2Qe6d-HH9zb27OQ1YRDox0scYvwcG16oelc0UzK-kxWVTKn-FxKvecphaGx1XkysjSinLJg0VCrtY1hCSBjZiepi5q1yzhI9NhvHd1OeDqR_C8XpE3P9sPV3kF0ZQPIAlZpxy2jDVg4DvzChAJW5UQhO99hfvYneAYiTiIIEnNelYSzmfIwquAxMVGhI7bXA8Xms4" alt="Guitar"/>
    <div class="absolute bottom-0 left-0 w-full p-8 z-20">
      <div class="mb-4"><span class="px-3 py-1 bg-[#e5b4ff]/10 text-[#e5b4ff] text-[10px] rounded-full font-bold tracking-widest uppercase border border-[#e5b4ff]/20">Strings</span></div>
      <h2 class="font-['Space_Grotesk'] text-[32px] font-medium text-white mb-2">Electric Guitar</h2>
      <p class="text-zinc-400 text-sm mb-6 line-clamp-2">Virtual fretboard interaction with gesture-based distortion control.</p>
      <button class="select-btn w-full py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-white font-bold uppercase tracking-widest hover:bg-[#e5b4ff] hover:text-black hover:border-[#e5b4ff] transition-all active:scale-95">Select</button>
    </div>
  </div>
  <!-- Piano -->
  <div class="instrument-card group relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/30 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] cursor-pointer" data-mode="piano">
    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
    <img class="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 opacity-60 group-hover:opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqz7hVbrNVd7k6yWKYEhti8IT5vWc9qZ1ozm_zWDUBHJctG4-Hu2nhZnKkfChZVd773VJKEne0yC5FIL7NQzwWB-HuQSHOrmkbDMQqWxVoCro4oqdgJl3DEPIvaadqBAv5kadkhNJR9cfpdwgQinKeoj-SsAK2Z8iDemGrP8pGyD46PH7hhn6nk6kjF5Agx3qChKBsx82FHIsWEegFO0GPOPTET03xAQPYwn8PDn9ksQhm0QNY8_iWoRJmmI-kmuRMi0h9lrGv6eg" alt="Piano"/>
    <div class="absolute bottom-0 left-0 w-full p-8 z-20">
      <div class="mb-4"><span class="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-[10px] rounded-full font-bold tracking-widest uppercase border border-cyan-400/20">Keys</span></div>
      <h2 class="font-['Space_Grotesk'] text-[32px] font-medium text-white mb-2">Grand Piano</h2>
      <p class="text-zinc-400 text-sm mb-6 line-clamp-2">Multi-octave spatial layout with haptic-simulated velocity.</p>
      <button class="select-btn w-full py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-white font-bold uppercase tracking-widest hover:bg-cyan-400 hover:text-black hover:border-cyan-400 transition-all active:scale-95">Select</button>
    </div>
  </div>
  <!-- Synth (visual only) -->
  <div class="group relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/30 backdrop-blur-xl transition-all duration-500 hover:border-[#e5b4ff]/50 hover:shadow-[0_0_30px_rgba(229,180,255,0.2)] cursor-not-allowed opacity-60">
    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
    <img class="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 opacity-60 group-hover:opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzPhLb6vbgAI2sPC9iwj02GQzBQly7t7aQ5Mwo61BC8j7OOJCGpH1osym172V3V5C2dJgzM0RqaWw2N-BDRJub-be6IQNr7kRPy4eISE5jJlYC8AlcNPtmLreYcUpRxB4YNXifrmPn33QDzGE02ikdVMWrsSkHrEkRadsaCdAjS8Q_AZMbNx1Eh_7ck4rg4o2bC80fzRLoszZuV0ir2M_-4yfw4XVRXjZCI_-f-gyZfSsfaLg47gT57H0kpl2CF6fSPRG4hS5FdCs" alt="Synth"/>
    <div class="absolute bottom-0 left-0 w-full p-8 z-20">
      <div class="mb-4"><span class="px-3 py-1 bg-[#e5b4ff]/10 text-[#e5b4ff] text-[10px] rounded-full font-bold tracking-widest uppercase border border-[#e5b4ff]/20">Coming Soon</span></div>
      <h2 class="font-['Space_Grotesk'] text-[32px] font-medium text-white mb-2">Cosmic Synth</h2>
      <p class="text-zinc-400 text-sm mb-6 line-clamp-2">Abstract sound manipulation using full-body motion tracking.</p>
      <button disabled class="w-full py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-zinc-500 font-bold uppercase tracking-widest cursor-not-allowed">Coming Soon</button>
    </div>
  </div>
</div>

<!-- How It Works -->
<section class="mt-24 mb-16">
<div class="text-center mb-16">
<h2 class="font-['Space_Grotesk'] text-[48px] font-semibold text-white mb-3">How It <span class="text-cyan-400">Works</span></h2>
<p class="text-zinc-400 text-sm uppercase tracking-widest">Three steps to virtual virtuosity</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
<div class="bg-white/[0.03] backdrop-blur-[40px] border border-white/10 p-10 rounded-[40px] group hover:border-cyan-400/50 transition-all duration-500">
<div class="w-16 h-16 bg-cyan-400/10 rounded-2xl flex items-center justify-center mb-8 text-cyan-400 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-4xl">videocam</span>
</div>
<h3 class="font-['Space_Grotesk'] text-[32px] font-medium text-white mb-4">Connect Camera</h3>
<p class="text-zinc-400">Use any standard webcam. Our AI maps 21 key points on your hands in real-time with sub-millisecond latency.</p>
</div>
<div class="bg-white/[0.03] backdrop-blur-[40px] border border-white/10 p-10 rounded-[40px] group hover:border-[#e5b4ff]/50 transition-all duration-500">
<div class="w-16 h-16 bg-[#e5b4ff]/10 rounded-2xl flex items-center justify-center mb-8 text-[#e5b4ff] group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-4xl">piano</span>
</div>
<h3 class="font-['Space_Grotesk'] text-[32px] font-medium text-white mb-4">Choose Instrument</h3>
<p class="text-zinc-400">Select from a curated library of spatial drums, ethereal synths, and responsive air-guitars.</p>
</div>
<div class="bg-white/[0.03] backdrop-blur-[40px] border border-white/10 p-10 rounded-[40px] group hover:border-cyan-400/50 transition-all duration-500">
<div class="w-16 h-16 bg-cyan-400/10 rounded-2xl flex items-center justify-center mb-8 text-cyan-400 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-4xl">auto_fix_high</span>
</div>
<h3 class="font-['Space_Grotesk'] text-[32px] font-medium text-white mb-4">Play in Air</h3>
<p class="text-zinc-400">Strike, pluck, or wave. The stage responds to your velocity and spatial position effortlessly.</p>
</div>
</div>
</section>

<!-- Stats -->
<section class="mb-16">
<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
<div class="bg-white/[0.03] backdrop-blur-[40px] border border-white/10 rounded-3xl p-8 text-center hover:border-cyan-400/30 transition-all">
<div class="font-['Space_Grotesk'] text-[48px] font-bold text-cyan-400 mb-2">21</div>
<p class="text-zinc-500 text-xs uppercase tracking-widest">Hand Points Tracked</p>
</div>
<div class="bg-white/[0.03] backdrop-blur-[40px] border border-white/10 rounded-3xl p-8 text-center hover:border-[#e5b4ff]/30 transition-all">
<div class="font-['Space_Grotesk'] text-[48px] font-bold text-[#e5b4ff] mb-2">&lt;5ms</div>
<p class="text-zinc-500 text-xs uppercase tracking-widest">Latency</p>
</div>
<div class="bg-white/[0.03] backdrop-blur-[40px] border border-white/10 rounded-3xl p-8 text-center hover:border-cyan-400/30 transition-all">
<div class="font-['Space_Grotesk'] text-[48px] font-bold text-cyan-400 mb-2">60</div>
<p class="text-zinc-500 text-xs uppercase tracking-widest">FPS Tracking</p>
</div>
<div class="bg-white/[0.03] backdrop-blur-[40px] border border-white/10 rounded-3xl p-8 text-center hover:border-[#e5b4ff]/30 transition-all">
<div class="font-['Space_Grotesk'] text-[48px] font-bold text-[#e5b4ff] mb-2">3+</div>
<p class="text-zinc-500 text-xs uppercase tracking-widest">Instruments</p>
</div>
</div>
</section>

<!-- Tech Specs -->
<section class="mb-16">
<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
<div class="bg-white/[0.03] backdrop-blur-[40px] border border-white/10 rounded-[40px] p-12">
<div class="flex items-center gap-4 mb-8">
<span class="material-symbols-outlined text-cyan-400 text-4xl">memory</span>
<h3 class="font-['Space_Grotesk'] text-[24px] font-semibold text-white">Neural Hand Engine v4.0</h3>
</div>
<ul class="space-y-4 text-zinc-400">
<li class="flex items-start gap-3"><span class="text-cyan-400 mt-1">●</span>MediaPipe hand landmark detection with 21 key points per hand</li>
<li class="flex items-start gap-3"><span class="text-cyan-400 mt-1">●</span>Pose estimation for elbow tracking in drum mode</li>
<li class="flex items-start gap-3"><span class="text-cyan-400 mt-1">●</span>Velocity detection based on wrist acceleration history</li>
<li class="flex items-start gap-3"><span class="text-cyan-400 mt-1">●</span>Real-time canvas overlay with particle effects and ripples</li>
</ul>
</div>
<div class="bg-white/[0.03] backdrop-blur-[40px] border border-white/10 rounded-[40px] p-12">
<div class="flex items-center gap-4 mb-8">
<span class="material-symbols-outlined text-[#e5b4ff] text-4xl">graphic_eq</span>
<h3 class="font-['Space_Grotesk'] text-[24px] font-semibold text-white">Audio Engine</h3>
</div>
<ul class="space-y-4 text-zinc-400">
<li class="flex items-start gap-3"><span class="text-[#e5b4ff] mt-1">●</span>Web Audio API with low-latency sample playback</li>
<li class="flex items-start gap-3"><span class="text-[#e5b4ff] mt-1">●</span>Velocity-sensitive dynamics for realistic expression</li>
<li class="flex items-start gap-3"><span class="text-[#e5b4ff] mt-1">●</span>Multi-sample drum kit with kick, snare, hi-hat, and toms</li>
<li class="flex items-start gap-3"><span class="text-[#e5b4ff] mt-1">●</span>Chord-based guitar engine with strumming detection</li>
</ul>
</div>
</div>
</section>

<!-- Footer -->
<footer class="border-t border-white/10 pt-12 pb-24 mt-8">
<div class="flex flex-col md:flex-row justify-between items-center gap-6">
<div class="flex items-center gap-3">
<span class="font-['Space_Grotesk'] text-xl font-black text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">AIRPLAY</span>
<span class="text-zinc-600 text-xs">Beyond Physical Limits</span>
</div>
<div class="flex gap-8">
<a href="features.html" class="text-zinc-500 hover:text-cyan-400 transition-colors text-xs uppercase tracking-widest font-['Space_Grotesk']">Features</a>
<a href="features.html#tutorials" class="text-zinc-500 hover:text-cyan-400 transition-colors text-xs uppercase tracking-widest font-['Space_Grotesk']">Tutorials</a>
<a href="https://github.com/MaanasVerma-test/AirPlay" target="_blank" class="text-zinc-500 hover:text-cyan-400 transition-colors text-xs uppercase tracking-widest font-['Space_Grotesk']">Github</a>
</div>
<p class="text-zinc-600 font-['Space_Grotesk'] text-[10px] tracking-[0.2em]">© 2025 AIRPLAY VIRTUAL</p>
</div>
</footer>

</div>
</main>
<!-- Bottom Nav -->
<nav class="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-12 py-4 bg-zinc-950/60 backdrop-blur-xl rounded-t-[40px] border-t border-white/20 w-3/4 mx-auto mb-4 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] font-['Space_Grotesk'] text-[10px] font-bold uppercase">
<a href="features.html#spotlight" class="flex flex-col items-center justify-center text-zinc-500 p-4 hover:text-white transition-all cursor-pointer">
<span class="material-symbols-outlined mb-1">fiber_manual_record</span><span>Record</span>
</a>
<a href="features.html#spotlight" class="flex flex-col items-center justify-center text-zinc-500 p-4 hover:text-white transition-all cursor-pointer">
<span class="material-symbols-outlined mb-1">play_circle</span><span>Playback</span>
</a>
<div class="flex flex-col items-center justify-center bg-cyan-400/10 text-cyan-400 rounded-full p-4 ring-1 ring-cyan-400/50 cursor-default">
<span class="material-symbols-outlined mb-1">inventory_2</span><span>Library</span>
</div>
<a href="features.html#spotlight" class="flex flex-col items-center justify-center text-zinc-500 p-4 hover:text-white transition-all cursor-pointer">
<span class="material-symbols-outlined mb-1">magic_button</span><span>Effects</span>
</a>
</nav>
`;

const PLAY_HTML = `
<!-- Camera Feed -->
<div id="videoContainer" class="fixed top-0 left-0 w-full h-full z-[-1]">
  <video id="video" class="w-full h-full object-cover" style="transform:scaleX(-1);filter:saturate(1.1) contrast(1.05);" playsinline></video>
  <canvas id="overlay" class="absolute top-0 left-0 w-full h-full pointer-events-none"></canvas>
</div>
<!-- TopAppBar -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-20 bg-zinc-950/40 backdrop-blur-3xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
<div class="flex items-center gap-8">
<button id="backBtn" class="text-2xl font-black tracking-tighter text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)] font-['Space_Grotesk'] hover:scale-105 active:scale-95 transition-all cursor-pointer border-none bg-transparent">AIRPLAY</button>
<nav class="hidden md:flex items-center gap-8">
<a id="instrumentName" class="text-cyan-400 border-b-2 border-cyan-400 pb-1 font-['Space_Grotesk'] tracking-tight" href="#">Stage</a>
<a class="text-zinc-400 font-medium font-['Space_Grotesk'] tracking-tight hover:text-cyan-200 transition-all" href="pricing.html">Pricing</a>
<a class="text-zinc-400 font-medium font-['Space_Grotesk'] tracking-tight hover:text-cyan-200 transition-all" href="features.html">Features</a>
<a class="text-zinc-400 font-medium font-['Space_Grotesk'] tracking-tight hover:text-cyan-200 transition-all" href="features.html#tutorials">Tutorials</a>
</nav>
</div>
<div class="flex items-center gap-6">
<div class="flex gap-4 text-zinc-400">
<span class="material-symbols-outlined cursor-pointer hover:text-white">settings</span>
<span class="material-symbols-outlined cursor-pointer hover:text-white">account_circle</span>
</div>
</div>
</header>
<!-- Right Controls -->
<div class="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-40">
<div class="bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 flex flex-col items-center gap-6 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
  <div class="flex flex-col items-center gap-2">
    <span class="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Recording</span>
    <button class="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:scale-110 active:scale-95 transition-all">
      <span class="material-symbols-outlined text-3xl">fiber_manual_record</span>
    </button>
    <span class="text-[12px] font-['Space_Grotesk'] text-zinc-300 font-mono">00:00:00</span>
    <div id="fps" class="text-[10px] text-cyan-400 font-mono mt-1">FPS: --</div>
  </div>
  <div class="h-px w-full bg-white/10"></div>
  <div class="flex flex-col items-center gap-4">
    <span class="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Master FX</span>
    <div class="flex flex-col gap-3">
      <div class="px-4 py-2 rounded-full bg-[#e5b4ff]/20 border border-[#e5b4ff]/30 text-[#e5b4ff] text-[10px] font-bold uppercase tracking-tighter flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-[#e5b4ff] shadow-[0_0_8px_rgba(229,180,255,1)]"></span>Reverb
      </div>
      <div class="px-4 py-2 rounded-full bg-zinc-800/40 border border-white/10 text-zinc-500 text-[10px] font-bold uppercase tracking-tighter flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>Echo
      </div>
      <div class="px-4 py-2 rounded-full bg-cyan-400/20 border border-cyan-400/30 text-cyan-400 text-[10px] font-bold uppercase tracking-tighter flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,219,233,1)]"></span>Distortion
      </div>
    </div>
  </div>
</div>
<!-- Volume -->
<div class="bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-full p-4 flex flex-col items-center gap-4 h-64">
  <button id="muteBtn" class="material-symbols-outlined text-zinc-400 text-sm hover:text-white transition-colors cursor-pointer border-none bg-transparent">volume_up</button>
  <div class="w-1 bg-zinc-800 rounded-full flex-grow relative">
    <div class="absolute bottom-0 w-1 bg-cyan-400 rounded-full h-1/2"></div>
    <div class="absolute bottom-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] border border-cyan-400 -translate-x-[6px] hover:scale-125 transition-transform cursor-pointer"></div>
  </div>
  <span class="text-[10px] text-zinc-500 font-bold">VOL</span>
</div>
</div>
<!-- Bottom Nav -->
<nav class="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-12 py-4 bg-zinc-950/60 backdrop-blur-xl rounded-t-[40px] border-t border-white/20 w-3/4 mx-auto mb-4 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
<div class="flex flex-col items-center justify-center bg-cyan-400/10 text-cyan-400 rounded-full p-4 ring-1 ring-cyan-400/50 font-['Space_Grotesk'] text-[10px] font-bold uppercase cursor-pointer">
<span class="material-symbols-outlined mb-1">fiber_manual_record</span>Record
</div>
<div class="flex flex-col items-center justify-center text-zinc-500 p-4 font-['Space_Grotesk'] text-[10px] font-bold uppercase cursor-pointer hover:text-white transition-all">
<span class="material-symbols-outlined mb-1">play_circle</span>Playback
</div>
<div class="flex flex-col items-center justify-center text-zinc-500 p-4 font-['Space_Grotesk'] text-[10px] font-bold uppercase">
<span class="material-symbols-outlined mb-1">music_note</span>
<span id="activeChord">Chord</span>
</div>
<div class="flex flex-col items-center justify-center text-zinc-500 p-4 font-['Space_Grotesk'] text-[10px] font-bold uppercase cursor-pointer hover:text-white transition-all">
<span class="material-symbols-outlined mb-1">magic_button</span>Effects
</div>
</nav>
<!-- Status Overlay -->
<div id="statusOverlay" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm" style="display:none;">
  <div id="statusCard" class="bg-zinc-900/80 border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center shadow-[0_0_50px_rgba(0,240,255,0.2)] flex flex-col items-center">
    <div id="statusSpinner" class="w-12 h-12 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin mb-6 hidden"></div>
    <h3 id="statusTitle" class="text-white font-['Space_Grotesk'] text-2xl mb-2">Loading</h3>
    <p id="statusText" class="text-zinc-400 text-sm mb-6">Preparing camera...</p>
    <button id="retryBtn" class="hidden w-full py-3 bg-cyan-400 text-black font-bold uppercase tracking-widest rounded-xl hover:bg-cyan-300 transition-colors">Retry</button>
  </div>
</div>
`;

export function renderAppShell(root) {
  root.innerHTML = `
    <div id="selectScreen" class="screen w-full min-h-screen">${SELECT_HTML}</div>
    <div id="playScreen" class="screen w-full min-h-screen" style="display:none;">${PLAY_HTML}</div>
  `;
}

export function getEls() {
  return {
    selectScreen: document.getElementById("selectScreen"),
    playScreen: document.getElementById("playScreen"),
    cards: Array.from(document.querySelectorAll(".instrument-card")),
    video: document.getElementById("video"),
    overlay: document.getElementById("overlay"),
    fps: document.getElementById("fps"),
    muteBtn: document.getElementById("muteBtn"),
    backBtn: document.getElementById("backBtn"),
    instrumentName: document.getElementById("instrumentName"),
    chord: document.getElementById("activeChord"),
    statusOverlay: document.getElementById("statusOverlay"),
    statusTitle: document.getElementById("statusTitle"),
    statusText: document.getElementById("statusText"),
    statusSpinner: document.getElementById("statusSpinner"),
    retryBtn: document.getElementById("retryBtn")
  };
}

export function setStatus(els, { visible, title = "", text = "", spinner = false, retry = false }) {
  if (els.statusOverlay) els.statusOverlay.style.display = visible ? "flex" : "none";
  if (els.statusTitle) els.statusTitle.textContent = title;
  if (els.statusText) els.statusText.textContent = text;
  if (els.statusSpinner) els.statusSpinner.classList.toggle("hidden", !spinner);
  if (els.retryBtn) els.retryBtn.classList.toggle("hidden", !retry);
}
