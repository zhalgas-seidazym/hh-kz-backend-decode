'use strict';

const Country = require('../app/regions/Country')

module.exports = {
  async up(queryInterface, Sequelize) {
    // Find the country IDs first (you need the IDs to reference in Cities table)
    const countries = await Country.findAll()

    const countryMap = {};
    countries.forEach((country) => {
      countryMap[country.name] = country.id;
    });

    // Insert cities for each country in Russian with additional cities
    await queryInterface.bulkInsert('Cities', [
      // Russia
      { name: 'Москва', countryId: countryMap['Россия'] }, // Moscow
      { name: 'Санкт-Петербург', countryId: countryMap['Россия'] }, // Saint Petersburg
      { name: 'Новосибирск', countryId: countryMap['Россия'] }, // Novosibirsk
      { name: 'Екатеринбург', countryId: countryMap['Россия'] }, // Yekaterinburg
      { name: 'Казань', countryId: countryMap['Россия'] }, // Kazan

      // Ukraine
      { name: 'Киев', countryId: countryMap['Украина'] }, // Kyiv
      { name: 'Одесса', countryId: countryMap['Украина'] }, // Odessa
      { name: 'Львов', countryId: countryMap['Украина'] }, // Lviv
      { name: 'Харьков', countryId: countryMap['Украина'] }, // Kharkiv
      { name: 'Днепр', countryId: countryMap['Украина'] }, // Dnipro

      // Belarus
      { name: 'Минск', countryId: countryMap['Беларусь'] }, // Minsk
      { name: 'Гомель', countryId: countryMap['Беларусь'] }, // Gomel
      { name: 'Могилёв', countryId: countryMap['Беларусь'] }, // Mogilev
      { name: 'Витебск', countryId: countryMap['Беларусь'] }, // Vitebsk
      { name: 'Гродно', countryId: countryMap['Беларусь'] }, // Grodno

      // Kazakhstan
      { name: 'Алматы', countryId: countryMap['Казахстан'] }, // Almaty
      { name: 'Нур-Султан', countryId: countryMap['Казахстан'] }, // Nur-Sultan (Astana)
      { name: 'Шымкент', countryId: countryMap['Казахстан'] }, // Shymkent
      { name: 'Караганда', countryId: countryMap['Казахстан'] }, // Karaganda
      { name: 'Актобе', countryId: countryMap['Казахстан'] }, // Aktobe

      // Armenia
      { name: 'Ереван', countryId: countryMap['Армения'] }, // Yerevan
      { name: 'Гюмри', countryId: countryMap['Армения'] }, // Gyumri
      { name: 'Ванадзор', countryId: countryMap['Армения'] }, // Vanadzor

      // Azerbaijan
      { name: 'Баку', countryId: countryMap['Азербайджан'] }, // Baku
      { name: 'Гянджа', countryId: countryMap['Азербайджан'] }, // Ganja
      { name: 'Сумгаит', countryId: countryMap['Азербайджан'] }, // Sumqayit

      // Georgia
      { name: 'Тбилиси', countryId: countryMap['Грузия'] }, // Tbilisi
      { name: 'Батуми', countryId: countryMap['Грузия'] }, // Batumi
      { name: 'Кутаиси', countryId: countryMap['Грузия'] }, // Kutaisi

      // Moldova
      { name: 'Кишинёв', countryId: countryMap['Молдова'] }, // Chisinau
      { name: 'Бельцы', countryId: countryMap['Молдова'] }, // Bălți
      { name: 'Тирасполь', countryId: countryMap['Молдова'] }, // Tiraspol

      // Uzbekistan
      { name: 'Ташкент', countryId: countryMap['Узбекистан'] }, // Tashkent
      { name: 'Самарканд', countryId: countryMap['Узбекистан'] }, // Samarkand
      { name: 'Бухара', countryId: countryMap['Узбекистан'] }, // Bukhara

      // Tajikistan
      { name: 'Душанбе', countryId: countryMap['Таджикистан'] }, // Dushanbe
      { name: 'Худжанд', countryId: countryMap['Таджикистан'] }, // Khujand
      { name: 'Бохтар', countryId: countryMap['Таджикистан'] }, // Bokhtar

      // Kyrgyzstan
      { name: 'Бишкек', countryId: countryMap['Киргизия'] }, // Bishkek
      { name: 'Ош', countryId: countryMap['Киргизия'] }, // Osh
      { name: 'Джалал-Абад', countryId: countryMap['Киргизия'] }, // Jalal-Abad

      // Turkmenistan
      { name: 'Ашхабад', countryId: countryMap['Туркменистан'] }, // Ashgabat
      { name: 'Туркменабат', countryId: countryMap['Туркменистан'] }, // Türkmenabat
      { name: 'Дашогуз', countryId: countryMap['Туркменистан'] } // Daşoguz
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', null, {});
  }
};
