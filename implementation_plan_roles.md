# Implementation Plan - Phase 2: User Roles & Membership Tiers

This phase focuses on defining user roles (Teacher vs. Practitioner) and implementing role-based access control (RBAC) using Clerk metadata.

## 1. User Metadata Definition

- Define `membershipType`: `'teacher' | 'practitioner'`
- Define `tier`: `'free' | 'monthly' | 'annual'`
- Define `status`: `'active' | 'inactive' | 'pending_onboarding'`

## 2. Onboarding Flow

- Create `/onboarding` page (Server Component).
- If a user just signed up and has no `membershipType`, redirect them to `/onboarding`.
- Onboarding options:
  - "I am a Teacher" (Join Teacher Collective)
  - "I am a Practitioner" (Access Video Library)
- Submit choice to a Server Action that updates `user.publicMetadata` via Clerk API.

## 3. Middleware Updates

- Update `middleware.ts` to protect onboarding and redirect users there if metadata is missing.

## 4. Role-Based Dashboard

- Customize the `/dashboard` based on `user.publicMetadata.membershipType`.
- Teachers see: Teacher Directory management, Teacher Collective resources.
- Practitioners see: Video Library, Live Class schedule.

## 5. Directory Management (For Teachers)

- Allow Teachers to create/edit their own directory listing (integrating with the mock `teachers.ts` or a real DB later).

## 6. Payment Integration Placeholder

- Setup UI placeholders for Stripe checkout based on tier selection.

---

### Progress Tracking

- [x] Setup Clerk Server API for metadata updates
- [x] Create `/onboarding` page
- [x] Implement onboarding Server Action
- [x] Update Middleware for redirection (Handled via Component Redirects for robustness)
- [x] Refactor Dashboard for role-specific content
- [x] Create Teacher Profile Edit Page
