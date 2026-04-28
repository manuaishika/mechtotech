create extension if not exists pgcrypto;

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  question_type text check (question_type in ('mcq', 'conceptual')),
  options jsonb,
  correct_option int,
  topic text not null,
  difficulty text check (difficulty in ('easy', 'medium', 'hard')),
  company text,
  industry_sector text,
  is_real_interview bool default false,
  is_approved bool default true,
  created_at timestamp default now()
);

create table if not exists pending_questions (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  question_type text,
  options jsonb,
  correct_option int,
  topic text,
  difficulty text,
  company text,
  industry_sector text,
  is_real_interview bool default false,
  created_at timestamp default now()
);

create table if not exists quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  topic text,
  difficulty text,
  company text,
  total_questions int,
  score int,
  time_taken int,
  created_at timestamp default now()
);

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  sector text,
  description text,
  focus_topics jsonb,
  difficulty_profile text
);

alter table questions enable row level security;
alter table pending_questions enable row level security;
alter table quiz_attempts enable row level security;
alter table companies enable row level security;

drop policy if exists "public read questions" on questions;
drop policy if exists "public insert pending_questions" on pending_questions;
drop policy if exists "public insert quiz_attempts" on quiz_attempts;
drop policy if exists "public read quiz_attempts" on quiz_attempts;
drop policy if exists "public read companies" on companies;

create policy "public read questions" on questions for select using (is_approved = true);
create policy "public insert pending_questions" on pending_questions for insert with check (true);
create policy "public insert quiz_attempts" on quiz_attempts for insert with check (true);
create policy "public read quiz_attempts" on quiz_attempts for select using (true);
create policy "public read companies" on companies for select using (true);

insert into companies (name, slug, sector, description, focus_topics, difficulty_profile) values
('Hero MotoCorp', 'hero-motocorp', 'automobile', 'Manufacturing and two-wheeler systems roles.', '["Automobile Systems","Manufacturing & Processes","EVs & Electrification"]', 'Medium: IC engines + practical shop-floor understanding'),
('Tata Motors', 'tata-motors', 'automobile', 'Vehicle design, manufacturing, and EV systems.', '["Automobile Systems","Materials Science","EVs & Electrification"]', 'Medium-hard: mixes fundamentals with application'),
('Bajaj Auto', 'bajaj-auto', 'automobile', 'Powertrain, vehicle dynamics, and production roles.', '["Automobile Systems","Manufacturing & Processes","Design & Mechanisms"]', 'Medium: practical and product-focused'),
('Siemens', 'siemens', 'industrial', 'Industrial engineering and automation heavy roles.', '["Thermodynamics","Industrial Automation","GD&T & Engineering Drawing"]', 'Hard: strong theory plus controls and plant context'),
('ABB', 'abb', 'industrial', 'Automation, drives, and industrial electrification.', '["Industrial Automation","EVs & Electrification","GD&T & Engineering Drawing"]', 'Hard: controls and industrial systems depth'),
('Bosch', 'bosch', 'industrial', 'Manufacturing, quality, and component engineering.', '["Manufacturing & Processes","Materials Science","GD&T & Engineering Drawing"]', 'Hard: detail-oriented technical rounds'),
('L&T', 'l-and-t', 'industrial', 'Heavy engineering, EPC, and project execution roles.', '["Fluid Mechanics","Manufacturing & Processes","Design & Mechanisms"]', 'Hard: fundamentals plus real-world constraints'),
('GE', 'ge', 'industrial', 'Energy and rotating machinery related hiring.', '["Thermodynamics","Fluid Mechanics","Materials Science"]', 'Hard: numerical and conceptual rigor'),
('Honeywell', 'honeywell', 'industrial', 'Process industries and automation-linked roles.', '["Industrial Automation","Thermodynamics","EVs & Electrification"]', 'Hard: controls + fundamentals'),
('Schlumberger', 'schlumberger', 'oil_gas', 'Field and design roles in drilling and fluid systems.', '["Fluid Mechanics","Materials Science","Thermodynamics"]', 'Hard: fluid mechanics and applied engineering'),
('HAL', 'hal', 'aerospace', 'Aerospace manufacturing and propulsion pathways.', '["Thermodynamics","Materials Science","Design & Mechanisms"]', 'Hard: high expectation on core mechanics'),
('ISRO', 'isro', 'aerospace', 'Space systems and high-rigor engineering roles.', '["Thermodynamics","Fluid Mechanics","Materials Science"]', 'Hard: deep fundamentals and problem solving'),
('Mahindra', 'mahindra', 'automobile', 'Automotive systems and EV platform roles.', '["Automobile Systems","EVs & Electrification","Manufacturing & Processes"]', 'Medium-hard: mixed conceptual and practical')
on conflict (slug) do nothing;

