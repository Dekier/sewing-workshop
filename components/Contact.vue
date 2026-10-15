<template>
  <section id="contact" class="Contact__main-container">
    <div class="Contact__center">
      <h2 class="Contact__title">Kontakt</h2>
      <div class="Contact__half-container">
        <div class="Contact__half-container-cell">
          <div class="Contact__half-container-title">Adres:</div>
          <div class="Contact__text">ul. Jaroczyńskiego 41</div>
          <div class="Contact__text">60-692 Poznań-Piątkowo</div>
        </div>
        <div class="Contact__half-container-cell">
          <div class="Contact__half-container-title">Godziny otwarcia:</div>
          <template v-if="businessHours">
            <div
              v-for="index in weekdayOrder"
              :key="index"
              class="Contact__text"
            >
              {{ weekdayNames[index] }}:
              <span>{{
                hoursLabel(businessHours.schedule.week[index] ?? null)
              }}</span>
            </div>
            <div
              v-for="period in businessHours.schedule.leave"
              :key="period.id"
              class="Contact__leave-notice"
              role="note"
            >
              <p class="Contact__leave-text">
                Uprzejmie informujemy, że w dniach
                <strong
                  >{{ dateLabel(period.from) }} –
                  {{ dateLabel(period.to) }}</strong
                >
                pracownia
                {{
                  period.from > businessHours.today
                    ? "będzie nieczynna"
                    : "jest nieczynna"
                }}.
              </p>
              <p
                v-if="
                  period.from <= businessHours.today &&
                  period.to >= businessHours.today
                "
                class="Contact__leave-text"
              >
                {{ businessHours.status.hours }}.
              </p>
              <p class="Contact__leave-text">Dziękujemy za wyrozumiałość.</p>
            </div>
          </template>
          <div v-else class="Contact__text">
            Nie udało się wczytać godzin. Zadzwoń do pracowni.
          </div>
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

    <ContactMap />
  </section>
</template>

<script setup lang="ts">
import {
  weekdayNames,
  weekdayOrder,
  hoursLabel,
  dateLabel,
} from "#shared/business-hours";
const { data: businessHours } = await useBusinessHours();
</script>

<style src="./Contact.scss" lang="scss"></style>
