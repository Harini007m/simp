BEGIN;

CREATE TABLE alembic_version (
    version_num VARCHAR(32) NOT NULL, 
    CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num)
);

-- Running upgrade  -> b85d1d564f15

CREATE TABLE acad_academic_years (
    name VARCHAR(50) NOT NULL, 
    start_date DATE NOT NULL, 
    end_date DATE NOT NULL, 
    is_current BOOLEAN NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_acad_academic_years PRIMARY KEY (id), 
    CONSTRAINT ck_acad_academic_years_chk_acad_year_dates CHECK (end_date > start_date)
);

COMMENT ON TABLE acad_academic_years IS 'Global academic year definitions (e.g., 2026-2027)';

COMMENT ON COLUMN acad_academic_years.id IS 'Unique identifier for the record';

COMMENT ON COLUMN acad_academic_years.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN acad_academic_years.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN acad_academic_years.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN acad_academic_years.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN acad_academic_years.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN acad_academic_years.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_acad_academic_years_created_by ON acad_academic_years (created_by);

CREATE INDEX ix_acad_academic_years_deleted_at ON acad_academic_years (deleted_at);

CREATE UNIQUE INDEX ix_acad_academic_years_name ON acad_academic_years (name);

CREATE INDEX ix_acad_academic_years_updated_by ON acad_academic_years (updated_by);

CREATE TABLE analytics_data_points (
    record_date DATE NOT NULL, 
    value NUMERIC(10, 2) NOT NULL, 
    category VARCHAR(255) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_analytics_data_points PRIMARY KEY (id)
);

COMMENT ON TABLE analytics_data_points IS 'Time-series data points for analytics charts';

COMMENT ON COLUMN analytics_data_points.id IS 'Unique identifier for the record';

COMMENT ON COLUMN analytics_data_points.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN analytics_data_points.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN analytics_data_points.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN analytics_data_points.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN analytics_data_points.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN analytics_data_points.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_analytics_data_points_category ON analytics_data_points (category);

CREATE INDEX ix_analytics_data_points_created_by ON analytics_data_points (created_by);

CREATE INDEX ix_analytics_data_points_deleted_at ON analytics_data_points (deleted_at);

CREATE INDEX ix_analytics_data_points_record_date ON analytics_data_points (record_date);

CREATE INDEX ix_analytics_data_points_updated_by ON analytics_data_points (updated_by);

CREATE TABLE analytics_dimensions (
    name VARCHAR(255) NOT NULL, 
    value NUMERIC(10, 2) NOT NULL, 
    percentage NUMERIC(5, 2), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_analytics_dimensions PRIMARY KEY (id)
);

COMMENT ON TABLE analytics_dimensions IS 'Dimensional metrics (e.g., Demographics, Module Usage)';

COMMENT ON COLUMN analytics_dimensions.id IS 'Unique identifier for the record';

COMMENT ON COLUMN analytics_dimensions.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN analytics_dimensions.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN analytics_dimensions.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN analytics_dimensions.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN analytics_dimensions.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN analytics_dimensions.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_analytics_dimensions_created_by ON analytics_dimensions (created_by);

CREATE INDEX ix_analytics_dimensions_deleted_at ON analytics_dimensions (deleted_at);

CREATE INDEX ix_analytics_dimensions_name ON analytics_dimensions (name);

CREATE INDEX ix_analytics_dimensions_updated_by ON analytics_dimensions (updated_by);

CREATE TABLE analytics_executive_metrics (
    title VARCHAR(255) NOT NULL, 
    value VARCHAR(255) NOT NULL, 
    change_value NUMERIC(10, 2), 
    change_type VARCHAR(50), 
    timeframe VARCHAR(255), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_analytics_executive_metrics PRIMARY KEY (id)
);

COMMENT ON TABLE analytics_executive_metrics IS 'High-level executive dashboard metrics';

COMMENT ON COLUMN analytics_executive_metrics.change_type IS 'increase, decrease, neutral';

COMMENT ON COLUMN analytics_executive_metrics.id IS 'Unique identifier for the record';

COMMENT ON COLUMN analytics_executive_metrics.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN analytics_executive_metrics.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN analytics_executive_metrics.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN analytics_executive_metrics.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN analytics_executive_metrics.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN analytics_executive_metrics.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_analytics_executive_metrics_created_by ON analytics_executive_metrics (created_by);

CREATE INDEX ix_analytics_executive_metrics_deleted_at ON analytics_executive_metrics (deleted_at);

CREATE INDEX ix_analytics_executive_metrics_updated_by ON analytics_executive_metrics (updated_by);

CREATE TABLE analytics_risk_indicators (
    department_name VARCHAR(255) NOT NULL, 
    risk_level VARCHAR(50) NOT NULL, 
    description TEXT NOT NULL, 
    mitigation TEXT, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_analytics_risk_indicators PRIMARY KEY (id)
);

COMMENT ON TABLE analytics_risk_indicators IS 'Identified institutional risks and mitigations';

COMMENT ON COLUMN analytics_risk_indicators.risk_level IS 'Low, Medium, High, Critical';

COMMENT ON COLUMN analytics_risk_indicators.id IS 'Unique identifier for the record';

COMMENT ON COLUMN analytics_risk_indicators.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN analytics_risk_indicators.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN analytics_risk_indicators.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN analytics_risk_indicators.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN analytics_risk_indicators.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN analytics_risk_indicators.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_analytics_risk_indicators_created_by ON analytics_risk_indicators (created_by);

CREATE INDEX ix_analytics_risk_indicators_deleted_at ON analytics_risk_indicators (deleted_at);

CREATE INDEX ix_analytics_risk_indicators_department_name ON analytics_risk_indicators (department_name);

CREATE INDEX ix_analytics_risk_indicators_updated_by ON analytics_risk_indicators (updated_by);

CREATE TABLE analytics_summaries (
    total_students NUMERIC NOT NULL, 
    active_interns NUMERIC NOT NULL, 
    completion_rate NUMERIC(5, 2) NOT NULL, 
    attendance_rate NUMERIC(5, 2) NOT NULL, 
    average_score NUMERIC(5, 2) NOT NULL, 
    placement_rate NUMERIC(5, 2) NOT NULL, 
    revenue NUMERIC(15, 2) NOT NULL, 
    certificates_issued NUMERIC NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_analytics_summaries PRIMARY KEY (id)
);

COMMENT ON TABLE analytics_summaries IS 'Aggregated snapshot metrics';

COMMENT ON COLUMN analytics_summaries.id IS 'Unique identifier for the record';

COMMENT ON COLUMN analytics_summaries.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN analytics_summaries.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN analytics_summaries.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN analytics_summaries.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN analytics_summaries.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN analytics_summaries.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_analytics_summaries_created_by ON analytics_summaries (created_by);

CREATE INDEX ix_analytics_summaries_deleted_at ON analytics_summaries (deleted_at);

CREATE INDEX ix_analytics_summaries_updated_by ON analytics_summaries (updated_by);

CREATE TABLE auth_users (
    username VARCHAR(100) NOT NULL, 
    email VARCHAR(255) NOT NULL, 
    phone VARCHAR(20), 
    password_hash VARCHAR(255) NOT NULL, 
    account_status VARCHAR(50) NOT NULL, 
    email_verified BOOLEAN NOT NULL, 
    phone_verified BOOLEAN NOT NULL, 
    last_login_at TIMESTAMP WITH TIME ZONE, 
    failed_login_attempts INTEGER NOT NULL, 
    account_locked_until TIMESTAMP WITH TIME ZONE, 
    password_changed_at TIMESTAMP WITH TIME ZONE, 
    mfa_enabled BOOLEAN NOT NULL, 
    profile_image_url VARCHAR(500), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_auth_users PRIMARY KEY (id), 
    CONSTRAINT ck_auth_users_chk_failed_login_attempts_positive CHECK (failed_login_attempts >= 0)
);

COMMENT ON TABLE auth_users IS 'Central master identity table for all users (Students, Employees, Mentors)';

COMMENT ON COLUMN auth_users.id IS 'Unique identifier for the record';

COMMENT ON COLUMN auth_users.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN auth_users.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN auth_users.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN auth_users.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN auth_users.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN auth_users.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_auth_users_account_status ON auth_users (account_status);

CREATE INDEX ix_auth_users_created_by ON auth_users (created_by);

CREATE INDEX ix_auth_users_deleted_at ON auth_users (deleted_at);

CREATE UNIQUE INDEX ix_auth_users_email ON auth_users (email);

CREATE INDEX ix_auth_users_last_login_at ON auth_users (last_login_at);

CREATE UNIQUE INDEX ix_auth_users_phone ON auth_users (phone);

CREATE INDEX ix_auth_users_updated_by ON auth_users (updated_by);

CREATE UNIQUE INDEX ix_auth_users_username ON auth_users (username);

CREATE TABLE comm_conversations (
    type VARCHAR(50) NOT NULL, 
    name VARCHAR(255), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_comm_conversations PRIMARY KEY (id)
);

COMMENT ON TABLE comm_conversations IS 'Messaging threads/conversations';

COMMENT ON COLUMN comm_conversations.type IS 'DIRECT, GROUP';

COMMENT ON COLUMN comm_conversations.name IS 'Group name if applicable';

COMMENT ON COLUMN comm_conversations.id IS 'Unique identifier for the record';

COMMENT ON COLUMN comm_conversations.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN comm_conversations.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN comm_conversations.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN comm_conversations.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN comm_conversations.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN comm_conversations.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_comm_conversations_created_by ON comm_conversations (created_by);

CREATE INDEX ix_comm_conversations_deleted_at ON comm_conversations (deleted_at);

CREATE INDEX ix_comm_conversations_updated_by ON comm_conversations (updated_by);

CREATE TABLE comm_email_templates (
    name VARCHAR(255) NOT NULL, 
    category VARCHAR(100) NOT NULL, 
    subject VARCHAR(500) NOT NULL, 
    html_body TEXT NOT NULL, 
    variables JSONB, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_comm_email_templates PRIMARY KEY (id)
);

COMMENT ON TABLE comm_email_templates IS 'System email templates';

COMMENT ON COLUMN comm_email_templates.variables IS 'List of dynamic placeholders';

COMMENT ON COLUMN comm_email_templates.id IS 'Unique identifier for the record';

COMMENT ON COLUMN comm_email_templates.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN comm_email_templates.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN comm_email_templates.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN comm_email_templates.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN comm_email_templates.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN comm_email_templates.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_comm_email_templates_created_by ON comm_email_templates (created_by);

CREATE INDEX ix_comm_email_templates_deleted_at ON comm_email_templates (deleted_at);

CREATE UNIQUE INDEX ix_comm_email_templates_name ON comm_email_templates (name);

CREATE INDEX ix_comm_email_templates_updated_by ON comm_email_templates (updated_by);

CREATE TABLE hr_escalation_rules (
    type VARCHAR(100) NOT NULL, 
    condition VARCHAR(255) NOT NULL, 
    trigger_days NUMERIC NOT NULL, 
    notify_role_ids JSONB, 
    status VARCHAR(50) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_hr_escalation_rules PRIMARY KEY (id)
);

COMMENT ON TABLE hr_escalation_rules IS 'Rules for automatic issue escalation';

COMMENT ON COLUMN hr_escalation_rules.notify_role_ids IS 'List of role IDs to notify';

COMMENT ON COLUMN hr_escalation_rules.id IS 'Unique identifier for the record';

COMMENT ON COLUMN hr_escalation_rules.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN hr_escalation_rules.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN hr_escalation_rules.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN hr_escalation_rules.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN hr_escalation_rules.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN hr_escalation_rules.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_hr_escalation_rules_created_by ON hr_escalation_rules (created_by);

CREATE INDEX ix_hr_escalation_rules_deleted_at ON hr_escalation_rules (deleted_at);

CREATE INDEX ix_hr_escalation_rules_updated_by ON hr_escalation_rules (updated_by);

CREATE TABLE org_organizations (
    name VARCHAR(255) NOT NULL, 
    code VARCHAR(50) NOT NULL, 
    type VARCHAR(50) NOT NULL, 
    email VARCHAR(255), 
    phone VARCHAR(50), 
    website VARCHAR(500), 
    address_line_1 VARCHAR(255), 
    address_line_2 VARCHAR(255), 
    city VARCHAR(100), 
    state VARCHAR(100), 
    country VARCHAR(100), 
    postal_code VARCHAR(20), 
    accreditation VARCHAR(255), 
    partnership_status VARCHAR(50) NOT NULL, 
    nba_status VARCHAR(50), 
    autonomous_status VARCHAR(50), 
    naac_grade VARCHAR(10), 
    national_ranking INTEGER, 
    establishment_year INTEGER, 
    university_affiliation VARCHAR(255), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_org_organizations PRIMARY KEY (id)
);

COMMENT ON TABLE org_organizations IS 'Top-level organizations or institutions';

COMMENT ON COLUMN org_organizations.type IS 'e.g., Engineering, Science, Management';

COMMENT ON COLUMN org_organizations.id IS 'Unique identifier for the record';

COMMENT ON COLUMN org_organizations.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN org_organizations.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN org_organizations.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN org_organizations.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN org_organizations.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN org_organizations.version_id IS 'Optimistic locking version number';

CREATE UNIQUE INDEX ix_org_organizations_code ON org_organizations (code);

CREATE INDEX ix_org_organizations_created_by ON org_organizations (created_by);

CREATE INDEX ix_org_organizations_deleted_at ON org_organizations (deleted_at);

CREATE UNIQUE INDEX ix_org_organizations_name ON org_organizations (name);

CREATE INDEX ix_org_organizations_updated_by ON org_organizations (updated_by);

CREATE TABLE rbac_actions (
    name VARCHAR(100) NOT NULL, 
    code VARCHAR(50) NOT NULL, 
    description VARCHAR(500), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_rbac_actions PRIMARY KEY (id)
);

COMMENT ON TABLE rbac_actions IS 'Standardized system actions (e.g., CREATE, READ, UPDATE, DELETE)';

COMMENT ON COLUMN rbac_actions.id IS 'Unique identifier for the record';

COMMENT ON COLUMN rbac_actions.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN rbac_actions.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN rbac_actions.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN rbac_actions.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN rbac_actions.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN rbac_actions.version_id IS 'Optimistic locking version number';

CREATE UNIQUE INDEX ix_rbac_actions_code ON rbac_actions (code);

CREATE INDEX ix_rbac_actions_created_by ON rbac_actions (created_by);

CREATE INDEX ix_rbac_actions_deleted_at ON rbac_actions (deleted_at);

CREATE INDEX ix_rbac_actions_updated_by ON rbac_actions (updated_by);

CREATE TABLE rbac_modules (
    name VARCHAR(100) NOT NULL, 
    code VARCHAR(100) NOT NULL, 
    description VARCHAR(500), 
    parent_id UUID, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_rbac_modules PRIMARY KEY (id), 
    CONSTRAINT fk_rbac_modules_parent_id_rbac_modules FOREIGN KEY(parent_id) REFERENCES rbac_modules (id) ON DELETE CASCADE
);

COMMENT ON TABLE rbac_modules IS 'Top-level system modules and submodules';

COMMENT ON COLUMN rbac_modules.id IS 'Unique identifier for the record';

COMMENT ON COLUMN rbac_modules.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN rbac_modules.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN rbac_modules.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN rbac_modules.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN rbac_modules.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN rbac_modules.version_id IS 'Optimistic locking version number';

CREATE UNIQUE INDEX ix_rbac_modules_code ON rbac_modules (code);

CREATE INDEX ix_rbac_modules_created_by ON rbac_modules (created_by);

CREATE INDEX ix_rbac_modules_deleted_at ON rbac_modules (deleted_at);

CREATE INDEX ix_rbac_modules_parent_id ON rbac_modules (parent_id);

CREATE INDEX ix_rbac_modules_updated_by ON rbac_modules (updated_by);

CREATE TABLE rbac_permission_groups (
    name VARCHAR(100) NOT NULL, 
    code VARCHAR(100) NOT NULL, 
    description VARCHAR(500), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_rbac_permission_groups PRIMARY KEY (id)
);

COMMENT ON TABLE rbac_permission_groups IS 'Logical groupings of permissions for easier assignment';

COMMENT ON COLUMN rbac_permission_groups.id IS 'Unique identifier for the record';

COMMENT ON COLUMN rbac_permission_groups.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN rbac_permission_groups.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN rbac_permission_groups.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN rbac_permission_groups.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN rbac_permission_groups.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN rbac_permission_groups.version_id IS 'Optimistic locking version number';

CREATE UNIQUE INDEX ix_rbac_permission_groups_code ON rbac_permission_groups (code);

CREATE INDEX ix_rbac_permission_groups_created_by ON rbac_permission_groups (created_by);

CREATE INDEX ix_rbac_permission_groups_deleted_at ON rbac_permission_groups (deleted_at);

CREATE INDEX ix_rbac_permission_groups_updated_by ON rbac_permission_groups (updated_by);

CREATE TABLE rbac_roles (
    name VARCHAR(100) NOT NULL, 
    code VARCHAR(100) NOT NULL, 
    description VARCHAR(500), 
    is_system BOOLEAN NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_rbac_roles PRIMARY KEY (id)
);

COMMENT ON TABLE rbac_roles IS 'System roles for RBAC';

COMMENT ON COLUMN rbac_roles.is_system IS 'System roles cannot be deleted';

COMMENT ON COLUMN rbac_roles.id IS 'Unique identifier for the record';

COMMENT ON COLUMN rbac_roles.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN rbac_roles.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN rbac_roles.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN rbac_roles.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN rbac_roles.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN rbac_roles.version_id IS 'Optimistic locking version number';

