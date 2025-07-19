<script setup lang="ts">
import image1 from '#assets/images/activity1.jpg'
import image2 from '#assets/images/activity2.jpg'
import image3 from '#assets/images/activity3.jpg'
import image4 from '#assets/images/activity4.png'
import banner from '#assets/images/banner.png'
import CButton from '#components/CButton.vue'
</script>

<template>
  <div class="home-container">
    <div class="banner-container">
      <img
        alt="COSCUP 2025 Banner"
        class="banner-image"
        :src="banner"
      >
    </div>

    <div class="activity-section">
      <div class="activity-content">
        <div class="activity-header">
          <h2 class="activity-title">
            COSCUP 2025 會場活動
          </h2>
          <p class="activity-subtitle">
            除了豐富的議程，今年 COSCUP 也規劃了「會眾服務」、「會前派對等活動」, <br>
            讓你在會場也能享受交流與放鬆時光。
          </p>
        </div>

        <div class="cards-grid">
          <div class="card">
            <div class="card-content">
              <div class="card-text">
                <p class="card-title">
                  會眾服務
                </p>
                <p class="card-description">
                  聽完議程也別忘了休息一下!COSCUP 提供按摩小站與氮氣咖啡,陪你補充能量、舒緩疲憊。
                </p>
              </div>
              <div class="card-action">
                <CButton>前往了解</CButton>
              </div>
            </div>
            <div class="card-image-container">
              <img
                alt="會眾服務"
                class="card-image"
                :src="image1"
              >
            </div>
          </div>

          <div class="card">
            <div class="card-content">
              <div class="card-text">
                <p class="card-title">
                  會前派對
                </p>
                <p class="card-description">
                  COSCUP 2025 會前派對 2025/8/x,跟大會講者與社群同好大聊特聊、為開源乾一杯!
                </p>
              </div>
              <div class="card-action">
                <CButton>來喝一杯</CButton>
              </div>
            </div>
            <div class="card-image-container">
              <img
                alt="會前派對"
                class="card-image"
                :src="image4"
              >
            </div>
          </div>

          <div class="card">
            <div class="card-content">
              <div class="card-text">
                <p class="card-title">
                  BoF/hacking room
                </p>
                <p class="card-description">
                  每年 COSCUP 聚集了臺灣及世界各地的開放文化及開源愛好者,BoF / hacking room 在會期提供有別於常規議程,讓開源同好面對面深度雙向交流的機會!
                </p>
              </div>
              <div class="card-action">
                <CButton>揪團+1</CButton>
              </div>
            </div>
            <div class="card-image-container">
              <img
                alt="BoF/hacking room"
                class="card-image"
                :src="image2"
              >
            </div>
          </div>

          <div class="card">
            <div class="card-content">
              <div class="card-text">
                <p class="card-title">
                  參與者大調查
                </p>
                <p class="card-description">
                  COSCUP 想更了解今年的參與者樣貌!不論是長期參與開源社群,或是首次走進 COSCUP,都歡迎填寫問卷,一起關注開源社群的組成與未來方向。
                </p>
              </div>
              <div class="card-action">
                <CButton>前往填寫</CButton>
              </div>
            </div>
            <div class="card-image-container">
              <img
                alt="參與者大調查"
                class="card-image"
                :src="image3"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  background-color: #ffffff;
}

.banner-container {
  position: relative;
}

.banner-image {
  width: 100%;
  object-fit: cover;
}

.activity-section {
  background: linear-gradient(to bottom, #7f73fe, #7f73fec8), url('../../../assets/images/activity-bg.jpg');
  background-size: cover;
  background-position: center;
  padding-top: 4rem;
  padding-bottom: 4rem;
  position: relative;
}

.activity-content {
  max-width: 80rem; /* 1280px */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.activity-header {
  text-align: center;
}

.activity-title {
  font-size: 2.25rem; /* 36px */
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #ffffff;
}

.activity-subtitle {
  margin-top: 1.5rem;
  font-size: 1.125rem; /* 18px */
  line-height: 1.75;
  color: #ffffff;
}

.cards-grid {
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 2rem;
}

.card {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  border-radius: 0.5rem; /* 8px */
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
}

.card-image-container {
  flex-shrink: 0;
  width: 40%;
}

.card-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.card-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
}

.card-text {
  flex: 1;
}

.card-title {
  font-size: 1.25rem; /* 20px */
  font-weight: 600;
  color: #3c3c5b;
}

.card-description {
  margin-top: 0.75rem;
  font-size: 1rem; /* 16px */
  color: #6b7280;
}

.card-action {
  margin-top: 1.5rem;
}

/* Responsive styles */
@media (min-width: 747px) {
  .activity-section {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
  .activity-title {
    font-size: 2.5rem; /* 40px */
  }
  .cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .activity-content {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
