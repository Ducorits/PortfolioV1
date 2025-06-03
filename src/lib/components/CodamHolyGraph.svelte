<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { Application, Color, Container, Graphics, Point } from "pixi.js";
  import { CodamProjectBubble } from "$lib/components/CodamProject";

  onMount(async () => {
    if (!browser) return;

    const { Viewport } = await import("pixi-viewport");

    const borderColor = new Color(0x6f16e4);
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({ background: "#111111", resizeTo: window });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);
    app.canvas.classList.add(
      "fixed",
      "top-0",
      "left-0",
      "w-screen",
      "h-screen",
      "-z-10"
    );

    let angle = 0;
    const center = new Point(app.screen.width / 2, app.screen.height / 2);
    const radius = 200;

    // Create and add a container to the stage
    const holy_graph = new Container();
    const libft = new CodamProjectBubble(
      "Libft",
      new Point(center.x, center.y)
    );
    const printf = new CodamProjectBubble(
      "ft_printf",
      new Point(center.x + 40, center.y + -40)
    );
    const get_next_line = new CodamProjectBubble(
      "get_next_line",
      new Point(center.x + 80, center.y + 180)
    );
    const born_to_be_root = new CodamProjectBubble(
      "Born2beroot",
      new Point(center.x + 200, center.y)
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

    const ring_1 = new Graphics()
      .circle(0, 0, 200)
      .stroke({ color: borderColor, width: 4 });
    const ring_2 = new Graphics()
      .circle(0, 0, 400)
      .stroke({ color: borderColor, width: 4 });
    const ring_3 = new Graphics()
      .circle(0, 0, 600)
      .stroke({ color: borderColor, width: 4 });
    const ring_4 = new Graphics()
      .circle(0, 0, 700)
      .stroke({ color: borderColor, width: 4 });
    const ring_5 = new Graphics()
      .circle(0, 0, 800)
      .stroke({ color: borderColor, width: 4 });
    const ring_6 = new Graphics()
      .circle(0, 0, 900)
      .stroke({ color: borderColor, width: 4 });

    holy_graph.addChild(
      ring_1,
      ring_2,
      ring_3,
      ring_4,
      ring_5,
      ring_6,
      libft.container,
      printf.container,
      get_next_line.container,
      born_to_be_root.container
    );
    viewport.addChild(holy_graph);

    // Listen for animate update
    app.ticker.add((time) => {
      angle = 0.005 * time.deltaTime;
      libft.container.x = center.x;
      libft.container.y = center.y;
      ring_1.position = center;
      ring_2.position = center;
      ring_3.position = center;
      ring_4.position = center;
      ring_5.position = center;
      ring_6.position = center;
      printf.container.position = rotateAroundPivot(
        center,
        printf.container.position,
        angle
      );
      get_next_line.container.position = rotateAroundPivot(
        center,
        get_next_line.container.position,
        angle
      );
      born_to_be_root.container.position = rotateAroundPivot(
        center,
        born_to_be_root.container.position,
        angle
      );
    });
  });

  function rotateAroundPivot(
    pivot: { x: number; y: number },
    point: { x: number; y: number },
    angle: number
  ): { x: number; y: number } {
    const dx = point.x - pivot.x;
    const dy = point.y - pivot.y;

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return {
      x: pivot.x + dx * cos - dy * sin,
      y: pivot.y + dx * sin + dy * cos,
    };
  }
</script>