CREATE UNIQUE INDEX ix_rbac_roles_code ON rbac_roles (code);

CREATE INDEX ix_rbac_roles_created_by ON rbac_roles (created_by);

CREATE INDEX ix_rbac_roles_deleted_at ON rbac_roles (deleted_at);

CREATE INDEX ix_rbac_roles_updated_by ON rbac_roles (updated_by);

CREATE TABLE ref_blood_groups (
    name VARCHAR(10) NOT NULL, 
    is_active BOOLEAN NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_ref_blood_groups PRIMARY KEY (id), 
    CONSTRAINT uq_ref_blood_groups_name UNIQUE (name)
);

COMMENT ON TABLE ref_blood_groups IS 'Master list of blood groups for medical emergencies';

COMMENT ON COLUMN ref_blood_groups.id IS 'Unique identifier for the record';

COMMENT ON COLUMN ref_blood_groups.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN ref_blood_groups.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN ref_blood_groups.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN ref_blood_groups.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN ref_blood_groups.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN ref_blood_groups.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_ref_blood_groups_created_by ON ref_blood_groups (created_by);

CREATE INDEX ix_ref_blood_groups_deleted_at ON ref_blood_groups (deleted_at);

CREATE INDEX ix_ref_blood_groups_updated_by ON ref_blood_groups (updated_by);

CREATE TABLE ref_countries (
    name VARCHAR(100) NOT NULL, 
    iso_code_2 VARCHAR(2) NOT NULL, 
    iso_code_3 VARCHAR(3) NOT NULL, 
    phone_code VARCHAR(20), 
    is_active BOOLEAN NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_ref_countries PRIMARY KEY (id), 
    CONSTRAINT uq_ref_countries_iso_code_2 UNIQUE (iso_code_2), 
    CONSTRAINT uq_ref_countries_iso_code_3 UNIQUE (iso_code_3)
);

COMMENT ON TABLE ref_countries IS 'Master list of countries';

COMMENT ON COLUMN ref_countries.id IS 'Unique identifier for the record';

COMMENT ON COLUMN ref_countries.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN ref_countries.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN ref_countries.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN ref_countries.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN ref_countries.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN ref_countries.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_ref_countries_created_by ON ref_countries (created_by);

CREATE INDEX ix_ref_countries_deleted_at ON ref_countries (deleted_at);

CREATE UNIQUE INDEX ix_ref_countries_name ON ref_countries (name);

CREATE INDEX ix_ref_countries_updated_by ON ref_countries (updated_by);

CREATE TABLE ref_currencies (
    name VARCHAR(100) NOT NULL, 
    code VARCHAR(3) NOT NULL, 
    symbol VARCHAR(10) NOT NULL, 
    is_active BOOLEAN NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_ref_currencies PRIMARY KEY (id), 
    CONSTRAINT uq_ref_currencies_code UNIQUE (code), 
    CONSTRAINT uq_ref_currencies_name UNIQUE (name)
);

COMMENT ON TABLE ref_currencies IS 'Master list of currencies for global support';

COMMENT ON COLUMN ref_currencies.id IS 'Unique identifier for the record';

COMMENT ON COLUMN ref_currencies.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN ref_currencies.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN ref_currencies.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN ref_currencies.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN ref_currencies.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN ref_currencies.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_ref_currencies_created_by ON ref_currencies (created_by);

CREATE INDEX ix_ref_currencies_deleted_at ON ref_currencies (deleted_at);

CREATE INDEX ix_ref_currencies_updated_by ON ref_currencies (updated_by);

CREATE TABLE ref_document_types (
    name VARCHAR(100) NOT NULL, 
    is_active BOOLEAN NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_ref_document_types PRIMARY KEY (id), 
    CONSTRAINT uq_ref_document_types_name UNIQUE (name)
);

COMMENT ON TABLE ref_document_types IS 'Types of documents (Resume, ID, Certificate, etc)';

COMMENT ON COLUMN ref_document_types.id IS 'Unique identifier for the record';

COMMENT ON COLUMN ref_document_types.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN ref_document_types.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN ref_document_types.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN ref_document_types.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN ref_document_types.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN ref_document_types.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_ref_document_types_created_by ON ref_document_types (created_by);

CREATE INDEX ix_ref_document_types_deleted_at ON ref_document_types (deleted_at);

CREATE INDEX ix_ref_document_types_updated_by ON ref_document_types (updated_by);

CREATE TABLE ref_genders (
    name VARCHAR(50) NOT NULL, 
    is_active BOOLEAN NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_ref_genders PRIMARY KEY (id), 
    CONSTRAINT uq_ref_genders_name UNIQUE (name)
);

COMMENT ON TABLE ref_genders IS 'Master list of gender identities';

COMMENT ON COLUMN ref_genders.id IS 'Unique identifier for the record';

COMMENT ON COLUMN ref_genders.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN ref_genders.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN ref_genders.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN ref_genders.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN ref_genders.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN ref_genders.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_ref_genders_created_by ON ref_genders (created_by);

CREATE INDEX ix_ref_genders_deleted_at ON ref_genders (deleted_at);

CREATE INDEX ix_ref_genders_updated_by ON ref_genders (updated_by);

CREATE TABLE ref_languages (
    name VARCHAR(100) NOT NULL, 
    code VARCHAR(10) NOT NULL, 
    is_active BOOLEAN NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_ref_languages PRIMARY KEY (id), 
    CONSTRAINT uq_ref_languages_code UNIQUE (code), 
    CONSTRAINT uq_ref_languages_name UNIQUE (name)
);

COMMENT ON TABLE ref_languages IS 'Master list of languages';

COMMENT ON COLUMN ref_languages.id IS 'Unique identifier for the record';

COMMENT ON COLUMN ref_languages.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN ref_languages.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN ref_languages.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN ref_languages.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN ref_languages.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN ref_languages.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_ref_languages_created_by ON ref_languages (created_by);

CREATE INDEX ix_ref_languages_deleted_at ON ref_languages (deleted_at);

CREATE INDEX ix_ref_languages_updated_by ON ref_languages (updated_by);

CREATE TABLE ref_notification_types (
    name VARCHAR(50) NOT NULL, 
    is_active BOOLEAN NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_ref_notification_types PRIMARY KEY (id), 
    CONSTRAINT uq_ref_notification_types_name UNIQUE (name)
);

COMMENT ON TABLE ref_notification_types IS 'Channels for notifications (Email, SMS, Push)';

COMMENT ON COLUMN ref_notification_types.id IS 'Unique identifier for the record';

COMMENT ON COLUMN ref_notification_types.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN ref_notification_types.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN ref_notification_types.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN ref_notification_types.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN ref_notification_types.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN ref_notification_types.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_ref_notification_types_created_by ON ref_notification_types (created_by);

CREATE INDEX ix_ref_notification_types_deleted_at ON ref_notification_types (deleted_at);

CREATE INDEX ix_ref_notification_types_updated_by ON ref_notification_types (updated_by);

CREATE TABLE ref_timezones (
    name VARCHAR(100) NOT NULL, 
    "offset" VARCHAR(10) NOT NULL, 
    is_active BOOLEAN NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_ref_timezones PRIMARY KEY (id), 
    CONSTRAINT uq_ref_timezones_name UNIQUE (name)
);

COMMENT ON TABLE ref_timezones IS 'Master list of global timezones';

COMMENT ON COLUMN ref_timezones.name IS 'e.g., UTC, Asia/Kolkata';

COMMENT ON COLUMN ref_timezones."offset" IS 'e.g., +05:30';

COMMENT ON COLUMN ref_timezones.id IS 'Unique identifier for the record';

COMMENT ON COLUMN ref_timezones.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN ref_timezones.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN ref_timezones.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN ref_timezones.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN ref_timezones.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN ref_timezones.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_ref_timezones_created_by ON ref_timezones (created_by);

CREATE INDEX ix_ref_timezones_deleted_at ON ref_timezones (deleted_at);

CREATE INDEX ix_ref_timezones_updated_by ON ref_timezones (updated_by);

CREATE TABLE sup_faqs (
    question TEXT NOT NULL, 
    answer TEXT NOT NULL, 
    category VARCHAR(100), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_sup_faqs PRIMARY KEY (id)
);

COMMENT ON TABLE sup_faqs IS 'Frequently Asked Questions';

COMMENT ON COLUMN sup_faqs.id IS 'Unique identifier for the record';

COMMENT ON COLUMN sup_faqs.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN sup_faqs.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN sup_faqs.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN sup_faqs.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN sup_faqs.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN sup_faqs.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_sup_faqs_created_by ON sup_faqs (created_by);

CREATE INDEX ix_sup_faqs_deleted_at ON sup_faqs (deleted_at);

CREATE INDEX ix_sup_faqs_updated_by ON sup_faqs (updated_by);

CREATE TABLE sup_feedback_sessions (
    title VARCHAR(255) NOT NULL, 
    description TEXT, 
    status VARCHAR(50) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_sup_feedback_sessions PRIMARY KEY (id)
);

COMMENT ON TABLE sup_feedback_sessions IS 'Feedback campaigns or sessions';

COMMENT ON COLUMN sup_feedback_sessions.id IS 'Unique identifier for the record';

COMMENT ON COLUMN sup_feedback_sessions.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN sup_feedback_sessions.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN sup_feedback_sessions.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN sup_feedback_sessions.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN sup_feedback_sessions.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN sup_feedback_sessions.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_sup_feedback_sessions_created_by ON sup_feedback_sessions (created_by);

CREATE INDEX ix_sup_feedback_sessions_deleted_at ON sup_feedback_sessions (deleted_at);

CREATE INDEX ix_sup_feedback_sessions_updated_by ON sup_feedback_sessions (updated_by);

CREATE TABLE sys_idcard_templates (
    name VARCHAR(255) NOT NULL, 
    front_design_url VARCHAR(500), 
    back_design_url VARCHAR(500), 
    status VARCHAR(50) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_sys_idcard_templates PRIMARY KEY (id)
);

COMMENT ON TABLE sys_idcard_templates IS 'Templates for generating ID Cards';

COMMENT ON COLUMN sys_idcard_templates.id IS 'Unique identifier for the record';

COMMENT ON COLUMN sys_idcard_templates.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN sys_idcard_templates.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN sys_idcard_templates.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN sys_idcard_templates.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN sys_idcard_templates.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN sys_idcard_templates.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_sys_idcard_templates_created_by ON sys_idcard_templates (created_by);

CREATE INDEX ix_sys_idcard_templates_deleted_at ON sys_idcard_templates (deleted_at);

CREATE INDEX ix_sys_idcard_templates_updated_by ON sys_idcard_templates (updated_by);

CREATE TABLE sys_settings (
    key VARCHAR(255) NOT NULL, 
    value TEXT NOT NULL, 
    description VARCHAR(500), 
    is_system BOOLEAN NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_sys_settings PRIMARY KEY (id)
);

COMMENT ON TABLE sys_settings IS 'Global configuration settings';

COMMENT ON COLUMN sys_settings.id IS 'Unique identifier for the record';

COMMENT ON COLUMN sys_settings.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN sys_settings.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN sys_settings.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN sys_settings.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN sys_settings.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN sys_settings.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_sys_settings_created_by ON sys_settings (created_by);

CREATE INDEX ix_sys_settings_deleted_at ON sys_settings (deleted_at);

CREATE UNIQUE INDEX ix_sys_settings_key ON sys_settings (key);

CREATE INDEX ix_sys_settings_updated_by ON sys_settings (updated_by);

CREATE TABLE sys_verification_records (
    entity_id VARCHAR(255) NOT NULL, 
    entity_type VARCHAR(100) NOT NULL, 
    verifier_name VARCHAR(255), 
    verifier_email VARCHAR(255), 
    status VARCHAR(50) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_sys_verification_records PRIMARY KEY (id)
);

COMMENT ON TABLE sys_verification_records IS 'Records tracking external verification of certificates or documents';

COMMENT ON COLUMN sys_verification_records.id IS 'Unique identifier for the record';

COMMENT ON COLUMN sys_verification_records.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN sys_verification_records.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN sys_verification_records.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN sys_verification_records.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN sys_verification_records.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN sys_verification_records.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_sys_verification_records_created_by ON sys_verification_records (created_by);

CREATE INDEX ix_sys_verification_records_deleted_at ON sys_verification_records (deleted_at);

CREATE INDEX ix_sys_verification_records_entity_id ON sys_verification_records (entity_id);

CREATE INDEX ix_sys_verification_records_updated_by ON sys_verification_records (updated_by);

CREATE TABLE analytics_export_jobs (
    module_name VARCHAR(255) NOT NULL, 
    format VARCHAR(50) NOT NULL, 
    requested_by_user_id UUID NOT NULL, 
    status VARCHAR(50) NOT NULL, 
    file_url VARCHAR(500), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_analytics_export_jobs PRIMARY KEY (id), 
    CONSTRAINT fk_analytics_export_jobs_requested_by_user_id_auth_users FOREIGN KEY(requested_by_user_id) REFERENCES auth_users (id) ON DELETE CASCADE
);

COMMENT ON TABLE analytics_export_jobs IS 'Asynchronous export job tracking';

COMMENT ON COLUMN analytics_export_jobs.format IS 'PDF, Excel, CSV, JSON';

COMMENT ON COLUMN analytics_export_jobs.status IS 'Pending, Processing, Completed, Failed';

COMMENT ON COLUMN analytics_export_jobs.id IS 'Unique identifier for the record';

COMMENT ON COLUMN analytics_export_jobs.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN analytics_export_jobs.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN analytics_export_jobs.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN analytics_export_jobs.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN analytics_export_jobs.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN analytics_export_jobs.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_analytics_export_jobs_created_by ON analytics_export_jobs (created_by);

CREATE INDEX ix_analytics_export_jobs_deleted_at ON analytics_export_jobs (deleted_at);

CREATE INDEX ix_analytics_export_jobs_requested_by_user_id ON analytics_export_jobs (requested_by_user_id);

CREATE INDEX ix_analytics_export_jobs_updated_by ON analytics_export_jobs (updated_by);

CREATE TABLE auth_devices (
    user_id UUID NOT NULL, 
    device_name VARCHAR(255) NOT NULL, 
    platform VARCHAR(100), 
    os VARCHAR(100), 
    browser VARCHAR(100), 
    push_notification_token VARCHAR(500), 
    is_trusted BOOLEAN NOT NULL, 
    last_seen_at TIMESTAMP WITH TIME ZONE, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_auth_devices PRIMARY KEY (id), 
    CONSTRAINT fk_auth_devices_user_id_auth_users FOREIGN KEY(user_id) REFERENCES auth_users (id) ON DELETE CASCADE
);

COMMENT ON TABLE auth_devices IS 'Trusted devices for a user';

COMMENT ON COLUMN auth_devices.id IS 'Unique identifier for the record';

COMMENT ON COLUMN auth_devices.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN auth_devices.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN auth_devices.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN auth_devices.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN auth_devices.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN auth_devices.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_auth_devices_created_by ON auth_devices (created_by);

CREATE INDEX ix_auth_devices_deleted_at ON auth_devices (deleted_at);

CREATE INDEX ix_auth_devices_updated_by ON auth_devices (updated_by);

CREATE INDEX ix_auth_devices_user_id ON auth_devices (user_id);

CREATE TABLE auth_otps (
    user_id UUID, 
    purpose VARCHAR(50) NOT NULL, 
    code_hash VARCHAR(255) NOT NULL, 
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    attempts INTEGER NOT NULL, 
    is_verified BOOLEAN NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_auth_otps PRIMARY KEY (id), 
    CONSTRAINT ck_auth_otps_chk_otp_attempts_positive CHECK (attempts >= 0), 
    CONSTRAINT fk_auth_otps_user_id_auth_users FOREIGN KEY(user_id) REFERENCES auth_users (id) ON DELETE CASCADE
);

COMMENT ON TABLE auth_otps IS 'One-Time Passwords for MFA, verification, and password resets';

COMMENT ON COLUMN auth_otps.id IS 'Unique identifier for the record';

COMMENT ON COLUMN auth_otps.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN auth_otps.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN auth_otps.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN auth_otps.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN auth_otps.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN auth_otps.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_auth_otps_created_by ON auth_otps (created_by);

CREATE INDEX ix_auth_otps_deleted_at ON auth_otps (deleted_at);

CREATE INDEX ix_auth_otps_purpose ON auth_otps (purpose);

CREATE INDEX ix_auth_otps_updated_by ON auth_otps (updated_by);

CREATE INDEX ix_auth_otps_user_id ON auth_otps (user_id);

CREATE TABLE auth_refresh_tokens (
    user_id UUID NOT NULL, 
    token_hash VARCHAR(255) NOT NULL, 
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    is_revoked BOOLEAN NOT NULL, 
    replaced_by_token VARCHAR(255), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_auth_refresh_tokens PRIMARY KEY (id), 
    CONSTRAINT fk_auth_refresh_tokens_user_id_auth_users FOREIGN KEY(user_id) REFERENCES auth_users (id) ON DELETE CASCADE
);

COMMENT ON TABLE auth_refresh_tokens IS 'Secure storage for refresh tokens';

COMMENT ON COLUMN auth_refresh_tokens.id IS 'Unique identifier for the record';

COMMENT ON COLUMN auth_refresh_tokens.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN auth_refresh_tokens.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN auth_refresh_tokens.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN auth_refresh_tokens.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN auth_refresh_tokens.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN auth_refresh_tokens.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_auth_refresh_tokens_created_by ON auth_refresh_tokens (created_by);

