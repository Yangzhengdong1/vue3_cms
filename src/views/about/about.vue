<template>
  <div class="about">
    <div class="profile-container">
      <div class="back-button">
        <button @click="$router.back()">
          <span>&larr; Back</span>
        </button>
      </div>
      <div class="profile-header">
        <div class="avatar">
          <img src="https://via.placeholder.com/120" alt="User Avatar" />
        </div>
        <div class="user-info">
          <h2>John Doe</h2>
          <p>Administrator</p>
        </div>
      </div>

      <div class="profile-body">
        <div class="info-item">
          <label>Email:</label>
          <p>johndoe@example.com</p>
        </div>
        <div class="info-item">
          <label>Phone:</label>
          <p>+1 234 567 890</p>
        </div>
        <div class="info-item">
          <label>Role:</label>
          <p>Super Administrator</p>
        </div>
        <div class="info-item">
          <label>Location:</label>
          <p>New York, USA</p>
        </div>
        <div class="edit-button">
          <button>Edit Profile</button>
        </div>
      </div>

      <div class="security-settings">
        <a href="#">Change Password</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
  .about {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    .back {
      position: absolute;
      top: 20px;
      left: 5%;
      cursor: pointer;
    }
  }
  .profile-container {
    width: 600px;
    background: var(--v-profile-page-bgc);
    border-radius: 8px;
    box-shadow: var(--v-profile-box-shadow);
    padding: 30px;
    font-family: Arial, sans-serif;
  }

  .profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    border-bottom: 2px solid var(--v-profile-border-color);
    padding-bottom: 20px;
  }

  .back-button {
    margin-right: 20px;
  }

  .back-button button {
    background-color: transparent;
    color: var(--v-profile-btn-color);
    font-size: 16px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    margin-bottom: 20px;
  }

  .back-button button:hover {
    text-decoration: underline;
  }

  .avatar {
    width: 120px;
    height: 120px;
    margin-right: 20px;
    border-radius: 50%;
    overflow: hidden;
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .user-info h2 {
    font-size: 22px;
    color: var(--v-profile-color-1);
    margin: 0;
  }

  .user-info p {
    font-size: 14px;
    color: var(--v-profile-color-3);
  }

  .profile-body .info-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 16px;
  }

  .profile-body .info-item label {
    font-weight: 600;
    color: var(--v-profile-color-1);
  }

  .profile-body .info-item p {
    color: var(--v-profile-color-2);
  }

  .edit-button {
    text-align: center;
  }

  .edit-button button {
    background-color: var(--v-profile-btn-color);
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    padding: 12px 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    width: auto;
  }

  .edit-button button:hover {
    background-color: var(--v-profile-btn-hover-color);
  }

  .security-settings {
    text-align: center;
    margin-top: 30px;
  }

  .security-settings a {
    color: var(--v-profile-btn-color);
    font-size: 14px;
    text-decoration: none;
  }

  .security-settings a:hover {
    text-decoration: underline;
  }
</style>
