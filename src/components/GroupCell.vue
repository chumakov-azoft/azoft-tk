<template>
  <g
    @mouseover="onOver($event)"
    @mouseout="onOut($event)">
    <rect class="group-cell-shade" width="30" height="30" v-if="diagonal"></rect>
    <rect class="group-cell-empty" width="30" height="30" v-else-if="empty"></rect>
    <!--<circle class="group-cell-circle" :id="'player' + order[3]" cx="15" cy="15" r="2" fill="black" v-if="!diagonal && empty"></circle>-->
    <rect class="group-cell-plus" width="30" height="30" v-if="plus"></rect>
    <rect class="group-cell-minus" width="30" height="30" v-if="minus"></rect>
    <rect class="group-cell-progress" width="30" height="30" v-if="progress"></rect>
    <text x="15" y="21" width="30" height="30" text-anchor="middle" class="group-cell-text" v-if="started">{{resultText}}</text>
  </g>
</template>

<script>
export default {
  name: 'GroupCell',
  props: {
    order: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
  }),
  computed: {
    version: function () { return this.$store.state.version },
    result: function () { return this.$store.state.scores[this.order[0]][this.order[1]][this.order[2]][this.order[3]] },
    resultText: function () { return this.result[0] === 'Tex' || this.result[1] === 'Tex' ? 'Tex' : this.result[0] + ':' + this.result[1] },
    diagonal: function () { return this.order[2] === this.order[3] },
    empty: function () { return this.status === '' },
    started: function () { return this.status && this.status.indexOf('ready') === -1 },
    progress: function () { return (this.status === 'progress') },
    finished: function () { return (this.status === 'win1' || this.status === 'win2') },
    plus: function () { return this.status === 'win1' },
    minus: function () { return this.status === 'win2' },
    status: function () { return this.diagonal ? '' : this.result ? this.result[2] : '' }
  },
  methods: {
    onOver ($event) {
      if (!this.diagonal) this.$store.commit('overGroupCell', { order: this.order, $event })
    },
    onOut ($event) {
      if (!this.diagonal) this.$store.commit('outGroupCell', { order: this.order, $event })
    }
  }
}
</script>

<style lang="scss">
.group-cell-circle {
  pointer-events: none;
  display: none;
}
.group-cell-text {
  pointer-events: none;
  cursor: pointer;
}
.group-cell-shade {
  fill: rgba(0,0,0,0.5);
  stroke: #444444;
  pointer-events: none;
}
.group-cell-plus {
  fill: #80ff55;
  stroke: #444444;
  cursor: pointer;
}
.group-cell-minus {
  fill: #ff5050;
  stroke: #444444;
  cursor: pointer;
}
.group-cell-progress {
  fill: #00c7ff;
  stroke: #444444;
  cursor: pointer;
}
.group-cell-empty {
  fill: rgba(0,0,0,0);
  stroke: #444444;
  cursor: pointer;
}
.group-cell-name {
  font-size: 15px;
}
.group-cell-delta {
  font-size: 12px;
  font-weight: 500;
}
.group-cell-over {
  .group-cell-empty {
    fill: #f7f19b;
  }
  .group-cell-plus {
    fill: #c5ff55;
    // fill: rgba(128, 255, 85, 0.4)
  }
  .group-cell-minus {
    fill: #ff9950;
    // fill: rgba(255, 80, 80, 0.4)
  }
}
</style>
