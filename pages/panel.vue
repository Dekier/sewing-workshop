<script setup lang="ts">
import {
  weekdayNames,
  weekdayOrder,
  warsawTime,
  type HoursDocument,
  type BusinessSchedule,
  type BusinessId,
} from "#shared/business-hours";

definePageMeta({ layout: false });
useSeoMeta({ title: "Panel godzin", robots: "noindex, nofollow" });
const password = ref("");
const authenticated = ref(false);
const busy = ref(false);
const loginError = ref("");
const message = ref("");
const errorMessage = ref("");
const document = ref<HoursDocument | null>(null);
const selected = ref<BusinessId | "both">("workshop");
const draft = ref<BusinessSchedule>({ week: Array(7).fill(null), leave: [] });
const leaveFrom = ref("");
const leaveTo = ref("");
const announceFrom = ref(warsawTime().date);
const dirty = ref(false);
const heading = ref<HTMLHeadingElement | null>(null);
let loginTimer: ReturnType<typeof setTimeout>;
let loginController: AbortController | null = null;

function errorText(error: unknown) {
  const value = error as { data?: { statusMessage?: string }; status?: number };
  if (value.status === 401) authenticated.value = false;
  return (
    value.data?.statusMessage || "Nie udało się połączyć. Spróbuj ponownie."
  );
}

function loadDraft() {
  if (!document.value) return;
  draft.value = JSON.parse(
    JSON.stringify(
      document.value.businesses[
        selected.value === "both" ? "workshop" : selected.value
      ],
    ),
  );
  dirty.value = false;
  message.value = "";
  errorMessage.value = "";
}

async function loadHours() {
  document.value = await $fetch<HoursDocument>("/api/panel/hours");
  loadDraft();
}

async function login(value: string) {
  if (authenticated.value || busy.value || value.length < 8) return;
  loginController = new AbortController();
  busy.value = true;
  try {
    await $fetch("/api/panel/session", {
      method: "POST",
      body: { password: value },
      signal: loginController.signal,
    });
    authenticated.value = true;
    password.value = "";
    loginError.value = "";
    await loadHours();
    await nextTick();
    heading.value?.focus();
  } catch (error) {
    if (!(error as { name?: string }).name?.includes("Abort"))
      loginError.value = errorText(error);
  } finally {
    busy.value = false;
  }
}

watch(password, (value) => {
  clearTimeout(loginTimer);
  loginController?.abort();
  loginError.value = "";
  loginTimer = setTimeout(() => void login(value), 700);
});

function selectBusiness(value: BusinessId | "both") {
  if (value === selected.value) return;
  if (
    dirty.value &&
    !window.confirm("Masz niezapisane zmiany. Przełączyć firmę i je odrzucić?")
  )
    return;
  selected.value = value;
  loadDraft();
}

function toggleDay(index: number, enabled: boolean) {
  draft.value.week[index] = enabled
    ? { opens: "09:00", closes: "17:00" }
    : null;
  dirty.value = true;
}

function addLeave() {
  errorMessage.value = "";
  if (
    !leaveFrom.value ||
    !leaveTo.value ||
    !announceFrom.value ||
    leaveTo.value < leaveFrom.value ||
    announceFrom.value > leaveFrom.value
  ) {
    errorMessage.value =
      "Wybierz daty wolnego i zapowiedzi. Zapowiedź musi zaczynać się najpóźniej w pierwszym dniu wolnego.";
    return;
  }
  if (
    draft.value.leave.some(
      (period) => period.from <= leaveTo.value && period.to >= leaveFrom.value,
    )
  ) {
    errorMessage.value = "Ten termin nakłada się na inny okres wolnego.";
    return;
  }
  draft.value.leave.push({
    id: crypto.randomUUID(),
    from: leaveFrom.value,
    to: leaveTo.value,
    announceFrom: announceFrom.value,
  });
  draft.value.leave.sort((a, b) => a.from.localeCompare(b.from));
  leaveFrom.value = "";
  leaveTo.value = "";
  dirty.value = true;
}

