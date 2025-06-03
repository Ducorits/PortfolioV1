<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { Application, Color, Graphics } from 'pixi.js';
	import { CodamProjectBubble } from '$lib/components/CodamProject';

  onMount(async () => {
    if (!browser) return;

    const borderColor = new Color(0x6F16E4);
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({ background: '#111111', resizeTo: window });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);
    app.canvas.classList.add('fixed', 'top-0', 'left-0', 'w-screen', 'h-screen', '-z-10');


    // Create and add a container to the stage
    const libft = new CodamProjectBubble("Libft");
    const printf = new CodamProjectBubble("ft_printf");

    let angle = 0;
    const radius = 200;
    const center_x = app.screen.width / 2;
    const center_y = app.screen.height / 2;


    const ring_1 = new Graphics().circle(0, 0, 200).stroke({color: borderColor, width: 4});

    app.stage.addChild(ring_1);
    app.stage.addChild(libft.container);
    app.stage.addChild(printf.container);

    // Move the container to the center
    libft.container.x = app.screen.width / 2;
    libft.container.y = app.screen.height / 2;
    ring_1.x = app.screen.width / 2;
    ring_1.y = app.screen.height / 2;

    // Listen for animate update
    app.ticker.add((time) =>
    {
      angle += 0.001 * time.deltaTime;
      printf.container.x = center_x + (radius * Math.cos(angle));
      printf.container.y = center_y + (radius * Math.sin(angle));

    });
  });

</script>