-- MCQ seed (core requested set)
insert into questions (question, answer, question_type, options, correct_option, topic, difficulty, company, industry_sector, is_real_interview) values
('Otto cycle efficiency is:', 'For air-standard Otto cycle, eta = 1 - 1/(r^(gamma-1)).', 'mcq', '["1 - 1/(r^(gamma-1))","1 - Tc/Th","r^(gamma-1)","1 - 1/r"]', 0, 'Thermodynamics', 'medium', 'Siemens', 'industrial', true),
('Diesel cycle generally gains efficiency primarily due to:', 'Higher compression ratio is the major reason in practical comparison.', 'mcq', '["Higher compression ratio","Lower compression ratio","No heat rejection","No friction"]', 0, 'Thermodynamics', 'medium', 'GE', 'industrial', true),
('Rankine cycle is mainly used in:', 'Rankine is the backbone of steam power plants.', 'mcq', '["Steam power plants","SI engines","Air compressors","Gas turbines only"]', 0, 'Thermodynamics', 'easy', 'GE', 'industrial', true),
('Carnot efficiency is:', 'eta = 1 - Tc/Th in absolute temperature.', 'mcq', '["1 - Tc/Th","1 - Th/Tc","Th/Tc","Tc/Th"]', 0, 'Thermodynamics', 'easy', 'ISRO', 'aerospace', true),
('Intercooling in multistage compressors is used to:', 'It reduces compressor work by cooling air between stages.', 'mcq', '["Reduce work input","Increase pressure ratio alone","Increase friction","Reduce volumetric efficiency"]', 0, 'Thermodynamics', 'medium', 'Siemens', 'industrial', true),
('Compressor power requirement at high altitude tends to:', 'Power per useful mass flow increases due to lower inlet density.', 'mcq', '["Increase for same mass throughput","Drop to zero","Stay always constant","Become independent of density"]', 0, 'Thermodynamics', 'hard', 'HAL', 'aerospace', true),

('Bernoulli equation relates:', 'Pressure, velocity head and elevation head along a streamline.', 'mcq', '["Pressure, velocity, elevation","Stress and strain","Heat and work","Torque and speed"]', 0, 'Fluid Mechanics', 'easy', 'Schlumberger', 'oil_gas', true),
('Cavitation starts when local pressure:', 'Cavitation starts when local pressure falls below vapor pressure.', 'mcq', '["Falls below vapor pressure","Exceeds atmospheric pressure","Equals stagnation pressure","Matches hydrostatic head"]', 0, 'Fluid Mechanics', 'medium', 'ONGC', 'oil_gas', true),
('A Newtonian fluid has:', 'Linear relation between shear stress and shear rate.', 'mcq', '["Linear tau-gamma relation","Constant density only","Zero viscosity","Nonlinear plastic yield"]', 0, 'Fluid Mechanics', 'easy', 'L&T', 'industrial', true),
('Reynolds number indicates:', 'It signals laminar versus turbulent trend of flow.', 'mcq', '["Flow regime tendency","Only pressure","Only viscosity","Only velocity"]', 0, 'Fluid Mechanics', 'easy', 'Schlumberger', 'oil_gas', true),
('Pascal law is the basis of:', 'Hydraulic press and hydraulic brake systems.', 'mcq', '["Hydraulic systems","Gas turbines","Heat pumps","Boilers"]', 0, 'Fluid Mechanics', 'easy', 'Siemens', 'industrial', false),

('Forged component is usually stronger than cast due to:', 'Grain flow refinement and lower internal defects.', 'mcq', '["Better grain flow","Lower melting point","Higher porosity","No heat treatment"]', 0, 'Materials Science', 'easy', 'Bosch', 'industrial', true),
('Hardness is best described as:', 'Resistance to indentation and scratching.', 'mcq', '["Indentation resistance","Energy absorption","Elastic modulus","Damping ratio"]', 0, 'Materials Science', 'easy', 'Tata Motors', 'automobile', true),
('Toughness indicates:', 'Ability to absorb energy before fracture.', 'mcq', '["Energy absorption before fracture","Surface smoothness","Corrosion rate","Thermal conductivity"]', 0, 'Materials Science', 'easy', 'HAL', 'aerospace', true),
('Annealing is typically used to:', 'Relieve stresses and improve ductility.', 'mcq', '["Soften and stress-relieve","Max harden instantly","Add alloying elements","Increase brittleness"]', 0, 'Materials Science', 'medium', 'Siemens', 'industrial', true),
('Quenching is primarily used to:', 'Increase hardness via rapid cooling.', 'mcq', '["Increase hardness","Reduce carbon content","Increase ductility always","Remove oxides only"]', 0, 'Materials Science', 'medium', 'Bosch', 'industrial', true),
('Endurance limit refers to:', 'Stress amplitude for very high cycle fatigue survival.', 'mcq', '["Fatigue limit at high cycles","Ultimate tensile strength","Yield point","Fracture toughness"]', 0, 'Materials Science', 'medium', 'Tata Motors', 'automobile', true),