async function save() {
  if (!document.value || busy.value) return;
  if (leaveFrom.value || leaveTo.value) {
    errorMessage.value =
      "Najpierw dodaj wpisany okres wolnego do listy albo wyczyść daty.";
    return;
  }
  busy.value = true;
  message.value = "";
  errorMessage.value = "";
  try {
    document.value = await $fetch<HoursDocument>("/api/panel/hours", {
      method: "PUT",
      body: {
        revision: document.value.revision,
        businesses:
          selected.value === "both" ? ["workshop", "dezal"] : [selected.value],
        schedule: draft.value,
      },
    });
    dirty.value = false;
    message.value =
      selected.value === "both"
        ? "Zapisano godziny i wolne dla obu firm."
        : "Zapisano godziny i wolne.";
    await refreshNuxtData("business-hours");
  } catch (error) {
    errorMessage.value = errorText(error);
  } finally {
    busy.value = false;
  }
}

async function reload() {
  if (
    dirty.value &&
    !window.confirm("Wczytać zapisane godziny i odrzucić niezapisane zmiany?")
  )
    return;
  busy.value = true;
  try {
    await loadHours();
  } catch (error) {
    errorMessage.value = errorText(error);
  } finally {
    busy.value = false;
  }
}

async function logout() {
  if (
    dirty.value &&
    !window.confirm("Wylogować się i odrzucić niezapisane zmiany?")
  )
    return;
  try {
    await $fetch("/api/panel/session", { method: "DELETE" });
    authenticated.value = false;
    document.value = null;
    password.value = "";
  } catch (error) {
    errorMessage.value = errorText(error);
  }
}

const beforeUnload = (event: BeforeUnloadEvent) => {
  if (dirty.value) {
    event.preventDefault();
    event.returnValue = "";
  }
};
onMounted(async () => {
  window.addEventListener("beforeunload", beforeUnload);
  try {
    const session = await $fetch<{ authenticated: boolean }>(
      "/api/panel/session",
    );
    if (session.authenticated) {
      authenticated.value = true;
      await loadHours();
    }
  } catch (error) {
    loginError.value = errorText(error);
  }
});
onBeforeUnmount(() => {
  clearTimeout(loginTimer);
  loginController?.abort();
  window.removeEventListener("beforeunload", beforeUnload);
});
</script>

