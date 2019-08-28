<style>
  nav {
    height: 65px;
    width: 100%;
    padding: 10px 0;
		position: relative;
		background: #000;
		box-sizing: border-box;
  }

  .menu_btn {
    padding: 0;
    background: none;
    border: 0;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 15px;
    outline: none;
    margin: -18px 0 0 0;
  }

  .menu_btn .menu_btn-lines {
    position: absolute;
    width: 100%;
    height: 5px;
    background: #FFF;
    left: 0;
    top: 50%;
    margin-top: -10px;
    transition: 120ms background-color ease-in-out 120ms;
    opacity: 1;
  }

  .menu_btn .menu_btn-lines::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 5px;
    background: #FFF;
    left: 0;
    top: -10px;
    transition: transform 120ms ease-in-out, top 120ms 120ms ease-in-out;
  }

  .menu_btn .menu_btn-lines::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 5px;
    background: #FFF;
    left: 0;
    bottom: -10px;
    transition: transform 120ms ease-in-out, bottom 120ms 120ms ease-in-out;
  }

  .menu_btn.active .menu_btn-lines {
    background-color: transparent;
  }

  .menu_btn.active .menu_btn-lines::before {
    transform: rotate(45deg);
    transition: transform 120ms 120ms ease-in-out, top 120ms ease-in-out;
    top: 0;
  }

  .menu_btn.active .menu_btn-lines::after {
    transform: rotate(-45deg);
    transition: transform 120ms 120ms ease-in-out, bottom 120ms ease-in-out;
    bottom: 0;
  }

	.menu_text {
		position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 2;
    font-size: 13px;
    color: #fff;
    line-height: 20px;
    bottom: -7px;
	}

	h2 {
		color: #fff;
    text-align: center;
    padding-left: 55px;
    padding: 7px 0 10px 55px;
    margin: 0;
	}
</style>

<script>
	let slideQ = false;
	let active = false;

	function menuToggle(event) {
		const curr = event.srcElement;

		if (slideQ === false) {
			slideQ = true;
			active = !active;
			
			setTimeout(() => {
				slideQ = false;
			}, 300);
		}
	}
</script>

<nav>
  <div class="container">
    <button class={`menu_btn${active ? " active" : ""}`} on:click={menuToggle}>
      <span class="menu_btn-lines" />
      <span class="menu_text">Menu</span>
    </button>
		<h2>Aoe2 Leaderboard</h2>
  </div>
</nav>

<!--

	Menu button,
	title
	Day 2 add search for matches potentially
-->
