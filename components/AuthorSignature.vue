<script setup lang="ts">
import { gsap } from "gsap";

const signature = ref<HTMLElement | null>(null);
const activeMode = ref(0);
const modes = [
  { label: "Układ", phrase: "Forma. Funkcja. Efekt." },
  { label: "Typografia", phrase: "Każdy detal ma znaczenie." },
  { label: "Ruch", phrase: "Klik. I wszystko ożywa." },
];
const phrase = computed(
  () => modes[activeMode.value]?.phrase ?? "Forma. Funkcja. Efekt.",
);
const words = computed(() => phrase.value.split(" "));
const layouts = [
  {
    block: { x: 138, y: 25, width: 82, height: 43 },
    accent: { x: 146, y: 33, width: 20, height: 27 },
    rail: { x: 173, y: 34, width: 36, height: 5 },
    glyph: { x: 19, y: 48, "font-size": 26 },
  },
  {
    block: { x: 14, y: 23, width: 212, height: 46 },
    accent: { x: 201, y: 30, width: 5, height: 32 },
    rail: { x: 34, y: 58, width: 40, height: 3 },
    glyph: { x: 90, y: 60, "font-size": 44 },
  },
  {
    block: { x: 155, y: 23, width: 65, height: 46 },
    accent: { x: 26, y: 30, width: 44, height: 32 },
    rail: { x: 88, y: 43, width: 43, height: 3 },
    glyph: { x: 166, y: 54, "font-size": 26 },
  },
];
const previewParts = ["block", "accent", "rail", "glyph"] as const;

type Tone = { backgroundColor: string; color: string };

let mounted = false;
let version = 0;
let reducedMotion = false;
let motionPreference: MediaQueryList | null = null;
let transition: gsap.core.Timeline | null = null;
let completeExit: (() => void) | null = null;
let autoplay: gsap.core.Tween | null = null;
let visibilityObserver: IntersectionObserver | null = null;
let isInView = false;
let hasPlayedIntro = false;
let tones: Tone[] = [];

const elements = <T extends Element = HTMLElement>(selector: string): T[] =>
  Array.from(signature.value?.querySelectorAll<T>(selector) ?? []);

const stopTransition = () => {
  const finishExit = completeExit;
  completeExit = null;
  transition?.kill();
  transition = null;
  finishExit?.();
};

const stopAutoplay = () => {
  autoplay?.kill();
  autoplay = null;
};

const scheduleAutoplay = () => {
  stopAutoplay();
  if (!mounted || reducedMotion || !isInView || document.hidden) return;

  autoplay = gsap.delayedCall(4.5, () => {
    autoplay = null;
    void chooseMode((activeMode.value + 1) % modes.length);
  });
};

const setStaticState = () => {
  const root = signature.value;
  const tone = tones[activeMode.value];
  const layout = layouts[activeMode.value];
  if (!root || !tone || !layout) return;

  stopTransition();
  gsap.set(root, tone);
  gsap.set(elements(".Contact__signature-stage"), { autoAlpha: 1 });
  gsap.set(elements(".Contact__signature-phrase"), { autoAlpha: 1 });
  gsap.set(elements(".Contact__signature-shutter"), { scaleY: 0, yPercent: 0 });
  gsap.set(elements(".Contact__signature-letter"), {
    x: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    opacity: 1,
  });
  gsap.set(elements(".Contact__signature-canvas"), { y: 0, scale: 1, rotationY: 0, autoAlpha: 1 });
  gsap.set(elements(".Contact__signature-grid-line"), {
    strokeDashoffset: 0,
    opacity: 0.13,
  });

  for (const part of previewParts) {
    gsap.set(elements(`.Contact__signature-canvas-${part}`), { attr: layout[part] });
  }
  gsap.set(elements(".Contact__signature-canvas-accent"), { rotation: 0, scale: 1 });
};

const animatePreview = (timeline: gsap.core.Timeline, position: number) => {
  const layout = layouts[activeMode.value];
  if (!layout) return;

  for (const part of previewParts) {
    timeline.to(elements(`.Contact__signature-canvas-${part}`), {
      attr: layout[part],
      duration: 0.75,
      ease: "expo.inOut",
    }, position);
  }

  if (activeMode.value === 2) {
    timeline.fromTo(elements(".Contact__signature-canvas-accent"), {
      rotation: -35,
      scale: 0.25,
      transformOrigin: "50% 50%",
    }, {
      rotation: 0,
      scale: 1,
      duration: 1.1,
      ease: "elastic.out(1, 0.45)",
    }, position + 0.2);
  } else {
    timeline.to(elements(".Contact__signature-canvas-accent"), {
      rotation: 0,
      scale: 1,
      duration: 0.5,
    }, position);
  }
};

