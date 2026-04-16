-- Aura Bistro İçin Resmi Menü Veri Aktarımı
-- Bunu Supabase SQL Editöründe çalıştırın

-- First, clear existing mock data if any (Optional)
-- DELETE FROM menu_items;

INSERT INTO menu_items (category_en, category_it, name_en, name_it, description_en, description_it, price) VALUES
('Starters', 'Antipasti', 'Bluefin Tuna Tartare', 'Tartara di Tonno Rosso', 'Hand-cut tuna, avocado mousse, xaper berries, citrus dressing.', 'Tonno tagliato al coltello, mousse di avocado, frutti di cappero, condimento agli agrumi.', '€26'),
('Starters', 'Antipasti', 'Heritage Beef Carpaccio', 'Carpaccio di Manzo Heritage', 'Thinly sliced wagyu beef, 36-month aged Parmigiano, truffle pearls.', 'Sottili fette di manzo wagyu, Parmigiano invecchiato 36 mesi, perle di tartufo.', '€28'),
('Starters', 'Antipasti', 'Wild Mushroom Velouté', 'Vellutata di Funghi Selvatici', 'Creamy forest mushrooms, thyme-infused oil, sourdough croutons.', 'Crema di funghi di bosco, olio infuso al timo, crostini di pasta madre.', '€18'),
('Starters', 'Antipasti', 'Grilled Octopus', 'Polpo alla Griglia', 'Mediterranean octopus, smoked paprika potato purée, celery hearts.', 'Polpo del Mediterraneo, purè di patate alla paprika affumicata, cuori di sedano.', '€24'),
('Starters', 'Antipasti', 'Heirloom Tomato & Burrata', 'Pomodori Heirloom e Burrata', 'Puglia burrata, organic tomatoes, aged balsamic, fresh basil.', 'Burrata pugliese, pomodori biologici, balsamico invecchiato, basilico fresco.', '€22'),
('Main Courses', 'Secondi Piatti', 'Black Truffle Tagliolini', 'Tagliolini al Tartufo Nero', 'Fresh egg pasta, Piedmontese butter, shaved seasonal black truffle.', 'Pasta fresca all''uovo, burro piemontese, scaglie di tartufo nero di stagione.', '€38'),
('Main Courses', 'Secondi Piatti', 'Pan-Seared Chilean Seabass', 'Branzino Cileno Scottato', 'Asparagus tips, saffron beurre blanc, micro-greens.', 'Punte di asparagi, beurre blanc allo zafferano, micro-erbe.', '€45'),
('Main Courses', 'Secondi Piatti', 'Roasted Lamb Chops', 'Costolette d''Agnello Arrostite', 'Herb-crusted lamb, roasted root vegetables, red wine reduction.', 'Agnello in crosta d''erbe, radici arrostite, riduzione al vino rosso.', '€42'),
('Main Courses', 'Secondi Piatti', 'Lobster Linguine', 'Linguine all''Astice', 'Half lobster, cherry tomatoes, chili, garlic, parsley oil.', 'Mezzo astice, pomodorini, peperoncino, aglio, olio al prezzemolo.', '€48'),
('Main Courses', 'Secondi Piatti', 'Wild Mushroom Risotto', 'Risotto ai Funghi Selvatici', 'Acquerello rice, porcini mushrooms, chives, truffle butter.', 'Riso Acquerello, funghi porcini, erba cipollina, burro al tartufo.', '€34'),
('Main Courses', 'Secondi Piatti', 'Dry-Aged Ribeye (300g)', 'Costata di Manzo Frollata (300g)', 'Grass-fed beef, rosemary salt, roasted garlic, arugula salad.', 'Manzo grass-fed, sale al rosmarino, aglio arrostito, insalata di rucola.', '€55'),
('Desserts', 'Dolci', 'Deconstructed Tiramisu', 'Tiramisù Decomposto', 'Espresso-soaked savoiardi, mascarpone foam, cocoa dust.', 'Savoiardi bagnati all''espresso, schiuma di mascarpone, polvere di cacao.', '€14'),
('Desserts', 'Dolci', 'Warm Pistachio Fondant', 'Tortino Caldo al Pistacchio', 'Sicilian pistachio core, vanilla bean gelato.', 'Cuore di pistacchio di Sicilia, gelato alla vaniglia.', '€16'),
('Desserts', 'Dolci', 'Amalfi Lemon Sorbet', 'Sorbetto al Limone di Amalfi', 'Hand-churned lemon sorbet, fresh mint, splash of prosecco.', 'Sorbetto al limone fatto a mano, menta fresca, spruzzo di prosecco.', '€12'),
('Desserts', 'Dolci', 'Dark Chocolate Tart', 'Tortino al Cioccolato Fondente', '70% dark chocolate, sea salt flakes, raspberry coulis.', 'Cioccolato fondente 70%, fiocchi di sale marino, coulis di lamponi.', '€15'),
('Drinks', 'Bevande', 'Classic Negroni', 'Negroni Classico', 'Gin, Campari, Sweet Vermouth, orange peel.', 'Gin, Campari, Vermouth Rosso, scorza d''arancia.', '€16'),
('Drinks', 'Bevande', 'Aura Signature Martini', 'Martini Aura Signature', 'Grey Goose vodka, dry vermouth, gold leaf olive.', 'Vodka Grey Goose, vermouth dry, oliva in foglia d''oro.', '€18'),
('Drinks', 'Bevande', 'Sparkling Mineral Water', 'Acqua Minerale Frizzante', 'S.Pellegrino or Panna (750ml).', 'S.Pellegrino o Panna (750ml).', '€8'),
('Drinks', 'Bevande', 'Espresso', 'Espresso', 'Single origin Arabica beans, served with a chocolate truffle.', 'Chicchi Arabica monorigine, serviti con tartufo al cioccolato.', '€6'),
('Drinks', 'Bevande', 'Brunello di Montalcino', 'Brunello di Montalcino', 'Glass of premium Tuscan red wine.', 'Calice di vino rosso toscano pregiato.', '€22');
