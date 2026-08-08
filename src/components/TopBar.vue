<script setup lang="ts"></script>

<template>
  <div class="TopBarContainer">
    <div class="barContainer">
      <div class="topBarBorder"></div>
      <div class="topBar"></div>
    </div>
    <div class="bigLed">
      <div class="outerCircle"></div>
      <div class="innerCircle"></div>
      <div class="whiteDot"></div>
    </div>
    <div class="miniLed">
      <div class="miniLedOne"></div>
      <div class="miniLedTwo"></div>
      <div class="miniLedThree"></div>
    </div>
  </div>
</template>

<style lang="css">
.TopBarContainer {
  position: fixed;
  top: 0px;
  width: 100%;
  display: grid;
  grid-template-rows: auto auto auto;
  grid-template-columns: auto;
  pointer-events: none;
}

.barContainer {
  display: grid;
  grid-column: 1 / 2;
  grid-row: 1 / 4;
}

.topBarBorder {
  width: 100%;
  height: 5rem;
  background: black;
  grid-column: 1 / 2;
  grid-row: 1 / 2;

  --r: 1rem;
  --s: 1.5rem;
  clip-path: shape(
    from 0 0,
    line to 100% 0,
    line to 100% calc(60% + 0.1rem),
    line to calc(30% + 0.1rem) calc(60% + 0.1rem),
    curve by calc(-1 * var(--s)) var(--r) with calc(-0.8 * var(--s))
      calc(0.2 * var(--r)),
    curve by calc(-1 * var(--s)) var(--r) with calc(-0.2 * var(--s))
      calc(0.8 * var(--r)),
    line to 0 100%
  );
}

.topBar {
  width: calc(100% - 0.2rem);
  height: calc(5rem - 0.2rem);
  align-self: center;
  justify-self: center;
  background: var(--pokedex-red);
  grid-column: 1 / 2;
  grid-row: 1 / 2;

  --r: 1rem;
  --s: 1.5rem;
  clip-path: shape(
    from 0 0,
    line to 100% 0,
    line to 100% 60%,
    line to 30% 60%,
    curve by calc(-1 * var(--s)) var(--r) with calc(-0.8 * var(--s))
      calc(0.2 * var(--r)),
    curve by calc(-1 * var(--s)) var(--r) with calc(-0.2 * var(--s))
      calc(0.8 * var(--r)),
    line to 0 100%
  );
}

.bigLed {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;
  grid-column: 1 / 2;
  grid-row: 1 / 4;
  justify-self: start;
  padding-left: 0.75rem;
}

.outerCircle {
  background: white;
  width: 3.5rem;
  height: 3.5rem;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  align-self: center;
  justify-self: center;
  z-index: 1;
  border-radius: 100%;
  border: solid black 1px;
}

.innerCircle {
  background: turquoise;
  width: 3rem;
  height: 3rem;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  align-self: center;
  justify-self: center;
  z-index: 1;
  border-radius: 100%;
  border: solid black 1px;
  box-shadow: inset #00000025 -0.25rem -0.3rem 0.1rem 0.4rem;
}

.whiteDot {
  background: white;
  width: 1rem;
  height: 1rem;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  margin-top: 1.5rem;
  margin-left: 0.75rem;
  z-index: 1;
  border-radius: 100%;
  filter: blur(3px);
}

.miniLed {
  background: white;
  display: grid;
  grid-column: auto auto auto;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  justify-content: start;
  gap: 0.5rem;
  padding-top: 0.5rem;
  padding-left: 5rem;
}

.miniLed > div {
  grid-row: 1 / 2;
  width: 1rem;
  height: 1rem;
  border-radius: 100%;
  z-index: 1;
  box-shadow: inset #00000025 -0.1rem -0.15rem 0 0.1rem;
  border: solid black 1px;
}

.miniLedOne {
  background: var(--small-diode-red);
}
.miniLedTwo {
  background: var(--small-diode-yellow);
}
.miniLedThree {
  background: var(--small-diode-green);
}
</style>