CREATE INDEX ix_auth_refresh_tokens_deleted_at ON auth_refresh_tokens (deleted_at);

CREATE UNIQUE INDEX ix_auth_refresh_tokens_token_hash ON auth_refresh_tokens (token_hash);

CREATE INDEX ix_auth_refresh_tokens_updated_by ON auth_refresh_tokens (updated_by);

CREATE INDEX ix_auth_refresh_tokens_user_id ON auth_refresh_tokens (user_id);

CREATE TABLE auth_user_preferences (
    user_id UUID NOT NULL, 
    language_id UUID, 
    timezone_id UUID, 
    theme VARCHAR(50) NOT NULL, 
    notification_preferences JSONB, 
    accessibility_settings JSONB, 
    dashboard_layout JSONB, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_auth_user_preferences PRIMARY KEY (id), 
    CONSTRAINT fk_auth_user_preferences_language_id_ref_languages FOREIGN KEY(language_id) REFERENCES ref_languages (id) ON DELETE SET NULL, 
    CONSTRAINT fk_auth_user_preferences_timezone_id_ref_timezones FOREIGN KEY(timezone_id) REFERENCES ref_timezones (id) ON DELETE SET NULL, 
    CONSTRAINT fk_auth_user_preferences_user_id_auth_users FOREIGN KEY(user_id) REFERENCES auth_users (id) ON DELETE CASCADE, 
    CONSTRAINT uq_auth_user_preferences_user_id UNIQUE (user_id)
);

COMMENT ON TABLE auth_user_preferences IS 'User specific UI and system preferences';

COMMENT ON COLUMN auth_user_preferences.id IS 'Unique identifier for the record';

COMMENT ON COLUMN auth_user_preferences.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN auth_user_preferences.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN auth_user_preferences.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN auth_user_preferences.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN auth_user_preferences.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN auth_user_preferences.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_auth_user_preferences_created_by ON auth_user_preferences (created_by);

CREATE INDEX ix_auth_user_preferences_deleted_at ON auth_user_preferences (deleted_at);

CREATE INDEX ix_auth_user_preferences_updated_by ON auth_user_preferences (updated_by);

CREATE TABLE comm_announcements (
    title VARCHAR(500) NOT NULL, 
    description TEXT NOT NULL, 
    category VARCHAR(100), 
    priority VARCHAR(50) NOT NULL, 
    publish_date TIMESTAMP WITH TIME ZONE NOT NULL, 
    expiry_date TIMESTAMP WITH TIME ZONE, 
    status VARCHAR(50) NOT NULL, 
    is_pinned BOOLEAN NOT NULL, 
    author_user_id UUID NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_comm_announcements PRIMARY KEY (id), 
    CONSTRAINT fk_comm_announcements_author_user_id_auth_users FOREIGN KEY(author_user_id) REFERENCES auth_users (id) ON DELETE CASCADE
);

COMMENT ON TABLE comm_announcements IS 'System-wide or targeted announcements';

COMMENT ON COLUMN comm_announcements.id IS 'Unique identifier for the record';

COMMENT ON COLUMN comm_announcements.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN comm_announcements.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN comm_announcements.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN comm_announcements.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN comm_announcements.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN comm_announcements.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_comm_announcements_author_user_id ON comm_announcements (author_user_id);

CREATE INDEX ix_comm_announcements_created_by ON comm_announcements (created_by);

CREATE INDEX ix_comm_announcements_deleted_at ON comm_announcements (deleted_at);

CREATE INDEX ix_comm_announcements_updated_by ON comm_announcements (updated_by);

CREATE TABLE comm_conversation_participants (
    conversation_id UUID NOT NULL, 
    user_id UUID NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_comm_conversation_participants PRIMARY KEY (id), 
    CONSTRAINT fk_comm_conversation_participants_conversation_id_comm__6296 FOREIGN KEY(conversation_id) REFERENCES comm_conversations (id) ON DELETE CASCADE, 
    CONSTRAINT fk_comm_conversation_participants_user_id_auth_users FOREIGN KEY(user_id) REFERENCES auth_users (id) ON DELETE CASCADE
);

COMMENT ON TABLE comm_conversation_participants IS 'Users participating in a conversation';

COMMENT ON COLUMN comm_conversation_participants.id IS 'Unique identifier for the record';

COMMENT ON COLUMN comm_conversation_participants.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN comm_conversation_participants.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN comm_conversation_participants.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN comm_conversation_participants.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN comm_conversation_participants.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN comm_conversation_participants.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_comm_conversation_participants_conversation_id ON comm_conversation_participants (conversation_id);

CREATE INDEX ix_comm_conversation_participants_created_by ON comm_conversation_participants (created_by);

CREATE INDEX ix_comm_conversation_participants_deleted_at ON comm_conversation_participants (deleted_at);

CREATE INDEX ix_comm_conversation_participants_updated_by ON comm_conversation_participants (updated_by);

CREATE INDEX ix_comm_conversation_participants_user_id ON comm_conversation_participants (user_id);

CREATE TABLE comm_email_history (
    template_id UUID, 
    recipient_email VARCHAR(255) NOT NULL, 
    status VARCHAR(50) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_comm_email_history PRIMARY KEY (id), 
    CONSTRAINT fk_comm_email_history_template_id_comm_email_templates FOREIGN KEY(template_id) REFERENCES comm_email_templates (id) ON DELETE SET NULL
);

COMMENT ON TABLE comm_email_history IS 'Log of sent emails';

COMMENT ON COLUMN comm_email_history.status IS 'Delivered, Bounced, Opened';

COMMENT ON COLUMN comm_email_history.id IS 'Unique identifier for the record';

COMMENT ON COLUMN comm_email_history.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN comm_email_history.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN comm_email_history.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN comm_email_history.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN comm_email_history.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN comm_email_history.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_comm_email_history_created_by ON comm_email_history (created_by);

CREATE INDEX ix_comm_email_history_deleted_at ON comm_email_history (deleted_at);

CREATE INDEX ix_comm_email_history_recipient_email ON comm_email_history (recipient_email);

CREATE INDEX ix_comm_email_history_template_id ON comm_email_history (template_id);

CREATE INDEX ix_comm_email_history_updated_by ON comm_email_history (updated_by);

CREATE TABLE comm_messages (
    conversation_id UUID NOT NULL, 
    sender_user_id UUID NOT NULL, 
    content TEXT NOT NULL, 
    read_at TIMESTAMP WITH TIME ZONE, 
    status VARCHAR(50) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_comm_messages PRIMARY KEY (id), 
    CONSTRAINT fk_comm_messages_conversation_id_comm_conversations FOREIGN KEY(conversation_id) REFERENCES comm_conversations (id) ON DELETE CASCADE, 
    CONSTRAINT fk_comm_messages_sender_user_id_auth_users FOREIGN KEY(sender_user_id) REFERENCES auth_users (id) ON DELETE CASCADE
);

COMMENT ON TABLE comm_messages IS 'Individual messages within a conversation';

COMMENT ON COLUMN comm_messages.id IS 'Unique identifier for the record';

COMMENT ON COLUMN comm_messages.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN comm_messages.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN comm_messages.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN comm_messages.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN comm_messages.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN comm_messages.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_comm_messages_conversation_id ON comm_messages (conversation_id);

CREATE INDEX ix_comm_messages_created_by ON comm_messages (created_by);

CREATE INDEX ix_comm_messages_deleted_at ON comm_messages (deleted_at);

CREATE INDEX ix_comm_messages_sender_user_id ON comm_messages (sender_user_id);

CREATE INDEX ix_comm_messages_updated_by ON comm_messages (updated_by);

CREATE TABLE fin_payment_transactions (
    transaction_id VARCHAR(255) NOT NULL, 
    amount NUMERIC(15, 2) NOT NULL, 
    currency_id UUID NOT NULL, 
    status VARCHAR(50) NOT NULL, 
    gateway_response VARCHAR(1000), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_fin_payment_transactions PRIMARY KEY (id), 
    CONSTRAINT fk_fin_payment_transactions_currency_id_ref_currencies FOREIGN KEY(currency_id) REFERENCES ref_currencies (id) ON DELETE RESTRICT
);

COMMENT ON TABLE fin_payment_transactions IS 'Detailed log of payment gateway transactions';

COMMENT ON COLUMN fin_payment_transactions.status IS 'SUCCESS, FAILED, PENDING';

COMMENT ON COLUMN fin_payment_transactions.id IS 'Unique identifier for the record';

COMMENT ON COLUMN fin_payment_transactions.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN fin_payment_transactions.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN fin_payment_transactions.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN fin_payment_transactions.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN fin_payment_transactions.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN fin_payment_transactions.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_fin_payment_transactions_created_by ON fin_payment_transactions (created_by);

CREATE INDEX ix_fin_payment_transactions_deleted_at ON fin_payment_transactions (deleted_at);

CREATE UNIQUE INDEX ix_fin_payment_transactions_transaction_id ON fin_payment_transactions (transaction_id);

CREATE INDEX ix_fin_payment_transactions_updated_by ON fin_payment_transactions (updated_by);

CREATE TABLE hr_escalation_logs (
    rule_id UUID NOT NULL, 
    target_id VARCHAR(255) NOT NULL, 
    type VARCHAR(100) NOT NULL, 
    triggered_date TIMESTAMP WITH TIME ZONE NOT NULL, 
    status VARCHAR(50) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_hr_escalation_logs PRIMARY KEY (id), 
    CONSTRAINT fk_hr_escalation_logs_rule_id_hr_escalation_rules FOREIGN KEY(rule_id) REFERENCES hr_escalation_rules (id) ON DELETE CASCADE
);

COMMENT ON TABLE hr_escalation_logs IS 'Audit log of triggered escalations';

COMMENT ON COLUMN hr_escalation_logs.target_id IS 'Polymorphic ID of the escalated entity';

COMMENT ON COLUMN hr_escalation_logs.id IS 'Unique identifier for the record';

COMMENT ON COLUMN hr_escalation_logs.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN hr_escalation_logs.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN hr_escalation_logs.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN hr_escalation_logs.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN hr_escalation_logs.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN hr_escalation_logs.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_hr_escalation_logs_created_by ON hr_escalation_logs (created_by);

CREATE INDEX ix_hr_escalation_logs_deleted_at ON hr_escalation_logs (deleted_at);

CREATE INDEX ix_hr_escalation_logs_rule_id ON hr_escalation_logs (rule_id);

CREATE INDEX ix_hr_escalation_logs_updated_by ON hr_escalation_logs (updated_by);

CREATE TABLE org_coordinators (
    organization_id UUID NOT NULL, 
    name VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL, 
    phone VARCHAR(50), 
    department VARCHAR(100), 
    status VARCHAR(50) NOT NULL, 
    students_managed INTEGER NOT NULL, 
    programs_managed INTEGER NOT NULL, 
    applications_processed INTEGER NOT NULL, 
    attendance_approvals INTEGER NOT NULL, 
    internship_completions INTEGER NOT NULL, 
    placement_success_rate FLOAT NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_org_coordinators PRIMARY KEY (id), 
    CONSTRAINT fk_org_coordinators_organization_id_org_organizations FOREIGN KEY(organization_id) REFERENCES org_organizations (id) ON DELETE CASCADE
);

COMMENT ON TABLE org_coordinators IS 'Coordinators associated with organizations';

COMMENT ON COLUMN org_coordinators.id IS 'Unique identifier for the record';

COMMENT ON COLUMN org_coordinators.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN org_coordinators.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN org_coordinators.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN org_coordinators.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN org_coordinators.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN org_coordinators.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_org_coordinators_created_by ON org_coordinators (created_by);

CREATE INDEX ix_org_coordinators_deleted_at ON org_coordinators (deleted_at);

CREATE INDEX ix_org_coordinators_organization_id ON org_coordinators (organization_id);

CREATE INDEX ix_org_coordinators_updated_by ON org_coordinators (updated_by);

CREATE TABLE rbac_features (
    module_id UUID NOT NULL, 
    name VARCHAR(100) NOT NULL, 
    code VARCHAR(100) NOT NULL, 
    description VARCHAR(500), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_rbac_features PRIMARY KEY (id), 
    CONSTRAINT fk_rbac_features_module_id_rbac_modules FOREIGN KEY(module_id) REFERENCES rbac_modules (id) ON DELETE CASCADE, 
    CONSTRAINT uq_rbac_feature_module_code UNIQUE (module_id, code)
);

COMMENT ON TABLE rbac_features IS 'Features belonging to a specific module';

COMMENT ON COLUMN rbac_features.id IS 'Unique identifier for the record';

COMMENT ON COLUMN rbac_features.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN rbac_features.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN rbac_features.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN rbac_features.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN rbac_features.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN rbac_features.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_rbac_features_code ON rbac_features (code);

CREATE INDEX ix_rbac_features_created_by ON rbac_features (created_by);

CREATE INDEX ix_rbac_features_deleted_at ON rbac_features (deleted_at);

CREATE INDEX ix_rbac_features_module_id ON rbac_features (module_id);

CREATE INDEX ix_rbac_features_updated_by ON rbac_features (updated_by);

CREATE TABLE rbac_role_permission_groups (
    role_id UUID NOT NULL, 
    permission_group_id UUID NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_rbac_role_permission_groups PRIMARY KEY (id), 
    CONSTRAINT fk_rbac_role_permission_groups_permission_group_id_rbac_8402 FOREIGN KEY(permission_group_id) REFERENCES rbac_permission_groups (id) ON DELETE CASCADE, 
    CONSTRAINT fk_rbac_role_permission_groups_role_id_rbac_roles FOREIGN KEY(role_id) REFERENCES rbac_roles (id) ON DELETE CASCADE, 
    CONSTRAINT uq_rbac_role_permission_group UNIQUE (role_id, permission_group_id)
);

COMMENT ON TABLE rbac_role_permission_groups IS 'Junction mapping roles to permission groups';

COMMENT ON COLUMN rbac_role_permission_groups.id IS 'Unique identifier for the record';

COMMENT ON COLUMN rbac_role_permission_groups.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN rbac_role_permission_groups.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN rbac_role_permission_groups.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN rbac_role_permission_groups.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN rbac_role_permission_groups.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN rbac_role_permission_groups.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_rbac_role_permission_groups_created_by ON rbac_role_permission_groups (created_by);

CREATE INDEX ix_rbac_role_permission_groups_deleted_at ON rbac_role_permission_groups (deleted_at);

CREATE INDEX ix_rbac_role_permission_groups_permission_group_id ON rbac_role_permission_groups (permission_group_id);

CREATE INDEX ix_rbac_role_permission_groups_role_id ON rbac_role_permission_groups (role_id);

CREATE INDEX ix_rbac_role_permission_groups_updated_by ON rbac_role_permission_groups (updated_by);

CREATE TABLE rbac_user_roles (
    user_id UUID NOT NULL, 
    role_id UUID NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_rbac_user_roles PRIMARY KEY (id), 
    CONSTRAINT fk_rbac_user_roles_role_id_rbac_roles FOREIGN KEY(role_id) REFERENCES rbac_roles (id) ON DELETE CASCADE, 
    CONSTRAINT fk_rbac_user_roles_user_id_auth_users FOREIGN KEY(user_id) REFERENCES auth_users (id) ON DELETE CASCADE, 
    CONSTRAINT uq_rbac_user_role UNIQUE (user_id, role_id)
);

COMMENT ON TABLE rbac_user_roles IS 'Junction mapping users to roles';

COMMENT ON COLUMN rbac_user_roles.id IS 'Unique identifier for the record';

COMMENT ON COLUMN rbac_user_roles.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN rbac_user_roles.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN rbac_user_roles.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN rbac_user_roles.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN rbac_user_roles.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN rbac_user_roles.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_rbac_user_roles_created_by ON rbac_user_roles (created_by);

CREATE INDEX ix_rbac_user_roles_deleted_at ON rbac_user_roles (deleted_at);

CREATE INDEX ix_rbac_user_roles_role_id ON rbac_user_roles (role_id);

CREATE INDEX ix_rbac_user_roles_updated_by ON rbac_user_roles (updated_by);

CREATE INDEX ix_rbac_user_roles_user_id ON rbac_user_roles (user_id);

CREATE TABLE ref_states (
    country_id UUID NOT NULL, 
    name VARCHAR(100) NOT NULL, 
    code VARCHAR(10), 
    is_active BOOLEAN NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_ref_states PRIMARY KEY (id), 
    CONSTRAINT fk_ref_states_country_id_ref_countries FOREIGN KEY(country_id) REFERENCES ref_countries (id) ON DELETE RESTRICT
);

COMMENT ON TABLE ref_states IS 'Master list of states/provinces';

COMMENT ON COLUMN ref_states.id IS 'Unique identifier for the record';

COMMENT ON COLUMN ref_states.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN ref_states.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN ref_states.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN ref_states.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN ref_states.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN ref_states.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_ref_states_country_id ON ref_states (country_id);

CREATE INDEX ix_ref_states_created_by ON ref_states (created_by);

CREATE INDEX ix_ref_states_deleted_at ON ref_states (deleted_at);

CREATE INDEX ix_ref_states_updated_by ON ref_states (updated_by);

CREATE TABLE sup_feedback_responses (
    session_id UUID NOT NULL, 
    user_id UUID NOT NULL, 
    rating NUMERIC(5, 2) NOT NULL, 
    comments TEXT, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_sup_feedback_responses PRIMARY KEY (id), 
    CONSTRAINT fk_sup_feedback_responses_session_id_sup_feedback_sessions FOREIGN KEY(session_id) REFERENCES sup_feedback_sessions (id) ON DELETE CASCADE, 
    CONSTRAINT fk_sup_feedback_responses_user_id_auth_users FOREIGN KEY(user_id) REFERENCES auth_users (id) ON DELETE CASCADE
);

