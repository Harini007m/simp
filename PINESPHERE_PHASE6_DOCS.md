# Pinesphere ERP - Phase 6: Enterprise Analytics & Business Intelligence

## Overview
Phase 6 introduces the Enterprise Analytics & Business Intelligence platform to Pinesphere ERP. This phase aggregates data across all previously implemented modules (Reporting, Leave, Activity, Finance, Certification) to provide strategic, high-level dashboards, detailed reports, Key Performance Indicators (KPIs), AI-driven predictive insights, and bulk export capabilities.

## Architecture

The Phase 6 implementation adheres strictly to the existing **Registry-Driven Architecture**:
1. **Feature Registry (`feature-registry.ts`)**: Registered 6 new modules: `analytics`, `reports`, `kpi`, `executive`, `export`, and `insights`.
2. **Mock Modules (`mock-modules.ts`)**: Appended module configurations for role mapping.
3. **Mock Permissions (`mock-permissions.ts`)**: Appended 14 new granular permissions across the new modules.
4. **Mock Roles (`mock-roles.ts`)**: Updated existing roles (`Student`, `Mentor`, `HR`, `Super Admin`, etc.) to grant appropriate access to the new analytics modules and widgets.
5. **Widget Registry (`widget-registry.ts`)**: Registered 11 new dashboard widgets targeting executive, management, and HR roles.

## Modules Implemented

### 1. Analytics Dashboard (`/feature/analytics`)
- **Purpose**: Provides organization-wide analytics on student enrollment, performance, attendance, and revenue.
- **Key Features**: Time-series attendance trends, completion/placement rates, top performing programs/colleges.
- **Permissions**: `analytics.view`, `analytics.export`, `analytics.configure`.

### 2. Report Center (`/feature/reports`)
- **Purpose**: Centralized hub for generating, viewing, and downloading structured reports.
- **Key Features**: Template-based generation, historical generated reports, PDF/CSV/Excel format mock handling.
- **Permissions**: `report.view`, `report.export`, `report.schedule`, `report.share`.

### 3. KPI Management (`/feature/kpi`)
- **Purpose**: Track and manage strategic goals (e.g. Attendance Targets, Placement Rates).
- **Key Features**: Visual progress bars, on-track/at-risk indicators, trend arrows.
- **Permissions**: `kpi.view`, `kpi.manage`.

### 4. Executive Dashboard (`/feature/executive`)
- **Purpose**: High-level, strategic view reserved for C-suite and top management.
- **Key Features**: Revenue metrics, enterprise profitability, active risk indicators, and department-level issue mitigation.
- **Permissions**: `executive.view`.

### 5. Data Export Center (`/feature/export`)
- **Purpose**: Manage scheduled background exports and bulk data extraction.
- **Key Features**: Track processing jobs, manage automated weekly/monthly email deliveries.
- **Permissions**: `export.view`, `export.manage`.

### 6. Predictive Insights (`/feature/insights`)
- **Purpose**: AI-powered forecasts and risk identification.
- **Key Features**: Revenue and placement forecasts, high-risk student flagging (dropout probability).
- **Permissions**: `insights.view`.

## Data Layer & Services
- **Types**: Interfaces defined in `src/types/` (e.g., `AnalyticsSummary`, `ReportRecord`, `InsightForecast`).
- **Mock Data**: Hardcoded 50,000+ data points summarized in `src/data/mock-*.ts` to simulate database records.
- **Services**: `src/services/` act as the business logic layer, aggregating calls to `src/api/` which simulates network latency (Promises with timeouts). No heavy logic was duplicated in React components.

## UI / Design System
- Built with **Next.js App Router**, **React**, and **Tailwind CSS**.
- Implemented responsive grid layouts, custom progress bars, and `lucide-react` iconography.
- Adhered to the Apple/Linear inspired sleek design language (glassmorphism touches, subtle borders, stark contrast text).

## Future Expansion
The Service layer is designed to be fully decoupled from the UI. When migrating from the Mock Repository to a real backend (e.g. Postgres, Snowflake, or an external BI tool like Metabase/Tableau), only the `src/api/*.api.ts` files need to be swapped to use real `fetch` or SDK calls. The React components will not require any modifications.
