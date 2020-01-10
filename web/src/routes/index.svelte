<script context="module">
  import client from "../sanityClient";
  import Season from "../components/Season.svelte";

  export function preload() {
    const seasons = client
      .fetch('*[_type == "season"] | order(_createdAt desc)')
      .then(seasons => seasons);

    const players = client
      .fetch('*[_type == "player"]')
      .then(players => players);

    return Promise.all([seasons, players]).then(values => {
      const [seasons, players] = values;

      return {
          seasons,
          players
        };
    });
  }
</script>

<script>
  export let seasons;
  export let players;
</script>

<svelte:head>
  <title>AoE2 Leaderboard</title>
</svelte:head>

{#each seasons as season, i}
  <Season 
    active={i === 0} 
    name={season.name} 
    id={season._id}
    players={players}
  />
{/each}