COMMENT ON TABLE sup_feedback_responses IS 'Responses collected from a feedback session';

COMMENT ON COLUMN sup_feedback_responses.id IS 'Unique identifier for the record';

COMMENT ON COLUMN sup_feedback_responses.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN sup_feedback_responses.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN sup_feedback_responses.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN sup_feedback_responses.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN sup_feedback_responses.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN sup_feedback_responses.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_sup_feedback_responses_created_by ON sup_feedback_responses (created_by);

CREATE INDEX ix_sup_feedback_responses_deleted_at ON sup_feedback_responses (deleted_at);

CREATE INDEX ix_sup_feedback_responses_session_id ON sup_feedback_responses (session_id);

CREATE INDEX ix_sup_feedback_responses_updated_by ON sup_feedback_responses (updated_by);

CREATE INDEX ix_sup_feedback_responses_user_id ON sup_feedback_responses (user_id);

CREATE TABLE sup_tickets (
    requester_user_id UUID NOT NULL, 
    assigned_user_id UUID, 
    subject VARCHAR(255) NOT NULL, 
    description TEXT NOT NULL, 
    category VARCHAR(100) NOT NULL, 
    priority VARCHAR(50) NOT NULL, 
    status VARCHAR(50) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_sup_tickets PRIMARY KEY (id), 
    CONSTRAINT fk_sup_tickets_assigned_user_id_auth_users FOREIGN KEY(assigned_user_id) REFERENCES auth_users (id) ON DELETE SET NULL, 
    CONSTRAINT fk_sup_tickets_requester_user_id_auth_users FOREIGN KEY(requester_user_id) REFERENCES auth_users (id) ON DELETE CASCADE
);

COMMENT ON TABLE sup_tickets IS 'Support and helpdesk tickets';

COMMENT ON COLUMN sup_tickets.id IS 'Unique identifier for the record';

COMMENT ON COLUMN sup_tickets.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN sup_tickets.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN sup_tickets.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN sup_tickets.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN sup_tickets.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN sup_tickets.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_sup_tickets_assigned_user_id ON sup_tickets (assigned_user_id);

CREATE INDEX ix_sup_tickets_created_by ON sup_tickets (created_by);

CREATE INDEX ix_sup_tickets_deleted_at ON sup_tickets (deleted_at);

CREATE INDEX ix_sup_tickets_requester_user_id ON sup_tickets (requester_user_id);

CREATE INDEX ix_sup_tickets_updated_by ON sup_tickets (updated_by);

CREATE TABLE sys_activity_logs (
    user_id UUID, 
    module_name VARCHAR(100) NOT NULL, 
    action VARCHAR(100) NOT NULL, 
    description TEXT NOT NULL, 
    device VARCHAR(255), 
    browser VARCHAR(255), 
    ip_address VARCHAR(45), 
    status VARCHAR(50) NOT NULL, 
    severity VARCHAR(50) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_sys_activity_logs PRIMARY KEY (id), 
    CONSTRAINT fk_sys_activity_logs_user_id_auth_users FOREIGN KEY(user_id) REFERENCES auth_users (id) ON DELETE SET NULL
);

COMMENT ON TABLE sys_activity_logs IS 'System-wide comprehensive audit logging';

COMMENT ON COLUMN sys_activity_logs.status IS 'SUCCESS, FAILED, WARNING';

COMMENT ON COLUMN sys_activity_logs.severity IS 'INFO, LOW, MEDIUM, HIGH, CRITICAL';

COMMENT ON COLUMN sys_activity_logs.id IS 'Unique identifier for the record';

COMMENT ON COLUMN sys_activity_logs.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN sys_activity_logs.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN sys_activity_logs.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN sys_activity_logs.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN sys_activity_logs.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN sys_activity_logs.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_sys_activity_logs_created_by ON sys_activity_logs (created_by);

CREATE INDEX ix_sys_activity_logs_deleted_at ON sys_activity_logs (deleted_at);

CREATE INDEX ix_sys_activity_logs_module_name ON sys_activity_logs (module_name);

CREATE INDEX ix_sys_activity_logs_updated_by ON sys_activity_logs (updated_by);

CREATE INDEX ix_sys_activity_logs_user_id ON sys_activity_logs (user_id);

CREATE TABLE sys_document_templates (
    name VARCHAR(255) NOT NULL, 
    document_type_id UUID NOT NULL, 
    description TEXT, 
    variables JSONB, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_sys_document_templates PRIMARY KEY (id), 
    CONSTRAINT fk_sys_document_templates_document_type_id_ref_document_types FOREIGN KEY(document_type_id) REFERENCES ref_document_types (id) ON DELETE RESTRICT
);

COMMENT ON TABLE sys_document_templates IS 'Templates for generating official PDFs/Docs';

COMMENT ON COLUMN sys_document_templates.variables IS 'Available dynamic placeholders';

COMMENT ON COLUMN sys_document_templates.id IS 'Unique identifier for the record';

COMMENT ON COLUMN sys_document_templates.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN sys_document_templates.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN sys_document_templates.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN sys_document_templates.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN sys_document_templates.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN sys_document_templates.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_sys_document_templates_created_by ON sys_document_templates (created_by);

CREATE INDEX ix_sys_document_templates_deleted_at ON sys_document_templates (deleted_at);

CREATE INDEX ix_sys_document_templates_document_type_id ON sys_document_templates (document_type_id);

CREATE INDEX ix_sys_document_templates_updated_by ON sys_document_templates (updated_by);

CREATE TABLE auth_sessions (
    user_id UUID NOT NULL, 
    device_id UUID, 
    ip_address VARCHAR(45) NOT NULL, 
    user_agent VARCHAR(500) NOT NULL, 
    login_time TIMESTAMP WITH TIME ZONE NOT NULL, 
    last_activity_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    is_revoked BOOLEAN NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_auth_sessions PRIMARY KEY (id), 
    CONSTRAINT ck_auth_sessions_chk_session_expiration_valid CHECK (expires_at > login_time), 
    CONSTRAINT fk_auth_sessions_device_id_auth_devices FOREIGN KEY(device_id) REFERENCES auth_devices (id) ON DELETE SET NULL, 
    CONSTRAINT fk_auth_sessions_user_id_auth_users FOREIGN KEY(user_id) REFERENCES auth_users (id) ON DELETE CASCADE
);

COMMENT ON TABLE auth_sessions IS 'Active login sessions';

COMMENT ON COLUMN auth_sessions.id IS 'Unique identifier for the record';

COMMENT ON COLUMN auth_sessions.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN auth_sessions.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN auth_sessions.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN auth_sessions.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN auth_sessions.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN auth_sessions.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_auth_sessions_created_by ON auth_sessions (created_by);

CREATE INDEX ix_auth_sessions_deleted_at ON auth_sessions (deleted_at);

CREATE INDEX ix_auth_sessions_device_id ON auth_sessions (device_id);

CREATE INDEX ix_auth_sessions_updated_by ON auth_sessions (updated_by);

CREATE INDEX ix_auth_sessions_user_id ON auth_sessions (user_id);

CREATE TABLE comm_announcement_audiences (
    announcement_id UUID NOT NULL, 
    target_user_id UUID, 
    target_role_id UUID, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_comm_announcement_audiences PRIMARY KEY (id), 
    CONSTRAINT fk_comm_announcement_audiences_announcement_id_comm_ann_cf7b FOREIGN KEY(announcement_id) REFERENCES comm_announcements (id) ON DELETE CASCADE, 
    CONSTRAINT fk_comm_announcement_audiences_target_role_id_rbac_roles FOREIGN KEY(target_role_id) REFERENCES rbac_roles (id) ON DELETE CASCADE, 
    CONSTRAINT fk_comm_announcement_audiences_target_user_id_auth_users FOREIGN KEY(target_user_id) REFERENCES auth_users (id) ON DELETE CASCADE
);

COMMENT ON TABLE comm_announcement_audiences IS 'Target audience filters for an announcement';

COMMENT ON COLUMN comm_announcement_audiences.id IS 'Unique identifier for the record';

COMMENT ON COLUMN comm_announcement_audiences.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN comm_announcement_audiences.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN comm_announcement_audiences.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN comm_announcement_audiences.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN comm_announcement_audiences.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN comm_announcement_audiences.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_comm_announcement_audiences_announcement_id ON comm_announcement_audiences (announcement_id);

CREATE INDEX ix_comm_announcement_audiences_created_by ON comm_announcement_audiences (created_by);

CREATE INDEX ix_comm_announcement_audiences_deleted_at ON comm_announcement_audiences (deleted_at);

CREATE INDEX ix_comm_announcement_audiences_updated_by ON comm_announcement_audiences (updated_by);

CREATE TABLE rbac_permissions (
    feature_id UUID NOT NULL, 
    action_id UUID NOT NULL, 
    name VARCHAR(100) NOT NULL, 
    code VARCHAR(150) NOT NULL, 
    description VARCHAR(500), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_rbac_permissions PRIMARY KEY (id), 
    CONSTRAINT fk_rbac_permissions_action_id_rbac_actions FOREIGN KEY(action_id) REFERENCES rbac_actions (id) ON DELETE CASCADE, 
    CONSTRAINT fk_rbac_permissions_feature_id_rbac_features FOREIGN KEY(feature_id) REFERENCES rbac_features (id) ON DELETE CASCADE, 
    CONSTRAINT uq_rbac_permission_feature_action UNIQUE (feature_id, action_id)
);

COMMENT ON TABLE rbac_permissions IS 'Granular permissions combining a feature and an action';

COMMENT ON COLUMN rbac_permissions.id IS 'Unique identifier for the record';

COMMENT ON COLUMN rbac_permissions.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN rbac_permissions.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN rbac_permissions.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN rbac_permissions.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN rbac_permissions.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN rbac_permissions.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_rbac_permissions_action_id ON rbac_permissions (action_id);

CREATE UNIQUE INDEX ix_rbac_permissions_code ON rbac_permissions (code);

CREATE INDEX ix_rbac_permissions_created_by ON rbac_permissions (created_by);

CREATE INDEX ix_rbac_permissions_deleted_at ON rbac_permissions (deleted_at);

CREATE INDEX ix_rbac_permissions_feature_id ON rbac_permissions (feature_id);

CREATE INDEX ix_rbac_permissions_updated_by ON rbac_permissions (updated_by);

CREATE TABLE ref_cities (
    state_id UUID NOT NULL, 
    name VARCHAR(100) NOT NULL, 
    is_active BOOLEAN NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_ref_cities PRIMARY KEY (id), 
    CONSTRAINT fk_ref_cities_state_id_ref_states FOREIGN KEY(state_id) REFERENCES ref_states (id) ON DELETE RESTRICT
);

COMMENT ON TABLE ref_cities IS 'Master list of cities';

COMMENT ON COLUMN ref_cities.id IS 'Unique identifier for the record';

COMMENT ON COLUMN ref_cities.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN ref_cities.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN ref_cities.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN ref_cities.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN ref_cities.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN ref_cities.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_ref_cities_created_by ON ref_cities (created_by);

CREATE INDEX ix_ref_cities_deleted_at ON ref_cities (deleted_at);

CREATE INDEX ix_ref_cities_state_id ON ref_cities (state_id);

CREATE INDEX ix_ref_cities_updated_by ON ref_cities (updated_by);

CREATE TABLE sup_ticket_messages (
    ticket_id UUID NOT NULL, 
    sender_user_id UUID NOT NULL, 
    message TEXT NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_sup_ticket_messages PRIMARY KEY (id), 
    CONSTRAINT fk_sup_ticket_messages_sender_user_id_auth_users FOREIGN KEY(sender_user_id) REFERENCES auth_users (id) ON DELETE CASCADE, 
    CONSTRAINT fk_sup_ticket_messages_ticket_id_sup_tickets FOREIGN KEY(ticket_id) REFERENCES sup_tickets (id) ON DELETE CASCADE
);

COMMENT ON TABLE sup_ticket_messages IS 'Conversation history on a ticket';

COMMENT ON COLUMN sup_ticket_messages.id IS 'Unique identifier for the record';

COMMENT ON COLUMN sup_ticket_messages.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN sup_ticket_messages.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN sup_ticket_messages.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN sup_ticket_messages.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN sup_ticket_messages.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN sup_ticket_messages.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_sup_ticket_messages_created_by ON sup_ticket_messages (created_by);

CREATE INDEX ix_sup_ticket_messages_deleted_at ON sup_ticket_messages (deleted_at);

CREATE INDEX ix_sup_ticket_messages_sender_user_id ON sup_ticket_messages (sender_user_id);

CREATE INDEX ix_sup_ticket_messages_ticket_id ON sup_ticket_messages (ticket_id);

CREATE INDEX ix_sup_ticket_messages_updated_by ON sup_ticket_messages (updated_by);

CREATE TABLE sys_generated_documents (
    template_id UUID NOT NULL, 
    user_id UUID NOT NULL, 
    file_url VARCHAR(500) NOT NULL, 
    status VARCHAR(50) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_sys_generated_documents PRIMARY KEY (id), 
    CONSTRAINT fk_sys_generated_documents_template_id_sys_document_templates FOREIGN KEY(template_id) REFERENCES sys_document_templates (id) ON DELETE RESTRICT, 
    CONSTRAINT fk_sys_generated_documents_user_id_auth_users FOREIGN KEY(user_id) REFERENCES auth_users (id) ON DELETE CASCADE
);

COMMENT ON TABLE sys_generated_documents IS 'Record of documents generated from templates';

COMMENT ON COLUMN sys_generated_documents.id IS 'Unique identifier for the record';

COMMENT ON COLUMN sys_generated_documents.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN sys_generated_documents.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN sys_generated_documents.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN sys_generated_documents.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN sys_generated_documents.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN sys_generated_documents.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_sys_generated_documents_created_by ON sys_generated_documents (created_by);

CREATE INDEX ix_sys_generated_documents_deleted_at ON sys_generated_documents (deleted_at);

CREATE INDEX ix_sys_generated_documents_template_id ON sys_generated_documents (template_id);

CREATE INDEX ix_sys_generated_documents_updated_by ON sys_generated_documents (updated_by);

CREATE INDEX ix_sys_generated_documents_user_id ON sys_generated_documents (user_id);

CREATE TABLE auth_login_history (
    user_id UUID NOT NULL, 
    session_id UUID, 
    login_time TIMESTAMP WITH TIME ZONE NOT NULL, 
    logout_time TIMESTAMP WITH TIME ZONE, 
    ip_address VARCHAR(45) NOT NULL, 
    country VARCHAR(100), 
    city VARCHAR(100), 
    browser VARCHAR(100), 
    operating_system VARCHAR(100), 
    platform VARCHAR(100), 
    result VARCHAR(50) NOT NULL, 
    failure_reason VARCHAR(255), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_auth_login_history PRIMARY KEY (id), 
    CONSTRAINT fk_auth_login_history_session_id_auth_sessions FOREIGN KEY(session_id) REFERENCES auth_sessions (id) ON DELETE SET NULL, 
    CONSTRAINT fk_auth_login_history_user_id_auth_users FOREIGN KEY(user_id) REFERENCES auth_users (id) ON DELETE CASCADE
);

COMMENT ON TABLE auth_login_history IS 'Audit log of user login attempts and sessions';

COMMENT ON COLUMN auth_login_history.id IS 'Unique identifier for the record';

COMMENT ON COLUMN auth_login_history.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN auth_login_history.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN auth_login_history.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN auth_login_history.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN auth_login_history.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN auth_login_history.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_auth_login_history_created_by ON auth_login_history (created_by);

CREATE INDEX ix_auth_login_history_deleted_at ON auth_login_history (deleted_at);

CREATE INDEX ix_auth_login_history_session_id ON auth_login_history (session_id);

CREATE INDEX ix_auth_login_history_updated_by ON auth_login_history (updated_by);

CREATE INDEX ix_auth_login_history_user_id ON auth_login_history (user_id);

CREATE TABLE comp_companies (
    name VARCHAR(255) NOT NULL, 
    industry VARCHAR(100), 
    website VARCHAR(500), 
    logo_url VARCHAR(500), 
    description TEXT, 
    is_active BOOLEAN NOT NULL, 
    address_line1 VARCHAR(255), 
    address_line2 VARCHAR(255), 
    city_id UUID, 
    state_id UUID, 
    country_id UUID, 
    postal_code VARCHAR(20), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_comp_companies PRIMARY KEY (id), 
    CONSTRAINT fk_comp_companies_city_id_ref_cities FOREIGN KEY(city_id) REFERENCES ref_cities (id) ON DELETE RESTRICT, 
    CONSTRAINT fk_comp_companies_country_id_ref_countries FOREIGN KEY(country_id) REFERENCES ref_countries (id) ON DELETE RESTRICT, 
    CONSTRAINT fk_comp_companies_state_id_ref_states FOREIGN KEY(state_id) REFERENCES ref_states (id) ON DELETE RESTRICT
);

COMMENT ON TABLE comp_companies IS 'External companies offering internships and placements';

COMMENT ON COLUMN comp_companies.id IS 'Unique identifier for the record';

COMMENT ON COLUMN comp_companies.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN comp_companies.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN comp_companies.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN comp_companies.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN comp_companies.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN comp_companies.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_comp_companies_created_by ON comp_companies (created_by);

CREATE INDEX ix_comp_companies_deleted_at ON comp_companies (deleted_at);

CREATE INDEX ix_comp_companies_industry ON comp_companies (industry);

