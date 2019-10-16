<script>
  export let data 
  export let index 
  export let players 
  import Swords from "../theme/Swords.svelte";

  console.log(data);
</script>

<style>
  .match_wrap {
    padding: 15px 20px;
  }

  .match_wrap:nth-child(odd) {
    background: #d6fbd7;
  }

  .match_wrap:nth-child(even) {
    background: #bcffbe;
  }

  .match_table div {
    display: grid;
    grid-template-columns: 3fr 3fr 2fr 1fr;
  }

  .match_table div:first-child {
    border-bottom: 1px solid #2b2b2b;
    margin-bottom: 5px;
  }

  .match_table span:last-child {
    text-align: right;
  }

  .gain,
  .loss {
    font-weight: 700;
  }

  .gain {
    color: #f24150;
  }

  .loss {
    color: #166b8c;
  }

  .player_name {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .title {
    display: block;
    margin-bottom: 15px;
    font-size: 16px;
    position: relative;
  }
</style>

<article class="match_wrap">
  <strong class="title">
    Match 1
    <Swords />
  </strong>
  <div class="match_table">
    <div>
      <span>Name</span>
      <span>Placed</span>
      <span>ELO</span>
      <span>+/-</span>
    </div>
    <div>
      <span class="player_name">Player 1</span>
      <span>1st</span>
      <span>2115</span>
      <span class="gain">+24</span>
    </div>
    <div>
      <span class="player_name">Player 2</span>
      <span>3rd</span>
      <span>2035</span>
      <span class="loss">-16</span>
    </div>
  </div>
</article>