const animateMode = () => {
  const root = signature.value;
  const tone = tones[activeMode.value];
  if (!root || !tone) return;

  const shutters = elements(".Contact__signature-shutter");
  const letters = elements(".Contact__signature-letter");
  const letterStart = {
    x: activeMode.value === 1 ? 26 : 0,
    yPercent: activeMode.value === 1 ? 0 : 115,
    rotationX: activeMode.value === 0 ? -70 : 0,
    rotation: activeMode.value === 2 ? 12 : 0,
    opacity: 0,
  };
  gsap.set(shutters, { scaleY: 0, yPercent: 0, backgroundColor: tone.backgroundColor });
  transition = gsap.timeline({ defaults: { ease: "expo.out" } }).timeScale(0.65);
  transition
    .to(shutters, {
      scaleY: 1,
      duration: 0.42,
      stagger: { amount: 0.22, from: "center" },
      ease: "expo.inOut",
    }, 0)
    .addLabel("covered", 0.66)
    .set(root, tone, "covered")
    .set(elements(".Contact__signature-stage"), { autoAlpha: 1 }, "covered")
    .set(elements(".Contact__signature-phrase"), { autoAlpha: 1 }, "covered")
    .fromTo(letters, letterStart, {
      x: 0,
      yPercent: 0,
      rotation: 0,
      rotationX: 0,
      opacity: 1,
      immediateRender: false,
      duration: 0.8,
      ease: activeMode.value === 2 ? "back.out(1.6)" : "expo.out",
      stagger: { amount: 0.32, from: "start" },
    }, "covered+=0.02")
    .fromTo(elements(".Contact__signature-grid-line"), { strokeDashoffset: 1, opacity: 0 }, {
      strokeDashoffset: 0,
      opacity: 0.13,
      immediateRender: false,
      duration: 0.8,
      stagger: 0.015,
    }, "covered+=0.02")
    .to(shutters, {
      yPercent: -100,
      duration: 0.55,
      stagger: 0.015,
    }, "covered+=0.02")
    .fromTo(elements(".Contact__signature-canvas"), {
      y: 22,
      rotationY: -25,
      scale: 0.88,
      autoAlpha: 0,
    }, {
      y: 0,
      rotationY: 0,
      scale: 1,
      autoAlpha: 1,
      immediateRender: false,
      duration: 0.85,
    }, "covered+=0.02");

  animatePreview(transition, 0.68);
  return transition;
};

const animateExit = () => new Promise<void>((resolve) => {
  const finishExit = () => {
    if (completeExit === finishExit) completeExit = null;
    resolve();
  };
  completeExit = finishExit;

  const exit = gsap.timeline({
    defaults: { ease: "expo.in" },
    onComplete: finishExit,
  }).timeScale(0.65);
  transition = exit;
  exit
    .to(elements(".Contact__signature-letter"), {
      x: activeMode.value === 1 ? -26 : 0,
      yPercent: activeMode.value === 1 ? 0 : -115,
      rotationX: activeMode.value === 0 ? 70 : 0,
      rotation: activeMode.value === 2 ? -12 : 0,
      opacity: 0,
      duration: 0.45,
      stagger: { amount: 0.18, from: "end" },
    }, 0)
    .to(elements(".Contact__signature-canvas"), {
      y: -22,
      rotationY: 25,
      scale: 0.88,
      autoAlpha: 0,
      duration: 0.55,
    }, 0.05)
    .to(elements(".Contact__signature-grid-line"), {
      strokeDashoffset: 1,
      opacity: 0,
      duration: 0.4,
      stagger: 0.008,
    }, 0)
    .to(elements(".Contact__signature-shutter"), {
      yPercent: -100,
      duration: 0.35,
    }, 0)
    .set(elements(".Contact__signature-phrase"), { autoAlpha: 0 });

  if (!isInView || document.hidden) exit.pause();
});

const chooseMode = async (index: number, skipExit = false) => {
  if (!mounted) return;

  const currentVersion = ++version;
  stopAutoplay();
  stopTransition();

  if (!skipExit && !reducedMotion) await animateExit();
  if (!mounted || version !== currentVersion) return;

  activeMode.value = index;
  await nextTick();
  if (!mounted || version !== currentVersion) return;

  if (reducedMotion) {
    setStaticState();
    return;
  }

  const animation = animateMode();
  if (!isInView || document.hidden) animation?.pause();
  scheduleAutoplay();
};

const syncAutoplay = () => {
  if (!mounted) return;

  if (!isInView || document.hidden) {
    stopAutoplay();
    transition?.pause();
    return;
  }

  if (!hasPlayedIntro) {
    hasPlayedIntro = true;
    void chooseMode(activeMode.value, true);
    return;
  }

  transition?.resume();
  scheduleAutoplay();
};

const onMotionPreferenceChange = () => {
  ++version;
  reducedMotion = motionPreference?.matches ?? false;
  setStaticState();
  syncAutoplay();
};

