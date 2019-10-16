<script>
  import client from "../sanityClient";
  import Match from "./Match.svelte";
  export let active;
  export let id;
  export let name;
  export let players;
  let matches = false;
  let slideQ = false;

  const ajaxMatches = () => {
    if (active === true && matches === false) {
      const requestStr = `*[_type == "match" && season._ref == "${id}"] | order(_createdAt desc)`;
      client.fetch(requestStr).then(matchData => {
        matches = matchData
      });
    }
  };

  const accordionToggle = event => {
    const curr = event.srcElement;

    if (slideQ === false) {
      slideQ = true;
      active = !active;
      ajaxMatches();

      setTimeout(() => {
        slideQ = false;
      }, 300);
    }
  };

  ajaxMatches();
</script>

<style>
  .season_wrap {
    border: 1px solid #2b2b2b;
    border-radius: 3px;
    box-shadow: 0px 3px 6px rgba(242, 65, 80, 0.6);
    background: #fff;
  }

  .season_wrap + .season_wrap {
    margin-top: 30px;
  }

  .season_dropdown {
    position: relative;
    background: none;
    border: 0;
    outline: none;
    padding: 0;
    display: block;
    width: 100%;
    padding: 10px 20px;
    font-size: 20px;
    text-align: left;
    height: 40px;
    line-height: 20px;
  }

  .season_dropdown::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 15px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 13px 9px 0 9px;
    border-color: #f2414f transparent transparent transparent;
    margin-top: -6px;
    transition: 200ms transform ease-in-out;
  }

  .season_wrap.active .season_dropdown::after {
    transform: rotate(180deg);
  }

  .season_matches {
    display: none;
    border-top: 1px solid #2b2b2b;
  }

  .active .season_matches {
    display: block;
  }
</style>

<section data-id={id} class={`season_wrap${active ? ' active' : ''}`}>
  <button class="season_dropdown" type="button" on:click={accordionToggle}>
    {name}
  </button>
  <div class="season_matches">
    {#if matches}
      {#each matches as match, i}
        <Match data={match} index={i} players={players} />
      {/each}
    {/if}
  </div>
</section>