CREATE UNIQUE INDEX ix_comp_companies_name ON comp_companies (name);

CREATE INDEX ix_comp_companies_updated_by ON comp_companies (updated_by);

CREATE TABLE org_campuses (
    organization_id UUID NOT NULL, 
    name VARCHAR(255) NOT NULL, 
    code VARCHAR(50) NOT NULL, 
    address_line1 VARCHAR(255), 
    address_line2 VARCHAR(255), 
    city_id UUID, 
    state_id UUID, 
    country_id UUID, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_org_campuses PRIMARY KEY (id), 
    CONSTRAINT fk_org_campuses_city_id_ref_cities FOREIGN KEY(city_id) REFERENCES ref_cities (id) ON DELETE RESTRICT, 
    CONSTRAINT fk_org_campuses_country_id_ref_countries FOREIGN KEY(country_id) REFERENCES ref_countries (id) ON DELETE RESTRICT, 
    CONSTRAINT fk_org_campuses_organization_id_org_organizations FOREIGN KEY(organization_id) REFERENCES org_organizations (id) ON DELETE CASCADE, 
    CONSTRAINT fk_org_campuses_state_id_ref_states FOREIGN KEY(state_id) REFERENCES ref_states (id) ON DELETE RESTRICT
);

COMMENT ON TABLE org_campuses IS 'Physical campuses or branches belonging to an organization';

COMMENT ON COLUMN org_campuses.id IS 'Unique identifier for the record';

COMMENT ON COLUMN org_campuses.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN org_campuses.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN org_campuses.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN org_campuses.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN org_campuses.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN org_campuses.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_org_campuses_code ON org_campuses (code);

CREATE INDEX ix_org_campuses_created_by ON org_campuses (created_by);

CREATE INDEX ix_org_campuses_deleted_at ON org_campuses (deleted_at);

CREATE INDEX ix_org_campuses_organization_id ON org_campuses (organization_id);

CREATE INDEX ix_org_campuses_updated_by ON org_campuses (updated_by);

CREATE TABLE rbac_permission_group_permissions (
    permission_group_id UUID NOT NULL, 
    permission_id UUID NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_rbac_permission_group_permissions PRIMARY KEY (id), 
    CONSTRAINT fk_rbac_permission_group_permissions_permission_group_i_d920 FOREIGN KEY(permission_group_id) REFERENCES rbac_permission_groups (id) ON DELETE CASCADE, 
    CONSTRAINT fk_rbac_permission_group_permissions_permission_id_rbac_c0b6 FOREIGN KEY(permission_id) REFERENCES rbac_permissions (id) ON DELETE CASCADE
);

COMMENT ON TABLE rbac_permission_group_permissions IS 'Junction mapping permissions to groups';

COMMENT ON COLUMN rbac_permission_group_permissions.id IS 'Unique identifier for the record';

COMMENT ON COLUMN rbac_permission_group_permissions.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN rbac_permission_group_permissions.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN rbac_permission_group_permissions.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN rbac_permission_group_permissions.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN rbac_permission_group_permissions.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN rbac_permission_group_permissions.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_rbac_permission_group_permissions_created_by ON rbac_permission_group_permissions (created_by);

CREATE INDEX ix_rbac_permission_group_permissions_deleted_at ON rbac_permission_group_permissions (deleted_at);

CREATE INDEX ix_rbac_permission_group_permissions_permission_group_id ON rbac_permission_group_permissions (permission_group_id);

CREATE INDEX ix_rbac_permission_group_permissions_permission_id ON rbac_permission_group_permissions (permission_id);

CREATE INDEX ix_rbac_permission_group_permissions_updated_by ON rbac_permission_group_permissions (updated_by);

CREATE TABLE rbac_role_permissions (
    role_id UUID NOT NULL, 
    permission_id UUID NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_rbac_role_permissions PRIMARY KEY (id), 
    CONSTRAINT fk_rbac_role_permissions_permission_id_rbac_permissions FOREIGN KEY(permission_id) REFERENCES rbac_permissions (id) ON DELETE CASCADE, 
    CONSTRAINT fk_rbac_role_permissions_role_id_rbac_roles FOREIGN KEY(role_id) REFERENCES rbac_roles (id) ON DELETE CASCADE, 
    CONSTRAINT uq_rbac_role_permission UNIQUE (role_id, permission_id)
);

COMMENT ON TABLE rbac_role_permissions IS 'Junction mapping roles directly to permissions';

COMMENT ON COLUMN rbac_role_permissions.id IS 'Unique identifier for the record';

COMMENT ON COLUMN rbac_role_permissions.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN rbac_role_permissions.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN rbac_role_permissions.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN rbac_role_permissions.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN rbac_role_permissions.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN rbac_role_permissions.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_rbac_role_permissions_created_by ON rbac_role_permissions (created_by);

CREATE INDEX ix_rbac_role_permissions_deleted_at ON rbac_role_permissions (deleted_at);

CREATE INDEX ix_rbac_role_permissions_permission_id ON rbac_role_permissions (permission_id);

CREATE INDEX ix_rbac_role_permissions_role_id ON rbac_role_permissions (role_id);

CREATE INDEX ix_rbac_role_permissions_updated_by ON rbac_role_permissions (updated_by);

CREATE TABLE rbac_user_permission_overrides (
    user_id UUID NOT NULL, 
    permission_id UUID NOT NULL, 
    is_granted BOOLEAN NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_rbac_user_permission_overrides PRIMARY KEY (id), 
    CONSTRAINT fk_rbac_user_permission_overrides_permission_id_rbac_pe_0c3e FOREIGN KEY(permission_id) REFERENCES rbac_permissions (id) ON DELETE CASCADE, 
    CONSTRAINT fk_rbac_user_permission_overrides_user_id_auth_users FOREIGN KEY(user_id) REFERENCES auth_users (id) ON DELETE CASCADE, 
    CONSTRAINT uq_rbac_user_permission_override UNIQUE (user_id, permission_id)
);

COMMENT ON TABLE rbac_user_permission_overrides IS 'Explicitly grant or deny a permission for a specific user';

COMMENT ON COLUMN rbac_user_permission_overrides.is_granted IS 'True = Explicit Grant, False = Explicit Deny';

COMMENT ON COLUMN rbac_user_permission_overrides.id IS 'Unique identifier for the record';

COMMENT ON COLUMN rbac_user_permission_overrides.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN rbac_user_permission_overrides.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN rbac_user_permission_overrides.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN rbac_user_permission_overrides.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN rbac_user_permission_overrides.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN rbac_user_permission_overrides.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_rbac_user_permission_overrides_created_by ON rbac_user_permission_overrides (created_by);

CREATE INDEX ix_rbac_user_permission_overrides_deleted_at ON rbac_user_permission_overrides (deleted_at);

CREATE INDEX ix_rbac_user_permission_overrides_permission_id ON rbac_user_permission_overrides (permission_id);

CREATE INDEX ix_rbac_user_permission_overrides_updated_by ON rbac_user_permission_overrides (updated_by);

CREATE INDEX ix_rbac_user_permission_overrides_user_id ON rbac_user_permission_overrides (user_id);

CREATE TABLE alum_placement_drives (
    company_id UUID NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    description TEXT NOT NULL, 
    drive_date DATE NOT NULL, 
    status VARCHAR(50) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_alum_placement_drives PRIMARY KEY (id), 
    CONSTRAINT fk_alum_placement_drives_company_id_comp_companies FOREIGN KEY(company_id) REFERENCES comp_companies (id) ON DELETE CASCADE
);

COMMENT ON TABLE alum_placement_drives IS 'Placement drives organized with companies';

COMMENT ON COLUMN alum_placement_drives.id IS 'Unique identifier for the record';

COMMENT ON COLUMN alum_placement_drives.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN alum_placement_drives.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN alum_placement_drives.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN alum_placement_drives.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN alum_placement_drives.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN alum_placement_drives.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_alum_placement_drives_company_id ON alum_placement_drives (company_id);

CREATE INDEX ix_alum_placement_drives_created_by ON alum_placement_drives (created_by);

CREATE INDEX ix_alum_placement_drives_deleted_at ON alum_placement_drives (deleted_at);

CREATE INDEX ix_alum_placement_drives_updated_by ON alum_placement_drives (updated_by);

CREATE TABLE intern_opportunities (
    company_id UUID NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    description TEXT NOT NULL, 
    location VARCHAR(255), 
    stipend NUMERIC(10, 2), 
    duration_weeks INTEGER, 
    requirements TEXT, 
    status VARCHAR(50) NOT NULL, 
    deadline DATE, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_intern_opportunities PRIMARY KEY (id), 
    CONSTRAINT fk_intern_opportunities_company_id_comp_companies FOREIGN KEY(company_id) REFERENCES comp_companies (id) ON DELETE CASCADE
);

COMMENT ON TABLE intern_opportunities IS 'Internship and placement opportunities posted by companies';

COMMENT ON COLUMN intern_opportunities.status IS 'OPEN, CLOSED, DRAFT';

COMMENT ON COLUMN intern_opportunities.id IS 'Unique identifier for the record';

COMMENT ON COLUMN intern_opportunities.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN intern_opportunities.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN intern_opportunities.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN intern_opportunities.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN intern_opportunities.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN intern_opportunities.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_intern_opportunities_company_id ON intern_opportunities (company_id);

CREATE INDEX ix_intern_opportunities_created_by ON intern_opportunities (created_by);

CREATE INDEX ix_intern_opportunities_deleted_at ON intern_opportunities (deleted_at);

CREATE INDEX ix_intern_opportunities_updated_by ON intern_opportunities (updated_by);

CREATE TABLE org_departments (
    organization_id UUID NOT NULL, 
    campus_id UUID, 
    name VARCHAR(255) NOT NULL, 
    code VARCHAR(50) NOT NULL, 
    hod_name VARCHAR(255), 
    students_count INTEGER NOT NULL, 
    faculty_count INTEGER NOT NULL, 
    internships_count INTEGER NOT NULL, 
    placement_rate FLOAT NOT NULL, 
    status VARCHAR(50) NOT NULL, 
    hod_user_id UUID, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_org_departments PRIMARY KEY (id), 
    CONSTRAINT fk_org_departments_campus_id_org_campuses FOREIGN KEY(campus_id) REFERENCES org_campuses (id) ON DELETE RESTRICT, 
    CONSTRAINT fk_org_departments_hod_user_id_auth_users FOREIGN KEY(hod_user_id) REFERENCES auth_users (id) ON DELETE SET NULL, 
    CONSTRAINT fk_org_departments_organization_id_org_organizations FOREIGN KEY(organization_id) REFERENCES org_organizations (id) ON DELETE CASCADE, 
    CONSTRAINT uq_org_department_code UNIQUE (organization_id, code)
);

COMMENT ON TABLE org_departments IS 'Departments within an organization';

COMMENT ON COLUMN org_departments.hod_user_id IS 'Head of Department';

COMMENT ON COLUMN org_departments.id IS 'Unique identifier for the record';

COMMENT ON COLUMN org_departments.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN org_departments.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN org_departments.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN org_departments.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN org_departments.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN org_departments.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_org_departments_campus_id ON org_departments (campus_id);

CREATE INDEX ix_org_departments_created_by ON org_departments (created_by);

CREATE INDEX ix_org_departments_deleted_at ON org_departments (deleted_at);

CREATE INDEX ix_org_departments_organization_id ON org_departments (organization_id);

CREATE INDEX ix_org_departments_updated_by ON org_departments (updated_by);

CREATE TABLE profile_recruiters (
    user_id UUID NOT NULL, 
    company_id UUID NOT NULL, 
    designation VARCHAR(100), 
    is_primary_contact BOOLEAN NOT NULL, 
    is_verified BOOLEAN NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_profile_recruiters PRIMARY KEY (id), 
    CONSTRAINT fk_profile_recruiters_company_id_comp_companies FOREIGN KEY(company_id) REFERENCES comp_companies (id) ON DELETE CASCADE, 
    CONSTRAINT fk_profile_recruiters_user_id_auth_users FOREIGN KEY(user_id) REFERENCES auth_users (id) ON DELETE CASCADE
);

COMMENT ON TABLE profile_recruiters IS 'Profile data for external company contacts/recruiters';

COMMENT ON COLUMN profile_recruiters.id IS 'Unique identifier for the record';

COMMENT ON COLUMN profile_recruiters.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN profile_recruiters.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN profile_recruiters.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN profile_recruiters.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN profile_recruiters.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN profile_recruiters.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_profile_recruiters_company_id ON profile_recruiters (company_id);

CREATE INDEX ix_profile_recruiters_created_by ON profile_recruiters (created_by);

CREATE INDEX ix_profile_recruiters_deleted_at ON profile_recruiters (deleted_at);

CREATE INDEX ix_profile_recruiters_updated_by ON profile_recruiters (updated_by);

CREATE UNIQUE INDEX ix_profile_recruiters_user_id ON profile_recruiters (user_id);

CREATE TABLE acad_programs (
    department_id UUID NOT NULL, 
    name VARCHAR(255) NOT NULL, 
    code VARCHAR(50) NOT NULL, 
    description VARCHAR(1000), 
    duration_months INTEGER NOT NULL, 
    program_type VARCHAR(50) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_acad_programs PRIMARY KEY (id), 
    CONSTRAINT fk_acad_programs_department_id_org_departments FOREIGN KEY(department_id) REFERENCES org_departments (id) ON DELETE RESTRICT, 
    CONSTRAINT uq_acad_program_code UNIQUE (department_id, code)
);

COMMENT ON TABLE acad_programs IS 'Academic or Training Programs (e.g., B.Tech CS, Full Stack Bootcamp)';

COMMENT ON COLUMN acad_programs.program_type IS 'e.g., Degree, Certification, Bootcamp';

COMMENT ON COLUMN acad_programs.id IS 'Unique identifier for the record';

COMMENT ON COLUMN acad_programs.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN acad_programs.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN acad_programs.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN acad_programs.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN acad_programs.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN acad_programs.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_acad_programs_created_by ON acad_programs (created_by);

CREATE INDEX ix_acad_programs_deleted_at ON acad_programs (deleted_at);

CREATE INDEX ix_acad_programs_department_id ON acad_programs (department_id);

CREATE INDEX ix_acad_programs_updated_by ON acad_programs (updated_by);

CREATE TABLE profile_employees (
    user_id UUID NOT NULL, 
    organization_id UUID NOT NULL, 
    department_id UUID, 
    employee_code VARCHAR(100) NOT NULL, 
    designation VARCHAR(150) NOT NULL, 
    date_of_joining DATE, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_profile_employees PRIMARY KEY (id), 
    CONSTRAINT fk_profile_employees_department_id_org_departments FOREIGN KEY(department_id) REFERENCES org_departments (id) ON DELETE RESTRICT, 
    CONSTRAINT fk_profile_employees_organization_id_org_organizations FOREIGN KEY(organization_id) REFERENCES org_organizations (id) ON DELETE RESTRICT, 
    CONSTRAINT fk_profile_employees_user_id_auth_users FOREIGN KEY(user_id) REFERENCES auth_users (id) ON DELETE CASCADE, 
    CONSTRAINT uq_employee_code UNIQUE (employee_code)
);

COMMENT ON TABLE profile_employees IS 'Base profile for internal organizational staff';

COMMENT ON COLUMN profile_employees.id IS 'Unique identifier for the record';

COMMENT ON COLUMN profile_employees.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN profile_employees.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN profile_employees.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN profile_employees.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN profile_employees.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN profile_employees.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_profile_employees_created_by ON profile_employees (created_by);

CREATE INDEX ix_profile_employees_deleted_at ON profile_employees (deleted_at);

CREATE INDEX ix_profile_employees_department_id ON profile_employees (department_id);

CREATE INDEX ix_profile_employees_organization_id ON profile_employees (organization_id);

CREATE INDEX ix_profile_employees_updated_by ON profile_employees (updated_by);

CREATE UNIQUE INDEX ix_profile_employees_user_id ON profile_employees (user_id);

CREATE TABLE acad_courses (
    program_id UUID NOT NULL, 
    name VARCHAR(255) NOT NULL, 
    code VARCHAR(50) NOT NULL, 
    credits INTEGER, 
    description VARCHAR(1000), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_acad_courses PRIMARY KEY (id), 
    CONSTRAINT fk_acad_courses_program_id_acad_programs FOREIGN KEY(program_id) REFERENCES acad_programs (id) ON DELETE CASCADE, 
    CONSTRAINT uq_acad_course_code UNIQUE (program_id, code)
);

COMMENT ON TABLE acad_courses IS 'Specific courses or subjects within a program';

COMMENT ON COLUMN acad_courses.id IS 'Unique identifier for the record';

COMMENT ON COLUMN acad_courses.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN acad_courses.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN acad_courses.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN acad_courses.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN acad_courses.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN acad_courses.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_acad_courses_created_by ON acad_courses (created_by);

CREATE INDEX ix_acad_courses_deleted_at ON acad_courses (deleted_at);

CREATE INDEX ix_acad_courses_program_id ON acad_courses (program_id);

CREATE INDEX ix_acad_courses_updated_by ON acad_courses (updated_by);

CREATE TABLE acad_semesters (
    program_id UUID NOT NULL, 
    academic_year_id UUID NOT NULL, 
    name VARCHAR(100) NOT NULL, 
    start_date DATE NOT NULL, 
    end_date DATE NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_acad_semesters PRIMARY KEY (id), 
    CONSTRAINT ck_acad_semesters_chk_acad_semester_dates CHECK (end_date > start_date), 
    CONSTRAINT fk_acad_semesters_academic_year_id_acad_academic_years FOREIGN KEY(academic_year_id) REFERENCES acad_academic_years (id) ON DELETE RESTRICT, 
    CONSTRAINT fk_acad_semesters_program_id_acad_programs FOREIGN KEY(program_id) REFERENCES acad_programs (id) ON DELETE CASCADE, 
    CONSTRAINT uq_acad_semester_name UNIQUE (program_id, academic_year_id, name)
);

