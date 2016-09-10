Package.describe({
  name: 'matdutour:popup-confirm',
  version: '0.2.0',
  summary: 'A clean and easy to use confirmation popup',
  git: 'https://github.com/mathieudutour/Meteor-popup-confirm.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use('jquery');
  api.use('templating');
  api.addFiles('lib/popup-confirm.html', 'client');
  api.addFiles('lib/popup-confirm.css', 'client');
  api.export('Confirmation', 'client');
  api.addFiles('lib/popup-confirm.js', 'client');
});
