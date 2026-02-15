# EventFlow — Event Management & Booking Platform

A modern **single-page application (SPA)** for creating, managing, and booking events. Built to demonstrate clean frontend architecture, real-world product thinking, and backend-ready design.

---

## Overview

EventFlow serves two audiences:

- **Event Creators / Admins** — create events, manage capacity, and track bookings via a protected dashboard.
- **Public Attendees** — browse events and book tickets instantly with **no account required**.

---

## Features

### Public-Facing
- Landing page with clear value proposition and CTA
- Browse upcoming events with capacity and availability
- Event details with inline booking (name + email)
- Automatic sold-out handling

### Creator Dashboard (Authenticated)
- Overview stats (events, bookings, capacity usage)
- Manage events and view bookings per event
- Create and delete events with validation
- Profile and settings pages
- Responsive sidebar navigation

### Authentication
- Email/password login and registration
- Auto-login after registration
- Protected dashboard routes

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** React Context API
- **Routing:** Custom client-side SPA router
- **Utilities:** date-fns, Lucide Icons

---

## Architecture

- Implemented as a **client-side SPA** within a single Next.js page
- Central `AppProvider` manages auth, events, and bookings
- Custom in-memory router for navigation and route params
- UI fully decoupled from data source (mock → real API ready)

---

## Domain Models

- **Event:** schedule, capacity, bookings, owner
- **Booking:** attendee info and timestamp
- **User:** basic profile and role

Frontend models mirror a .NET backend domain.

---

## Backend Integration

Designed to connect seamlessly to an **ASP.NET Core API**:


## Purpose

EventFlow is a **portfolio-grade project** showcasing:

- Scalable SPA architecture  
- Clean separation of concerns  
- Production-ready frontend patterns  
- Backend-friendly design  

Built for real users — and real systems.
