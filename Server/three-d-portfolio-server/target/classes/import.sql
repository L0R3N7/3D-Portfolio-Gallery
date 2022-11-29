insert into users (id, user_name, email, password) values (-1, 'user', 'email@gmx.com', 'passme');

insert into theme(id, name, model_path, light_intensity, is_exhibit) values (-1, 'Edgy Teen', '~/test.c4d', 0.0, true );
insert into theme(id, name, model_path, light_intensity, is_exhibit) values (-2, 'Happy Holiday', '~/test.c4d', 0.0, true );

insert into exhibition(id, title, user_id) values (-1, 'Fotos von Künstlern', -1);
insert into exhibition(id, title, user_id, thumbnail_url) values (-2, 'Fotos von meinem Huhn', -1, 'https://www.huehner-haltung.de/img/rhodelaender-huhn-768x768.jpg');

insert into exhibit(id, title) values (-1, 'Picasso Foto');
insert into exhibit(id, title, url, exhibition_id) values (-2, 'Geburt.', 'https://www.agrarheute.com/sites/agrarheute.com/files/styles/ah_bildergalerie_standalone_5x4/public/thumbnails/image/ei-kueken.jpg?itok=IGZdghSz', -2);
insert into exhibit(id, title, url, exhibition_id) values (-3, 'Freunde.', 'https://img.fotocommunity.com/hahn-im-korb-bielefelder-kennhuehner-huehnerschar-mit-kraehendem-hahn-19460011-fd7e-4c9f-961e-aeba8b21b00a.jpg?width=1000', -2);


