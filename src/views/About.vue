<template>
  <div class="about">
    <section>
      <v-layout align-center text-center column justify-center style="margin-top: 2.5em;">
        <img src="../assets/blue-yellow.png" style="width: 60%; max-width: 400px;"/>
        <h3 class="display-3 ma-2">Azoft Tournaments</h3>
        <h4 class="subheading">(открытые турниры Azoft по настольному теннису)</h4>
        <h3 class="heading mt-6">Турнир Azoft Open 2.0 запущен!</h3>
        <!--<ul style="width: 90%; max-width: 500px;" class="mt-6 text-justify">
          <li>Играем в настольный теннис, стол в подвале здания Кутателадзе 4Г, комната №20. Партии до 11 очков, матч до 3 очков (т.е. результат 3:2, 3:1 или 3:0).
            За ходом турнира можно следить в нашем публичном Телеграм чате <a href="tg://t.me/joinchat/FMaTykiB1RIoc7PMD5RTkQ"><strong>azoft tournaments</strong></a></li>
          <li>Начинаем турнир как только запишется 16 участников, <a href="#" @click.prevent="$router.push('/events/open-1')">сетка</a>
            называется "система с двойным выбыванием, консолидационным раундом и розыгрышем всех мест".
            Это всего лишь значит, что даже если вы проиграли один раз, то у вас есть возможность выйти в суперфинал и занять первое место турнира.</li>
          <li>Каждый участник сыграет 5-8 партий, весь турнир должен уложиться в 2 дня не торопясь. Просьба разыгрываться перед матчем не больше 5 минут, чтобы не задерживать других.</li>
          <li>Играем шарами 40+ (пластиковые), лучше всего фирмы DHS, если у вас до сих пор шары 35мм - отнесите их в музей. Ракетки можно любые, хоть латвийские дедушкины со стеклянными шипами.</li>
          <li>Спорные ситуации (задел - не задел) решаются в пользу того игрока, кто подавал в начале текущей партии (стандартное правило самосудейства). Если споров много - зовите зрителей.</li>
          <li>Победители турнира получают ценные призы (скорее всего брелок для ключей), славу и несколько заклятых врагов, которые захотят отомстить вам в следущем турнире.</li>
          <li>По результатам турнира считаем рейтинг. Вначале рейтинг назначается наугад, потом он будет стремиться к реальному значению вашей силы игры.
            Рейтинг учитывает количество партий у проигравшего, поэтому разница между 3:1 и 3:0 существенная, бейтесь за каждое очко!</li>
        </ul>-->
      </v-layout>
      <v-layout align-center column justify-center>
        <v-btn to="/events/open-2" dark large color="#f2c008" class="mt-6">Смотреть таблицу</v-btn>
        <v-btn @click="goTg" dark large color="#2483c5" class="my-6">Подключиться к чату</v-btn>
        <v-dialog v-model="telegram" max-width="390">
          <v-card>
            <v-card-title class="headline">Телегам чат</v-card-title>
            <v-card-text>
              Установите приложение <a href="https://tlgrm.ru/">Телеграм</a> и найдите в нём канал <strong>azoft tournaments</strong>. Напишите в него ваше ФИО, сайт вашей компании (прикрутим логотип к вашей фамилии) и TTW рейтинг (если есть). Следите за обновлениями!
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="telegram = false">Я понял</v-btn>
              <v-btn color="red darken-1" text @click="telegram = false">У меня Линукс</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-flex row wrap text-xs-center class="mb-5">
          Не попали в этот турнир? Не пропустите следующий турнир! ;)
        </v-flex>
        <h4 class="display-1">Прошедшие турниры</h4>
        <v-layout align-center column justify-center class="ma-4">
          <v-btn to="/events/open-1" dark small color="#f2c008" class="ma-4">Открытый турнир 1.0</v-btn>
          <v-btn to="/events/open-1" dark small color="#f2c008" class="ma-4">Турнир пар 1.0</v-btn>
        </v-layout>
      </v-layout>
    </section>
  </div>
</template>

<script>
export default {
  name: 'about',
  data: () => ({
    telegram: false,
    blurred: false
  }),
  methods: {
    goTg () {
      this.blurred = false
      window.onblur = function () { this.blurred = true }
      document.location.href = 'tg://t.me/joinchat/FMaTykiB1RIoc7PMD5RTkQ'
      setTimeout(this.openTgPopup, 3500)
    },
    openTgPopup () {
      if (!this.blurred) {
        this.telegram = true
      }
    }
  }
}
</script>
