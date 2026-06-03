<template>
  <div class="CustomMarker">
    <div class="CustomMarker__content">
      <img src="/icons/arrows.png" alt="Strzałka" class="CustomMarker__arrow" />
      <a
        href="https://www.google.com/maps/dir/?api=1&destination=PRACOWNIA+KRAWIECKA+Magdaleny+Dekier+Poznań"
        target="_blank"
        rel="noopener noreferrer"
        class="CustomMarker__btn"
      >
        Pokaż trasę
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.CustomMarker {
  width: 0;
  height: 0;
  position: relative;
  pointer-events: none;

  &__content {
    position: absolute;
    bottom: 0; /* Grot na dole */
    left: 0; /* Grot po lewej */

    transform: translate(0, 0);

    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: auto;
  }

  &__arrow {
    position: absolute;
    left: 0px;
    bottom: -70px;
    width: 80px;
    height: auto;
    display: block;
  }

  &__btn {
    position: absolute;
    left: 10px;
    bottom: -110px;
    width: 130px;
    background-color: #1250c4;
    border: 3px solid #1250c4;
    color: #fff;
    text-decoration: none;
    padding: 8px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.9px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    white-space: nowrap;
    transform-origin: center center; /* Wymusza płynne rośnięcie idealnie ze środka */
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
