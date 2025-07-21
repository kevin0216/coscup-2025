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
            COSCUP 2025 On-Site Activities
          </h2>
          <p class="activity-subtitle">
            In addition to a rich agenda, COSCUP 2025 has planned "Attendee Services," "Pre-Conference Parties," and other activities, <br>
            allowing you to enjoy networking and relaxation on-site.
          </p>
        </div>

        <div class="cards-grid">
          <div class="card">
            <div class="card-content">
              <div class="card-text">
                <p class="card-title">
                  Attendee Services
                </p>
                <p class="card-description">
                  Don't forget to take a break after the sessions! COSCUP offers massage stations and nitro coffee to help you recharge and relax.
                </p>
              </div>
              <div class="card-action">
                <CButton disabled>
                  Comming Soon
                </CButton>
              </div>
            </div>
            <div class="card-image-container">
              <img
                alt="Attendee Services"
                class="card-image"
                :src="image1"
              >
            </div>
          </div>

          <div class="card">
            <div class="card-content">
              <div class="card-text">
                <p class="card-title">
                  Pre-Conference Party
                </p>
                <p class="card-description">
                  Join the COSCUP 2025 Pre-Conference Party on 2025/8/x to chat with speakers and community members, and raise a glass to open source!
                </p>
              </div>
              <div class="card-action">
                <CButton
                  href="https://ocf.neticrm.tw/civicrm/event/info?reset=1&id=47"
                  tag="a"
                  target="_blank"
                >
                  Have a Drink
                </CButton>
              </div>
            </div>
            <div class="card-image-container">
              <img
                alt="Pre-Conference Party"
                class="card-image"
                :src="image4"
              >
            </div>
          </div>

          <div class="card">
            <div class="card-content">
              <div class="card-text">
                <p class="card-title">
                  BoF/Hacking Room
                </p>
                <p class="card-description">
                  Every year, COSCUP brings together open culture and open source enthusiasts from Taiwan and around the world. The BoF/hacking room provides an alternative to the regular agenda, offering a chance for in-depth, face-to-face interaction among open source peers!
                </p>
              </div>
              <div class="card-action">
                <CButton disabled>
                  Comming Soon
                </CButton>
              </div>
            </div>
            <div class="card-image-container">
              <img
                alt="BoF/Hacking Room"
                class="card-image"
                :src="image2"
              >
            </div>
          </div>

          <div class="card">
            <div class="card-content">
              <div class="card-text">
                <p class="card-title">
                  Attendee Survey
                </p>
                <p class="card-description">
                  COSCUP wants to better understand this year's attendees! Whether you're a long-time open source community member or a first-time visitor, we welcome you to fill out the survey and help us understand the composition and future direction of our community.
                </p>
              </div>
              <div class="card-action">
                <CButton disabled>
                  Comming Soon
                </CButton>
              </div>
            </div>
            <div class="card-image-container">
              <img
                alt="Attendee Survey"
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