COMMENT ON TABLE acad_semesters IS 'Semesters or Terms within a Program and Academic Year';

COMMENT ON COLUMN acad_semesters.name IS 'e.g., Fall 2026, Semester 1';

COMMENT ON COLUMN acad_semesters.id IS 'Unique identifier for the record';

COMMENT ON COLUMN acad_semesters.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN acad_semesters.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN acad_semesters.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN acad_semesters.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN acad_semesters.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN acad_semesters.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_acad_semesters_academic_year_id ON acad_semesters (academic_year_id);

CREATE INDEX ix_acad_semesters_created_by ON acad_semesters (created_by);

CREATE INDEX ix_acad_semesters_deleted_at ON acad_semesters (deleted_at);

CREATE INDEX ix_acad_semesters_program_id ON acad_semesters (program_id);

CREATE INDEX ix_acad_semesters_updated_by ON acad_semesters (updated_by);

CREATE TABLE hr_goals (
    employee_profile_id UUID NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    description TEXT, 
    due_date DATE NOT NULL, 
    status VARCHAR(50) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_hr_goals PRIMARY KEY (id), 
    CONSTRAINT fk_hr_goals_employee_profile_id_profile_employees FOREIGN KEY(employee_profile_id) REFERENCES profile_employees (id) ON DELETE CASCADE
);

COMMENT ON TABLE hr_goals IS 'Performance goals for employees';

COMMENT ON COLUMN hr_goals.id IS 'Unique identifier for the record';

COMMENT ON COLUMN hr_goals.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN hr_goals.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN hr_goals.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN hr_goals.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN hr_goals.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN hr_goals.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_hr_goals_created_by ON hr_goals (created_by);

CREATE INDEX ix_hr_goals_deleted_at ON hr_goals (deleted_at);

CREATE INDEX ix_hr_goals_employee_profile_id ON hr_goals (employee_profile_id);

CREATE INDEX ix_hr_goals_updated_by ON hr_goals (updated_by);

CREATE TABLE hr_leave_balances (
    employee_profile_id UUID NOT NULL, 
    leave_type VARCHAR(50) NOT NULL, 
    total_days NUMERIC(5, 2) NOT NULL, 
    used_days NUMERIC(5, 2) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_hr_leave_balances PRIMARY KEY (id), 
    CONSTRAINT fk_hr_leave_balances_employee_profile_id_profile_employees FOREIGN KEY(employee_profile_id) REFERENCES profile_employees (id) ON DELETE CASCADE
);

COMMENT ON TABLE hr_leave_balances IS 'Annual leave quotas for employees';

COMMENT ON COLUMN hr_leave_balances.leave_type IS 'SICK, CASUAL, ANNUAL';

COMMENT ON COLUMN hr_leave_balances.id IS 'Unique identifier for the record';

COMMENT ON COLUMN hr_leave_balances.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN hr_leave_balances.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN hr_leave_balances.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN hr_leave_balances.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN hr_leave_balances.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN hr_leave_balances.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_hr_leave_balances_created_by ON hr_leave_balances (created_by);

CREATE INDEX ix_hr_leave_balances_deleted_at ON hr_leave_balances (deleted_at);

CREATE INDEX ix_hr_leave_balances_employee_profile_id ON hr_leave_balances (employee_profile_id);

CREATE INDEX ix_hr_leave_balances_updated_by ON hr_leave_balances (updated_by);

CREATE TABLE hr_leave_requests (
    employee_profile_id UUID NOT NULL, 
    leave_type VARCHAR(50) NOT NULL, 
    start_date DATE NOT NULL, 
    end_date DATE NOT NULL, 
    reason TEXT NOT NULL, 
    status VARCHAR(50) NOT NULL, 
    approved_by_user_id UUID, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_hr_leave_requests PRIMARY KEY (id), 
    CONSTRAINT fk_hr_leave_requests_approved_by_user_id_auth_users FOREIGN KEY(approved_by_user_id) REFERENCES auth_users (id) ON DELETE SET NULL, 
    CONSTRAINT fk_hr_leave_requests_employee_profile_id_profile_employees FOREIGN KEY(employee_profile_id) REFERENCES profile_employees (id) ON DELETE CASCADE
);

COMMENT ON TABLE hr_leave_requests IS 'Leave requests by employees';

COMMENT ON COLUMN hr_leave_requests.status IS 'PENDING, APPROVED, REJECTED';

COMMENT ON COLUMN hr_leave_requests.id IS 'Unique identifier for the record';

COMMENT ON COLUMN hr_leave_requests.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN hr_leave_requests.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN hr_leave_requests.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN hr_leave_requests.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN hr_leave_requests.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN hr_leave_requests.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_hr_leave_requests_created_by ON hr_leave_requests (created_by);

CREATE INDEX ix_hr_leave_requests_deleted_at ON hr_leave_requests (deleted_at);

CREATE INDEX ix_hr_leave_requests_employee_profile_id ON hr_leave_requests (employee_profile_id);

CREATE INDEX ix_hr_leave_requests_updated_by ON hr_leave_requests (updated_by);

CREATE TABLE hr_performance_reviews (
    employee_profile_id UUID NOT NULL, 
    reviewer_user_id UUID NOT NULL, 
    review_date DATE NOT NULL, 
    rating NUMERIC(5, 2) NOT NULL, 
    feedback TEXT, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_hr_performance_reviews PRIMARY KEY (id), 
    CONSTRAINT fk_hr_performance_reviews_employee_profile_id_profile_employees FOREIGN KEY(employee_profile_id) REFERENCES profile_employees (id) ON DELETE CASCADE, 
    CONSTRAINT fk_hr_performance_reviews_reviewer_user_id_auth_users FOREIGN KEY(reviewer_user_id) REFERENCES auth_users (id) ON DELETE CASCADE
);

COMMENT ON TABLE hr_performance_reviews IS 'Performance assessments for employees';

COMMENT ON COLUMN hr_performance_reviews.id IS 'Unique identifier for the record';

COMMENT ON COLUMN hr_performance_reviews.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN hr_performance_reviews.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN hr_performance_reviews.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN hr_performance_reviews.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN hr_performance_reviews.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN hr_performance_reviews.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_hr_performance_reviews_created_by ON hr_performance_reviews (created_by);

CREATE INDEX ix_hr_performance_reviews_deleted_at ON hr_performance_reviews (deleted_at);

CREATE INDEX ix_hr_performance_reviews_employee_profile_id ON hr_performance_reviews (employee_profile_id);

CREATE INDEX ix_hr_performance_reviews_reviewer_user_id ON hr_performance_reviews (reviewer_user_id);

CREATE INDEX ix_hr_performance_reviews_updated_by ON hr_performance_reviews (updated_by);

CREATE TABLE profile_dept_coordinators (
    user_id UUID NOT NULL, 
    department_id UUID NOT NULL, 
    employee_profile_id UUID, 
    responsibility_scope VARCHAR(255), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_profile_dept_coordinators PRIMARY KEY (id), 
    CONSTRAINT fk_profile_dept_coordinators_department_id_org_departments FOREIGN KEY(department_id) REFERENCES org_departments (id) ON DELETE CASCADE, 
    CONSTRAINT fk_profile_dept_coordinators_employee_profile_id_profil_52aa FOREIGN KEY(employee_profile_id) REFERENCES profile_employees (id) ON DELETE SET NULL, 
    CONSTRAINT fk_profile_dept_coordinators_user_id_auth_users FOREIGN KEY(user_id) REFERENCES auth_users (id) ON DELETE CASCADE
);

COMMENT ON TABLE profile_dept_coordinators IS 'Profile for department-level coordinators (e.g., Branch Coordinators)';

COMMENT ON COLUMN profile_dept_coordinators.responsibility_scope IS 'e.g., Final Year Internships, Labs';

COMMENT ON COLUMN profile_dept_coordinators.id IS 'Unique identifier for the record';

COMMENT ON COLUMN profile_dept_coordinators.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN profile_dept_coordinators.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN profile_dept_coordinators.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN profile_dept_coordinators.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN profile_dept_coordinators.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN profile_dept_coordinators.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_profile_dept_coordinators_created_by ON profile_dept_coordinators (created_by);

CREATE INDEX ix_profile_dept_coordinators_deleted_at ON profile_dept_coordinators (deleted_at);

CREATE INDEX ix_profile_dept_coordinators_department_id ON profile_dept_coordinators (department_id);

CREATE UNIQUE INDEX ix_profile_dept_coordinators_employee_profile_id ON profile_dept_coordinators (employee_profile_id);

CREATE INDEX ix_profile_dept_coordinators_updated_by ON profile_dept_coordinators (updated_by);

CREATE UNIQUE INDEX ix_profile_dept_coordinators_user_id ON profile_dept_coordinators (user_id);

CREATE TABLE profile_faculty (
    user_id UUID NOT NULL, 
    department_id UUID NOT NULL, 
    employee_profile_id UUID, 
    academic_title VARCHAR(50), 
    specialization VARCHAR(255), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_profile_faculty PRIMARY KEY (id), 
    CONSTRAINT fk_profile_faculty_department_id_org_departments FOREIGN KEY(department_id) REFERENCES org_departments (id) ON DELETE RESTRICT, 
    CONSTRAINT fk_profile_faculty_employee_profile_id_profile_employees FOREIGN KEY(employee_profile_id) REFERENCES profile_employees (id) ON DELETE SET NULL, 
    CONSTRAINT fk_profile_faculty_user_id_auth_users FOREIGN KEY(user_id) REFERENCES auth_users (id) ON DELETE CASCADE
);

COMMENT ON TABLE profile_faculty IS 'Profile for academic instructors';

COMMENT ON COLUMN profile_faculty.academic_title IS 'e.g., Prof., Dr., Mr.';

COMMENT ON COLUMN profile_faculty.id IS 'Unique identifier for the record';

COMMENT ON COLUMN profile_faculty.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN profile_faculty.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN profile_faculty.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN profile_faculty.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN profile_faculty.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN profile_faculty.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_profile_faculty_created_by ON profile_faculty (created_by);

CREATE INDEX ix_profile_faculty_deleted_at ON profile_faculty (deleted_at);

CREATE INDEX ix_profile_faculty_department_id ON profile_faculty (department_id);

CREATE UNIQUE INDEX ix_profile_faculty_employee_profile_id ON profile_faculty (employee_profile_id);

CREATE INDEX ix_profile_faculty_updated_by ON profile_faculty (updated_by);

CREATE UNIQUE INDEX ix_profile_faculty_user_id ON profile_faculty (user_id);

CREATE TABLE profile_hr (
    user_id UUID NOT NULL, 
    organization_id UUID NOT NULL, 
    employee_profile_id UUID, 
    hr_level VARCHAR(50), 
    territory_scope VARCHAR(100), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_profile_hr PRIMARY KEY (id), 
    CONSTRAINT fk_profile_hr_employee_profile_id_profile_employees FOREIGN KEY(employee_profile_id) REFERENCES profile_employees (id) ON DELETE SET NULL, 
    CONSTRAINT fk_profile_hr_organization_id_org_organizations FOREIGN KEY(organization_id) REFERENCES org_organizations (id) ON DELETE RESTRICT, 
    CONSTRAINT fk_profile_hr_user_id_auth_users FOREIGN KEY(user_id) REFERENCES auth_users (id) ON DELETE CASCADE
);

COMMENT ON TABLE profile_hr IS 'Profile for Human Resources personnel';

COMMENT ON COLUMN profile_hr.hr_level IS 'e.g., Executive, Manager, Director';

COMMENT ON COLUMN profile_hr.territory_scope IS 'e.g., Global, North Campus';

COMMENT ON COLUMN profile_hr.id IS 'Unique identifier for the record';

COMMENT ON COLUMN profile_hr.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN profile_hr.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN profile_hr.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN profile_hr.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN profile_hr.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN profile_hr.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_profile_hr_created_by ON profile_hr (created_by);

CREATE INDEX ix_profile_hr_deleted_at ON profile_hr (deleted_at);

CREATE UNIQUE INDEX ix_profile_hr_employee_profile_id ON profile_hr (employee_profile_id);

CREATE INDEX ix_profile_hr_organization_id ON profile_hr (organization_id);

CREATE INDEX ix_profile_hr_updated_by ON profile_hr (updated_by);

CREATE UNIQUE INDEX ix_profile_hr_user_id ON profile_hr (user_id);

CREATE TABLE profile_mentors (
    user_id UUID NOT NULL, 
    employee_profile_id UUID, 
    expertise VARCHAR(255), 
    years_of_experience INTEGER, 
    max_capacity INTEGER NOT NULL, 
    is_available BOOLEAN NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_profile_mentors PRIMARY KEY (id), 
    CONSTRAINT fk_profile_mentors_employee_profile_id_profile_employees FOREIGN KEY(employee_profile_id) REFERENCES profile_employees (id) ON DELETE SET NULL, 
    CONSTRAINT fk_profile_mentors_user_id_auth_users FOREIGN KEY(user_id) REFERENCES auth_users (id) ON DELETE CASCADE
);

COMMENT ON TABLE profile_mentors IS 'Profile for project and internship mentors';

COMMENT ON COLUMN profile_mentors.id IS 'Unique identifier for the record';

COMMENT ON COLUMN profile_mentors.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN profile_mentors.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN profile_mentors.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN profile_mentors.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN profile_mentors.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN profile_mentors.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_profile_mentors_created_by ON profile_mentors (created_by);

CREATE INDEX ix_profile_mentors_deleted_at ON profile_mentors (deleted_at);

CREATE UNIQUE INDEX ix_profile_mentors_employee_profile_id ON profile_mentors (employee_profile_id);

CREATE INDEX ix_profile_mentors_updated_by ON profile_mentors (updated_by);

CREATE UNIQUE INDEX ix_profile_mentors_user_id ON profile_mentors (user_id);

CREATE TABLE profile_org_coordinators (
    user_id UUID NOT NULL, 
    organization_id UUID NOT NULL, 
    employee_profile_id UUID, 
    title VARCHAR(100) NOT NULL, 
    is_primary_contact BOOLEAN NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_profile_org_coordinators PRIMARY KEY (id), 
    CONSTRAINT fk_profile_org_coordinators_employee_profile_id_profile_da55 FOREIGN KEY(employee_profile_id) REFERENCES profile_employees (id) ON DELETE SET NULL, 
    CONSTRAINT fk_profile_org_coordinators_organization_id_org_organizations FOREIGN KEY(organization_id) REFERENCES org_organizations (id) ON DELETE CASCADE, 
    CONSTRAINT fk_profile_org_coordinators_user_id_auth_users FOREIGN KEY(user_id) REFERENCES auth_users (id) ON DELETE CASCADE
);

COMMENT ON TABLE profile_org_coordinators IS 'Profile for organization-level coordinators (e.g., Placement Officers)';

COMMENT ON COLUMN profile_org_coordinators.id IS 'Unique identifier for the record';

COMMENT ON COLUMN profile_org_coordinators.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN profile_org_coordinators.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN profile_org_coordinators.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN profile_org_coordinators.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN profile_org_coordinators.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN profile_org_coordinators.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_profile_org_coordinators_created_by ON profile_org_coordinators (created_by);

CREATE INDEX ix_profile_org_coordinators_deleted_at ON profile_org_coordinators (deleted_at);

CREATE UNIQUE INDEX ix_profile_org_coordinators_employee_profile_id ON profile_org_coordinators (employee_profile_id);

CREATE INDEX ix_profile_org_coordinators_organization_id ON profile_org_coordinators (organization_id);

CREATE INDEX ix_profile_org_coordinators_updated_by ON profile_org_coordinators (updated_by);

CREATE UNIQUE INDEX ix_profile_org_coordinators_user_id ON profile_org_coordinators (user_id);

CREATE TABLE acad_batches (
    program_id UUID NOT NULL, 
    semester_id UUID, 
    name VARCHAR(255) NOT NULL, 
    code VARCHAR(100) NOT NULL, 
    start_date DATE NOT NULL, 
    end_date DATE NOT NULL, 
    max_capacity INTEGER NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_acad_batches PRIMARY KEY (id), 
    CONSTRAINT ck_acad_batches_chk_acad_batch_dates CHECK (end_date > start_date), 
    CONSTRAINT ck_acad_batches_chk_acad_batch_capacity CHECK (max_capacity > 0), 
    CONSTRAINT fk_acad_batches_program_id_acad_programs FOREIGN KEY(program_id) REFERENCES acad_programs (id) ON DELETE CASCADE, 
    CONSTRAINT fk_acad_batches_semester_id_acad_semesters FOREIGN KEY(semester_id) REFERENCES acad_semesters (id) ON DELETE RESTRICT, 
    CONSTRAINT uq_acad_batch_code UNIQUE (program_id, code)
);

COMMENT ON TABLE acad_batches IS 'Specific running cohorts of a program';

COMMENT ON COLUMN acad_batches.code IS 'e.g., AI-JUN-2026-B1';

COMMENT ON COLUMN acad_batches.id IS 'Unique identifier for the record';

COMMENT ON COLUMN acad_batches.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN acad_batches.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN acad_batches.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN acad_batches.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN acad_batches.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN acad_batches.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_acad_batches_created_by ON acad_batches (created_by);

CREATE INDEX ix_acad_batches_deleted_at ON acad_batches (deleted_at);

