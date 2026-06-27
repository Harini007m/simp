# Pinesphere ERP - Phase 7: Support, Productivity & Experience Platform

## Overview
Phase 7 extends Pinesphere ERP by integrating a unified **Support, Productivity & Experience Platform**. This phase adds six highly-requested internal modules that streamline operations and empower students/employees without touching the core architectural codebase of previous modules. 

The modules added in this phase are:
1. Help Desk / Ticket Management
2. Internship Marketplace
3. Referral Management
4. Digital ID Card
5. Self-Service Portal
6. Productivity Center

## Architecture Compliance
All development in Phase 7 adheres strictly to the existing **Registry-Driven Architecture**:

1. **Feature Registry (`feature-registry.ts`)**: 
   - Registered `helpdesk`, `marketplace`, `referral`, `idcard`, `selfservice`, and `productivity` along with routes and `lucide-react` icons (`LifeBuoy`, `Store`, `Gift`, `IdCard`, `UserCircle`, `Zap`).
2. **Mock Modules (`mock-modules.ts`)**: 
   - Added corresponding internal codes (e.g. `HELP`, `MKT`, `REF`) required by the RBAC resolver.
3. **Mock Permissions (`mock-permissions.ts`)**: 
   - Bound 26 granular permissions enabling read/write segregation across tickets, marketplace application, referral creation, and ID generation.
4. **Mock Roles (`mock-roles.ts`)**: 
   - **Student**: Received core experience permissions (`idcard.view`, `marketplace.apply`, `helpdesk.create`).
   - **Super Admin / HR**: Retained administrative oversight (`helpdesk.assign`, `marketplace.publish`, `referral.approve`).
5. **Widget Registry (`widget-registry.ts`)**:
   - Added 8 new widgets targeting dashboards (e.g., `open_tickets`, `recommended_internships`, `bookmarks`, `idcard_status`).

## Modules Implemented

### 1. Help Desk / Ticket Management (`/feature/helpdesk`)
- **Purpose**: Internal ticketing system for technical, academic, or HR issues.
- **Workflow**: Students raise tickets with specific Priority (Low-Critical). Admins view an aggregated timeline, process status changes (Open -> In Progress -> Resolved), and manage SLA breaches.
- **Service Integration**: Simulates multi-user queries where `HelpdeskService.getMyTickets(user.id)` isolates access for students, while admins bypass this restriction.

### 2. Internship Marketplace (`/feature/marketplace`)
- **Purpose**: Internal job board for active students to discover, compare, and apply for future internship rotations within the organization.
- **Features**: Highly visual grid listing hybrid/remote roles, tracking compensation (Paid vs Free), filtering by skills, and tracking applicant volume.

### 3. Referral Management (`/feature/referrals`)
- **Purpose**: Incentivize students to refer peers into the organization. 
- **Features**: Generates unique tracking codes (`PINES-XXXXXX`), calculates running reward point totals, tracks candidate lifecycle (`Pending` -> `Joined` -> `Rewarded`), and surfaces active reward-multiplier campaigns.

### 4. Digital ID Card (`/feature/id-card`)
- **Purpose**: Verifiable digital credential eliminating physical cards.
- **Features**: Clean UI mimicking a physical ID containing emergency contact, blood group, validity status, and a simulated QR Code verifier hook.

### 5. Self-Service Portal (`/feature/self-service`)
- **Purpose**: Centralized employee/student hub for generic profile data and document requests.
- **Features**: Displays active role definitions, historical document requests (e.g., Bonafide Certificates), and pending internal actions mapping back to the notification hub.

### 6. Productivity Center (`/feature/productivity`)
- **Purpose**: Embedded personal workspace ensuring users don't need to leave the ERP context.
- **Features**: Color-coded sticky notes, personal task lists (checkbox-driven), and centralized corporate bookmarks bridging the ERP to external documentation.

## Mock Data & API Layer
- Generated scalable mock arrays in `src/data/mock-*.ts` resolving to Types defined in `src/types/*.types.ts`.
- Every mock API wrapper (`src/api/*.api.ts`) returns a JavaScript `Promise` wrapped in a `setTimeout(..., 500)` block. This intentionally guarantees that the frontend handles React `loading` states gracefully, and means zero code needs to be refactored on the UI layer when we move this to a production database.

## Quality Assurance & Success Criteria
- **Strict TypeScript**: Verified interfaces for `Ticket`, `DigitalIDCard`, `Referral`, etc.
- **Clean Compiling**: Next.js builds flawlessly without React Client Manifest or RSC payload errors.
- **RBAC Continuity**: Role-based buttons (`Apply`, `Resolve Ticket`, `Generate`) are dynamically hidden based on the active session Context.
- **Design System**: Fully adopted the Tailwind/Lucide ecosystem, avoiding disjointed third-party libraries.
