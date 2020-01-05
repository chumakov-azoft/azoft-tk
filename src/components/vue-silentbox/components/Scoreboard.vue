<template>
  <div class="scoreboard">
    <div class="team" :class="{win: status === 'win1', lost: status === 'win2'}">
      <div class="chevron" :style="'background-color: ' + videoState.chevrons[0]" v-if="videoState.chevrons[0]"></div>
      <div class="rank">{{videoState.ratings[0]}}</div>
      <img class="logo" :src="videoState.logos[0]" v-if="videoState.logos && videoState.logos[0]"/>
      <div class="name">{{videoState.names[0]}}</div>
      <div class="score">{{score1}}</div>
      <div class="record" v-if="status === ''">{{record1}}</div>
    </div>
    <div class="divider"><p v-if="status === ''">{{videoState.subtitle}}</p></div>
    <div class="team" :class="{win: status === 'win2', lost: status === 'win1'}">
      <div class="chevron" :style="'background-color: ' + videoState.chevrons[1]" v-if="videoState.chevrons[1]"></div>
      <div class="rank">{{videoState.ratings[1]}}</div>
      <img class="logo" :src="videoState.logos[1]" v-if="videoState.logos[1]"/>
      <div class="name">{{videoState.names[1]}}</div>
      <div class="score">{{score2}}</div>
      <div class="record" v-if="status === ''">{{record2}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    score1: {
      type: [Number, String],
      default: 0
    },
    score2: {
      type: [Number, String],
      default: 0
    },
    record1: {
      type: [Number, String],
      default: 0
    },
    record2: {
      type: [Number, String],
      default: 0
    },
    status: {
      type: String,
      default: ''
    }
  },
  computed: {
    videoState () {
      return this.$store.state.video
    }
  }
}
</script>

<style lang="scss">

  #silentbox-overlay__embed img.logo {
    width: 30px;
    background-color: initial;
    bottom: initial;
    box-shadow: initial;
    cursor: default;
    display: block;
    left: initial;
    margin: initial;
    max-height: initial;
    max-width: initial;
    position: initial;
    right: initial;
    top: initial;
  }

  .scoreboard {
    position: absolute;
    bottom: 60px;
    left: 12px;
    z-index: 100;
    width: auto;
    height: 100px;
    border-radius: 20px;
    background: white;
    box-shadow: 2px 3px 5px 0 rgba(0, 0, 0, 0.25);
    overflow: hidden;
  }

  .team {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: black;

    .chevron {
      flex-shrink: 0;
      width: 14px;
      height: 100%;
    }

    .name {
      flex-shrink: 0;
      font-size: 17px;
      width: auto;
      padding: 13px;
      flex-grow: 1;
      display: flex;
      justify-content: center;
      letter-spacing: initial;
    }

    .rank {
      height: 100%;
      width: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 10px;
      flex-shrink: 0;
    }

    .score {
      font-size: 14px;
      flex-shrink: 0;
      color: #757575;
      width: 30px;
      display: flex;
      justify-content: center;
    }

    .record {
      margin-right: 10px;
      font-size: 19px;
      width: 40px;
      display: flex;
      justify-content: center;
      font-weight: 700;
    }
  }

  .divider {
    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      height: 1px;
      left: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.1);
    }

    p {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
      background-color: white;
      color: #cccccc;
      padding: 0 8px;
      width: fit-content;
      line-height: 1px;
      font-size: 11px;
    }

    height: 1px;
    width: 100%;
    position: absolute;
    margin-left: 0;
    font-size: 12pt;
    color: white;
  }

  .win {
    &.team {
      background-color: #fff663;
    }
    &:after {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' style='width:24px;height:24px' viewBox='0 0 24 24'%3E%3Cpath fill='%23000000' d='M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z' /%3E%3C/svg%3E");
      width: 22px;
      height: 22px;
      margin: 0 16px 0 10px;
    }
    .name, .score {
      font-weight: bold;
    }
  }

  .lost {
    &:after {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' style='width:24px;height:24px' viewBox='0 0 24 24'%3E%3Cpath fill='%23000000' d='M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M12,14C13.75,14 15.29,14.72 16.19,15.81L14.77,17.23C14.32,16.5 13.25,16 12,16C10.75,16 9.68,16.5 9.23,17.23L7.81,15.81C8.71,14.72 10.25,14 12,14Z' /%3E%3C/svg%3E");
      width: 22px;
      height: 22px;
      margin: 0 16px 0 10px;
    }

  }

  .subtitle {
    margin: 20px;
    color: #757575;
  }

  b {
    font-weight: bold;
  }
</style>
