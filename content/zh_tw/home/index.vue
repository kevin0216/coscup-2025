<script setup lang="ts">
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
                  會前派對
                </p>
                <p class="card-description">
                  COSCUP 2025 會前派對 2025/8/x,跟大會講者與社群同好大聊特聊、為開源乾一杯!
                </p>
              </div>
              <div class="card-action">
                <CButton
                  href="https://ocf.neticrm.tw/civicrm/event/info?reset=1&id=47"
                  tag="a"
                  target="_blank"
                >
                  來喝一杯
                </CButton>
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
                <CButton disabled>
                  即將開啟
                </CButton>
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
                <CButton disabled>
                  即將開放
                </CButton>
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

    <div class="about-coscup-section">
      <div class="about-content">
        <div class="about-coscup">
          <h2>關於 COSCUP</h2>
          <p>COSCUP 是一場開放原始碼愛好者的年度大聚會，從 2006 年開始由社群自發舉辦。歡迎開發者、使用者和推廣者一起參加，交流技術、分享經驗，推動自由軟體理念！</p>
          <a href="/2025/about">閱讀更多 →</a>
        </div>

        <div class="two-cards-section">
          <div class="card-deck">
            <div class="info-card">
              <h3>❤️ 贊助 COSCUP</h3>
              <p>COSCUP 過去三年平均約有超過 3,000 人次的會眾和超過 20 個開源技術或議題社群一同參與，同時也有與超過 7 個國際的開源社群或組織連結合作。</p>
              <div class="button-group">
                <CButton disabled>
                  即將開啟
                </CButton>
              </div>
            </div>
            <div class="info-card">
              <h3>📄 訂閱電子報</h3>
              <p>如果你怕忘記參加活動，可以訂閱 COSCUP 活動電子報，不錯過最新活動訊息！</p>
              <CButton
                href="https://secretary.coscup.org/subscribe/coscup"
                tag="a"
                target="_blank"
              >
                訂閱
              </CButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="about-rubyconf-section">
      <div class="about-content">
        <div class="about-rubyconf">
          <h2>關於 RubyConf TW</h2>
          <p>RubyConf Taiwan —— 台灣唯一的年度 Ruby 程式語言國際研討會,由 Ruby Taiwan 社群主辦,陸續已累積九屆的活動成績,每年有百位 Ruby 開發者遠從海外而來,是國際 Ruby 社群的一大盛事,也是亞洲地區除日本以外唯一被 Ruby 之父松本行弘推薦的 Ruby 程式語言年會。</p>
          <CButton
            href="/2025/sessions"
            tag="a"
            target="_blank"
          >
            查看議程
          </CButton>
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

.about-coscup-section {
  background-color: #f3f4f6;
  padding: 4rem 1.5rem;
}

.about-rubyconf-section {
  background-color: #fff0f5;
  padding: 4rem 1.5rem;
}

.about-content {
  max-width: 80rem;
  margin: 0 auto;
}

.about-coscup,
.about-rubyconf {
  text-align: center;
  margin-bottom: 4rem;
}

.about-coscup h2,
.about-rubyconf h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.about-coscup p,
.about-rubyconf p {
  font-size: 1.125rem;
  color: #6b7280;
  line-height: 1.75;
  margin-bottom: 1.5rem;
}

.about-coscup a {
  color: #7f73fe;
  text-decoration: none;
  font-weight: 600;
}

.two-cards-section {
  margin-bottom: 4rem;
}

.card-deck {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.info-card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 0.5rem;
}

.info-card h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.info-card p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.button-group {
  display: flex;
  gap: 1rem;
}

@media (min-width: 768px) {
  .card-deck {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