('Draft allowance in casting is provided for:', 'Easy removal of pattern from mold.', 'mcq', '["Pattern withdrawal","Shrinkage compensation","Surface finish only","Machinability only"]', 0, 'Manufacturing & Processes', 'easy', 'Bosch', 'industrial', true),
('Continuous chip formation is promoted by:', 'Ductile material, sharp tool, high speed.', 'mcq', '["Ductile material + high speed","Brittle material only","Low speed + dull tool","Interrupted cut only"]', 0, 'Manufacturing & Processes', 'medium', 'Siemens', 'industrial', true),
('Fixture is mainly used to:', 'Hold and locate workpiece securely.', 'mcq', '["Hold and locate work","Guide tool path directly","Measure hardness","Cool the tool"]', 0, 'Manufacturing & Processes', 'easy', 'L&T', 'industrial', true),
('Gantt chart is used for:', 'Planning and scheduling project activities.', 'mcq', '["Scheduling tasks","GD&T control","Heat treatment","Material testing"]', 0, 'Manufacturing & Processes', 'easy', 'Tata Motors', 'automobile', true),
('In milling machine, multi-tooth cutter is generally mounted on:', 'Spindle/arbor setup depending on machine architecture.', 'mcq', '["Spindle/arbor","Tailstock","Crosshead only","Chuck jaw"]', 0, 'Manufacturing & Processes', 'medium', 'Bosch', 'industrial', true),

('Correct four-stroke sequence is:', 'Intake, compression, power, exhaust.', 'mcq', '["Intake-Compression-Power-Exhaust","Compression-Intake-Exhaust-Power","Power-Compression-Intake-Exhaust","Exhaust-Intake-Power-Compression"]', 0, 'Automobile Systems', 'easy', 'Hero MotoCorp', 'automobile', true),
('Turbocharger differs from supercharger because turbo is driven by:', 'Turbo uses exhaust gas energy.', 'mcq', '["Exhaust gas","Crankshaft belt","Battery motor only","Flywheel only"]', 0, 'Automobile Systems', 'easy', 'Tata Motors', 'automobile', true),
('Differential in vehicles primarily:', 'Allows left and right wheel speed difference in turns.', 'mcq', '["Allows wheel speed difference","Increases brake force","Raises compression ratio","Acts as muffler"]', 0, 'Automobile Systems', 'easy', 'Bajaj Auto', 'automobile', true),
('Disc brakes are preferred for performance because:', 'They dissipate heat faster and resist fade better.', 'mcq', '["Better cooling","Lower cost","No maintenance","No hydraulic need"]', 0, 'Automobile Systems', 'medium', 'Mahindra', 'automobile', true),
('Main function of clutch is to:', 'Engage/disengage engine power smoothly to transmission.', 'mcq', '["Power engagement control","Increase octane","Cool engine","Raise compression"]', 0, 'Automobile Systems', 'easy', 'Hero MotoCorp', 'automobile', true),

('BMS in EV stands for and does:', 'Battery Management System monitors/protects cells.', 'mcq', '["Monitors and protects cells","Only charging socket lock","Only speed control","Only traction control"]', 0, 'EVs & Electrification', 'easy', 'Tata Motors', 'automobile', true),
('Regenerative braking works by:', 'Using motor as generator during deceleration.', 'mcq', '["Motor as generator","Extra brake pad friction","Hydraulic amplification","Gearbox overdrive"]', 0, 'EVs & Electrification', 'easy', 'Mahindra', 'automobile', true),
('Traction inverter function is:', 'Convert DC battery power into controlled AC for motor.', 'mcq', '["DC to controlled AC","AC to steam","DC to hydraulic pressure","AC to DC brake fluid"]', 0, 'EVs & Electrification', 'medium', 'ABB', 'industrial', true),
('Compared to many NMC packs, LiFePO4 generally offers:', 'Better thermal stability and cycle life with lower energy density.', 'mcq', '["Higher stability lower energy density","Higher energy density always","No thermal concerns","No balancing needed"]', 0, 'EVs & Electrification', 'medium', 'Siemens', 'industrial', true),
('V2G means:', 'Vehicle can send power back to grid in supported architecture.', 'mcq', '["Vehicle to grid bidirectional flow","Vehicle to garage","Voltage to ground shorting","Variable two gear"]', 0, 'EVs & Electrification', 'hard', 'ABB', 'industrial', true),

('Third-angle projection places top view:', 'Above the front view in third-angle convention.', 'mcq', '["Above front view","Below front view always","Left only","Inside section view"]', 0, 'GD&T & Engineering Drawing', 'easy', 'Siemens', 'industrial', true),
('Dotted lines in engineering drawings indicate:', 'Hidden edges/features not directly visible in current view.', 'mcq', '["Hidden features","Centerline only","Break lines","Cutting plane"]', 0, 'GD&T & Engineering Drawing', 'easy', 'Bosch', 'industrial', true),
('Title block commonly includes:', 'Drawing number, revision, material and scale.', 'mcq', '["ID, revision, material, scale","Only title","Only tolerance","Only company logo"]', 0, 'GD&T & Engineering Drawing', 'easy', 'ABB', 'industrial', true),
('GD&T primarily ensures:', 'Functional geometric control for manufacturing and inspection.', 'mcq', '["Functional geometric control","Only surface color","Only weight","Only cost control"]', 0, 'GD&T & Engineering Drawing', 'medium', 'L&T', 'industrial', true);