onMounted(() => {
  mounted = true;
  tones = elements(".Contact__signature-palette-tone").map((element) => {
    const style = window.getComputedStyle(element);
    return { backgroundColor: style.backgroundColor, color: style.color };
  });
  motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  reducedMotion = motionPreference.matches;
  motionPreference.addEventListener("change", onMotionPreferenceChange);

  setStaticState();

  document.addEventListener("visibilitychange", syncAutoplay);
  visibilityObserver = new IntersectionObserver(([entry]) => {
    isInView = entry?.isIntersecting ?? false;
    syncAutoplay();
  }, { threshold: 0.1 });
  if (signature.value) visibilityObserver.observe(signature.value);
});

onBeforeUnmount(() => {
  mounted = false;
  ++version;
  stopAutoplay();
  visibilityObserver?.disconnect();
  document.removeEventListener("visibilitychange", syncAutoplay);
  stopTransition();
  gsap.killTweensOf(elements("*"));
  if (signature.value) gsap.killTweensOf(signature.value);
  motionPreference?.removeEventListener("change", onMotionPreferenceChange);
});
</script>

<template>
  <footer
    ref="signature"
    class="Contact__signature"
    aria-label="Projekt i wykonanie strony"
  >
    <div class="Contact__signature-palette" aria-hidden="true">
      <span class="Contact__signature-palette-tone Contact__signature-palette-tone--paper"></span>
      <span class="Contact__signature-palette-tone Contact__signature-palette-tone--soft"></span>
      <span class="Contact__signature-palette-tone Contact__signature-palette-tone--dark"></span>
    </div>

    <svg class="Contact__signature-grid" viewBox="0 0 1200 150" preserveAspectRatio="none" aria-hidden="true">
      <path
        v-for="index in 17"
        :key="index"
        class="Contact__signature-grid-line"
        :d="`M${index * (1200 / 18)},0 V150`"
        pathLength="1"
      />
      <path class="Contact__signature-grid-line" d="M0,18 H1200 M0,75 H1200 M0,132 H1200" pathLength="1" />
    </svg>

    <div class="Contact__signature-inner">
      <div class="Contact__signature-topline">
        <div class="Contact__signature-author">
          <p class="Contact__signature-name">Marcin Dekier</p>
          <p class="Contact__signature-role">Projekt i wykonanie</p>
        </div>
        <a class="Contact__signature-phone" href="tel:+48570531256">570 531 256</a>
      </div>

      <div class="Contact__signature-stage">
        <div class="Contact__signature-copy">
          <p class="Contact__signature-phrase">
            <span class="Contact__signature-phrase-text">{{ phrase }}</span>
            <span
              v-for="(word, wordIndex) in words"
              :key="`${activeMode}-${wordIndex}`"
              class="Contact__signature-word"
              aria-hidden="true"
            >
              <span
                v-for="(letter, letterIndex) in word"
                :key="letterIndex"
                class="Contact__signature-letter"
              >{{ letter }}</span>
            </span>
          </p>
          <div class="Contact__signature-modes" role="group" aria-label="Wariant projektu">
            <button
              v-for="(mode, index) in modes"
              :key="mode.label"
              class="Contact__signature-mode"
              :class="{ 'Contact__signature-mode--active': activeMode === index }"
              type="button"
              :aria-pressed="activeMode === index"
              @click="chooseMode(index)"
            >
              {{ mode.label }}
            </button>
          </div>
        </div>

        <div class="Contact__signature-preview" aria-hidden="true">
          <svg class="Contact__signature-canvas" viewBox="0 0 240 80">
            <rect class="Contact__signature-canvas-frame" x="0.5" y="0.5" width="239" height="79" rx="3" />
            <path class="Contact__signature-canvas-divider" d="M0 14H240" />
            <circle class="Contact__signature-canvas-dot" cx="9" cy="7" r="1.5" />
            <circle class="Contact__signature-canvas-dot" cx="15" cy="7" r="1.5" />
            <circle class="Contact__signature-canvas-dot" cx="21" cy="7" r="1.5" />
            <rect class="Contact__signature-canvas-block" x="138" y="25" width="82" height="43" rx="2" />
            <rect class="Contact__signature-canvas-accent" x="146" y="33" width="20" height="27" rx="1" />
            <rect class="Contact__signature-canvas-rail" x="173" y="34" width="36" height="5" rx="1" />
            <text class="Contact__signature-canvas-glyph" x="19" y="48" font-size="26">Aa</text>
          </svg>
        </div>
      </div>
    </div>

    <div class="Contact__signature-shutters" aria-hidden="true">
      <span v-for="index in 14" :key="index" class="Contact__signature-shutter"></span>
    </div>
  </footer>
</template>

<style lang="scss">
@import "AuthorSignature";
</style>
