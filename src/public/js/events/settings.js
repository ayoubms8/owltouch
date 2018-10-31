import changeLanguage from '../i18n';
import '../materialize.min.js';

const { join } = require('path');
const fs = require('fs');

const settings = require('../../../data/json/settings');

const shortcutInputsId = {
  settingsShortcutTop: 'top',
  settingsShortcutBottom: 'bottom',
  settingsShortcutLeft: 'left',
  settingsShortcutRigth: 'right',
  settingsShortcutDelete: 'delete',
  settingsShortcutBank: 'bankPlacement',
  settingsShortcutPhenix: 'phenixPlacement',
  settingsShortcutZaap: 'zaapPlacement',
};

const defaultShortcuts = () => {
  Object.keys(shortcutInputsId).forEach((key) => {
    settings.shortcut.user[shortcutInputsId[key]] =
      settings.shortcut.default[shortcutInputsId[key]];
    $(`#${key}`).val(String(settings.shortcut.default[shortcutInputsId[key]]).toUpperCase());
    fs.writeFileSync(
      join(__dirname, '../../../data/json/settings.json'),
      JSON.stringify(settings, null, 4),
    );
  });
};

$('#settingsShortcut .input-field input').on('keydown', (event) => {
  event.stopPropagation(event);
  event.preventDefault(event);
  $(event.target).val(String(event.key).toUpperCase());
  fs.writeFileSync(
    join(__dirname, '../../../data/json/settings.json'),
    JSON.stringify(settings, null, 4),
  );
  settings.shortcut.user[event.target.dataset.shortcut] = event.key;
});

$('#settingsShortcut .input-field input').on('focusout', (e) => {
  $(e.target).val(String(settings.shortcut.user[e.target.dataset.shortcut]).toUpperCase());
});

$('#SettingsBtnDefault').on('click', defaultShortcuts);

defaultShortcuts();

$(document).on('keydown', (e) => {
  Object.keys(settings.shortcut.user).forEach((key) => {
    if (settings.shortcut.user[key] === e.key) {
      $(`#${key}`).click();
    }
  });
});

$('#settingLanguageSelector')
  .val(settings.language)
  .formSelect();

$('#settingLanguageSelector').on('change', changeLanguage);