-- Conceptual seed set (requested prompts)
insert into questions (question, answer, question_type, topic, difficulty, company, industry_sector, is_real_interview) values
('Why is aluminium used in aeroplanes?', 'High strength-to-weight ratio, good corrosion resistance, and manufacturability make aluminium alloys a strong aerospace default.', 'conceptual', 'Materials Science', 'medium', 'HAL', 'aerospace', true),
('Why is carbon fibre used in car bodies?', 'It provides high stiffness and strength at very low mass, improving acceleration, handling and efficiency in performance designs.', 'conceptual', 'Materials Science', 'medium', 'Tata Motors', 'automobile', true),
('How does a differential work intuitively?', 'It splits torque while allowing wheel speed difference during turns via spider and side gears.', 'conceptual', 'Automobile Systems', 'medium', 'Hero MotoCorp', 'automobile', true),
('What linkages/mechanisms do you see in daily life?', 'Examples include slider-crank in engines, four-bar in wipers, cam-follower in valve trains and toggle clamps in fixtures.', 'conceptual', 'Design & Mechanisms', 'easy', 'L&T', 'industrial', true),
('Why are wheel hubs lightweight?', 'Lower unsprung mass improves ride response, handling and rotational inertia performance.', 'conceptual', 'Automobile Systems', 'easy', 'Bajaj Auto', 'automobile', true),
('How does 3D printing help prototyping?', 'It rapidly converts CAD into test parts, speeding design iteration and reducing tooling dependency.', 'conceptual', 'Manufacturing & Processes', 'easy', 'Siemens', 'industrial', true),
('Explain factor of safety and why multiple FoS values are used.', 'FoS handles uncertainty; criticality, loading variability and failure consequence drive different FoS choices.', 'conceptual', 'Design & Mechanisms', 'medium', 'L&T', 'industrial', true),
('Why does cavitation damage pump impellers?', 'Bubble collapse near surfaces creates micro-jets and pressure spikes that erode metal over repeated cycles.', 'conceptual', 'Fluid Mechanics', 'medium', 'Schlumberger', 'oil_gas', true),
('Explain stress-strain curves for steel, aluminium and ceramic.', 'Steel often shows clear yield and ductility, aluminium has smooth yielding, ceramics are mostly elastic then brittle fracture.', 'conceptual', 'Materials Science', 'hard', 'Bosch', 'industrial', true),
('Why are disc brakes preferred over drum for performance?', 'Better cooling and lower fade under repeated high-energy braking makes discs superior in performance use.', 'conceptual', 'Automobile Systems', 'medium', 'Tata Motors', 'automobile', true),
('Explain regenerative braking simply.', 'During slowing, motor acts as generator and sends recovered energy back to battery.', 'conceptual', 'EVs & Electrification', 'easy', 'Mahindra', 'automobile', true),
('What is turbo lag and why does it happen?', 'Boost builds after exhaust energy accelerates turbine, causing a delay between throttle and peak boost.', 'conceptual', 'Automobile Systems', 'medium', 'Tata Motors', 'automobile', true),
('How does a PLC differ from a microcontroller?', 'PLC is rugged and deterministic for plant automation with industrial I/O; microcontroller is flexible but needs additional industrial hardening.', 'conceptual', 'Industrial Automation', 'medium', 'Siemens', 'industrial', true),
('What is GD&T and why does manufacturing need it?', 'GD&T communicates functional geometry so parts assemble reliably despite manufacturing variation.', 'conceptual', 'GD&T & Engineering Drawing', 'medium', 'Bosch', 'industrial', true),
('Explain thermal management in EV batteries.', 'Thermal control keeps cells in safe temperature window for life, fast charging and consistent power.', 'conceptual', 'EVs & Electrification', 'medium', 'Tata Motors', 'automobile', true),
('What is intercooling and why in multistage compressors?', 'Intercooling lowers intermediate temperature and specific volume, reducing total compression work.', 'conceptual', 'Thermodynamics', 'medium', 'GE', 'industrial', true);
-- Questions table
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  question_type TEXT CHECK (question_type IN ('mcq', 'conceptual')),
  options JSONB,
  correct_option INT,
  topic TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  company TEXT,
  is_real_interview BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Community submissions
CREATE TABLE pending_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  question_type TEXT,
  options JSONB,
  correct_option INT,
  topic TEXT,
  difficulty TEXT,
  company TEXT,
  is_real_interview BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quiz sessions (anonymous)
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT,
  topic TEXT,
  difficulty TEXT,
  total_questions INT,
  score INT,
  time_taken INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pending_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no auth required)
CREATE POLICY "Allow public read access to approved questions"
  ON questions FOR SELECT
  USING (is_approved = TRUE);

CREATE POLICY "Allow public insert to pending questions"
  ON pending_questions FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Allow public insert to quiz attempts"
  ON quiz_attempts FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Allow public read access to quiz attempts"
  ON quiz_attempts FOR SELECT
  USING (TRUE);

