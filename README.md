# HP Gas Dealership Operations Management System

A web-based system that digitizes employee attendance, cylinder movements, delivery operations, stock management and daily reporting for an HP Gas dealership in Rajahmundry, Andhra Pradesh.

| | |
|---|---|
| **Version** | 1.0 (consolidated requirements) |
| **Date** | October 2026 |
| **Business owner / primary admin** | Dealership owner (project owner's father) |
| **Staff size** | ~20 employees |
| **Requirements** | Recorded |
| **Implementation roadmap** | Proposed |
| **Tech stack, hosting, fingerprint scanner** | Not selected |
| **Implementation** | Not started |

> This README is the master record of the project's ideas and requirements. It does not mean every feature is finalized or implemented. Unresolved decisions are marked **TBD**. When a decision changes, keep the original idea and add the new decision beside it so the project history is preserved.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Features at a Glance](#2-features-at-a-glance)
3. [Roles and Permissions](#3-roles-and-permissions)
4. [Core Principles](#4-core-principles)
5. [Conceptual Architecture](#5-conceptual-architecture)
6. [Development Phases Overview](#6-development-phases-overview)
7. [Phase 0: Requirements and Hardware Validation](#phase-0-requirements-and-hardware-validation)
8. [Phase 1: Application Foundation](#phase-1-application-foundation)
9. [Phase 2: Staff Management and Attendance](#phase-2-staff-management-and-attendance)
10. [Phase 3: Cylinder Stock Ledger](#phase-3-cylinder-stock-ledger)
11. [Phase 4: Delivery Trips and Fingerprint Confirmation](#phase-4-delivery-trips-and-fingerprint-confirmation)
12. [Phase 5: Correction Requests and Audit History](#phase-5-correction-requests-and-audit-history)
13. [Phase 6: Daily Dashboard and Stock Planning](#phase-6-daily-dashboard-and-stock-planning)
14. [Phase 7: Mobile Optimization, Testing and Deployment](#phase-7-mobile-optimization-testing-and-deployment)
15. [Non-Functional Requirements](#non-functional-requirements)
16. [Open Questions](#open-questions)
17. [Future Improvements (Not Yet Confirmed)](#future-improvements-not-yet-confirmed)
18. [Suggested Project Structure](#suggested-project-structure)
19. [Project Status and Change Log](#project-status-and-change-log)

---

## 1. Project Overview

### Vision

Build one centralized website that digitizes the dealership's attendance, cylinder movements, deliveries, stock and daily reporting. The system should reduce dependence on manual registers, improve accountability, prevent unauthorized changes to records, and let the owner see the whole operation in one place.

### Objectives

1. Automate employee attendance using fingerprint authentication.
2. Digitize cylinder dispatches and returns at the godown.
3. Track delivery agents, trips and completed deliveries.
4. Maintain accurate full-cylinder and empty-cylinder inventory.
5. Give every employee access appropriate to their role.
6. Require administrator approval for corrections to confirmed records.
7. Provide daily operational and stock reports.
8. Forecast whether available stock will meet the next day's demand.
9. Keep a reliable history of important transactions and changes.
10. Provide a mobile-friendly interface for staff working at the godown.

---

## 2. Features at a Glance

| # | Feature | Summary | Built in |
|---|---|---|---|
| 1 | Fingerprint attendance | Registration of 3 fingers per employee, check-in, check-out, working hours | Phase 2 |
| 2 | Godown and delivery tracking | Dispatches, returns, trips, delivery counts, trip duration | Phase 4 |
| 3 | Admin panel and permissions | Role-based access, individual histories, controlled corrections | Phases 1 and 5 |
| 4 | Fingerprint-confirmed transactions | Dispatches and returns verified by the delivery agent's fingerprint | Phase 4 |
| 5 | Daily inventory and operations dashboard | Opening and closing stock, daily summary, per-agent performance | Phase 6 |
| 6 | Pending orders and next-day planning | Manual order entry, stock readiness, shortfall calculation | Phase 6 |
| 7 | Real-time cylinder stock ledger | Every stock movement recorded; balances derived from the ledger. **Approved improvement** | Phase 3 |
| 8 | Mobile-friendly godown interface | Responsive, large-control transaction entry for phones and tablets. **Approved improvement** | Phase 7 |

---

## 3. Roles and Permissions

### Administrator (business owner)

The administrator can:

- View all employee attendance histories and all delivery-agent histories.
- View cylinder movement records and driver and godown activity histories.
- Manage employee accounts and roles.
- Review and approve or reject correction requests.
- Review daily inventory and operational reports.
- Manage relevant business records and settings.

Important changes are logged even when the administrator makes them.

### Employee categories

| Role | Description | Initial scope |
|---|---|---|
| **Office staff** | Perform office-related work | Features and permissions **TBD** |
| **Delivery staff** | Deliver cylinders to customers | Own attendance, delivery history, trip records and personal statistics only. Cannot see other agents' histories or full dealership reports |
| **Drivers** | Transport gas from the filling plant to the office and godown | Attendance tracking only in the first version. The admin views each driver's history. More features may come later |
| **Godown staff** | Record dispatches and returns at the godown | View relevant cylinder movements (who took cylinders, quantities, returns, timestamps). Cannot edit confirmed records. Can submit correction requests |

### Initial permission matrix

| Permission | Admin | Office Staff | Delivery Staff | Drivers | Godown Staff |
|---|---|---|---|---|---|
| View own attendance | Yes | TBD | Yes | Yes | TBD |
| View all attendance | Yes | TBD | No | No | No, unless authorized |
| View own delivery history | Yes | TBD | Yes | Not applicable initially | Relevant operational records |
| View other agents' histories | Yes | TBD | No | Not applicable | Relevant operational records |
| View cylinder movements | Yes | TBD | TBD | TBD | Yes |
| Edit confirmed records | Authorized admin action | TBD | TBD | TBD | No |
| Submit correction request | Yes | TBD | TBD | TBD | Yes |
| Approve / reject corrections | Yes | No | No | No | No |
| View complete dealership reports | Yes | No, unless authorized | No | No | No, unless authorized |

Every **TBD** must be resolved before the relevant phase is implemented.

---

## 4. Core Principles

1. **One source of truth.** Dashboards and reports are built from the same underlying records as the operational features, so attendance, delivery and inventory numbers never conflict.
2. **Derived balances.** Stock balances are calculated from the movement ledger. Nobody can freely overwrite the current quantity.
3. **Fingerprint confirms identity, not quantity.** A fingerprint proves a registered person confirmed an action. It does not prove the physical count is right, so it works alongside reconciliation, transaction history and controlled corrections.
4. **Confirmed records are protected.** Confirmed records change only through an approved correction. The original value is always preserved.
5. **Server-side authorization.** Permissions are enforced by the backend, not just by hiding buttons in the interface.
6. **Audit everything important.** Every important action and correction records who, what, when, the old value and the new value.
7. **No silent adjustments.** Stock discrepancies are recorded and investigated, not quietly adjusted away.

---

## 5. Conceptual Architecture

The technology stack is **not selected**. This is a conceptual layout, not a final decision.

```
Frontend:   Admin dashboard · Employee portal · Mobile godown interface
Backend:    Authentication · Permissions · Business rules · Validation
Database:   Employees · Attendance · Trips · Stock ledger · Approvals · Audit log
Biometric:  Compatible scanner and verification interface
```

The backend enforces permissions, validates movements, applies stock changes and records audit history. The frontend displays information and collects authorized input.

How the pieces connect:

```
                    Admin Panel
          (staff management, permissions, approvals)
                         |
     +-------------------+-------------------+
     |                                       |
 Attendance                          Delivery Operations
 (check-in / out, hours)             (trips, dispatches, returns)
     |                                       |
     +---------- Shared Data & Stock Ledger -+
          (employees, transactions, balances, audit history)
                         |
     +-------------------+-------------------+
     |                                       |
 Daily Dashboard                       Stock Planning
 (stock and productivity)         (pending orders, next-day readiness)
```

---

## 6. Development Phases Overview

These phases are a proposed roadmap, not additional business requirements. The order can be revised once hardware, stack and operational rules are confirmed.

| Phase | Name | Goal | Depends on |
|---|---|---|---|
| 0 | Requirements and Hardware Validation | Understand the current workflow and confirm scanner feasibility before coding | none |
| 1 | Application Foundation | Basic app, database, authentication, roles, admin panel, audit logging | 0 |
| 2 | Staff Management and Attendance | Employee records and fingerprint attendance | 1 |
| 3 | Cylinder Stock Ledger | Reliable foundation for inventory accounting | 1 |
| 4 | Delivery Trips and Fingerprint Confirmation | Digitized dispatch and return, linked to the ledger | 2, 3 |
| 5 | Correction Requests and Audit History | Prevent unauthorized changes to confirmed records | 4 |
| 6 | Daily Dashboard and Stock Planning | Daily overview for the owner and next-day readiness | 3, 4, 5 |
| 7 | Mobile Optimization, Testing and Deployment | Production-ready system piloted with real staff | 1 to 6 |

> Note: responsive layouts should be used from Phase 1 onward. Phase 7 is for optimizing and testing the godown workflows on real devices, not for starting mobile support from scratch.

---

## Phase 0: Requirements and Hardware Validation

**Goal:** Understand the current workflow before writing code.

### Tasks

- [ ] Document the existing attendance process.
- [ ] Document how cylinders arrive from the filling plant.
- [ ] Understand how dispatch and return quantities are currently recorded.
- [ ] Confirm the meaning of a "delivery" and a "completed trip".
- [ ] Evaluate fingerprint scanners and their integration options.
- [ ] Finalize initial employee roles and permissions (resolve the TBD cells in the matrix).
- [ ] Define how opening stock, closing stock and corrections will work.
- [ ] Select the framework, database and hosting service.

### Hardware questions to answer

- Which fingerprint scanner model and SDK will be used?
- Can it enroll and identify three fingers per employee?
- How does the scanner communicate with the web application (device connectivity)?
- Does it support secure matching and storage of protected templates rather than raw images?

### Deliverables

Requirements document, workflow diagrams, initial data model, hardware feasibility findings.

### Acceptance criteria

The main workflows and unresolved decisions are documented, and a feasible scanner integration approach has been identified.

---

## Phase 1: Application Foundation

**Goal:** Create the basic application and its security model.

**Features:** Feature 3 (admin panel and permissions), foundation for all others.

### Tasks

- [ ] Initialize the project and development environment.
- [ ] Set up the database and configuration (`.env.example`, migrations).
- [ ] Implement authentication.
- [ ] Implement employee registration and role-based access control (admin, office staff, delivery staff, driver, godown staff).
- [ ] Build the initial admin panel.
- [ ] Create audit logging for important administrative actions.
- [ ] Use responsive layouts from the start.

### Deliverables

Working application foundation with protected user accounts and role-specific access.

### Acceptance criteria

Unauthorized users cannot access protected pages or perform restricted actions.

---

## Phase 2: Staff Management and Attendance

**Goal:** Implement employee records and attendance workflows.

**Features:** Feature 1 (fingerprint attendance).

### Tasks

- [ ] Create employee profiles and staff categories.
- [ ] Support registration of three fingers per employee (thumb, index, middle). Any one registered finger is accepted.
- [ ] Integrate the selected fingerprint scanner.
- [ ] Implement check-in and check-out records.
- [ ] Calculate working duration (check-out minus check-in).
- [ ] Prevent duplicate check-ins and check-outs from repeated scans.
- [ ] Handle missed scans and incomplete attendance records.
- [ ] Record timestamps in one defined timezone.
- [ ] Build attendance history pages (employees see their own; the admin sees everyone, including office, delivery, driver and godown staff).

### Attendance record fields

| Field | Purpose |
|---|---|
| Employee ID / name | Identifies the employee |
| Attendance date | Identifies the working day |
| Check-in / check-out timestamp | Arrival and departure |
| Working duration | Elapsed time between arrival and departure |
| Verification result | Whether fingerprint authentication succeeded |
| Attendance status | Present, incomplete, or another approved status |

### Flow

1. The employee arrives and scans a registered fingerprint.
2. The scanner identifies the employee and the system records the check-in time.
3. At the end of work the employee scans again; the system records the departure time and calculates duration.

### Decisions needed

- What happens when an employee forgets to check out? (**TBD**)
- How are failed scans handled? (**TBD**)

### Technical notes

- Prefer secure biometric matching and protected templates over storing raw fingerprint images unnecessarily.
- Restrict access to employee and biometric data.

### Deliverables

Working attendance module.

### Acceptance criteria

A registered employee can check in and out using an accepted fingerprint, and the system records the correct employee and timestamps.

---

## Phase 3: Cylinder Stock Ledger

**Goal:** Establish a reliable foundation for inventory accounting.

**Features:** Feature 7 (real-time stock ledger, approved improvement).

### Tasks

- [ ] Define cylinder statuses (full, empty, damaged, others as approved) and movement types.
- [ ] Record stock receipts from the filling plant and dispatches to delivery agents.
- [ ] Record empty-cylinder returns and refilling movements.
- [ ] Record returned-undelivered full cylinders, damaged cylinders, missing or disputed cylinders, and approved adjustments.
- [ ] Maintain balances derived from the ledger (no free overwriting).
- [ ] Implement physical stock counts and discrepancy records.
- [ ] Preserve full movement history.

### Movements tracked

- Full cylinders received from the filling plant
- Full cylinders dispatched to delivery agents
- Full cylinders returned undelivered
- Empty cylinders returned by delivery agents
- Empty cylinders sent to the filling plant for refilling
- Cylinders returned from refilling, categorized by current status
- Damaged cylinders
- Missing or disputed cylinders
- Approved inventory adjustments

### Ledger entry fields

| Field | Purpose |
|---|---|
| Transaction ID | Unique movement identifier |
| Movement type | Receipt, dispatch, return, transfer, adjustment, etc. |
| Cylinder status | Full, empty, damaged, or another approved category |
| Quantity | Number of cylinders moved |
| Date and time | When the movement occurred |
| Related employee | Person associated with the transaction |
| Related trip | Trip reference, where applicable |
| Confirmation status | Pending, confirmed, or another defined status |
| Recorded by | Person or process that created the entry |
| Audit reference | Link to confirmation or correction history |

### Discrepancy handling

1. Record the physical count.
2. Calculate the difference from the system balance.
3. Flag the discrepancy.
4. Investigate the relevant transactions.
5. Record an authorized adjustment if required.
6. Preserve the original ledger history.

> Full and empty cylinders are separate stock categories. A cylinder changing from empty to full must be represented by a recorded movement, not counted as a new physical cylinder.

### Decisions needed

- How are damaged or missing cylinders accounted for? (**TBD**)
- How are opening and closing stock verified? (**TBD**)

### Deliverables

Stock ledger and basic inventory views.

### Acceptance criteria

Stock balances can be reproduced from the opening stock and recorded movements, and discrepancies are visible.

---

## Phase 4: Delivery Trips and Fingerprint Confirmation

**Goal:** Digitize delivery dispatches and returns.

**Features:** Feature 2 (godown and delivery tracking) and Feature 4 (fingerprint-confirmed transactions).

### Tasks

- [ ] Create delivery-agent trip records with unique trip IDs.
- [ ] Record dispatch quantities.
- [ ] Associate each return with the correct open trip.
- [ ] Integrate fingerprint confirmation for dispatch and return.
- [ ] Calculate delivered quantities and trip duration.
- [ ] Handle failed scans, duplicate submissions and mismatched quantities.
- [ ] Support multiple trips per agent per day (detailed rules **TBD**).
- [ ] Connect every confirmed transaction to the stock ledger.

### Dispatch record

| Field | Description |
|---|---|
| Trip ID | Unique identifier for the trip |
| Delivery agent | Employee performing the trip |
| Dispatch date and time | When the agent leaves |
| Full cylinders taken | Number of full cylinders dispatched |
| Associated orders | Orders assigned to the trip, if tracked |
| Confirmation status | Whether the dispatch has been confirmed |
| Recorded by | Authorized person entering the transaction |

### Return record

- Delivery agent identity and associated trip
- Return date and time
- Empty cylinders returned
- Full cylinders returned undelivered
- Fingerprint confirmation result
- Any discrepancy or exception

### Calculations

```
Delivered      = Full Dispatched - Full Returned (undelivered)
Trip Duration  = Return Time - Departure Time
```

Example:

| Movement | Quantity |
|---|---|
| Full cylinders dispatched | 6 |
| Full cylinders returned undelivered | 2 |
| Cylinders successfully delivered | 4 |
| Empty cylinders returned | 4 |

Empty cylinders returned are a separate measure and are not added to the delivered count. Trip duration includes travel and waiting, so it is not the same as time spent with customers.

### Confirmation flow

**Dispatch**

1. An authorized person enters the outgoing quantities.
2. The system displays the transaction details.
3. The delivery agent scans a registered fingerprint.
4. The system verifies identity.
5. The system saves the confirmed transaction with timestamp and agent identity.

**Return**

1. Enter empty cylinders returned.
2. Enter full cylinders returned undelivered.
3. Display the return details.
4. Verify the agent with a registered fingerprint.
5. Save the confirmed return.

### Decisions needed

- Who may create dispatch and return entries? (**TBD**)
- How should a failed fingerprint scan be handled? (**TBD**)
- Should delivery agents see assigned customer orders? (**TBD**)

### Deliverables

Working delivery-trip module connected to the stock ledger.

### Acceptance criteria

A dispatch and return are associated with the correct employee and trip, and inventory changes occur only according to the approved transaction rules.

---

## Phase 5: Correction Requests and Audit History

**Goal:** Prevent unauthorized changes to confirmed records.

**Features:** Feature 3 (controlled corrections).

### Tasks

- [ ] Build correction-request forms.
- [ ] Record the original value and the proposed correction with a reason.
- [ ] Keep the original record unchanged while a request is pending.
- [ ] Let the administrator approve or reject requests.
- [ ] Apply approved changes through controlled operations only.
- [ ] Maintain the history of decisions and changes.
- [ ] Make sure godown staff cannot directly edit confirmed transactions.

### Example workflow

Godown staff notice that the system shows Agent A took six cylinders, but the agent actually took five.

1. Godown staff select the incorrect record.
2. They submit a correction request with the requested quantity and reason.
3. The original record stays unchanged while the request is pending.
4. The administrator reviews and verifies the information.
5. The administrator approves or rejects the request.
6. If approved, the official record reflects the corrected value.
7. The audit history keeps the original value, proposed value, decision, timestamps and the identities of everyone involved.

### Deliverables

Correction workflow and administrative audit history.

### Acceptance criteria

Godown staff cannot directly edit confirmed transactions, and every approved correction is traceable.

---

## Phase 6: Daily Dashboard and Stock Planning

**Goal:** Give the owner a complete daily operational overview.

**Features:** Feature 5 (daily inventory and operations dashboard) and Feature 6 (pending orders and next-day planning).

Initial access is **admin only**. Whether godown staff or others get a limited view is **TBD**.

### Daily dashboard tasks

- [ ] Record or confirm opening stock (full and empty, separately).
- [ ] Calculate closing full and empty stock.
- [ ] Display the daily operations summary.
- [ ] Provide per-agent delivery statistics.
- [ ] Compare system-calculated stock with physically counted stock and show differences.
- [ ] Display unresolved discrepancies and pending trips.

### Daily operations summary

- Delivery agents who attended
- Trips completed
- Full cylinders received from the filling plant
- Full cylinders dispatched
- Cylinders successfully delivered
- Empty cylinders returned
- Full cylinders returned undelivered
- Empty cylinders sent for refilling
- Pending trips and unresolved discrepancies

### Per-agent performance

Attendance status, trips completed, cylinders dispatched, cylinders delivered, empty cylinders returned, full cylinders returned undelivered, and total trip duration. These come from recorded transactions rather than manually entered totals.

### Starting formulas

```
Closing Full Stock  = Opening Full Stock
                    + Full Cylinders Received
                    - Full Cylinders Dispatched
                    + Full Cylinders Returned

Closing Empty Stock = Opening Empty Stock
                    + Empty Cylinders Returned
                    - Empty Cylinders Sent Out
                    + Other Empty Stock Receipts
```

These are starting formulas. The final inventory model must define how empties sent for refilling, returned full cylinders, damaged cylinders and other movements are recorded so that nothing is counted twice.

### Stock planning tasks

- [ ] Build a page for authorized users (initially the admin) to enter pending orders.
- [ ] Track which orders are assigned to delivery agents, if order-level tracking is implemented.
- [ ] Compare available stock with demand and incoming stock.
- [ ] Show shortages and the additional cylinders required.

### Stock readiness inputs and outputs

| Inputs | Outputs |
|---|---|
| Available full cylinders | Pending order count and cylinder requirement |
| Pending orders requiring full cylinders | Available full-cylinder stock |
| Confirmed incoming stock from the filling plant | Confirmed incoming stock |
| Expected incoming stock not yet confirmed | Expected demand |
| Desired safety buffer, if configured | Projected stock balance |
| | Whether the dealership is ready for the next day |
| | Additional cylinders required, if any |

Example:

| Item | Quantity |
|---|---|
| Full cylinders currently available | 60 |
| Confirmed incoming full cylinders | 15 |
| Pending demand | 80 |
| **Expected shortfall** | **5** |

Unconfirmed incoming stock must not be treated as guaranteed, and the same cylinders must not be counted twice.

### Decisions needed

- Which roles may see the daily dashboard? (**TBD**, admin only initially)
- How are pending and confirmed incoming orders distinguished? (**TBD**)

### Deliverables

Daily inventory dashboard, delivery reports and next-day stock-planning page.

### Acceptance criteria

Dashboard totals reconcile with the underlying records, and the stock-planning page correctly identifies shortages under the configured business rules.

---

## Phase 7: Mobile Optimization, Testing and Deployment

**Goal:** Prepare the application for actual use at the dealership.

**Features:** Feature 8 (mobile-friendly godown interface, approved improvement).

### Mobile interface requirements

- Responsive layouts for phones, tablets and desktops.
- Large, easy-to-tap controls.
- Clearly separated full-cylinder and empty-cylinder quantities.
- Clear identification of the delivery agent.
- A review screen before fingerprint confirmation.
- Clear success and failure messages.
- Visible pending and completed transactions.
- A simple way to view relevant movement records.
- A correction-request option for authorized godown staff.

Example: a godown staff member selects Agent A and enters five full cylinders. The screen shows the agent, quantity and movement type, and the agent verifies with a registered fingerprint. The dispatch is finalized only after successful authentication and validation. If the fingerprint fails or the connection drops, the interface clearly shows the transaction was **not** confirmed.

The mobile interface must enforce the same permissions as desktop. It must not expose extra data or allow godown staff to edit confirmed records.

### Tasks

- [ ] Optimize godown workflows for phones and tablets.
- [ ] Test permissions and data security.
- [ ] Test scanner behavior under realistic conditions.
- [ ] Test failed connections and transaction retries.
- [ ] Configure backups and recovery procedures.
- [ ] Deploy in a controlled environment.
- [ ] Pilot with a small group of staff before expanding.
- [ ] Write operating instructions for staff.

### Decisions needed

- What happens if the internet fails during a transaction? (**TBD**, depends on scanner and device architecture)
- Performance targets, backup frequency, retention periods and hosting requirements (**TBD**).

### Deliverables

Tested and deployed application with operating instructions.

### Acceptance criteria

Staff can complete the core workflows reliably, sensitive data remains protected, and the business has a tested backup and recovery process.

---

## Non-Functional Requirements

| Area | Requirement |
|---|---|
| Security | Protect accounts, staff information, inventory data and biometric-related information |
| Authorization | Enforce permissions on the server, not just in the interface |
| Accuracy | Prevent duplicate transactions and inconsistent stock calculations |
| Auditability | Keep traceable histories of important transactions and corrections |
| Usability | Easy for employees who are not technically experienced |
| Responsiveness | Support phones, tablets and desktops |
| Reliability | Handle errors and failed transactions without corrupting records |
| Backup and recovery | Protect historical records from accidental loss |
| Maintainability | Keep the code organized so features can be improved independently |
| Privacy | Restrict access to employee and biometric data |

---

## Open Questions

| Question | Phase | Status |
|---|---|---|
| Which fingerprint scanner will be used? | 0 | TBD |
| Can the scanner support three enrolled fingers per employee? | 0 | Hardware validation required |
| How will the scanner communicate with the application? | 0 | TBD |
| Which database, framework and hosting service will be used? | 0 | Not selected |
| Which permissions should office staff receive? | 1 | TBD |
| What happens when an employee forgets to check out? | 2 | TBD |
| How should a failed fingerprint scan be handled? | 2, 4 | TBD |
| Can a delivery agent complete multiple trips in a day? | 4 | Expected to be supported; detailed rules TBD |
| Who may create dispatch and return entries? | 4 | Detailed permissions TBD |
| Should delivery agents see assigned customer orders? | 4 | TBD |
| How are damaged or missing cylinders accounted for? | 3 | Detailed rules TBD |
| How are opening and closing stock verified? | 3, 6 | Detailed reconciliation rules TBD |
| Which roles may see the daily dashboard? | 6 | Admin only initially; limited access unresolved |
| How should pending and confirmed incoming orders be distinguished? | 6 | To be finalized |
| What happens if the internet fails during a transaction? | 7 | Hardware and architecture dependent |

---

## Future Improvements (Not Yet Confirmed)

These were suggested earlier but are **not** confirmed requirements unless separately approved:

- Customer order-to-delivery status tracking
- Automatic alerts for low stock and overdue trips
- Offline transaction queuing and synchronization
- Monthly reports with PDF or Excel exports
- Advanced employee productivity analytics
- Additional driver and vehicle management features

---

## Suggested Project Structure

Illustrative only. The real structure depends on the stack and on whether the project is a single repo or separate frontend and backend apps. Folders do not all need to exist on day one.

```
hp-gas-management/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   └── services/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   └── utils/
├── database/
│   ├── migrations/
│   └── seeds/
├── docs/
│   ├── requirements.md
│   ├── workflows.md
│   └── permissions.md
├── tests/
├── .env.example
├── .gitignore
└── README.md
```

---

## Project Status and Change Log

| Area | Status |
|---|---|
| Requirements collection | Recorded |
| Implementation roadmap (Phases 0 to 7) | Proposed |
| Technology and hardware selection | Pending |
| Implementation | Not started |

**Immediate objective:** finish collecting requirements and resolve the hardware and business-rule questions in Phase 0, then build phase by phase, with each phase delivering a working, testable part of the system.

| Version | Date | Notes |
|---|---|---|
| 1.0 | October 2026 | Consolidated master notes: original features 1 to 6 plus the approved stock ledger and mobile-friendly godown interface. Seven-phase roadmap proposed |

> Future additions should be appended without deleting earlier requirements. When a decision changes, document both the original idea and the new decision.
