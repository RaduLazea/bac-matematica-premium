-- Update the chapters table to include grade and profile information
ALTER TABLE chapters ADD COLUMN grade INTEGER;
ALTER TABLE chapters ADD COLUMN profile TEXT;

-- Update existing chapters to have grade 9 and M1 profile as defaults
UPDATE chapters SET grade = 9, profile = 'M1' WHERE grade IS NULL;

-- Make grade and profile required for new entries
ALTER TABLE chapters ALTER COLUMN grade SET NOT NULL;
ALTER TABLE chapters ALTER COLUMN profile SET NOT NULL;

-- Add comprehensive chapters for all grades and profiles
INSERT INTO chapters (title, description, difficulty_level, order_index, grade, profile, is_active) VALUES

-- CLASA 9 - M1 Matematică
('Mulțimi de numere', 'Mulțimea numerelor naturale, întregi, raţionale, iraţionale şi reale', 'beginner', 1, 9, 'M1', true),
('Elemente de logică matematică', 'Propoziții, conectori logici, quantificatori', 'beginner', 2, 9, 'M1', true),
('Progresii aritmetice și geometrice', 'Progresii, formule, aplicații', 'intermediate', 3, 9, 'M1', true),
('Vectori în plan', 'Operații cu vectori, produsul scalar', 'intermediate', 4, 9, 'M1', true),
('Trigonometrie în triunghiul dreptunghic', 'Rapoarte trigonometrice, aplicații', 'intermediate', 5, 9, 'M1', true),

-- CLASA 10 - M1 Matematică
('Funcții reale', 'Definiție, proprietăți, operații cu funcții', 'intermediate', 1, 10, 'M1', true),
('Ecuații și inecuații', 'Ecuații de gradul I și II, sisteme', 'intermediate', 2, 10, 'M1', true),
('Funcții polinomiale', 'Funcția liniară, funcția pătratică', 'intermediate', 3, 10, 'M1', true),
('Trigonometrie pe cercul unitate', 'Cercul trigonometric, funcții trigonometrice', 'advanced', 4, 10, 'M1', true),
('Geometrie în plan', 'Congruență, asemănare, teoreme', 'intermediate', 5, 10, 'M1', true),

-- CLASA 11 - M1 Matematică
('Limite și continuitate', 'Limita unei funcții, continuitate', 'advanced', 1, 11, 'M1', true),
('Derivate', 'Derivata unei funcții, reguli de derivare', 'advanced', 2, 11, 'M1', true),
('Studiul funcțiilor', 'Monotonie, extreme, grafice', 'advanced', 3, 11, 'M1', true),
('Primitive și integrale', 'Primitive, integrale definite', 'advanced', 4, 11, 'M1', true),
('Geometrie în spațiu', 'Drepte și plane în spațiu', 'advanced', 5, 11, 'M1', true),

-- CLASA 12 - M1 Matematică  
('Funcții exponențiale și logaritmice', 'Exponențiale, logaritmi, ecuații', 'advanced', 1, 12, 'M1', true),
('Numere complexe', 'Forma algebrică, geometrică, exponențială', 'advanced', 2, 12, 'M1', true),
('Probabilități', 'Evenimente, probabilități, distribuții', 'advanced', 3, 12, 'M1', true),
('Statistică matematică', 'Parametri statistici, reprezentări grafice', 'intermediate', 4, 12, 'M1', true),

-- CLASA 9 - M2 Științe
('Mulțimi de numere', 'Mulțimea numerelor naturale, întregi, raţionale', 'beginner', 1, 9, 'M2-Stiinte', true),
('Ecuații și inecuații de gradul I', 'Ecuații liniare, sisteme simple', 'beginner', 2, 9, 'M2-Stiinte', true),
('Funcția liniară', 'Graficul funcției liniare, aplicații', 'beginner', 3, 9, 'M2-Stiinte', true),
('Progresii aritmetice', 'Definiție, proprietăți, aplicații', 'intermediate', 4, 9, 'M2-Stiinte', true),
('Elemente de geometrie plană', 'Triunghiuri, patrulaterale, cerc', 'intermediate', 5, 9, 'M2-Stiinte', true),

-- CLASA 10 - M2 Științe
('Ecuații de gradul II', 'Ecuații patratice, discriminant', 'intermediate', 1, 10, 'M2-Stiinte', true),
('Funcția pătratică', 'Parabola, vertex, aplicații', 'intermediate', 2, 10, 'M2-Stiinte', true),
('Trigonometrie de bază', 'Rapoarte trigonometrice în triunghi', 'intermediate', 3, 10, 'M2-Stiinte', true),
('Vectori în plan', 'Operații elementare cu vectori', 'intermediate', 4, 10, 'M2-Stiinte', true),
('Geometrie în plan', 'Teoreme fundamentale', 'intermediate', 5, 10, 'M2-Stiinte', true),

