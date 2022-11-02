//  -------------------------------------------------------------
//    Оповещения
//  -------------------------------------------------------------

import gulp from 'gulp';
import notifier from 'node-notifier';

gulp.task('say:hello', (done) => {
  notifier.notify({
    title: 'Привет Мир!',
    message: 'Проект запущен, весёлого кодинга!',
    sound: false,
    timeout: 4,
    'app-name': 'WGB task runner',
  });

  return done();
});

gulp.task('say:build', (done) => {
  notifier.notify({
    title: 'Сборка завершена',
    message: 'проверьте папку /build',
    sound: false,
    timeout: 4,
    'app-name': 'WGB task runner',
  });

  return done();
});
