export interface Concept {
  id: string;
  title: string;
  explanation: string;
  example: string;
  topic: string;
}

export const CONCEPTS: Concept[] = [
  // Thermodynamics
  {
    id: "thermo-1",
    title: "First Law of Thermodynamics",
    explanation: "Energy cannot be created or destroyed, only converted from one form to another. In a closed system, the change in internal energy equals heat added minus work done.",
    example: "When you compress air in a bicycle pump, you're doing work on it. The air heats up because that mechanical energy converts to thermal energy - that's why the pump gets warm.",
    topic: "Thermodynamics",
  },
  {
    id: "thermo-2",
    title: "Carnot Efficiency",
    explanation: "The maximum theoretical efficiency of any heat engine operating between two temperatures. Real engines always perform worse due to friction and irreversibilities.",
    example: "A car engine taking in 1000°C combustion gases and exhausting at 100°C can't possibly be 100% efficient - Carnot efficiency sets the theoretical limit around 75%, but real engines achieve only 25-35%.",
    topic: "Thermodynamics",
  },
  {
    id: "thermo-3",
    title: "Entropy",
    explanation: "A measure of disorder or randomness in a system. In any real process, total entropy always increases - things naturally tend toward disorder.",
    example: "Ice melting in warm water increases entropy: ordered crystal structure breaks down into randomly moving liquid molecules. You'll never see the reverse happen spontaneously.",
    topic: "Thermodynamics",
  },
  {
    id: "thermo-4",
    title: "Otto Cycle",
    explanation: "The theoretical cycle for spark-ignition (petrol) engines with four processes: intake, compression, power, and exhaust. Higher compression ratio means higher efficiency.",
    example: "Your car's petrol engine follows this cycle. Premium fuel allows higher compression without knocking, which is why sports cars require it - they're tuned for higher efficiency.",
    topic: "Thermodynamics",
  },
  {
    id: "thermo-5",
    title: "Heat Exchangers",
    explanation: "Devices that transfer heat between fluids without mixing them. Effectiveness depends on surface area, flow arrangement (parallel/counter), and temperature difference.",
    example: "Your car radiator is a heat exchanger - hot coolant from the engine passes through small tubes while air flows over fins, transferring heat to the atmosphere.",
    topic: "Thermodynamics",
  },
  {
    id: "thermo-6",
    title: "Refrigeration Cycle",
    explanation: "Uses compression and expansion of refrigerant to move heat from cold space to hot space, opposite to natural heat flow direction. Requires work input.",
    example: "AC in your car: refrigerant evaporates inside the cabin (absorbing heat, cooling you), gets compressed, then condenses outside (releasing heat), creating cool air inside.",
    topic: "Thermodynamics",
  },

  // Fluid Mechanics
  {
    id: "fluid-1",
    title: "Bernoulli's Principle",
    explanation: "In flowing fluid, pressure decreases when velocity increases. Total energy (pressure + kinetic + potential) remains constant along a streamline.",
    example: "Airplane wings are curved on top - air flows faster over the top surface, creating lower pressure above than below, generating lift that keeps the plane airborne.",
    topic: "Fluid Mechanics",
  },
  {
    id: "fluid-2",
    title: "Viscosity",
    explanation: "Internal resistance to flow - how 'thick' a fluid is. Higher viscosity means more resistance to deformation and slower flow.",
    example: "Honey has high viscosity (flows slowly), water has low viscosity (flows easily). Engine oil viscosity drops when hot, which is why 5W-30 means it acts like 5-weight when cold, 30-weight when hot.",
    topic: "Fluid Mechanics",
  },
  {
    id: "fluid-3",
    title: "Reynolds Number",
    explanation: "Dimensionless number predicting flow regime: laminar (smooth, orderly) vs turbulent (chaotic, mixing). Depends on velocity, size, and viscosity.",
    example: "Smoke from incense starts smooth (laminar, low Re), then becomes chaotic and swirly (turbulent, high Re) as it rises and accelerates. Same happens in pipes.",
    topic: "Fluid Mechanics",
  },
  {
    id: "fluid-4",
    title: "Cavitation",
    explanation: "Vapor bubbles form when local pressure drops below vapor pressure, then violently collapse causing noise, vibration, and surface damage.",
    example: "Running a water pump dry or at very low flow causes rattling and damage - that's cavitation destroying the impeller. Boat propellers also suffer from this.",
    topic: "Fluid Mechanics",
  },
  {
    id: "fluid-5",
    title: "Boundary Layer",
    explanation: "Thin layer of fluid near a surface where velocity changes from zero (at surface) to free stream velocity. Determines drag and heat transfer.",
    example: "Dimples on golf balls trip the boundary layer to turbulent, reducing overall drag and making the ball fly farther - counterintuitive but proven effective.",
    topic: "Fluid Mechanics",
  },
  {
    id: "fluid-6",
    title: "Pressure Drop in Pipes",
    explanation: "Flowing fluid loses pressure due to friction with pipe walls and internal viscous effects. Longer pipes, smaller diameter, and higher velocity increase pressure drop.",
    example: "Why water pressure is weak on upper floors: friction in pipes reduces pressure with height and distance. Booster pumps overcome this in tall buildings.",
    topic: "Fluid Mechanics",
  },

  // Materials Science
  {
    id: "material-1",
    title: "Stress-Strain Curve",
    explanation: "Graph showing material response to loading: elastic region (recovers), yield point (permanent deformation starts), ultimate strength (max load), and fracture.",
    example: "Bend a paper clip gently - it springs back (elastic). Bend it more - it stays bent (plastic deformation past yield). Keep bending - it breaks (fracture).",
    topic: "Materials Science",
  },
  {
    id: "material-2",
    title: "Hardness vs Toughness",
    explanation: "Hardness resists scratching/indentation (surface property). Toughness absorbs energy before breaking (bulk property, area under stress-strain curve).",
    example: "Glass is hard (resists scratching) but not tough (shatters easily). Rubber is not hard (easily indented) but very tough (absorbs lots of energy without breaking).",
    topic: "Materials Science",
  },
  {
    id: "material-3",
    title: "Fatigue Failure",
    explanation: "Material fails under repeated cyclic loading at stress levels below ultimate strength. Cracks initiate and grow slowly until sudden catastrophic failure.",
    example: "Breaking a wire by bending it back and forth repeatedly - each bend causes microscopic damage that accumulates until it snaps. Aircraft structures are designed against this.",
    topic: "Materials Science",
  },
  {
    id: "material-4",
    title: "Heat Treatment",
    explanation: "Controlled heating and cooling to change material properties. Annealing softens, quenching hardens, tempering reduces brittleness.",
    example: "Samurai swords are heated red-hot, then quenched in water (hardening), then gently reheated (tempering) - making them hard enough to hold an edge yet tough enough not to shatter.",
    topic: "Materials Science",
  },
  {
    id: "material-5",
    title: "Creep",
    explanation: "Slow, time-dependent permanent deformation under constant stress, especially at high temperatures. Material gradually stretches even under low loads.",
    example: "Turbine blades in jet engines slowly elongate over thousands of hours at 1000°C+ temperatures. They must be replaced before they touch the casing.",
    topic: "Materials Science",
  },
  {
    id: "material-6",
    title: "Composite Materials",
    explanation: "Combination of two materials - reinforcement (strong, stiff fibers) in a matrix (holds fibers together) to get properties better than either alone.",
    example: "Carbon fiber = carbon threads (strong in tension) + epoxy resin (distributes load). Result: stronger than steel, lighter than aluminum. Used in F1 cars, aircraft.",
    topic: "Materials Science",
  },

  // Manufacturing
  {
    id: "mfg-1",
    title: "Casting vs Forging",
    explanation: "Casting pours molten metal into mold (complex shapes, porosity possible). Forging hammers solid metal (better grain structure, stronger, limited shapes).",
    example: "Engine blocks are cast (complex internal passages). Crankshafts are forged (high strength needed, simpler shape). Connecting rods can be either depending on application.",
    topic: "Manufacturing",
  },
  {
    id: "mfg-2",
    title: "CNC Machining",
    explanation: "Computer Numerical Control - automated precision cutting using programmed tool paths. Can produce complex parts with tight tolerances repeatedly.",
    example: "Your smartphone's aluminum body is CNC machined from a solid block - a 'unibody' design. Robots follow precise paths to cut, drill, and mill the final shape.",
    topic: "Manufacturing",
  },
  {
    id: "mfg-3",
    title: "Injection Molding",
    explanation: "Molten plastic injected under pressure into a mold cavity, cooled, then ejected. High volume production, low per-part cost, requires expensive tooling.",
    example: "Almost every plastic part you touch daily - LEGO bricks, bottle caps, keyboard keys, phone cases - is injection molded. First mold costs thousands, but each part costs cents.",
    topic: "Manufacturing",
  },
  {
    id: "mfg-4",
    title: "Tolerances and Fits",
    explanation: "Acceptable variation in dimensions. Tight tolerances cost more to manufacture. Clearance fit (loose), transition fit (snug), interference fit (press fit).",
    example: "Bearing pressed onto a shaft uses interference fit - shaft is slightly larger than hole, requires force to assemble, won't come apart. Piston in cylinder uses clearance fit.",
    topic: "Manufacturing",
  },
  {
    id: "mfg-5",
    title: "Additive Manufacturing (3D Printing)",
    explanation: "Building parts layer by layer from digital model. Enables complex geometries impossible with traditional methods. Good for prototyping and low-volume production.",
    example: "GE 3D prints fuel nozzles for jet engines - one piece instead of 20 welded parts, 25% lighter, 5x more durable. Internal cooling channels impossible to machine traditionally.",
    topic: "Manufacturing",
  },
  {
    id: "mfg-6",
    title: "Surface Finishing",
    explanation: "Processes to improve surface quality: grinding (smooth), polishing (shiny), coating (protection), heat treatment (hardening surface only).",
    example: "Chrome on car bumpers is electroplating - thin metal layer provides corrosion resistance and shine. Anodizing on iPhone bodies creates hard, colored oxide layer.",
    topic: "Manufacturing",
  },

  // Automobile Systems
  {
    id: "auto-1",
    title: "Four-Stroke Engine",
    explanation: "Intake (air-fuel enters), Compression (mixture compressed), Power (ignition and expansion), Exhaust (burnt gases expelled). Each piston stroke is 180° crankshaft rotation.",
    example: "Your car engine repeats this cycle thousands of times per minute. At 3000 RPM, each piston completes 1500 full cycles per minute - intake, compress, power, exhaust.",
    topic: "Automobile Systems",
  },
  {
    id: "auto-2",
    title: "Differential",
    explanation: "Allows wheels on same axle to rotate at different speeds during turns while transmitting power. Inner wheel travels shorter distance than outer wheel.",
    example: "Turn your car left - the right wheel must spin faster than the left (longer arc). The differential's spider gears balance this speed difference automatically.",
    topic: "Automobile Systems",
  },
  {
    id: "auto-3",
    title: "Turbocharger vs Supercharger",
    explanation: "Both force more air into engine for more power. Turbo uses exhaust gas (efficiency, but lag). Supercharger driven by belt (instant response, but parasitic loss).",
    example: "Turbo in WRX STI - 'free' power from waste heat, but wait for boost. Supercharger in Mustang GT500 - instant power delivery, but constantly drawing engine power.",
    topic: "Automobile Systems",
  },
  {
    id: "auto-4",
    title: "Suspension System",
    explanation: "Springs absorb bumps (store energy), dampers/shocks dissipate energy (prevent bouncing). Geometry controls wheel movement for handling.",
    example: "Hit a pothole: spring compresses (soft ride), then damper prevents it bouncing back and forth endlessly. Too soft = bouncy, too stiff = harsh ride.",
    topic: "Automobile Systems",
  },
  {
    id: "auto-5",
    title: "Braking System",
    explanation: "Converts kinetic energy to heat via friction. Hydraulic system multiplies pedal force. Disc brakes (better cooling) or drum brakes (cheaper, parking brake).",
    example: "Press brake pedal → master cylinder creates hydraulic pressure → calipers squeeze brake pads against spinning disc → friction slows wheel → heat dissipates to air.",
    topic: "Automobile Systems",
  },
  {
    id: "auto-6",
    title: "Transmission",
    explanation: "Varies gear ratio between engine and wheels. Low gear (high torque, low speed) for acceleration. High gear (low torque, high speed) for cruising efficiency.",
    example: "Bicycle gears: small front chainring + large rear cog = easy pedaling uphill (low gear). Large front + small rear = hard pedaling but high speed (high gear).",
    topic: "Automobile Systems",
  },

  // EVs
  {
    id: "ev-1",
    title: "Battery Management System (BMS)",
    explanation: "Brain of the battery pack - monitors each cell's voltage, current, temperature. Balances cells, prevents overcharge/discharge, estimates range, ensures safety.",
    example: "Your phone dying at 5% or slow-charging when hot - that's BMS protecting battery life. In EVs, BMS manages thousands of cells to prevent thermal runaway (fire).",
    topic: "EVs",
  },
  {
    id: "ev-2",
    title: "Regenerative Braking",
    explanation: "Electric motor runs backwards as generator during deceleration, converting kinetic energy back to electrical energy, stored in battery. Recovers 20-30% of energy.",
    example: "Lift accelerator in Tesla - car slows down without touching brakes. Wheels spin motor, motor generates electricity, charges battery. Brake pads last 100,000+ km.",
    topic: "EVs",
  },
  {
    id: "ev-3",
    title: "Battery Chemistry: Li-ion",
    explanation: "Lithium ions move between anode and cathode during charge/discharge. High energy density but sensitive to temperature extremes and degradation over time.",
    example: "Tesla uses NCA chemistry (high energy, expensive), BYD uses LFP (safer, cheaper, lower density). All degrade ~2-3% capacity per year regardless of usage.",
    topic: "EVs",
  },
  {
    id: "ev-4",
    title: "DC Fast Charging vs AC Charging",
    explanation: "AC charging uses onboard charger (3-11 kW, hours). DC fast charging bypasses it, directly charging battery (50-350 kW, minutes), but requires expensive infrastructure.",
    example: "Home charging = AC overnight (8 hours for full charge). Highway supercharger = DC fast charging (20-30 minutes for 80%). Battery heats up faster with DC, limiting speed.",
    topic: "EVs",
  },
  {
    id: "ev-5",
    title: "Motor Types: BLDC vs Induction",
    explanation: "BLDC (brushless DC) uses permanent magnets (efficient, expensive, rare earth metals). Induction uses electromagnets (cheaper, robust, slightly less efficient).",
    example: "Tesla Model 3 uses permanent magnet motor in rear (efficiency). Model S uses induction front motor (cost, reliability). Nissan Leaf uses BLDC only.",
    topic: "EVs",
  },
  {
    id: "ev-6",
    title: "Thermal Management",
    explanation: "Critical for battery life and performance. Liquid cooling keeps cells at optimal 20-40°C. Too cold = reduced range, too hot = degradation/safety risk.",
    example: "Nissan Leaf (air-cooled) degrades faster in hot climates. Tesla/Chevrolet (liquid-cooled) maintain better battery health. Cold weather can reduce range by 30-40%.",
    topic: "EVs",
  },

  // Design & Mechanisms
  {
    id: "design-1",
    title: "Factor of Safety (FOS)",
    explanation: "Ratio of ultimate strength to allowable stress. Accounts for uncertainties in material, loading, manufacturing. Higher FOS = heavier but safer.",
    example: "Elevator cables: FOS of 10-12 (life safety, fatigue loading). Aircraft structure: FOS of 1.5-2.5 (weight-critical, quality controlled). Bridge: FOS of 3-5.",
    topic: "Design & Mechanisms",
  },
  {
    id: "design-2",
    title: "Four-Bar Linkage",
    explanation: "Four rigid bars connected by pin joints, one fixed. Creates complex motion from simple rotation. Used extensively in mechanisms.",
    example: "Windshield wipers, folding chairs, excavator arms, desk lamps - all four-bar linkages converting rotary motor motion into the sweeping/folding motion needed.",
    topic: "Design & Mechanisms",
  },
  {
    id: "design-3",
    title: "Stress Concentration",
    explanation: "Stress amplifies at geometric discontinuities: holes, notches, sharp corners, sudden cross-section changes. Can be 3-4x nominal stress, causing crack initiation.",
    example: "Why airplane windows are rounded - sharp corners would concentrate stress and crack. Fillets in machined parts reduce stress concentration at transitions.",
    topic: "Design & Mechanisms",
  },
  {
    id: "design-4",
    title: "Gear Ratios",
    explanation: "Ratio of teeth on driven gear to driver gear. Trades speed for torque: large driven gear = more torque but slower rotation.",
    example: "First gear in car: small gear on engine drives large gear on wheels = lots of torque for acceleration. Fifth gear: large to small = less torque but high speed.",
    topic: "Design & Mechanisms",
  },
  {
    id: "design-5",
    title: "Beam Deflection",
    explanation: "Beams bend under load. Deflection depends on load, span length (L), moment of inertia (I), and material stiffness (E). Deflection ∝ L³ - doubling length means 8x deflection.",
    example: "Diving board deflects more as you walk toward the end - cantilever beam with load. That's why boards are thick at the fixed end, tapering toward the free end.",
    topic: "Design & Mechanisms",
  },
  {
    id: "design-6",
    title: "Cam and Follower",
    explanation: "Cam rotates, pushing follower in specific motion profile. Converts rotary motion to reciprocating motion with precise timing and displacement control.",
    example: "Engine valves open/close via camshaft lobes pushing on followers. Cam profile determines how fast valve opens, how long it stays open - crucial for engine performance.",
    topic: "Design & Mechanisms",
  },
];
