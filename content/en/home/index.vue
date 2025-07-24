<script setup lang="ts">
import coscupLogo from '#assets/icons/logo.svg'
import banner from '#assets/images/banner.png'
import CButton from '#components/CButton.vue'
import HomeCard from '#components/HomeCard.vue'
import { eventData } from '#data/home.js'
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
          <img
            alt="COSCUP"
            class="title-logo"
            :src="coscupLogo"
          >
          <h2 class="activity-title">
            COSCUP 2025 On-Site Activities
          </h2>
          <p class="activity-subtitle">
            In addition to a rich agenda, COSCUP 2025 has planned "Attendee Services","Pre-Conference Parties", and other activities, <br>
            allowing you to enjoy networking and relaxation on-site.
          </p>
        </div>

        <div class="cards-grid">
          <HomeCard
            v-for="eventInfo in eventData"
            :key="eventInfo['title:en-US']"
            :info="eventInfo"
          />
        </div>
      </div>
    </div>

    <div class="about-coscup-section">
      <div class="about-content">
        <div class="about-coscup">
          <h2>About COSCUP</h2>
          <p>COSCUP is an annual conference for open source enthusiasts, organized by the community since 2006. We welcome developers, users, and promoters to join us in exchanging technology, sharing experiences, and advancing the cause of free software!</p>
          <a href="/2025/en/about">Read More →</a>
        </div>

        <div class="two-cards-section">
          <div class="card-deck">
            <div class="info-card">
              <h3>❤️ Sponsor COSCUP</h3>
              <p>Over the past three years, COSCUP has attracted an average of over 3,000 attendees and more than 20 open source technology or topic-based communities. It has also collaborated with over 7 international open source communities and organizations.</p>
              <div class="button-group">
                <CButton disabled>
                  Comming Soon
                </CButton>
              </div>
            </div>
            <div class="info-card">
              <h3>📄 Subscribe to Newsletter</h3>
              <p>If you're afraid of missing out on our activities, you can subscribe to the COSCUP newsletter to stay updated on the latest news!</p>
              <CButton
                href="https://secretary.coscup.org/subscribe/coscup"
                tag="a"
                target="_blank"
              >
                Subscribe
              </CButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="about-rubyconf-section">
      <div class="about-content">
        <div class="about-rubyconf">
          <h2>About RubyConf TW</h2>
          <p>RubyConf Taiwan — Taiwan's only annual international Ruby programming language conference, hosted by the Ruby Taiwan community. With nine successful events to date, it attracts hundreds of Ruby developers from overseas each year, making it a major event in the international Ruby community and the only Ruby language conference in Asia, outside of Japan, recommended by Yukihiro "Matz" Matsumoto, the creator of Ruby.</p>
          <CButton
            href="/2025/en/sessions"
            tag="a"
            target="_blank"
          >
            View Agenda
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
  font-size: 2rem; /* 36px */
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #ffffff;
  text-align: left;
}

.activity-subtitle {
  margin-top: 1.5rem;
  font-size: 1.125rem; /* 18px */
  line-height: 1.75;
  color: #ffffff;
  text-align: left;
}

.cards-grid {
  margin-top: 3rem;
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.cards-grid::-webkit-scrollbar {
  display: none;
}

@media (min-width: 425px) {
  .activity-title {
    font-size: 2.25rem; /* 36px */
  }
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
}

@media (min-width: 1024px) {
  .activity-content {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
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

@media (min-width: 1024px) {
  .about-coscup-section {
    padding: 4rem 2rem;
  }

  .about-rubyconf-section {
    padding: 4rem 2rem;
  }
}

.about-content {
  max-width: 80rem;
  margin: 0 auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.about-coscup,
.about-rubyconf {
  text-align: left;
  margin-bottom: 4rem;
}

@media (min-width: 1024px) {
  .about-coscup,
  .about-rubyconf {
    width: 60%;
  }
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
  display: flex;
  flex-direction: column;
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

.button {
  margin-top: auto;
}

@media (min-width: 768px) {
  .card-deck {
    grid-template-columns: repeat(2, 1fr);
  }
}

.title-logo {
  margin-bottom: 1rem;
  height: 1.8rem;
}

.activity-header .title-logo {
  filter: brightness(1000%);
}
</style>