-- Seed Data: MCQ Questions
INSERT INTO questions (question, answer, question_type, options, correct_option, topic, difficulty, company, is_real_interview) VALUES
(
  'What is the formula for Otto cycle efficiency?',
  'The Otto cycle efficiency is given by: η = 1 - (1/r^(γ-1)), where r is the compression ratio and γ is the specific heat ratio. This shows that efficiency increases with compression ratio.',
  'mcq',
  '["η = 1 - (1/r^(γ-1))", "η = 1 - (T1/T2)", "η = 1 - (r^γ)", "η = (T2-T1)/T2"]',
  0,
  'Thermodynamics',
  'medium',
  'Mahindra',
  TRUE
),
(
  'What is Carnot efficiency?',
  'Carnot efficiency represents the maximum possible efficiency of a heat engine operating between two temperatures: η = 1 - (Tc/Th), where Tc is cold reservoir temperature and Th is hot reservoir temperature in Kelvin.',
  'mcq',
  '["η = 1 - (Tc/Th)", "η = 1 - (Th/Tc)", "η = (Th-Tc)/Tc", "η = Th/Tc"]',
  0,
  'Thermodynamics',
  'easy',
  'Tata Motors',
  TRUE
),
(
  'Pascal''s law states that:',
  'Pascal''s law states that pressure applied to a confined fluid is transmitted equally in all directions throughout the fluid. This principle is used in hydraulic systems like brakes and lifts.',
  'mcq',
  '["Pressure is transmitted equally in all directions", "Pressure decreases with depth", "Pressure is proportional to velocity", "Pressure equals force times area"]',
  0,
  'Fluid Mechanics',
  'easy',
  NULL,
  FALSE
),
(
  'What is endurance limit?',
  'Endurance limit (or fatigue limit) is the maximum stress a material can withstand for an infinite number of load cycles without failure. Ferrous metals typically show a distinct endurance limit.',
  'mcq',
  '["Max stress for infinite cycles without failure", "Max stress before yielding", "Stress at which material breaks", "Stress causing permanent deformation"]',
  0,
  'Materials Science',
  'medium',
  'Ashok Leyland',
  TRUE
),
(
  'Which is generally stronger?',
  'Forged components are generally stronger than cast parts because forging refines the grain structure and eliminates porosity, resulting in better mechanical properties and fatigue resistance.',
  'mcq',
  '["Forged parts", "Cast parts", "Both equal", "Depends on material only"]',
  0,
  'Manufacturing',
  'easy',
  NULL,
  FALSE
),
(
  'What is the correct order of four-stroke engine strokes?',
  'The four-stroke cycle consists of: Intake (fuel-air mixture enters), Compression (mixture is compressed), Power/Combustion (ignition and expansion), and Exhaust (burnt gases expelled).',
  'mcq',
  '["Intake → Compression → Power → Exhaust", "Intake → Power → Compression → Exhaust", "Compression → Intake → Power → Exhaust", "Power → Compression → Intake → Exhaust"]',
  0,
  'Automobile Systems',
  'easy',
  'Hero MotoCorp',
  TRUE
),
(
  'What''s the key difference between turbocharger and supercharger?',
  'A turbocharger is driven by exhaust gases (waste energy recovery) while a supercharger is mechanically driven by the engine crankshaft via belt or gears, consuming engine power but providing instant boost.',
  'mcq',
  '["Turbo uses exhaust gases, supercharger uses crankshaft", "Turbo uses crankshaft, supercharger uses exhaust", "No significant difference", "Turbos are electric, superchargers are mechanical"]',
  0,
  'Automobile Systems',
  'medium',
  'Maruti Suzuki',
  TRUE
),
(
  'Bernoulli''s equation relates:',
  'Bernoulli''s equation (P + ½ρv² + ρgh = constant) relates pressure, velocity, and elevation in a flowing fluid, expressing conservation of energy for ideal fluid flow.',
  'mcq',
  '["Pressure, velocity, and elevation", "Force, mass, and acceleration", "Stress and strain", "Temperature and entropy"]',
  0,
  'Fluid Mechanics',
  'medium',
  NULL,
  FALSE
),
(
  'Cavitation occurs when:',
  'Cavitation happens when local pressure in a liquid drops below its vapor pressure, causing vapor bubbles to form. When these bubbles collapse in higher pressure regions, they create shock waves that damage surfaces.',
  'mcq',
  '["Pressure drops below vapor pressure", "Velocity exceeds critical value", "Temperature rises above boiling point", "Flow becomes turbulent"]',
  0,
  'Fluid Mechanics',
  'hard',
  'KSB Pumps',
  TRUE
),
(
  'What''s the difference between hardness and toughness?',
  'Hardness is resistance to indentation/scratching (surface property), while toughness is the ability to absorb energy and deform plastically before fracturing (measures area under stress-strain curve).',
  'mcq',
  '["Hardness resists indentation, toughness absorbs energy", "Hardness absorbs energy, toughness resists scratching", "They are the same property", "Hardness is for metals, toughness for ceramics"]',
  0,
  'Materials Science',
  'medium',
  'BHEL',
  TRUE
),
(
  'Draft allowance in casting is provided to:',
  'Draft (or taper) is provided on patterns to facilitate easy removal from the mold without damaging the mold walls. Typical draft angles range from 1° to 3°.',
  'mcq',
  '["Facilitate easy removal from mold", "Compensate for shrinkage", "Improve surface finish", "Increase casting strength"]',
  0,
  'Manufacturing',
  'easy',
  NULL,
  FALSE
),
(
  'In third angle projection, the object is placed in which quadrant?',
  'In third angle projection (used in US, Canada), the object is placed in the third quadrant with the projection plane between the observer and object. Views show: Top above front, Right side on right.',
  'mcq',
  '["Third quadrant", "First quadrant", "Second quadrant", "Fourth quadrant"]',
  0,
  'Design & Mechanisms',
  'easy',
  NULL,
  FALSE
),
(
  'For a Newtonian fluid, the relationship between shear stress and shear rate is:',
  'Newtonian fluids (water, air, most oils) show a linear relationship between shear stress and shear rate: τ = μ(dv/dy), where μ is dynamic viscosity. The graph is a straight line through the origin.',
  'mcq',
  '["Linear", "Parabolic", "Exponential", "Logarithmic"]',
  0,
  'Fluid Mechanics',
  'medium',
  NULL,
  FALSE
),
(
  'Maximum bending moment for a simply supported beam with UDL is:',
  'For a simply supported beam with uniformly distributed load (UDL) w over length L, the maximum bending moment occurs at mid-span: Mmax = wL²/8.',
  'mcq',
  '["wL²/8", "wL²/2", "wL/4", "wL²/4"]',
  0,
  'Design & Mechanisms',
  'medium',
  'L&T',
  TRUE
),
(
  'Why are CI (diesel) engines more efficient than SI (petrol) engines?',
  'Diesel engines are more efficient because they operate at higher compression ratios (16-20:1 vs 8-12:1), have no throttling losses, and use lean combustion. Efficiency typically 35-45% vs 25-35% for petrol.',
  'mcq',
  '["Higher compression ratio and no throttling losses", "Better fuel quality", "Simpler design", "Lower operating temperature"]',
  0,
  'Automobile Systems',
  'medium',
  'Cummins',
  TRUE
),
(
  'What is the primary function of regenerative braking?',
  'Regenerative braking converts the vehicle''s kinetic energy back into electrical energy during deceleration, storing it in the battery. This improves efficiency and extends range in EVs and hybrids.',
  'mcq',
  '["Convert kinetic energy to electrical energy", "Reduce brake wear only", "Cool the brakes", "Improve acceleration"]',
  0,
  'EVs',
  'easy',
  'Tesla',
  TRUE
),
(
  'What does BMS stand for in EVs and what''s its role?',
  'Battery Management System (BMS) monitors and manages battery cells - tracking voltage, current, temperature, state of charge (SOC), state of health (SOH), cell balancing, and safety protection.',
  'mcq',
  '["Battery Management System - monitors cell health and safety", "Battery Monitoring Service - tracks charge level", "Basic Motor System - controls electric motor", "Brake Management System - manages regenerative braking"]',
  0,
  'EVs',
  'medium',
  'Ola Electric',
  TRUE
),
(
  'What is the primary function of a differential in vehicles?',
  'The differential allows wheels on the same axle to rotate at different speeds during turns (outer wheel travels farther than inner wheel) while transmitting power to both wheels.',
  'mcq',
  '["Allow wheels to rotate at different speeds during turns", "Increase vehicle speed", "Improve fuel efficiency", "Reduce engine load"]',
  0,
  'Automobile Systems',
  'easy',
  'Eicher',
  TRUE
);