CREATE INDEX ix_acad_batches_program_id ON acad_batches (program_id);

CREATE INDEX ix_acad_batches_semester_id ON acad_batches (semester_id);

CREATE INDEX ix_acad_batches_updated_by ON acad_batches (updated_by);

CREATE TABLE intern_opportunity_mentors (
    opportunity_id UUID NOT NULL, 
    mentor_profile_id UUID NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_intern_opportunity_mentors PRIMARY KEY (id), 
    CONSTRAINT fk_intern_opportunity_mentors_mentor_profile_id_profile_mentors FOREIGN KEY(mentor_profile_id) REFERENCES profile_mentors (id) ON DELETE CASCADE, 
    CONSTRAINT fk_intern_opportunity_mentors_opportunity_id_intern_opp_b9b6 FOREIGN KEY(opportunity_id) REFERENCES intern_opportunities (id) ON DELETE CASCADE, 
    CONSTRAINT uq_intern_opportunity_mentor UNIQUE (opportunity_id, mentor_profile_id)
);

COMMENT ON TABLE intern_opportunity_mentors IS 'Mentors assigned to evaluate or supervise specific opportunities';

COMMENT ON COLUMN intern_opportunity_mentors.id IS 'Unique identifier for the record';

COMMENT ON COLUMN intern_opportunity_mentors.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN intern_opportunity_mentors.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN intern_opportunity_mentors.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN intern_opportunity_mentors.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN intern_opportunity_mentors.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN intern_opportunity_mentors.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_intern_opportunity_mentors_created_by ON intern_opportunity_mentors (created_by);

CREATE INDEX ix_intern_opportunity_mentors_deleted_at ON intern_opportunity_mentors (deleted_at);

CREATE INDEX ix_intern_opportunity_mentors_mentor_profile_id ON intern_opportunity_mentors (mentor_profile_id);

CREATE INDEX ix_intern_opportunity_mentors_opportunity_id ON intern_opportunity_mentors (opportunity_id);

CREATE INDEX ix_intern_opportunity_mentors_updated_by ON intern_opportunity_mentors (updated_by);

CREATE TABLE lms_course_modules (
    course_id UUID NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    description TEXT, 
    order_index NUMERIC NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_lms_course_modules PRIMARY KEY (id), 
    CONSTRAINT fk_lms_course_modules_course_id_acad_courses FOREIGN KEY(course_id) REFERENCES acad_courses (id) ON DELETE CASCADE
);

COMMENT ON TABLE lms_course_modules IS 'Modules inside a course curriculum';

COMMENT ON COLUMN lms_course_modules.id IS 'Unique identifier for the record';

COMMENT ON COLUMN lms_course_modules.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN lms_course_modules.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN lms_course_modules.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN lms_course_modules.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN lms_course_modules.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN lms_course_modules.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_lms_course_modules_course_id ON lms_course_modules (course_id);

CREATE INDEX ix_lms_course_modules_created_by ON lms_course_modules (created_by);

CREATE INDEX ix_lms_course_modules_deleted_at ON lms_course_modules (deleted_at);

CREATE INDEX ix_lms_course_modules_updated_by ON lms_course_modules (updated_by);

CREATE TABLE fin_fee_structures (
    fee_name VARCHAR(255) NOT NULL, 
    fee_type VARCHAR(100) NOT NULL, 
    amount NUMERIC(15, 2) NOT NULL, 
    program_id UUID, 
    batch_id UUID, 
    installments NUMERIC NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_fin_fee_structures PRIMARY KEY (id), 
    CONSTRAINT fk_fin_fee_structures_batch_id_acad_batches FOREIGN KEY(batch_id) REFERENCES acad_batches (id) ON DELETE CASCADE, 
    CONSTRAINT fk_fin_fee_structures_program_id_acad_programs FOREIGN KEY(program_id) REFERENCES acad_programs (id) ON DELETE CASCADE
);

COMMENT ON TABLE fin_fee_structures IS 'Master fee definitions per program or batch';

COMMENT ON COLUMN fin_fee_structures.id IS 'Unique identifier for the record';

COMMENT ON COLUMN fin_fee_structures.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN fin_fee_structures.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN fin_fee_structures.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN fin_fee_structures.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN fin_fee_structures.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN fin_fee_structures.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_fin_fee_structures_batch_id ON fin_fee_structures (batch_id);

CREATE INDEX ix_fin_fee_structures_created_by ON fin_fee_structures (created_by);

CREATE INDEX ix_fin_fee_structures_deleted_at ON fin_fee_structures (deleted_at);

CREATE INDEX ix_fin_fee_structures_program_id ON fin_fee_structures (program_id);

CREATE INDEX ix_fin_fee_structures_updated_by ON fin_fee_structures (updated_by);

CREATE TABLE lms_lessons (
    module_id UUID NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    content_html TEXT, 
    video_url VARCHAR(500), 
    order_index NUMERIC NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_lms_lessons PRIMARY KEY (id), 
    CONSTRAINT fk_lms_lessons_module_id_lms_course_modules FOREIGN KEY(module_id) REFERENCES lms_course_modules (id) ON DELETE CASCADE
);

COMMENT ON TABLE lms_lessons IS 'Individual lessons within a course module';

COMMENT ON COLUMN lms_lessons.id IS 'Unique identifier for the record';

COMMENT ON COLUMN lms_lessons.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN lms_lessons.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN lms_lessons.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN lms_lessons.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN lms_lessons.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN lms_lessons.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_lms_lessons_created_by ON lms_lessons (created_by);

CREATE INDEX ix_lms_lessons_deleted_at ON lms_lessons (deleted_at);

CREATE INDEX ix_lms_lessons_module_id ON lms_lessons (module_id);

CREATE INDEX ix_lms_lessons_updated_by ON lms_lessons (updated_by);

CREATE TABLE lms_quizzes (
    module_id UUID NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    max_score NUMERIC(5, 2) NOT NULL, 
    passing_score NUMERIC(5, 2) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_lms_quizzes PRIMARY KEY (id), 
    CONSTRAINT fk_lms_quizzes_module_id_lms_course_modules FOREIGN KEY(module_id) REFERENCES lms_course_modules (id) ON DELETE CASCADE
);

COMMENT ON TABLE lms_quizzes IS 'Quizzes for course modules';

COMMENT ON COLUMN lms_quizzes.id IS 'Unique identifier for the record';

COMMENT ON COLUMN lms_quizzes.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN lms_quizzes.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN lms_quizzes.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN lms_quizzes.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN lms_quizzes.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN lms_quizzes.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_lms_quizzes_created_by ON lms_quizzes (created_by);

CREATE INDEX ix_lms_quizzes_deleted_at ON lms_quizzes (deleted_at);

CREATE INDEX ix_lms_quizzes_module_id ON lms_quizzes (module_id);

CREATE INDEX ix_lms_quizzes_updated_by ON lms_quizzes (updated_by);

CREATE TABLE profile_students (
    user_id UUID NOT NULL, 
    organization_id UUID NOT NULL, 
    department_id UUID, 
    batch_id UUID, 
    enrollment_number VARCHAR(100) NOT NULL, 
    resume_url VARCHAR(500), 
    github_url VARCHAR(500), 
    linkedin_url VARCHAR(500), 
    skills JSONB, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_profile_students PRIMARY KEY (id), 
    CONSTRAINT fk_profile_students_batch_id_acad_batches FOREIGN KEY(batch_id) REFERENCES acad_batches (id) ON DELETE RESTRICT, 
    CONSTRAINT fk_profile_students_department_id_org_departments FOREIGN KEY(department_id) REFERENCES org_departments (id) ON DELETE RESTRICT, 
    CONSTRAINT fk_profile_students_organization_id_org_organizations FOREIGN KEY(organization_id) REFERENCES org_organizations (id) ON DELETE RESTRICT, 
    CONSTRAINT fk_profile_students_user_id_auth_users FOREIGN KEY(user_id) REFERENCES auth_users (id) ON DELETE CASCADE, 
    CONSTRAINT uq_student_enrollment_number UNIQUE (enrollment_number)
);

COMMENT ON TABLE profile_students IS 'Profile data specifically for students and interns';

COMMENT ON COLUMN profile_students.id IS 'Unique identifier for the record';

COMMENT ON COLUMN profile_students.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN profile_students.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN profile_students.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN profile_students.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN profile_students.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN profile_students.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_profile_students_batch_id ON profile_students (batch_id);

CREATE INDEX ix_profile_students_created_by ON profile_students (created_by);

CREATE INDEX ix_profile_students_deleted_at ON profile_students (deleted_at);

CREATE INDEX ix_profile_students_department_id ON profile_students (department_id);

CREATE INDEX ix_profile_students_organization_id ON profile_students (organization_id);

CREATE INDEX ix_profile_students_updated_by ON profile_students (updated_by);

CREATE UNIQUE INDEX ix_profile_students_user_id ON profile_students (user_id);

CREATE TABLE alum_placement_applications (
    placement_drive_id UUID NOT NULL, 
    student_profile_id UUID NOT NULL, 
    status VARCHAR(50) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_alum_placement_applications PRIMARY KEY (id), 
    CONSTRAINT fk_alum_placement_applications_placement_drive_id_alum__847a FOREIGN KEY(placement_drive_id) REFERENCES alum_placement_drives (id) ON DELETE CASCADE, 
    CONSTRAINT fk_alum_placement_applications_student_profile_id_profi_39ab FOREIGN KEY(student_profile_id) REFERENCES profile_students (id) ON DELETE CASCADE
);

COMMENT ON TABLE alum_placement_applications IS 'Applications submitted during placement drives';

COMMENT ON COLUMN alum_placement_applications.id IS 'Unique identifier for the record';

COMMENT ON COLUMN alum_placement_applications.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN alum_placement_applications.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN alum_placement_applications.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN alum_placement_applications.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN alum_placement_applications.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN alum_placement_applications.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_alum_placement_applications_created_by ON alum_placement_applications (created_by);

CREATE INDEX ix_alum_placement_applications_deleted_at ON alum_placement_applications (deleted_at);

CREATE INDEX ix_alum_placement_applications_placement_drive_id ON alum_placement_applications (placement_drive_id);

CREATE INDEX ix_alum_placement_applications_student_profile_id ON alum_placement_applications (student_profile_id);

CREATE INDEX ix_alum_placement_applications_updated_by ON alum_placement_applications (updated_by);

CREATE TABLE alum_profiles (
    student_profile_id UUID NOT NULL, 
    graduation_year NUMERIC NOT NULL, 
    current_company VARCHAR(255), 
    current_designation VARCHAR(255), 
    is_mentoring BOOLEAN NOT NULL, 
    referrals_provided NUMERIC NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_alum_profiles PRIMARY KEY (id), 
    CONSTRAINT fk_alum_profiles_student_profile_id_profile_students FOREIGN KEY(student_profile_id) REFERENCES profile_students (id) ON DELETE CASCADE
);

COMMENT ON TABLE alum_profiles IS 'Alumni tracking and profiles';

COMMENT ON COLUMN alum_profiles.id IS 'Unique identifier for the record';

COMMENT ON COLUMN alum_profiles.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN alum_profiles.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN alum_profiles.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN alum_profiles.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN alum_profiles.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN alum_profiles.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_alum_profiles_created_by ON alum_profiles (created_by);

CREATE INDEX ix_alum_profiles_deleted_at ON alum_profiles (deleted_at);

CREATE INDEX ix_alum_profiles_student_profile_id ON alum_profiles (student_profile_id);

CREATE INDEX ix_alum_profiles_updated_by ON alum_profiles (updated_by);

CREATE TABLE fin_invoices (
    invoice_number VARCHAR(100) NOT NULL, 
    student_profile_id UUID, 
    company_id UUID, 
    sub_total NUMERIC(15, 2) NOT NULL, 
    tax_amount NUMERIC(15, 2) NOT NULL, 
    discount NUMERIC(15, 2) NOT NULL, 
    grand_total NUMERIC(15, 2) NOT NULL, 
    payment_status VARCHAR(50) NOT NULL, 
    issue_date DATE NOT NULL, 
    due_date DATE NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_fin_invoices PRIMARY KEY (id), 
    CONSTRAINT fk_fin_invoices_company_id_comp_companies FOREIGN KEY(company_id) REFERENCES comp_companies (id) ON DELETE CASCADE, 
    CONSTRAINT fk_fin_invoices_student_profile_id_profile_students FOREIGN KEY(student_profile_id) REFERENCES profile_students (id) ON DELETE CASCADE
);

COMMENT ON TABLE fin_invoices IS 'Client or student invoices';

COMMENT ON COLUMN fin_invoices.payment_status IS 'UNPAID, PARTIAL, PAID';

COMMENT ON COLUMN fin_invoices.id IS 'Unique identifier for the record';

COMMENT ON COLUMN fin_invoices.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN fin_invoices.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN fin_invoices.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN fin_invoices.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN fin_invoices.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN fin_invoices.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_fin_invoices_company_id ON fin_invoices (company_id);

CREATE INDEX ix_fin_invoices_created_by ON fin_invoices (created_by);

CREATE INDEX ix_fin_invoices_deleted_at ON fin_invoices (deleted_at);

CREATE UNIQUE INDEX ix_fin_invoices_invoice_number ON fin_invoices (invoice_number);

CREATE INDEX ix_fin_invoices_student_profile_id ON fin_invoices (student_profile_id);

CREATE INDEX ix_fin_invoices_updated_by ON fin_invoices (updated_by);

CREATE TABLE intern_applications (
    opportunity_id UUID NOT NULL, 
    student_profile_id UUID NOT NULL, 
    status VARCHAR(50) NOT NULL, 
    feedback VARCHAR(1000), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_intern_applications PRIMARY KEY (id), 
    CONSTRAINT fk_intern_applications_opportunity_id_intern_opportunities FOREIGN KEY(opportunity_id) REFERENCES intern_opportunities (id) ON DELETE CASCADE, 
    CONSTRAINT fk_intern_applications_student_profile_id_profile_students FOREIGN KEY(student_profile_id) REFERENCES profile_students (id) ON DELETE CASCADE, 
    CONSTRAINT uq_intern_application UNIQUE (opportunity_id, student_profile_id)
);

COMMENT ON TABLE intern_applications IS 'Student applications to specific opportunities';

COMMENT ON COLUMN intern_applications.status IS 'PENDING, UNDER_REVIEW, ACCEPTED, REJECTED';

COMMENT ON COLUMN intern_applications.id IS 'Unique identifier for the record';

COMMENT ON COLUMN intern_applications.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN intern_applications.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN intern_applications.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN intern_applications.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN intern_applications.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN intern_applications.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_intern_applications_created_by ON intern_applications (created_by);

CREATE INDEX ix_intern_applications_deleted_at ON intern_applications (deleted_at);

CREATE INDEX ix_intern_applications_opportunity_id ON intern_applications (opportunity_id);

CREATE INDEX ix_intern_applications_student_profile_id ON intern_applications (student_profile_id);

CREATE INDEX ix_intern_applications_updated_by ON intern_applications (updated_by);

CREATE TABLE intern_attendance (
    student_profile_id UUID NOT NULL, 
    date DATE NOT NULL, 
    status VARCHAR(50) NOT NULL, 
    notes VARCHAR(500), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_intern_attendance PRIMARY KEY (id), 
    CONSTRAINT fk_intern_attendance_student_profile_id_profile_students FOREIGN KEY(student_profile_id) REFERENCES profile_students (id) ON DELETE CASCADE, 
    CONSTRAINT uq_intern_attendance_date UNIQUE (student_profile_id, date)
);

COMMENT ON TABLE intern_attendance IS 'Daily attendance tracking for students';

COMMENT ON COLUMN intern_attendance.status IS 'PRESENT, ABSENT, HALF_DAY, LEAVE';

COMMENT ON COLUMN intern_attendance.id IS 'Unique identifier for the record';

COMMENT ON COLUMN intern_attendance.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN intern_attendance.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN intern_attendance.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN intern_attendance.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN intern_attendance.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN intern_attendance.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_intern_attendance_created_by ON intern_attendance (created_by);

CREATE INDEX ix_intern_attendance_deleted_at ON intern_attendance (deleted_at);

CREATE INDEX ix_intern_attendance_student_profile_id ON intern_attendance (student_profile_id);

CREATE INDEX ix_intern_attendance_updated_by ON intern_attendance (updated_by);

CREATE TABLE intern_documents (
    student_profile_id UUID NOT NULL, 
    document_type_id UUID NOT NULL, 
    file_url VARCHAR(500) NOT NULL, 
    is_verified BOOLEAN NOT NULL, 
    verified_by_user_id UUID, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_intern_documents PRIMARY KEY (id), 
    CONSTRAINT fk_intern_documents_document_type_id_ref_document_types FOREIGN KEY(document_type_id) REFERENCES ref_document_types (id) ON DELETE RESTRICT, 
    CONSTRAINT fk_intern_documents_student_profile_id_profile_students FOREIGN KEY(student_profile_id) REFERENCES profile_students (id) ON DELETE CASCADE, 
    CONSTRAINT fk_intern_documents_verified_by_user_id_auth_users FOREIGN KEY(verified_by_user_id) REFERENCES auth_users (id) ON DELETE SET NULL
);

COMMENT ON TABLE intern_documents IS 'Documents uploaded by students during internships (e.g., Reports, NOC)';

COMMENT ON COLUMN intern_documents.verified_by_user_id IS 'User who verified the doc';

COMMENT ON COLUMN intern_documents.id IS 'Unique identifier for the record';