<template>
  <main
    class="Panel__main-container"
    :class="{ 'Panel__main-container--locked': !authenticated }"
  >
    <div v-if="!authenticated" class="Panel__gate">
      <label class="Panel__visually-hidden" for="panel-password"
        >Hasło do panelu</label
      >
      <input
        id="panel-password"
        v-model="password"
        class="Panel__password"
        type="password"
        placeholder="Hasło"
        autocomplete="current-password"
        maxlength="128"
        :aria-invalid="!!loginError"
        aria-describedby="panel-login-status"
        @keydown.enter.prevent="login(password)"
      />
      <p id="panel-login-status" class="Panel__login-status" role="status">
        {{ loginError || (busy ? "Sprawdzanie…" : "") }}
      </p>
    </div>
    <div v-else class="Panel__content">
      <header class="Panel__header">
        <div>
          <p class="Panel__eyebrow">Pracownia krawiecka · DEŻAL</p>
          <h1 ref="heading" class="Panel__title" tabindex="-1">
            Godziny i dni wolne
          </h1>
        </div>
        <button class="Panel__quiet-button" type="button" @click="logout">
          Wyloguj
        </button>
      </header>
      <nav class="Panel__businesses" aria-label="Wybierz firmę">
        <button
          v-for="option in [
            { id: 'workshop', label: 'Pracownia krawiecka' },
            { id: 'dezal', label: 'DEŻAL' },
            { id: 'both', label: 'Obie firmy' },
          ] as const"
          :key="option.id"
          class="Panel__business"
          :class="{ 'Panel__business--selected': selected === option.id }"
          :aria-pressed="selected === option.id"
          :disabled="busy"
          @click="selectBusiness(option.id)"
        >
          {{ option.label }}
        </button>
      </nav>
      <p v-if="selected === 'both'" class="Panel__notice">
        Poniższy formularz zaczyna od ustawień pracowni. Zapis zastąpi godziny i
        okresy wolnego w obu firmach tymi samymi ustawieniami.
      </p>
      <form v-if="document" class="Panel__form" @submit.prevent="save">
        <fieldset class="Panel__section" :disabled="busy">
          <legend class="Panel__section-title">Zwykły tydzień pracy</legend>
          <p class="Panel__description">
            Godziny dotyczą czasu w Polsce. Odznacz dzień, w którym firma jest
            nieczynna.
          </p>
          <div v-for="index in weekdayOrder" :key="index" class="Panel__day">
            <label class="Panel__day-label"
              ><input
                class="Panel__checkbox"
                type="checkbox"
                :checked="!!draft.week[index]"
                @change="
                  toggleDay(index, ($event.target as HTMLInputElement).checked)
                "
              />{{ weekdayNames[index] }}</label
            >
            <div v-if="draft.week[index]" class="Panel__time-pair">
              <label class="Panel__field"
                ><span>Od</span
                ><input
                  v-model="draft.week[index]!.opens"
                  class="Panel__input"
                  type="time"
                  required
                  :aria-label="`${weekdayNames[index]} — od`"
                  @input="dirty = true"
              /></label>
              <label class="Panel__field"
                ><span>Do</span
                ><input
                  v-model="draft.week[index]!.closes"
                  class="Panel__input"
                  type="time"
                  required
                  :aria-label="`${weekdayNames[index]} — do`"
                  @input="dirty = true"
              /></label>
            </div>
            <span v-else class="Panel__closed">Nieczynne</span>
          </div>
        </fieldset>
        <fieldset class="Panel__section" :disabled="busy">
          <legend class="Panel__section-title">Urlop i inne dni wolne</legend>
          <p class="Panel__description">
            Obie daty wliczają się do wolnego. Podczas przerwy strona poda
            najbliższy dzień powrotu według tygodnia pracy.
          </p>
          <div class="Panel__leave-fields">
            <label class="Panel__field"
              >Wolne od<input
                v-model="leaveFrom"
                class="Panel__input"
                type="date"
            /></label>
            <label class="Panel__field"
              >Wolne do<input
                v-model="leaveTo"
                class="Panel__input"
                type="date"
                :min="leaveFrom"
            /></label>
            <label class="Panel__field"
              >Pokaż zapowiedź od<input
                v-model="announceFrom"
                class="Panel__input"
                type="date"
                :max="leaveFrom || undefined"
            /></label>
          </div>
          <button
            class="Panel__secondary-button"
            type="button"
            @click="addLeave"
          >
            Dodaj okres wolnego
          </button>
          <ul v-if="draft.leave.length" class="Panel__leave-list">
            <li
              v-for="(period, index) in draft.leave"
              :key="period.id"
              class="Panel__leave-item"
            >
              <div>
                <strong
                  >{{ period.from.split("-").reverse().join(".") }} –
                  {{ period.to.split("-").reverse().join(".") }}</strong
                ><span class="Panel__description"
                  >Zapowiedź od
                  {{ period.announceFrom.split("-").reverse().join(".") }}</span
                >
              </div>
              <button
                type="button"
                class="Panel__quiet-button"
                :aria-label="`Usuń wolne od ${period.from} do ${period.to}`"
                @click="
                  draft.leave.splice(index, 1);
                  dirty = true;
                "
              >
                Usuń
              </button>
            </li>
          </ul>
          <p v-else class="Panel__description">
            Brak zaplanowanych okresów wolnego.
          </p>
        </fieldset>
        <p v-if="errorMessage" class="Panel__error" role="alert">
          {{ errorMessage }}
        </p>
        <p v-if="message" class="Panel__success" role="status">{{ message }}</p>
        <footer class="Panel__actions">
          <button class="Panel__save-button" type="submit" :disabled="busy">
            {{ busy ? "Zapisywanie…" : "Zapisz zmiany" }}</button
          ><button
            class="Panel__quiet-button"
            type="button"
            :disabled="busy"
            @click="reload"
          >
            Wczytaj zapisane</button
          ><span v-if="dirty" class="Panel__description"
            >Niezapisane zmiany</span
          >
        </footer>
      </form>
      <div v-else class="Panel__notice">
        <p role="alert">
          {{ errorMessage || loginError || "Nie udało się wczytać godzin." }}
        </p>
        <button class="Panel__secondary-button" type="button" @click="reload">
          Spróbuj ponownie
        </button>
      </div>
    </div>
  </main>
</template>

<style src="./panel.scss" lang="scss"></style>