-- CLASA 11 - M2 Științe
('Funcții și ecuații exponențiale', 'Funcții exponențiale simple', 'intermediate', 1, 11, 'M2-Stiinte', true),
('Derivate elementare', 'Noțiuni de bază despre derivate', 'intermediate', 2, 11, 'M2-Stiinte', true),
('Probabilități de bază', 'Evenimente, probabilități simple', 'intermediate', 3, 11, 'M2-Stiinte', true),
('Statistică descriptivă', 'Medii, reprezentări grafice', 'beginner', 4, 11, 'M2-Stiinte', true),

-- CLASA 12 - M2 Științe
('Logaritmi', 'Definiție, proprietăți, ecuații', 'intermediate', 1, 12, 'M2-Stiinte', true),
('Primitive simple', 'Integrarea funcțiilor elementare', 'intermediate', 2, 12, 'M2-Stiinte', true),
('Elemente de analiză', 'Noțiuni introductive', 'intermediate', 3, 12, 'M2-Stiinte', true),

-- CLASA 9 - M2 Tehnologic
('Mulțimi și operații', 'Reuniune, intersecție, diferență', 'beginner', 1, 9, 'M2-Tehnologic', true),
('Calcul algebric', 'Operații cu expresii algebrice', 'beginner', 2, 9, 'M2-Tehnologic', true),
('Ecuații liniare', 'Ecuații de gradul I, aplicații practice', 'beginner', 3, 9, 'M2-Tehnologic', true),
('Funcția liniară și aplicații', 'Grafice, probleme practice', 'beginner', 4, 9, 'M2-Tehnologic', true),
('Geometrie aplicată', 'Măsurări, arii, volume', 'beginner', 5, 9, 'M2-Tehnologic', true),

-- CLASA 10 - M2 Tehnologic  
('Ecuații de gradul II practice', 'Aplicații în tehnologie', 'intermediate', 1, 10, 'M2-Tehnologic', true),
('Sisteme de ecuații', 'Rezolvarea sistemelor', 'intermediate', 2, 10, 'M2-Tehnologic', true),
('Progresii în aplicații', 'Aplicații practice ale progresiilor', 'intermediate', 3, 10, 'M2-Tehnologic', true),
('Trigonometrie aplicată', 'Măsurători în practică', 'intermediate', 4, 10, 'M2-Tehnologic', true),
('Elemente de statistică', 'Colectarea și prelucrarea datelor', 'beginner', 5, 10, 'M2-Tehnologic', true),

-- CLASA 11 - M2 Tehnologic
('Funcții în tehnologie', 'Funcții utile în practică', 'intermediate', 1, 11, 'M2-Tehnologic', true),
('Derivate aplicative', 'Viteze, accelerații', 'intermediate', 2, 11, 'M2-Tehnologic', true),
('Probabilități practice', 'Aplicații în tehnologie', 'intermediate', 3, 11, 'M2-Tehnologic', true),

-- CLASA 12 - M2 Tehnologic
('Optimizări', 'Probleme de optimizare practică', 'intermediate', 1, 12, 'M2-Tehnologic', true),
('Modelare matematică', 'Aplicații în inginerie', 'intermediate', 2, 12, 'M2-Tehnologic', true),

-- CLASA 9 - M2 Pedagogic
('Mulțimi și logică', 'Concepte fundamentale', 'beginner', 1, 9, 'M2-Pedagogic', true),
('Aritmetică și algebră', 'Operații și ecuații de bază', 'beginner', 2, 9, 'M2-Pedagogic', true),
('Geometrie elementară', 'Forme geometrice de bază', 'beginner', 3, 9, 'M2-Pedagogic', true),
('Funcții și reprezentări', 'Introducere în funcții', 'beginner', 4, 9, 'M2-Pedagogic', true),

-- CLASA 10 - M2 Pedagogic
('Ecuații și aplicații', 'Ecuații cu aplicații educaționale', 'intermediate', 1, 10, 'M2-Pedagogic', true),
('Progresii și șiruri', 'Progresii în contexte educaționale', 'intermediate', 2, 10, 'M2-Pedagogic', true),
('Geometrie și măsurări', 'Aplicații practice', 'intermediate', 3, 10, 'M2-Pedagogic', true),

-- CLASA 11 - M2 Pedagogic
('Elemente de analiză', 'Concepte introductive', 'intermediate', 1, 11, 'M2-Pedagogic', true),
('Statistică educațională', 'Interpretarea datelor', 'intermediate', 2, 11, 'M2-Pedagogic', true),

-- CLASA 12 - M2 Pedagogic  
('Matematică aplicată', 'Aplicații în educație', 'intermediate', 1, 12, 'M2-Pedagogic', true),
('Evaluare și măsurare', 'Metode statistice în educație', 'intermediate', 2, 12, 'M2-Pedagogic', true);