COMMENT ON COLUMN intern_documents.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN intern_documents.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN intern_documents.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN intern_documents.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN intern_documents.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN intern_documents.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_intern_documents_created_by ON intern_documents (created_by);

CREATE INDEX ix_intern_documents_deleted_at ON intern_documents (deleted_at);

CREATE INDEX ix_intern_documents_document_type_id ON intern_documents (document_type_id);

CREATE INDEX ix_intern_documents_student_profile_id ON intern_documents (student_profile_id);

CREATE INDEX ix_intern_documents_updated_by ON intern_documents (updated_by);

CREATE TABLE intern_mentor_assignments (
    student_profile_id UUID NOT NULL, 
    mentor_profile_id UUID NOT NULL, 
    opportunity_id UUID, 
    start_date DATE NOT NULL, 
    end_date DATE, 
    status VARCHAR(50) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_intern_mentor_assignments PRIMARY KEY (id), 
    CONSTRAINT ck_intern_mentor_assignments_chk_intern_assignment_dates CHECK (end_date > start_date), 
    CONSTRAINT fk_intern_mentor_assignments_mentor_profile_id_profile_mentors FOREIGN KEY(mentor_profile_id) REFERENCES profile_mentors (id) ON DELETE CASCADE, 
    CONSTRAINT fk_intern_mentor_assignments_opportunity_id_intern_oppo_d5d3 FOREIGN KEY(opportunity_id) REFERENCES intern_opportunities (id) ON DELETE SET NULL, 
    CONSTRAINT fk_intern_mentor_assignments_student_profile_id_profile_00cd FOREIGN KEY(student_profile_id) REFERENCES profile_students (id) ON DELETE CASCADE, 
    CONSTRAINT uq_intern_mentor_assignment UNIQUE (student_profile_id, mentor_profile_id)
);

COMMENT ON TABLE intern_mentor_assignments IS 'Maps a student to a specific mentor for supervision';

COMMENT ON COLUMN intern_mentor_assignments.status IS 'ACTIVE, COMPLETED, TERMINATED';

COMMENT ON COLUMN intern_mentor_assignments.id IS 'Unique identifier for the record';

COMMENT ON COLUMN intern_mentor_assignments.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN intern_mentor_assignments.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN intern_mentor_assignments.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN intern_mentor_assignments.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN intern_mentor_assignments.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN intern_mentor_assignments.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_intern_mentor_assignments_created_by ON intern_mentor_assignments (created_by);

CREATE INDEX ix_intern_mentor_assignments_deleted_at ON intern_mentor_assignments (deleted_at);

CREATE INDEX ix_intern_mentor_assignments_mentor_profile_id ON intern_mentor_assignments (mentor_profile_id);

CREATE INDEX ix_intern_mentor_assignments_opportunity_id ON intern_mentor_assignments (opportunity_id);

CREATE INDEX ix_intern_mentor_assignments_student_profile_id ON intern_mentor_assignments (student_profile_id);

CREATE INDEX ix_intern_mentor_assignments_updated_by ON intern_mentor_assignments (updated_by);

CREATE TABLE lms_quiz_attempts (
    quiz_id UUID NOT NULL, 
    student_profile_id UUID NOT NULL, 
    score NUMERIC(5, 2) NOT NULL, 
    status VARCHAR(50) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_lms_quiz_attempts PRIMARY KEY (id), 
    CONSTRAINT fk_lms_quiz_attempts_quiz_id_lms_quizzes FOREIGN KEY(quiz_id) REFERENCES lms_quizzes (id) ON DELETE CASCADE, 
    CONSTRAINT fk_lms_quiz_attempts_student_profile_id_profile_students FOREIGN KEY(student_profile_id) REFERENCES profile_students (id) ON DELETE CASCADE
);

COMMENT ON TABLE lms_quiz_attempts IS 'Student attempts on a quiz';

COMMENT ON COLUMN lms_quiz_attempts.status IS 'PASSED, FAILED';

COMMENT ON COLUMN lms_quiz_attempts.id IS 'Unique identifier for the record';

COMMENT ON COLUMN lms_quiz_attempts.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN lms_quiz_attempts.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN lms_quiz_attempts.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN lms_quiz_attempts.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN lms_quiz_attempts.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN lms_quiz_attempts.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_lms_quiz_attempts_created_by ON lms_quiz_attempts (created_by);

CREATE INDEX ix_lms_quiz_attempts_deleted_at ON lms_quiz_attempts (deleted_at);

CREATE INDEX ix_lms_quiz_attempts_quiz_id ON lms_quiz_attempts (quiz_id);

CREATE INDEX ix_lms_quiz_attempts_student_profile_id ON lms_quiz_attempts (student_profile_id);

CREATE INDEX ix_lms_quiz_attempts_updated_by ON lms_quiz_attempts (updated_by);

CREATE TABLE alum_career_progress (
    alumni_profile_id UUID NOT NULL, 
    company_name VARCHAR(255) NOT NULL, 
    designation VARCHAR(255) NOT NULL, 
    location VARCHAR(255), 
    start_date DATE NOT NULL, 
    end_date DATE, 
    is_current BOOLEAN NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_alum_career_progress PRIMARY KEY (id), 
    CONSTRAINT fk_alum_career_progress_alumni_profile_id_alum_profiles FOREIGN KEY(alumni_profile_id) REFERENCES alum_profiles (id) ON DELETE CASCADE
);

COMMENT ON TABLE alum_career_progress IS 'Career progression history for alumni';

COMMENT ON COLUMN alum_career_progress.id IS 'Unique identifier for the record';

COMMENT ON COLUMN alum_career_progress.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN alum_career_progress.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN alum_career_progress.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN alum_career_progress.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN alum_career_progress.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN alum_career_progress.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_alum_career_progress_alumni_profile_id ON alum_career_progress (alumni_profile_id);

CREATE INDEX ix_alum_career_progress_created_by ON alum_career_progress (created_by);

CREATE INDEX ix_alum_career_progress_deleted_at ON alum_career_progress (deleted_at);

CREATE INDEX ix_alum_career_progress_updated_by ON alum_career_progress (updated_by);

CREATE TABLE alum_interviews (
    placement_application_id UUID NOT NULL, 
    round_name VARCHAR(100) NOT NULL, 
    scheduled_time TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
    status VARCHAR(50) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_alum_interviews PRIMARY KEY (id), 
    CONSTRAINT fk_alum_interviews_placement_application_id_alum_placem_caf9 FOREIGN KEY(placement_application_id) REFERENCES alum_placement_applications (id) ON DELETE CASCADE
);

COMMENT ON TABLE alum_interviews IS 'Interviews scheduled during placements';

COMMENT ON COLUMN alum_interviews.id IS 'Unique identifier for the record';

COMMENT ON COLUMN alum_interviews.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN alum_interviews.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN alum_interviews.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN alum_interviews.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN alum_interviews.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN alum_interviews.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_alum_interviews_created_by ON alum_interviews (created_by);

CREATE INDEX ix_alum_interviews_deleted_at ON alum_interviews (deleted_at);

CREATE INDEX ix_alum_interviews_placement_application_id ON alum_interviews (placement_application_id);

CREATE INDEX ix_alum_interviews_updated_by ON alum_interviews (updated_by);

CREATE TABLE alum_offer_letters (
    placement_application_id UUID NOT NULL, 
    ctc NUMERIC(15, 2) NOT NULL, 
    joining_date DATE, 
    file_url VARCHAR(500), 
    status VARCHAR(50) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_alum_offer_letters PRIMARY KEY (id), 
    CONSTRAINT fk_alum_offer_letters_placement_application_id_alum_pla_b8a0 FOREIGN KEY(placement_application_id) REFERENCES alum_placement_applications (id) ON DELETE CASCADE
);

COMMENT ON TABLE alum_offer_letters IS 'Job offers made to students';

COMMENT ON COLUMN alum_offer_letters.id IS 'Unique identifier for the record';

COMMENT ON COLUMN alum_offer_letters.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN alum_offer_letters.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN alum_offer_letters.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN alum_offer_letters.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN alum_offer_letters.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN alum_offer_letters.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_alum_offer_letters_created_by ON alum_offer_letters (created_by);

CREATE INDEX ix_alum_offer_letters_deleted_at ON alum_offer_letters (deleted_at);

CREATE INDEX ix_alum_offer_letters_placement_application_id ON alum_offer_letters (placement_application_id);

CREATE INDEX ix_alum_offer_letters_updated_by ON alum_offer_letters (updated_by);

CREATE TABLE fin_invoice_items (
    invoice_id UUID NOT NULL, 
    description VARCHAR(255) NOT NULL, 
    amount NUMERIC(15, 2) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_fin_invoice_items PRIMARY KEY (id), 
    CONSTRAINT fk_fin_invoice_items_invoice_id_fin_invoices FOREIGN KEY(invoice_id) REFERENCES fin_invoices (id) ON DELETE CASCADE
);

COMMENT ON TABLE fin_invoice_items IS 'Line items for an invoice';

COMMENT ON COLUMN fin_invoice_items.id IS 'Unique identifier for the record';

COMMENT ON COLUMN fin_invoice_items.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN fin_invoice_items.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN fin_invoice_items.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN fin_invoice_items.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN fin_invoice_items.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN fin_invoice_items.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_fin_invoice_items_created_by ON fin_invoice_items (created_by);

CREATE INDEX ix_fin_invoice_items_deleted_at ON fin_invoice_items (deleted_at);

CREATE INDEX ix_fin_invoice_items_invoice_id ON fin_invoice_items (invoice_id);

CREATE INDEX ix_fin_invoice_items_updated_by ON fin_invoice_items (updated_by);

CREATE TABLE fin_receipts (
    receipt_number VARCHAR(100) NOT NULL, 
    invoice_id UUID, 
    amount_paid NUMERIC(15, 2) NOT NULL, 
    payment_method VARCHAR(50) NOT NULL, 
    payment_date TIMESTAMP WITH TIME ZONE NOT NULL, 
    transaction_id VARCHAR(255), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_fin_receipts PRIMARY KEY (id), 
    CONSTRAINT fk_fin_receipts_invoice_id_fin_invoices FOREIGN KEY(invoice_id) REFERENCES fin_invoices (id) ON DELETE SET NULL
);

COMMENT ON TABLE fin_receipts IS 'Payment receipts';

COMMENT ON COLUMN fin_receipts.id IS 'Unique identifier for the record';

COMMENT ON COLUMN fin_receipts.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN fin_receipts.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN fin_receipts.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN fin_receipts.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN fin_receipts.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN fin_receipts.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_fin_receipts_created_by ON fin_receipts (created_by);

CREATE INDEX ix_fin_receipts_deleted_at ON fin_receipts (deleted_at);

CREATE INDEX ix_fin_receipts_invoice_id ON fin_receipts (invoice_id);

CREATE UNIQUE INDEX ix_fin_receipts_receipt_number ON fin_receipts (receipt_number);

CREATE INDEX ix_fin_receipts_transaction_id ON fin_receipts (transaction_id);

CREATE INDEX ix_fin_receipts_updated_by ON fin_receipts (updated_by);

CREATE TABLE intern_assessments (
    assignment_id UUID NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    score NUMERIC(5, 2) NOT NULL, 
    max_score NUMERIC(5, 2) NOT NULL, 
    feedback VARCHAR(1000), 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_intern_assessments PRIMARY KEY (id), 
    CONSTRAINT ck_intern_assessments_chk_intern_assessment_score CHECK (score >= 0 AND score <= max_score), 
    CONSTRAINT fk_intern_assessments_assignment_id_intern_mentor_assignments FOREIGN KEY(assignment_id) REFERENCES intern_mentor_assignments (id) ON DELETE CASCADE
);

COMMENT ON TABLE intern_assessments IS 'Performance assessments conducted by mentors';

COMMENT ON COLUMN intern_assessments.id IS 'Unique identifier for the record';

COMMENT ON COLUMN intern_assessments.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN intern_assessments.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN intern_assessments.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN intern_assessments.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN intern_assessments.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN intern_assessments.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_intern_assessments_assignment_id ON intern_assessments (assignment_id);

CREATE INDEX ix_intern_assessments_created_by ON intern_assessments (created_by);

CREATE INDEX ix_intern_assessments_deleted_at ON intern_assessments (deleted_at);

CREATE INDEX ix_intern_assessments_updated_by ON intern_assessments (updated_by);

CREATE TABLE intern_certificates (
    student_profile_id UUID NOT NULL, 
    assignment_id UUID, 
    certificate_number VARCHAR(100) NOT NULL, 
    issue_date DATE NOT NULL, 
    file_url VARCHAR(500) NOT NULL, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_intern_certificates PRIMARY KEY (id), 
    CONSTRAINT fk_intern_certificates_assignment_id_intern_mentor_assignments FOREIGN KEY(assignment_id) REFERENCES intern_mentor_assignments (id) ON DELETE SET NULL, 
    CONSTRAINT fk_intern_certificates_student_profile_id_profile_students FOREIGN KEY(student_profile_id) REFERENCES profile_students (id) ON DELETE CASCADE, 
    CONSTRAINT uq_intern_certificate_number UNIQUE (certificate_number), 
    CONSTRAINT uq_intern_certificates_certificate_number UNIQUE (certificate_number)
);

COMMENT ON TABLE intern_certificates IS 'Final completion certificates issued to students';

COMMENT ON COLUMN intern_certificates.id IS 'Unique identifier for the record';

COMMENT ON COLUMN intern_certificates.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN intern_certificates.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN intern_certificates.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN intern_certificates.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN intern_certificates.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN intern_certificates.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_intern_certificates_created_by ON intern_certificates (created_by);

CREATE INDEX ix_intern_certificates_deleted_at ON intern_certificates (deleted_at);

CREATE INDEX ix_intern_certificates_student_profile_id ON intern_certificates (student_profile_id);

CREATE INDEX ix_intern_certificates_updated_by ON intern_certificates (updated_by);

CREATE TABLE intern_tasks (
    assignment_id UUID NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    description TEXT NOT NULL, 
    due_date DATE, 
    status VARCHAR(50) NOT NULL, 
    submission_url VARCHAR(500), 
    feedback TEXT, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_intern_tasks PRIMARY KEY (id), 
    CONSTRAINT fk_intern_tasks_assignment_id_intern_mentor_assignments FOREIGN KEY(assignment_id) REFERENCES intern_mentor_assignments (id) ON DELETE CASCADE
);

COMMENT ON TABLE intern_tasks IS 'Specific tasks assigned by a mentor to a student';

COMMENT ON COLUMN intern_tasks.status IS 'TODO, IN_PROGRESS, IN_REVIEW, COMPLETED';

COMMENT ON COLUMN intern_tasks.id IS 'Unique identifier for the record';

COMMENT ON COLUMN intern_tasks.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN intern_tasks.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN intern_tasks.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN intern_tasks.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN intern_tasks.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN intern_tasks.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_intern_tasks_assignment_id ON intern_tasks (assignment_id);

CREATE INDEX ix_intern_tasks_created_by ON intern_tasks (created_by);

CREATE INDEX ix_intern_tasks_deleted_at ON intern_tasks (deleted_at);

CREATE INDEX ix_intern_tasks_updated_by ON intern_tasks (updated_by);

CREATE TABLE alum_interview_feedback (
    interview_id UUID NOT NULL, 
    recruiter_profile_id UUID NOT NULL, 
    rating NUMERIC(5, 2) NOT NULL, 
    comments TEXT, 
    id UUID NOT NULL, 
    created_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL, 
    created_by UUID, 
    updated_by UUID, 
    deleted_at TIMESTAMP WITH TIME ZONE, 
    version_id INTEGER NOT NULL, 
    CONSTRAINT pk_alum_interview_feedback PRIMARY KEY (id), 
    CONSTRAINT fk_alum_interview_feedback_interview_id_alum_interviews FOREIGN KEY(interview_id) REFERENCES alum_interviews (id) ON DELETE CASCADE, 
    CONSTRAINT fk_alum_interview_feedback_recruiter_profile_id_profile_44ab FOREIGN KEY(recruiter_profile_id) REFERENCES profile_recruiters (id) ON DELETE CASCADE
);

COMMENT ON TABLE alum_interview_feedback IS 'Feedback from interviews';

COMMENT ON COLUMN alum_interview_feedback.id IS 'Unique identifier for the record';

COMMENT ON COLUMN alum_interview_feedback.created_at IS 'Timestamp when the record was created';

COMMENT ON COLUMN alum_interview_feedback.updated_at IS 'Timestamp when the record was last updated';

COMMENT ON COLUMN alum_interview_feedback.created_by IS 'UUID of the user who created this record (Soft FK)';

COMMENT ON COLUMN alum_interview_feedback.updated_by IS 'UUID of the user who last updated this record (Soft FK)';

COMMENT ON COLUMN alum_interview_feedback.deleted_at IS 'Timestamp when the record was soft-deleted. NULL means active.';

COMMENT ON COLUMN alum_interview_feedback.version_id IS 'Optimistic locking version number';

CREATE INDEX ix_alum_interview_feedback_created_by ON alum_interview_feedback (created_by);

CREATE INDEX ix_alum_interview_feedback_deleted_at ON alum_interview_feedback (deleted_at);

CREATE INDEX ix_alum_interview_feedback_interview_id ON alum_interview_feedback (interview_id);

CREATE INDEX ix_alum_interview_feedback_recruiter_profile_id ON alum_interview_feedback (recruiter_profile_id);

CREATE INDEX ix_alum_interview_feedback_updated_by ON alum_interview_feedback (updated_by);

INSERT INTO alembic_version (version_num) VALUES ('b85d1d564f15') RETURNING alembic_version.version_num;

COMMIT;

