<script context="module">
  import client from "../sanityClient";
  import Season from "../components/Season.svelte";

  export function preload() {
    const id = client
      .fetch('*[_type == "season"] | order(_createdAt desc) [0] ._id')
      .then(id => id);

    const seasons = client
      .fetch('*[_type == "season"]')
      .then(seasons => seasons);

    return Promise.all([id, seasons]).then(values => {
      const [id, seasons] = values;

      const requestStr = `*[_type == "match" && seasonplayed._ref == "${id}"]`;
      const matches = client.fetch(requestStr).then(matches => matches);

      return Promise.all([matches, seasons]).then(values => {
        const [matches, seasons] = values;

        return {
          matches,
          seasons
        };
      });
    });
  }
</script>

<script>
  export let matches;
  export let seasons;
  console.log(matches, seasons);
</script>

<svelte:head>
  <title>AoE2 Leaderboard</title>
</svelte:head>

<Season active={true} />
<Season active={false} />

<!--
	Request 
		Matches for newest season.

		leaderboard has players with matches recorded in that season
			each player has wins losses draws
			reference player
-->
