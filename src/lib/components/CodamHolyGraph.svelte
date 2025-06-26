<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { browser } from "$app/environment";
  import {
    Application,
    Color,
    Container,
    FillGradient,
    Graphics,
    Point,
  } from "pixi.js";
  import { CodamProjectBubble } from "$lib/components/CodamProject";
  import { GraphRing } from "./GraphRing";

  let app: Application | null = null;

  let container: HTMLDivElement;

  onMount(async () => {
    if (!browser) return;

    const { Viewport } = await import("pixi-viewport");

    // Create a new application
    app = new Application();

    // Initialize the application
    await app.init({
      background: "#111122",
      resizeTo: window,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    // Append the application canvas to the document body
    container.appendChild(app.canvas);
    app.canvas.classList.add(
      "fixed",
      "top-0",
      "left-0",
      "w-screen",
      "h-screen",
      "-z-10"
    );

    const viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: 1000,
      worldHeight: 1000,
      events: app.renderer.events, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });

    // add the viewport to the stage
    app.stage.addChild(viewport);

    // activate plugins
    viewport.drag().pinch().wheel().decelerate();

    const borderColor = new Color(0x6f16e4);
    const center = new Point(app.screen.width / 2, app.screen.height / 2);

    // Main container
    const holy_graph = new Container();

    // The rings
    const stroke = { color: borderColor, width: 4 };
    const gradient = new FillGradient({
      type: "radial",
      colorStops: [
        { offset: 0, color: "#111155" },
        { offset: 0.8, color: "#111122" },
      ],
    });

    const ring_1 = new GraphRing(150, 0.15, stroke, 0);
    const ring_2 = new GraphRing(300, 0.15, stroke, (Math.PI * 2) / 5);
    const ring_3 = new GraphRing(450, 0.15, stroke, 3);
    const ring_4 = new GraphRing(570, 0.15, stroke, 0.4);
    const ring_5 = new GraphRing(690, 0.15, stroke, 1);
    const ring_6 = new GraphRing(810, 0.15, stroke, 1.5);
    const gradient_circle = new Graphics().circle(0, 0, 900).fill(gradient);
    ring_1.position = center;
    ring_2.position = center;
    ring_3.position = center;
    ring_4.position = center;
    ring_5.position = center;
    ring_6.position = center;
    gradient_circle.position = center;

    // Create and add a container to the stage
    const libft = new CodamProjectBubble("Libft");
    libft.x = center.x;
    libft.y = center.y;

    // Ring 1
    const printf = new CodamProjectBubble("ft_printf");
    const get_next_line = new CodamProjectBubble("get_next_line");
    const born_to_be_root = new CodamProjectBubble("Born2beroot");
    ring_1.addOrbital(printf);
    ring_1.addOrbital(get_next_line);
    ring_1.addOrbital(born_to_be_root);

    // Ring 2
    const push_swap = new CodamProjectBubble("push_swap");
    const pipex = new CodamProjectBubble("pipex");
    const fdf = new CodamProjectBubble("FdF");
    ring_2.addOrbital(push_swap);
    ring_2.addOrbital(pipex);
    ring_2.addOrbital(fdf);

    // Ring 3
    const philosophers = new CodamProjectBubble("Philosophers");
    const minishell = new CodamProjectBubble("minishell");
    ring_3.addOrbital(philosophers);
    ring_3.addOrbital(minishell);

    // Ring 4
    const cub3d = new CodamProjectBubble("cub3d");
    const net_practice = new CodamProjectBubble("NetPractice");
    const cpp0_4 = new CodamProjectBubble("CPP Modules 0-4");
    ring_4.addOrbital(cub3d);
    ring_4.addOrbital(net_practice);
    ring_4.addOrbital(cpp0_4);

    // Ring 5
    const webserv = new CodamProjectBubble("webserv");
    const inception = new CodamProjectBubble("Inception");
    const cpp5_9 = new CodamProjectBubble("CPP Modules 5-9");
    ring_5.addOrbital(webserv);
    ring_5.addOrbital(inception);
    ring_5.addOrbital(cpp5_9);

    // Ring 6
    const ft_transcendence = new CodamProjectBubble("ft_transcendance", 60);
    ring_6.addOrbital(ft_transcendence);

    holy_graph.addChild(
      gradient_circle,
      ring_1,
      ring_2,
      ring_3,
      ring_4,
      ring_5,
      ring_6,
      libft
    );
    viewport.addChild(holy_graph);

    // Listen for animate update
    app.ticker.add((time) => {
      ring_1.update(time.deltaTime);
      ring_2.update(time.deltaTime);
      ring_3.update(time.deltaTime);
      ring_4.update(time.deltaTime);
      ring_5.update(time.deltaTime);
      ring_6.update(time.deltaTime);
    });

    window.onresize = () => {
      viewport.resize(window.innerWidth, window.innerHeight);
    };
  });

  onDestroy(() => {
    if (app) {
      app.destroy(true);
      app = null;
    }
  });
</script>

<div class="absolute inset-0 -z-10" bind:this={container}></div>
