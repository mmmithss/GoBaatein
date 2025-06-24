

# Go Baatein 🌐

## Project Overview

**Go Baatein** is a social platform designed to bridge the linguistic diversity of India by enabling people from different dialects and language backgrounds to interact using **English as a common language**. Unlike traditional language learning apps that are often text-heavy or focused on foreign languages, Go Baatein provides a **real-time, peer-to-peer communication platform** to help Indians connect, interact, and naturally learn new regional languages while making friends.



## Problem Statement

In a linguistically diverse country like India, there is a **lack of dedicated social platforms that facilitate language learning and cultural exchange through real-time interaction**. Most existing apps focus on foreign languages or offer isolated learning experiences that don't encourage conversational practice.

**Go Baatein addresses this gap** by providing:

* A **common platform for users to communicate across dialects using English.**
* Opportunities for users to **practice and learn Indian languages naturally** through chats, video calls, and friendships.



---

## Software Development Process

### 1. Requirement Gathering & Analysis

#### Functional Requirements:

* User Authentication (Signup/Login)
* Profile creation with preferred languages
* Friend request system
* Real-time messaging and video calls (using Stream API)
* Communication primarily in English
* Language preference tags
* (Optional for future versions) Basic language learning aids

#### Non-Functional Requirements:

* Scalability for multiple users
* Secure chats and video calls
* Responsive design (Mobile + Desktop)
* Fast and efficient performance



### 2. System Design

#### High-Level Design:

* **Frontend:** React (Vite), Redux Toolkit
* **Backend:** Node.js with Express.js
* **Database:** MongoDB
* **Real-time Communication:** Stream API (Chat & Video)
* **Authentication:** JWT + Cookies

#### Key Components:

* User Service: Authentication, Profile Management
* Friendship Service: Friend Requests, Friends List
* Messaging Service: Stream Chat Integration
* Video Call Service: Stream Video API Integration
* (Future) Language Matching and Recommendations


### 3. Technology Stack

* **Frontend:** React, Redux Toolkit, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Real-time Communication:** Stream API (Chat & Video)
* **Authentication:** JWT + Bcrypt
* **Hosting:** Vercel (Frontend), Render/Heroku (Backend), MongoDB Atlas (Database)



### 4. Development Phases

| Phase   | Task                               |
| ------- | ---------------------------------- |
| Phase 1 | Authentication, Profile Management |
| Phase 2 | Friend Request System              |
| Phase 3 | Real-time Chat Integration         |
| Phase 4 | Video Calling Integration          |
| Phase 5 | UI Polish, Security Features       |
| Phase 6 | Testing and Deployment             |



### 5. Testing Strategy

* **Unit Testing:** Frontend components and backend services
* **Integration Testing:** API routes and Stream services
* **End-to-End Testing:** Complete user flows (Signup, Friend Requests, Chat, Video Call)
* **Performance Testing:** Real-time communication load handling
* **Security Testing:** JWT security, Input validation



### 6. Deployment

* Optional: CI/CD with GitHub Actions
* **Frontend Hosting:** Vercel
* **Backend Hosting:** Render/Heroku
* **Database:** MongoDB Atlas
* Environment variables (Stream keys, JWT secrets) handled securely.



### 7. Future Enhancements

* Friend suggestions based on language preferences
* In-app multilingual tutorials
* Group video calling
* Language proficiency badges
* AI-based language learning chatbots

---


