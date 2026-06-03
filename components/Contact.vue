<template>
  <div id="contact" class="Contact__main-container">
    <div class="Contact__center">
      <span class="Contact__title"> Kontakt </span>
      <div class="Contact__half-container">
        <div class="Contact__half-container-cell">
          <div class="Contact__half-container-title">Adres:</div>
          <div class="Contact__text">ul. Jaroczyńskiego 41</div>
          <div class="Contact__text">60-692 Poznań-Piątkowo</div>
        </div>
        <div class="Contact__half-container-cell">
          <div class="Contact__half-container-title">Godziny otwarcia:</div>
          <div class="Contact__text">
            Poniedziałek: <span>9:00 - 18:00</span>
          </div>
          <div class="Contact__text">Wtorek: <span>8:00 - 17:00</span></div>
          <div class="Contact__text">Środa: <span>8:00 - 17:00</span></div>
          <div class="Contact__text">Czwartek: <span>9:00 - 18:00</span></div>
          <div class="Contact__text">Piątek: <span>Zamknięte</span></div>
        </div>
        <div class="Contact__half-container-cell">
          <div class="Contact__half-container-title">Skontaktuj się:</div>
          <a href="tel:691860192" class="Contact__text">
            Telefon: 691 860 192 </a
          ><a href="mailto:magdalenadekier@op.pl" class="Contact__text">
            E-mail: magdalenadekier@op.pl
          </a>
        </div>
      </div>
    </div>

    <!-- <iframe
      title="Pracownia Krawiecka Magdaleny Dekier"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2431.4108610524404!2d16.90338781606623!3d52.45358617980165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47044341d3556dc5%3A0xd4910db4433e5919!2sPRACOWNIA+KRAWIECKA+Magdaleny+Dekier+Pozna%C5%84!5e0!3m2!1spl!2spl!4v1533744299605"
      :width="getWindowSize()"
      height="410"
      frameborder="0"
      style="border: 0"
      allowfullscreen
    ></iframe> -->

    <ClientOnly>
      <div id="map" style="width: 100%; height: 100%; min-height: 450px"></div>
    </ClientOnly>
    <div id="map" class="Contact__footer">
      <span class="Contact__title"> Polecamy: </span>
      <div class="Contact__row">
        <a target="_blank" href="https://dezalroletypoznan.pl" rel="noopener">
          <div class="Contact__logo-dezal" />
        </a>
        <!-- <a target="_blank" href="https://techbless.pl" rel="noopener">
          <img
            src="/images/tb.svg"
            class="Contact__logo-tb"
            alt="Firma techbless.pl - 3d w przeglądarce dla firm"
          />
        </a>
        <a target="_blank" href="https://pravisto.pl" rel="noopener">
          <img
            src="/images/pravisto.jpg"
            class="Contact__logo-tb"
            alt="Pravisto - Aplikacja dla deweloperów"
          />
        </a> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, createApp } from "vue";
import CustomMapMarker from "~/components/Custom-map-marker.vue"; // <-- Import naszego komponentu
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

const initGoogleMap = async () => {
  setOptions({
    key: "AIzaSyCCzurmr3FtjmHaiBfPzDx3IAdgsTaOogY",
    version: "weekly",
  } as any);

  try {
    // 1. Dodajemy import 'Polygon' z biblioteki 'maps'
    const { Map, Polygon } = (await importLibrary("maps")) as any;
    const { AdvancedMarkerElement } = (await importLibrary("marker")) as any;

    const position = { lat: 52.45362985985779, lng: 16.905527873339654 };
    const currentZoom = window.innerWidth < 600 ? 16 : 18;
    const map = new Map(document.getElementById("map"), {
      center: position,
      zoom: currentZoom, // Dałem zoom 18, żeby od razu było widać z bliska ładny obrys
      mapId: "a93ae4d0d1b19b722f6d451b",
      disableDefaultUI: true,
      zoomControl: true,
      fullscreenControl: false,
      streetViewControl: false,
      gestureHandling: "cooperative",
    });

    // --- NOWOŚĆ: RYSOWANIE GEOGRAFICZNEGO OBRYSU BUDYNKU ---
    // Tutaj podajemy współrzędne rogów dachu (zgodnie ze wskazówkami zegara)
    const buildingCorners = [
      { lat: 52.4536, lng: 16.9055 }, // Lewy górny róg
      { lat: 52.45359, lng: 16.90565 }, // Prawy górny róg
      { lat: 52.45348, lng: 16.90563 }, // Prawy dolny róg
      { lat: 52.45349, lng: 16.90548 }, // Lewy dolny róg
    ];

    // Tworzymy żółty wielokąt
    const buildingHighlight = new Polygon({
      paths: buildingCorners,
      strokeColor: "#1250c4", // Żółta ramka
      strokeOpacity: 1.0,
      strokeWeight: 3, // Grubość ramki
      fillColor: "#1250c4", // Żółte wypełnienie
      fillOpacity: 0.4, // 40% widoczności
    });

    // Nakładamy wielokąt na mapę!
    buildingHighlight.setMap(map);
    // -------------------------------------------------------

    // --- STRZAŁKA I PRZYCISK (Nasz marker z Vue) ---
    const markerContainer = document.createElement("div");
    createApp(CustomMapMarker).mount(markerContainer);
    const centerOfBuilding = { lat: 52.45354, lng: 16.90556 };
    new AdvancedMarkerElement({
      map: map,
      position: centerOfBuilding,
      content: markerContainer,
      title: "DEŻAL Rolety Poznań",
    });
  } catch (error) {
    console.error("Błąd ładowania mapy:", error);
  }
};

const windowWidth = ref(0);
onMounted(() => {
  getWindowSize();
  initGoogleMap();
  window.addEventListener("resize", () => {
    windowWidth.value = window.innerWidth;
  });
});

const getWindowSize = () => {
  windowWidth.value = window.innerWidth;
};
</script>

<style lang="scss">
@import "Contact";
</style>