-- Seed Data: Conceptual Questions
INSERT INTO questions (question, answer, question_type, options, correct_option, topic, difficulty, company, is_real_interview) VALUES
(
  'Why is aluminium used in aircraft construction?',
  'Aluminium is extensively used in aircraft because of its excellent strength-to-weight ratio (low density ~2.7 g/cm³ vs steel ~7.8 g/cm³), good corrosion resistance, ease of machining and forming, and adequate mechanical properties when alloyed (especially 2000 and 7000 series). Weight reduction directly improves fuel efficiency, payload capacity, and performance. Additionally, aluminium alloys can be heat-treated to achieve desired strength levels. However, composites like carbon fiber are increasingly used in modern aircraft for even better weight savings.',
  'conceptual',
  NULL,
  NULL,
  'Materials Science',
  'medium',
  'HAL',
  TRUE
),
(
  'Why is carbon fiber used for car bodies in high-performance vehicles?',
  'Carbon fiber reinforced polymer (CFRP) offers an exceptional strength-to-weight ratio - about 5 times stronger than steel while being 70% lighter. This massive weight reduction improves acceleration, handling, braking, and fuel efficiency. Carbon fiber also provides excellent rigidity for chassis stiffness, superior fatigue resistance, and corrosion immunity. The main drawbacks are high cost (~$20-30/kg vs $1-2/kg for steel), complex manufacturing (hand layup, autoclaving), difficult repairability, and brittle failure mode. It''s used in supercars (Lamborghini, McLaren, Bugatti) and racing (F1, Le Mans) where performance justifies the cost.',
  'conceptual',
  NULL,
  NULL,
  'Materials Science',
  'hard',
  'McLaren',
  TRUE
),
(
  'How does a differential work? Explain intuitively without complex math.',
  'Imagine you''re turning your car left. The outer (right) wheel needs to travel a longer arc than the inner (left) wheel, so it must rotate faster. If both wheels were locked together on a solid axle, one wheel would skip/drag, causing tire wear and handling issues. The differential solves this using a clever gear arrangement: the driveshaft spins a ring gear, which rotates a carrier containing small "spider" gears. These spider gears act as a balancing mechanism - they allow the side gears (connected to each wheel) to rotate at different speeds while still delivering power to both wheels. When going straight, both wheels get equal power. During a turn, the spider gears rotate to "transfer" speed from the slower inner wheel to the faster outer wheel. Think of it as a mechanical speed-averaging device that always ensures: (Left speed + Right speed) / 2 = Input speed.',
  'conceptual',
  NULL,
  NULL,
  'Automobile Systems',
  'hard',
  'Mahindra',
  TRUE
),
(
  'What mechanisms or linkages do you see in daily life? Give examples.',
  'Mechanisms are everywhere: **Four-bar linkages** - car windshield wipers, folding chairs, excavator arms. **Slider-crank mechanism** - IC engines (converts piston linear motion to crankshaft rotation), sewing machines. **Cam and follower** - engine valve actuation, mechanical toys. **Gear trains** - bicycles, car transmissions, analog clocks. **Pulley systems** - elevators, gym equipment. **Screw mechanisms** - car jacks, C-clamps, adjustable chairs. **Ratchet mechanisms** - socket wrenches, zip ties. **Geneva drive** - film projectors, indexing tables. **Toggle mechanism** - door latches, over-center clamps. **Pantograph** - train power collection, photocopiers for scaling. These demonstrate how simple mechanisms solve complex motion and force transmission problems elegantly.',
  'conceptual',
  NULL,
  NULL,
  'Design & Mechanisms',
  'medium',
  'Bosch',
  TRUE
),
(
  'Why are wheel hubs made lightweight in performance vehicles?',
  'Lightweight wheel hubs reduce unsprung mass - the weight not supported by the suspension (wheels, tires, brakes, hubs, suspension links). Reducing unsprung mass has multiple benefits: **Better ride quality** - less mass means suspension can respond faster to road irregularities. **Improved handling** - wheels maintain better contact with road surface. **Better acceleration/braking** - less rotational inertia means less energy required to speed up or slow down the wheels. **Reduced wear** - less force transmitted to suspension components. Materials used include aluminum alloys, magnesium alloys, and sometimes titanium in racing. Every 1 kg reduction in unsprung mass is equivalent to ~2-3 kg reduction in sprung mass for performance benefits.',
  'conceptual',
  NULL,
  NULL,
  'Automobile Systems',
  'medium',
  'Brembo',
  TRUE
),
(
  'How does 3D printing help in product prototyping?',
  '3D printing revolutionizes prototyping: **Speed** - go from CAD to physical part in hours vs weeks for traditional machining/molding. **Cost** - no expensive tooling, molds, or fixtures needed; ideal for low-volume production. **Design freedom** - create complex geometries impossible with traditional manufacturing (internal channels, lattice structures, undercuts). **Iteration** - quickly test multiple design variations; fail fast and learn. **Functional testing** - actually test form, fit, and sometimes function before committing to production tooling. **Assembly verification** - check how parts fit together. **Technologies** - FDM (plastic filament), SLA (resin, high detail), SLS (nylon powder, strong parts), metal printing (DMLS/SLM). Examples: Airbus uses it for cabin brackets, automotive companies for intake manifolds and custom jigs. Limitations include material properties (often weaker than production materials), surface finish, and build size constraints.',
  'conceptual',
  NULL,
  NULL,
  'Manufacturing',
  'medium',
  'GE',
  TRUE
),
(
  'Explain turbo lag and why it happens.',
  'Turbo lag is the delay between pressing the accelerator and feeling the boost from the turbocharger. Here''s why: Turbos are driven by exhaust gas energy - when you suddenly demand more power, the engine needs to produce more exhaust gas to spin the turbine faster, which then spins the compressor faster to push more air into the engine. This creates a chicken-and-egg problem: you need more exhaust to spin the turbo, but you need more air from the turbo to make more exhaust. **Causes**: Turbo''s rotational inertia (takes time to accelerate from ~20,000 to 150,000+ RPM), exhaust gas takes time to travel from engine to turbo, compressor needs time to build boost pressure. **Solutions**: Smaller turbos (less inertia, but lower top-end power), twin-scroll turbos (better exhaust pulse separation), variable geometry turbos (adjust vane angles), twin-turbo setups (small turbo for low RPM, large for high RPM), anti-lag systems (keep turbo spinning by maintaining exhaust flow), electric turbos/superchargers for instant response.',
  'conceptual',
  NULL,
  NULL,
  'Automobile Systems',
  'hard',
  'BorgWarner',
  TRUE
),
(
  'Why does cavitation damage pump impellers?',
  'Cavitation occurs when local pressure drops below the liquid''s vapor pressure, forming vapor bubbles. As these bubbles move to higher pressure regions, they violently collapse (implode) in microseconds, creating: **Shock waves** - localized pressures up to 10,000 bar and temperatures up to 5000°C, causing mechanical erosion. **Microjet formation** - asymmetric collapse near surfaces creates high-velocity liquid jets that repeatedly hammer the material. **Material fatigue** - millions of these impacts cause surface fatigue, pitting, and material loss. **Chemical corrosion** - high temperatures can accelerate oxidation. The damage appears as sponge-like pitting on impeller surfaces, typically near the inlet (low pressure zone). **Prevention**: Maintain adequate NPSH (Net Positive Suction Head), avoid running pumps at very low flow rates, proper impeller design, use cavitation-resistant materials (stainless steel, bronze), install inducers upstream of impeller.',
  'conceptual',
  NULL,
  NULL,
  'Fluid Mechanics',
  'hard',
  'Grundfos',
  TRUE
),
(
  'Explain factor of safety (FOS). Why do we apply different factors for different applications?',
  'Factor of Safety = Ultimate Strength / Allowable Stress. It''s a safety margin accounting for uncertainties. **Why we need it**: Material property variations (manufacturing defects, impurities), loading uncertainties (impact, vibrations, unexpected loads), stress concentration effects, environmental factors (corrosion, temperature), fatigue and creep over time, human errors in design/manufacturing, consequences of failure. **Typical values**: Aircraft: 1.5-2.5 (weight-critical, high quality control), Bridges: 3-5 (public safety, variable loads), Pressure vessels: 3-4 (catastrophic failure risk), Static structures: 2-3, Elevators: 10-12 (human life, fatigue), Ropes/chains: 5-10 (dynamic loading). **Material-based**: Brittle materials get higher FOS (sudden failure, no warning) vs ductile materials (yield before breaking, visible deformation warning). Lower FOS = lighter, cheaper but riskier. Higher FOS = safer but heavier, costlier, may be over-engineered.',
  'conceptual',
  NULL,
  NULL,
  'Design & Mechanisms',
  'medium',
  'L&T',
  TRUE
),
(
  'Draw and explain stress-strain curves for steel, aluminium, and ceramic.',
  'These curves show material behavior under tensile loading: **Steel (Mild)**: Clear yield point, extensive plastic deformation (ductile), strain hardening region, ultimate tensile strength ~400-500 MPa, elongation ~25-30%, necking before fracture. Shows upper and lower yield points. **Aluminium**: No distinct yield point (use 0.2% offset yield), more gradual transition to plastic deformation, UTS ~200-300 MPa for pure Al (up to 600 MPa for alloys), elongation ~10-20%, less strain hardening than steel. Lighter (2.7 vs 7.8 g/cm³). **Ceramic**: Nearly linear-elastic behavior (no plastic deformation), brittle fracture with no warning, high compressive strength but low tensile strength, very low strain to failure (<1%), failure stress depends on surface flaws (statistical variation). Key differences: Steel/Al are ductile (absorb energy, fail gradually), ceramics are brittle (suddenly snap), steel has highest strength, ceramics highest stiffness, Al best strength-to-weight ratio. Slope = Young''s modulus (E): Steel ~200 GPa, Al ~70 GPa, Ceramics ~300-400 GPa.',
  'conceptual',
  NULL,
  NULL,
  'Materials Science',
  'hard',
  'Tata Steel',
  TRUE
),
(
  'Why are disc brakes better than drum brakes for performance cars?',
  '**Heat dissipation**: Discs are exposed to air on both sides, cooling much faster than enclosed drums. High-performance braking generates enormous heat (up to 700°C), and discs handle this better, reducing brake fade. **Self-cleaning**: Centrifugal force throws off water and debris; drums trap contaminants, reducing effectiveness. **Consistent performance**: Drums can expand when hot, increasing pedal travel and reducing braking force. Discs maintain consistent contact. **Easier maintenance**: Pads are easily accessible; drum shoes require more disassembly. **Better modulation**: More linear and predictable response, crucial for performance driving. **Resistance to fade**: Brake fade occurs when friction material overheats and releases gases; disc brakes manage this better. **Weight**: Modern ventilated discs can be lighter. **Downside**: Drums have better parking brake integration and slightly lower cost for basic applications. That''s why economy cars use discs front (70% braking force) and drums rear, while performance cars use discs all around, often with ventilated/slotted/drilled rotors and multi-piston calipers.',
  'conceptual',
  NULL,
  NULL,
  'Automobile Systems',
  'medium',
  'Brembo',
  TRUE
),
(
  'Explain regenerative braking like I''m not an engineer.',
  'Think of it like this: normally when you brake, your car turns motion energy into heat (through friction), which just disappears into the air - wasted. Regenerative braking is like "running the engine backwards" - instead of the motor using electricity to spin the wheels, the wheels spin the motor to generate electricity. Here''s the clever part: an electric motor and a generator are basically the same machine, just working in opposite directions. When you lift off the accelerator or press the brake in an EV: The spinning wheels turn the motor, the motor becomes a generator producing electricity, this electricity charges the battery, and the process of generating electricity naturally creates resistance that slows you down. It''s like how a bicycle dynamo makes it harder to pedal when you turn on the lights - you''re converting motion into electricity. **Benefits**: 20-30% more range in EVs, less brake wear (friction brakes last 100,000+ km), smoother driving (one-pedal driving). **Limitations**: Not effective at very low speeds (physics), can''t fully replace friction brakes for emergency stops, less effective when battery is full (nowhere to store the energy).',
  'conceptual',
  NULL,
  NULL,
  'EVs',
  'easy',
  'Tata Nexon EV',
  TRUE
);
